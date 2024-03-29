import React, { lazy, memo } from 'react'
import { ContextType, Provider as MessageProvider } from './contexts'

/**
 * Spring builder
 */
const SpringBuilderComponentsSwitcher = lazy(() => import('./integrations/spring-builder'))

interface Props extends ContextType {}

function IntegrationWrapper (props: Props) {
  let Component = <div>This form type is not implemented yet! Please add your custom components on <a href="https://github.com/hoory-com/chat-integrations" target="_blank" rel="noreferrer">our public integrations repository</a>.</div>

  switch (props.field.custom_provider) {
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
    case 'SPRING_BUILDER':
      Component = <SpringBuilderComponentsSwitcher />
  }

  return <MessageProvider value={props}>
    {Component}
  </MessageProvider>
}

export const CustomFieldRenderer = memo(IntegrationWrapper)
