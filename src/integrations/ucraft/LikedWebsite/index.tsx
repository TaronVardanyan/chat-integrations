import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  ONBOARDING_URL,
  AUTH_TOKEN_KEY,
} from "../constants";
import FormButton from "../../../components/FormButton";
import { useRasaMessageContext } from "../../../contexts";
import { useUpdateMessages } from "../hooks";
import { ChatPagePostMessage } from "../constants";
import { ButtonsWrapper } from "../styles";

function LikedWebsite() {
  const { t } = useTranslation("ui");
  const { sendMessageHandler, message, color, togglePostMessage, field: { field_metadata, value }, } =
    useRasaMessageContext();
  const [completed, setCompleted] = useState(Boolean(value));
  const { updateMessages } = useUpdateMessages();


  const listener = useCallback(
    ({
      data: { type, data },
    }: {
      data: {
        type: ChatPagePostMessage;
        data: { [key: string]: string };
      };
    }) => {
      if (type === ChatPagePostMessage.SET_AI_TEMPLATE_RANDOM_ID) {
        sendMessageHandler &&
          sendMessageHandler({
            message: t("rasaForm.notForNowTextBtnText"),
            metadata: {
              templateId: data.selectedAiId,
              updateId: message.id,
            },
            updateActionsBody: updateMessages(data.selectedAiId),
          });
        setCompleted(true);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", listener, false);
    return window.removeEventListener("message", listener);
  }, []);

  const handleConfirm = () => {
    const text = t("rasaForm.yesIHaveBtnText");
    sendMessageHandler &&
      sendMessageHandler({
        message: text,
        metadata: {
          updateId: message.id,
        },
        updateActionsBody: updateMessages(text),
      });
    setCompleted(true);
  };

  const handleNotNow = () => {
    togglePostMessage &&
    togglePostMessage('CHOOSE_AI_TEMPLATE',
      {
        address: ONBOARDING_URL,
        token: localStorage.getItem(AUTH_TOKEN_KEY),
        projectUrl: field_metadata?.projectUrl || "",
        industry: field_metadata?.industry || "",
      }
    );
  };

  return (
    <ButtonsWrapper>
      <FormButton
        onClick={handleConfirm}
        disabled={completed}
        color={color}
        block
      >
        {t("rasaForm.yesIHaveBtnTextEmoji")}
      </FormButton>
      <FormButton
        onClick={handleNotNow}
        disabled={completed}
        color={color}
        block
      >
        {t("rasaForm.notForNowTextBtnTextEmoji")}
      </FormButton>
    </ButtonsWrapper>
  );
}

export default LikedWebsite;
