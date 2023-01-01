import React, { lazy, useMemo } from 'react'
import { Provider as MessageProvider } from './contexts'
import { MessageResponse, RasaFieldType, RasaMessageType, RasaSockedMessage, User } from './constants/GeneralTypes'

/**
 * Ucraft
 */
// const UCProjectName = lazy(() => import("./integrations/ucraft/ProjectName"));
// const UCProjectUrl = lazy(() => import("./integrations/ucraft/ProjectUrl"));
// const UCUserEmail = lazy(() => import("./integrations/ucraft/UserEmail"));
// const UCLogoUploader = lazy(() => import("./integrations/ucraft/LogoUploader"));
// const UCPaymentInfo = lazy(() => import("./integrations/ucraft/PaymentInfo"));
// const UCWebsiteDesign = lazy(() => import("./integrations/ucraft/WebsiteDesign"));
// const UCLikedWebsite = lazy(() => import("./integrations/ucraft/LikedWebsite"));
// const UCMultiSelection = lazy(() => import("./integrations/ucraft/MultiSelection"));
// const UCDesignTemplate = lazy(() => import("./integrations/ucraft/DesignTemplate"));

/**
 * Spring builder
 */
const SpringBuilderComponentsSwitcher = lazy(() => import('./integrations/spring-builder'))

type Props = {
  field: Record<any, any>
};

export function CustomFieldRenderer ({ field }: Props) {
  const Component = useMemo(() => {
    switch (field.type) {
      /**
       * Ucraft
       */
      // case 'UCRAFT_LIKED_WEBSITE':
      //   return <UCLikedWebsite />;
      // case 'UCRAFT_PROJECT_NAME':
      //   return <UCProjectName />;
      // case 'UCRAFT_BILLING':
      //   return <UCPaymentInfo />;
      // case 'UCRAFT_DESIGN_TEMPLATE':
      //   return <UCDesignTemplate />;
      // case 'UCRAFT_WEBSITE_DESIGN':
      //   return <UCWebsiteDesign />;
      // case 'UCRAFT_WEBSITE_URL':
      //   return <UCMultiSelection />;
      // case 'UCRAFT_PROJECT_LOGO':
      //   return <UCLogoUploader />;
      // case 'UCRAFT_PROJECT_URL':
      //   return <UCProjectUrl />;
      // case 'UCRAFT_EMAIL':
      //   return <UCUserEmail />;

      /**
       * Spring builder
       */
      case 'ASK_TEAM':
      case 'ASK_SPORT':
      case 'ASK_GAME':
      case 'ASK_COMPETITION':
      case 'ASK_MARKET':
      case 'ASK_MARKET_GROUP':
      case 'ASK_MARKET_NAME':
      case 'ASK_CONFIRM_DETAILS':
      case 'ASK_LOGIN':
      case 'SHOW_BALANCE':
        return <SpringBuilderComponentsSwitcher />
      default:
        return <div>This form type is not implemented</div>
    }
  }, [field.type])

  return <MessageProvider value={{
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
  }}>
  {Component}
  </MessageProvider>
}
