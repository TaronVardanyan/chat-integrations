export const AUTH_TOKEN_KEY = "uc_token";
export const SSO_URL = process.env.REACT_APP_UC_SSO_URL || "";
export const UPLOADED_LOGO_BASE64_STORAGE_KEY = "logo_base64";
export const RASA_UPLOAD_COMPLETED = "Upload completed";
export const RASA_NO_LOGO = "Dont have project logo";
export const RASA_SKIP_ABOUT_BUSINESS = "Skip About Business";
export const FIELD_SKIPPED = "FIELD_SKIPPED";
export const ACCOUNTS_URL = process.env.REACT_APP_UC_ACCOUNTS_URL || "";
export const ONBOARDING_URL = process.env.REACT_APP_UC_ONBOARDING_URL || "";
export const TEMPLATE_URL = process.env.REACT_APP_UC_TEMPLATE_URL || "";
export const UC_X_API_KEY = process.env.REACT_APP_UC_X_API_KEY || "";

export const PROJECT_URL = process.env.REACT_APP_UC_SSO_PROJECT_URL || "";
export const defaultProjectName = "project-name";
export const ANOTHER_TEMPLATE = "anotherTemplate";

export enum ChatPagePostMessage {
  SET_LOCAL_STORAGE = "SET_LOCAL_STORAGE",
  HIDE_LIVE_CHAT = "HIDE_LIVE_CHAT",
  SHOW_LIVE_CHAT = "SHOW_LIVE_CHAT",
  SIGN_IN = "SIGN_IN",
  SEND_PROJECT_DATA = "SEND_PROJECT_DATA",
  OPEN_SIGN_IN_MODAL = "OPEN_SIGN_IN_MODAL",
  TOGGLE_TEMPLATE_MODAL = "TOGGLE_TEMPLATE_MODAL",
  SET_TEMPLATE_ID = "SET_TEMPLATE_ID",
  OPEN_AI_TEMPLATE_BY_ID_MODAL = "OPEN_AI_TEMPLATE_BY_ID_MODAL",
  OPEN_AI_TEMPLATE_MODAL = "OPEN_AI_TEMPLATE_MODAL",
  SET_AI_TEMPLATE_ID = "SET_AI_TEMPLATE_ID",
  SET_AI_TEMPLATE_RANDOM_ID = "SET_AI_TEMPLATE_RANDOM_ID",
  OPEN_PAYMENT_MODAL = "OPEN_PAYMENT_MODAL",
  PAYMENT_DATA = "PAYMENT_DATA",
  PRODUCT_DESCRIPTION_SAVE = "PRODUCT_DESCRIPTION_SAVE",
  CHILD_READY = "CHILD_READY",
}

export const unAuthCategories = [
  "Unauthenticated.",
  "authorization",
  "authentication",
];