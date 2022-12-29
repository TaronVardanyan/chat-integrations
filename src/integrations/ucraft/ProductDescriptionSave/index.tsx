import React, { useState } from "react";
import { useRasaMessageContext } from "../../../context";
import { RasaFieldType } from "../../../../../../../constants";
import { ActionsWrapper, ActionBtn } from "../SingleSelection/styles";
import { safeReadJson } from "../../../../../../../helpers";

type Props = {
  field: RasaFieldType;
};

function ProductDescriptionSave({ field: { options } }: Props) {
  const {
    sendMessageHandler,
    isLastMessage,
    prevMessage,
    toggleProductDescriptionSave,
    message,
  } = useRasaMessageContext();
  const [completed, setCompleted] = useState(isLastMessage);

  const handleClick = ({ payload, title }) => {
    if (title.toLowerCase().includes("thanks")) {
      const descriptionData =
        safeReadJson(prevMessage.actions, [{}])[0]?.body || "N/A";
      toggleProductDescriptionSave &&
        toggleProductDescriptionSave(descriptionData);
    }

    sendMessageHandler &&
      sendMessageHandler({
        message: title,
        metadata: { payload, updateId: message.id },
        addToRedux: true,
      });
    setCompleted(true);
  };
  return completed ? null : (
    <ActionsWrapper>
      {safeReadJson(options as string, [])?.map((item) => {
        return (
          <ActionBtn
            key={item.title}
            value={item.payload}
            onClick={() => handleClick(item)}
          >
            {item.title}
          </ActionBtn>
        );
      })}
    </ActionsWrapper>
  );
}

export default ProductDescriptionSave;
