import React from 'react'
import { useTranslation } from 'react-i18next'
import BettingWidget, { WidgetConfig, SelectCallback } from './BettingWidget'
import { useMessageContext } from '../../contexts'
import { BetFlowData } from './types'
import { StyledSkipButton, StyledSkipButtonWrapper } from './styles'
import { useFormSlots } from '../../hooks'

function BetFlowMessage () {
  const {
    message,
    isInWidget,
    sendMessageHandler,
    isLastMessage,
    field
  } = useMessageContext()

  const { t } = useTranslation('ui')
  const messageData = useFormSlots() as BetFlowData
  console.log('========form fields', message.form?.fields, 'messageData:::', messageData, {
    isLastMessage
  })

  const tempWidgetConfig: WidgetConfig = {}

  let widgetType = 'GameList'
  switch (field?.custom_type) {
    case 'COMPETITION':
      if (messageData.competitionId) {
        widgetType = 'HooryGameList'
        tempWidgetConfig.competitionIds = messageData.competitionId
      } else {
        widgetType = 'HoorySearch'
        tempWidgetConfig.initialValue = messageData.team_name
      }
      break
    case 'MARKET':
      widgetType = 'HoorySingleGame'
      tempWidgetConfig.sport = messageData.competition.sportTypeAlias
      tempWidgetConfig.region = messageData.competition.region
      tempWidgetConfig.competition = messageData.competition.competitionId + ''
      tempWidgetConfig.game = messageData.competition.gameId + ''
      break
    case 'CONFIRMATION_DETAILS':
      widgetType = 'HooryBetslip'
      tempWidgetConfig.initialAmount = parseInt(
        (messageData.amount || '').replace(/[^0-9]/g, ''),
        10
      ) || 0
      tempWidgetConfig.marketId = messageData.market.marketId
      tempWidgetConfig.eventId = messageData.market.eventId
      tempWidgetConfig.gameId = messageData.market.gameId
      tempWidgetConfig.competitionId = messageData.market.competitionId

      break
    case 'LOGIN':
      widgetType = 'HooryAccount'
      break
    case 'SHOW_BALANCE':
      widgetType = 'HooryBalance'
      break
  }

  /**
   * Generate and send message
   * @param optionData
   */
  const handleSelectBetOption = (optionData: SelectCallback) => {
    const metadata: Record<string, any> = {}
    let messageToSend = 'N/A'
    messageToSend = JSON.stringify(optionData)

    if (field?.custom_type === 'CONFIRMATION_DETAILS') {
      switch (optionData.status) {
        case 'success':
          messageToSend = 'Place a bet'
          metadata.messageTextAlias = 'Yes'
          break
        case 'cancel':
          messageToSend = 'Cancel'
          metadata.messageTextAlias = 'No'
          break
        case 'unauthorized':
          messageToSend = 'Sign in and bet'
          break
        case 'error':
          messageToSend = 'Place a bet'
          metadata.messageTextAlias = 'Yes'
          metadata.error = optionData.message || 'unknown'
          break
      }
    }
    // switch (field?.custom_type) {
    //   case 'COMPETITION':
    //     // eslint-disable-next-line no-case-declarations
    //     const teamNames = (optionData.name || '').split(' vs ')
    //     messageToSend = optionData.name || ''
    //     metadata.sport = optionData.sportType
    //     metadata.sportAlias = optionData.sportTypeAlias
    //     metadata.teamName = teamNames[0] || ''
    //     metadata.opponentTeam = teamNames[1] || ''
    //     metadata.competition = optionData.competitionName
    //     metadata.competitionId = optionData.competitionId
    //     metadata.game = optionData.name
    //     metadata.gameDate = optionData.gameDate
    //     metadata.gameId = optionData.gameId
    //     metadata.region = optionData.region
    //     break
    //   case 'MARKET':
    //     messageToSend = `${optionData.marketName || ''} - ${optionData.eventName || ''}`
    //     metadata.market = optionData.marketGroupName
    //     metadata.subMarket = optionData.marketName
    //     metadata.marketGroupId = optionData.marketGroupId
    //     metadata.event = optionData.eventName
    //     metadata.marketId = optionData.marketId
    //     metadata.eventId = optionData.eventId
    //
    //     break
    //   case 'CONFIRM_DETAILS':
    //     switch (optionData.status) {
    //       case 'success':
    //         messageToSend = 'Place a bet'
    //         metadata.messageTextAlias = 'Yes'
    //         break
    //       case 'cancel':
    //         messageToSend = 'Cancel'
    //         metadata.messageTextAlias = 'No'
    //         break
    //       case 'unauthorized':
    //         messageToSend = 'Sign in and bet'
    //         break
    //       case 'error':
    //         messageToSend = 'Place a bet'
    //         metadata.messageTextAlias = 'Yes'
    //         metadata.error = optionData.message || 'unknown'
    //         break
    //     }
    //
    //     break
    //   case 'LOGIN':
    //     if (optionData.status === 'success') {
    //       messageToSend = 'Signed in successfully!'
    //       metadata.authToken = optionData.auth_token
    //       metadata.email = optionData.email
    //       metadata.firstName = optionData.first_name
    //       metadata.lastName = optionData.last_name
    //       metadata.userId = optionData.user_id
    //       metadata.username = optionData.username
    //     } else {
    //       messageToSend = 'Cancel'
    //     }
    //     break
    // }

    // eslint-disable-next-line no-console
    console.log('Widget optionData::::', optionData, '... We sent:', messageToSend, metadata, '====', sendMessageHandler)
    sendMessageHandler && sendMessageHandler({
      message: messageToSend,
      addToRedux: false
    })
  }

  const handleSkipButtonClick = () => {
    sendMessageHandler && sendMessageHandler({
      message: 'Cancel'
    })
  }

  const showCancelButton = false
  // !isDisabled &&
  // isLastMessage &&
  // [
  //   'ask_sport',
  //   'ask_game',
  //   'ask_competition',
  //   'ask_market',
  //   'ask_market_group',
  //   'ask_market_name'
  // ].includes(betFlow?.step || '')

  return (
    <>
      <BettingWidget
        isInWidget={isInWidget}
        // isDisabled={isDisabled || !isLastMessage}
        // isDisabled={!isLastMessage}
        widgetConfig={tempWidgetConfig}
        widgetType={widgetType}
        onSelect={handleSelectBetOption}
      />

      {showCancelButton && (
        <StyledSkipButtonWrapper key="StyledSkipButtonWrapper">
          <StyledSkipButton onClick={handleSkipButtonClick}>
            {t('messages.contactAndChat')}
          </StyledSkipButton>
        </StyledSkipButtonWrapper>
      )}
    </>
  )
}

export default BetFlowMessage
