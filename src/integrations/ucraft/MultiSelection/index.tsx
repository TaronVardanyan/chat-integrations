import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { safeReadJson, uuidv4 } from "../../../helpers";
import { useRasaMessageContext } from "../../../contexts";
import { FIELD_SKIPPED } from "../../../constants/ucraft";
import { FormType, RasaOptions } from  "../../../constants/GeneralTypes";
import FormButton from "../../..//FormButton";
import { useUpdateMessages } from "../../utils";
import { useFormsContext } from "../../FormsContext";
import { StyledSkipButton } from "../../styles";
import { ActionBtn, ActionsWrapper, ButtonsWrapper } from "./styles";

function MultiSelection() {
  const { t } = useTranslation("ui");
  const { sendMessageHandler, isLastMessage, message, color } =
    useRasaMessageContext();
  const {
    field: { type, required, value, options, fieldMetadata },
  } = useFormsContext();
  const optionList =
    typeof options === "string" && options
      ? (safeReadJson(options, []) as RasaOptions[])
      : (options as RasaOptions[]);
  const isLastField = fieldMetadata?.isLastField;
  const [completed, setCompleted] = useState(
    isLastMessage || (Boolean(value) && value !== FIELD_SKIPPED)
  );
  const [selectedOptions, setSelectedOptions] = useState<any>(
    value && value !== FIELD_SKIPPED ? safeReadJson(value, []) : []
  );
  const { updateMessages } = useUpdateMessages();

  const [isSkipped, setIsSkipped] = useState(value === FIELD_SKIPPED);
  const [disabled, setDisabled] = useState(isSkipped || Boolean(completed));
  const handleClick = ({ payload }) => {
    if (selectedOptions.includes(payload)) {
      const newOptions = selectedOptions.filter((option) => option !== payload);
      setSelectedOptions(newOptions);
    } else {
      setSelectedOptions([...selectedOptions, payload]);
    }
  };

  const handleFinish = () => {
    const stringifyOptions = JSON.stringify(selectedOptions);
    sendMessageHandler &&
      sendMessageHandler({
        message: stringifyOptions,
        metadata: { selectedOptions, updateId: message.id },
        updateActionsBody: updateMessages(stringifyOptions),
        isLastField,
      });
    setCompleted(true);
    setDisabled(true);
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
    setDisabled(true);
    setIsSkipped(true);
  };

  return completed && type === FormType.MULTIPLE_SELECTION ? null : (
    <ActionsWrapper>
      {optionList.map((item) => {
        return (
          <ActionBtn
            key={item.title + uuidv4()}
            value={item.payload}
            disabled={disabled}
            $isSelectedOption={selectedOptions.includes(item.payload)}
            onClick={() => handleClick(item)}
          >
            {item.title}
          </ActionBtn>
        );
      })}
      {!completed && !isSkipped && (
        <ButtonsWrapper>
          <FormButton
            onClick={handleFinish}
            htmlType="submit"
            color={color}
            disabled={!selectedOptions.length}
            isPrimary
            block
          >
            {t("rasaForm.confirm")}
          </FormButton>
          {!required && (
            <StyledSkipButton onClick={handleSkip}>
              {t("rasaForm.skipBtn")}
            </StyledSkipButton>
          )}
        </ButtonsWrapper>
      )}
    </ActionsWrapper>
  );
}

export default MultiSelection;
