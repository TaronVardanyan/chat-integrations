export type User  = {
  id: string,
  firstName: string,
  lastName: string,
  avatar: string,
  city: string,
  country: string,
  locationTime: string,
  type: number,
  email: string,
  phone: string,
  agreement: boolean,
  status: string,
  sidebarOrderList: Array<Record<string, any>>,
  rolesList: Array<string>,
  hasRealFirstName: boolean,
  hasRealLastName: boolean,
  isDeleted: boolean,
  isBlocked: boolean,
  emailSubscription: boolean,
  firstSeen: string,
  lastSeen: string,
  hasPassword: boolean,
};

export enum RasaMessageType {
  ANSWER = "ANSWER",
  FORM = "FORM",
  BUTTON = "BUTTON",
  DELAY = "DELAY",
  FORM_CS = "FORM_CS",
}

enum ButtonType {
  ConnectToSupport = "CONNECT_TO_SUPPORT",
  Url = "URL",
}

export const RasaOptionsValues = {
  [ButtonType.Url]: "",
  [ButtonType.ConnectToSupport]: "/trigger_handoff",
};

export type RasaOptions = {
  title: string;
  type: ButtonType;
  payload: string;
};

enum AttachmentType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
}

type Attachment = {
  type: AttachmentType;
  payload: { type: string; src: string };
};

type fieldMetadataType = {
  isLastField: boolean;
};

export type RasaFieldType = {
  type: Record<string, string>;
  question: string;
  placeholder?: string;
  fieldMetadata: fieldMetadataType;
  options?: RasaOptions[] | string;
  field_metadata?: Record<string, any>;
  value: string;
  required: boolean;
};

export type RasaSockedMessage = {
  id: string;
  type: RasaMessageType;
  body?: string;
  draft?: string;
  actions?: RasaOptions[];
  attachments?: Attachment[];
  metadata: Record<string, string>;
  field?: RasaFieldType;
};

export enum MessageType {
  MESSAGE = 0,
  NOTIFICATION = 1,
  INTERNAL_NOTE = 2,
  CONTACT_FORM = 3,
  KNOWLEDGE_BASE = 4,
  GOOGLE = 5,
  WIKIPEDIA = 6,
  CONTACT_FORM_SUBMITTED = 7,
  BET_FLOW = 8,
  RASA_MESSAGE = 9,
}

export type MessageResponse = {
  id: string,
  type: MessageType,
  body: string,
  createdAt: string,
  createdBy?: User,
  notificationType: string,
  paramsList: Array<string>,
  actions: string,
  conversationId: string,
  conversation: string,
  draft: string,
  knowledgeBaseUri: string,
  knowledgeBaseHighlightStart: number,
  knowledgeBaseHighlightEnd: number,
  knowledgeBaseImageUrl: string,
  knowledgeBaseTitle: string,
  googleUrl: string,
  googleSearchText: string,
  disabled: boolean,
  deliveryType: string,
  attachmentsList: Array<Attachment>,
}
