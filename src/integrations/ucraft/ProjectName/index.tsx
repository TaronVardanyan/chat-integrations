import React, { useState, useCallback, ChangeEventHandler } from "react";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import { useMutation } from "@apollo/client";
import { generateProjectNameMutation } from "../../../helpers/ucraft/graphQL/mutation";
import {
  Error,
  unAuthCategories,
} from "../../../../../../../helpers/ucraftHelpers/types";
import FormInput from "../../../../../FormInput";
import FormButton from "../../../../../FormButton";
import CompletedIcon from "../CompletedIcon";
import LoaderTextSwitcher from "../LoaderTextSwitcher";
import { useRasaMessageContext } from "../../../context";
import { useFocus } from "../../../../../../../hooks";
import { useUpdateMessages } from "../../utils";
import { useFormsContext } from "../../FormsContext";
import { ErrorMessage } from "../../styles";

function ProjectName() {
  const [form] = Form.useForm();
  const {
    field: { value },
  } = useFormsContext();
  const { t } = useTranslation("ui");
  const [generateProjectName] = useMutation(generateProjectNameMutation);
  const [completed, setCompleted] = useState(Boolean(value));
  const [disabled, setDisabled] = useState(Boolean(value));
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState(value || "");
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const { updateMessages } = useUpdateMessages();

  const { sendMessageHandler, color, message } = useRasaMessageContext();
  const focusRef = useFocus(null);

  const onNameInput: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const { value } = e.target;
    setProjectName(value);
    setErrorText("");
    setIsError(false);
  }, []);

  const getProjectUrl = async () => {
    setLoading(true);
    const currentProjectName = projectName.trim();

    try {
      const response = await generateProjectName({
        variables: { name: currentProjectName },
      });

      const projectUrl = response?.data?.generateProjectName || "";

      if (projectUrl) {
        sendMessageHandler &&
          sendMessageHandler({
            message: currentProjectName,
            metadata: {
              projectUrl: projectUrl,
              projectName: currentProjectName,
              updateId: message.id,
            },
            updateActionsBody: updateMessages(currentProjectName),
          });
        setCompleted(true);
        setDisabled(true);
      }
    } catch (err: Error | any) {
      if ("message" in err && unAuthCategories.includes(err.message)) {
        setErrorText("rasaForm.expiredToken");
      } else {
        setErrorText("rasaForm.undetectedError");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    const checkProjectName = /^-|-$/.test(projectName);

    if (checkProjectName) {
      setErrorText("rasaForm.nameError");
      setIsError(true);
      return;
    }

    getProjectUrl();
  };

  return (
    <Form
      form={form}
      fields={[{ name: "projectName", value: projectName }]}
      onFinish={handleFinish}
    >
      <FormInput
        type="projectName"
        touched
        value={projectName}
        marginBottomSmall
        placeholder={t("rasaForm.projectName")}
        suffix={completed && <CompletedIcon completed={completed} />}
        error={isError ? "error" : undefined}
        help={isError ? <ErrorMessage>{t(errorText)}</ErrorMessage> : null}
        onChange={onNameInput}
        hasFeedback={false}
        rasaInput
        disabled={disabled}
        isDisabled={disabled}
        inputRef={focusRef}
      />
      {!completed && (
        <FormButton
          color={color}
          htmlType="submit"
          disabled={!projectName.trim() || disabled || loading}
          isPrimary
          block
        >
          <LoaderTextSwitcher text={t("rasaForm.confirm")} loader={loading} />
        </FormButton>
      )}
    </Form>
  );
}

export default ProjectName;
