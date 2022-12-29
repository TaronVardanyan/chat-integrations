import React, { useCallback, useEffect, useState } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import {
  AUTH_TOKEN_KEY,
  ONBOARDING_URL,
  FIELD_SKIPPED,
} from "../../../../../../../helpers/ucraftHelpers/constants";
import { isUrl } from "../../../../../../../helpers";
import FormButton from "../../../../../FormButton";
import CompletedIcon from "../CompletedIcon";
import LoaderTextSwitcher from "../LoaderTextSwitcher";
import { useRasaMessageContext } from "../../../context";
import { getTopTemplateId, urlCheck } from "./helpers";
import axiosAiApi from "../../../../../../../helpers/ucraftHelpers/axiosAiApi";
import { AiErrorType, UrlData, UrlResponse } from "./types";
import { useUpdateMessages } from "../../utils";
import { ChatPagePostMessage, FormType } from "../../../../../../../constants";
import { useFormsContext } from "../../FormsContext";
import { ErrorMessage, StyledSkipButton } from "../../styles";
import { InputWrapper } from "./styles";

function WebsiteUrl() {
  const { t } = useTranslation("ui");
  const {
    field: { field_metadata, value, type, required, fieldMetadata },
  } = useFormsContext();
  const isLastField = fieldMetadata?.isLastField;
  const [websiteUrl, setWebsiteUrl] = useState(value || "");
  const { updateMessages } = useUpdateMessages();
  const [loader, setLoader] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [likeTemplateId, setLikeTemplateId] = useState("");
  const [completed, setCompleted] = useState(
    Boolean(value) && value !== FIELD_SKIPPED
  );
  const [isSkipped, setIsSkipped] = useState(value === FIELD_SKIPPED);
  const [disabled, setDisabled] = useState(isSkipped || completed);
  const { sendMessageHandler, color, toggleAiTemplateByIdIframe, message } =
    useRasaMessageContext();

  const listener = useCallback(
    ({
      data: { type, data },
    }: {
      data: {
        type: ChatPagePostMessage;
        data: { [key: string]: string };
      };
    }) => {
      if (type === ChatPagePostMessage.SET_AI_TEMPLATE_ID) {
        if (websiteUrl) {
          sendMessageHandler &&
            sendMessageHandler({
              message: websiteUrl,
              metadata: {
                templateId: data.selectedAiId,
                updateId: message.id,
              },
              updateActionsBody: updateMessages(websiteUrl),
            });
          setDisabled(true);
        }
      }
    },
    [websiteUrl]
  );

  useEffect(() => {
    if (FormType.UCRAFT_WEBSITE_URL === type) {
      window.addEventListener("message", listener, false);
      return () => window.removeEventListener("message", listener);
    }
  }, [websiteUrl, type]);

  const onUrlInput = debounce(async (siteUrl: string) => {
    const url = siteUrl.trim();

    setWebsiteUrl(url);
    setErrorText("");
    setCompleted(false);

    if (url) {
      const urlHttp = urlCheck(url);
      if (type === FormType.UCRAFT_WEBSITE_URL) {
        setLoader(true);
        try {
          const response = await axiosAiApi.post<UrlData, UrlResponse>(
            "/",
            {
              page_url: urlHttp,
            },
            // the template matching process takes a long time, for this we extend the server response time
            { timeout: 120000 }
          );

          if (response?.data?.topRank) {
            const topTemplateId = getTopTemplateId(response?.data?.topRank);
            setLikeTemplateId(topTemplateId);
            setCompleted(true);
            setErrorText("");
          } else {
            setCompleted(false);
            setErrorText("rasaForm.notExistsUrl");
          }
        } catch (error: any) {
          if (error?.detail?.[0]?.type === AiErrorType.VALIDATION_FAILED) {
            setCompleted(false);
            setErrorText("rasaForm.notExistsUrl");
          } else {
            setErrorText("rasaForm.error");
          }
        } finally {
          setLoader(false);
        }
      }
    }
  }, 1500);

  const handleFinish = async () => {
    if (type === FormType.UCRAFT_WEBSITE_URL) {
      toggleAiTemplateByIdIframe &&
        toggleAiTemplateByIdIframe({
          data: {
            address: ONBOARDING_URL,
            templateId: likeTemplateId,
            token: localStorage.getItem(AUTH_TOKEN_KEY),
            projectUrl: field_metadata?.projectUrl || "",
            industry: field_metadata?.industry || "",
          },
        });
    } else {
      const urlHttp = urlCheck(websiteUrl);
      const isValidUrl = isUrl(urlHttp);
      if (isValidUrl) {
        sendMessageHandler &&
          sendMessageHandler({
            message: websiteUrl,
            metadata: {
              updateId: message.id,
            },
            updateActionsBody: updateMessages(websiteUrl),
            isLastField,
          });
        setDisabled(true);
        setCompleted(true);
      } else {
        setErrorText("editor.validUrlPrompt");
      }
    }
  };

  const handleSkip = () => {
    sendMessageHandler &&
      sendMessageHandler({
        message: FIELD_SKIPPED,
        metadata: {
          updateId: message.id,
        },
        updateActionsBody: updateMessages(FIELD_SKIPPED),
        changeLastMessage: true,
        isLastField,
      });
    setIsSkipped(true);
    setDisabled(true);
  };

  return (
    <Form
      fields={[{ name: "websiteUrl", value: websiteUrl }]}
      onFinish={handleFinish}
    >
      <InputWrapper
        name="websiteUrl"
        defaultValue={websiteUrl}
        type="text"
        touched
        marginBottomSmall
        placeholder={
          type === FormType.URL
            ? t(`rasaForm.${FormType[type]}`)
            : "https://www.ucraft.com"
        }
        suffix={<CompletedIcon completed={completed} />}
        error={errorText ? "error" : undefined}
        help={errorText ? <ErrorMessage>{t(errorText)}</ErrorMessage> : null}
        onChange={(e) => onUrlInput(e.target.value)}
        hasFeedback={false}
        rasaInput
        disabled={disabled || loader}
      />
      {!completed && !isSkipped && (
        <>
          <FormButton
            htmlType="submit"
            disabled={!websiteUrl || disabled || !!errorText || loader}
            color={color}
            isPrimary
            block
          >
            {type !== FormType.URL ? (
              <LoaderTextSwitcher
                loader={loader}
                text={t("rasaForm.createMyWebsite")}
              />
            ) : (
              t("rasaForm.confirm")
            )}
          </FormButton>
          {!required && (
            <StyledSkipButton onClick={handleSkip}>
              {t("rasaForm.skipBtn")}
            </StyledSkipButton>
          )}
        </>
      )}
    </Form>
  );
}

export default WebsiteUrl;
