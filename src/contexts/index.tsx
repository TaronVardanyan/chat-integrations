import { createContext, useContext } from 'react'
import { User, RasaSockedMessage, MessageResponse, RasaFieldType, RasaMessageType } from '../constants/GeneralTypes'

export type ContextType = {
  isInWidget?: boolean;
  prevMessage: MessageResponse;
  createdBy: User;
  message: RasaSockedMessage;
  isInIframe?: boolean;
  isLastMessage: boolean;
  isDarkTheme?: boolean;
  pageWidth?: number;
  color: string;
  avatar: string;
  createdAt: string;
  name: string;
  workspaceId: string;
  sendMessageHandler?: (data: {
    message: string;
    updateActionsBody?: string;
    metadata?: Record<string, any>;
    addToRedux?: boolean;
    sendContactSupport?: boolean;
    changeLastMessage?: boolean;
    isLastField?: boolean;
  }) => void;
  visitor?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    hasRealFirstName: boolean;
    hasRealLastName: boolean;
  };
  handleToggleImagePreviewer?: (
    images: { url: string }[],
    index: number
  ) => void;
  togglePostMessage?: (
    type: string,
    data: Record<string, any>
  ) => void;
  field: RasaFieldType;
  messageType: RasaMessageType;
};

export const MessageContext = createContext<ContextType>({
  isInWidget: true,
  isLastMessage: true,
  isDarkTheme: true,
  prevMessage: {} as MessageResponse,
  createdBy: {} as User,
  message: {} as RasaSockedMessage,
  field: {} as RasaFieldType,
  messageType: RasaMessageType.ANSWER,
  color: '',
  createdAt: '',
  avatar: '',
  name: '',
  workspaceId: '',
  sendMessageHandler: (_) => undefined
})

export const { Provider } = MessageContext
export const useMessageContext = () => {
  return useContext(MessageContext)
}
