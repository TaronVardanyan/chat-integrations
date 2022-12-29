import { RasaFieldType, RasaSockedMessage } from "../../constants/GeneralTypes";
import { useRasaMessageContext } from "../../contexts";
import { useCallback } from "react";

export const useUpdateMessages = () => {
  const { message } = useRasaMessageContext();
  const formattedMessage = message as RasaSockedMessage & {
    field: RasaFieldType;
  };

  const updateMessages = useCallback(
    (value: string) => {
      return JSON.stringify([
        {
          ...formattedMessage,
          field: { ...formattedMessage.field, value },
        },
      ]);
    },
    [JSON.stringify(formattedMessage)]
  );

  return { updateMessages };
};
