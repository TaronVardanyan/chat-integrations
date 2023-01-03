import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BettingWidget, { WidgetConfig, SelectCallback } from './BettingWidget'
import { useMessageContext } from '../../contexts'
import { BetFlowData } from './types'
import { StyledSkipButton, StyledSkipButtonWrapper } from './styles'

function BetFlowMessage () {
  const {
    message,
    isInWidget,
    sendMessageHandler,
    isLastMessage,
    field
  } = useMessageContext()
  const { t } = useTranslation('ui')
  const [messageData] = useState<BetFlowData>(
    message?.metadata as BetFlowData || {
      teamName: '',
      sport: '',
      sportAlias: '',
      game: '',
      competition: '',
      opponentTeam: '',
      market: '',
      subMarket: '',
      event: '',
      eventBase: '',
      confirmDetails: '',
      amount: '',
      gameRegion: '',
      gameId: '',
      competitionId: '',
      eventId: '',
      marketId: ''
    }
  )
  const betFlow = (message as any).formFlow
  const tempWidgetConfig: WidgetConfig = {}

  let widgetType = 'GameList'
  switch (field?.type) {
    case 'ASK_SPORT':
    case 'ASK_GAME':
    case 'ASK_COMPETITION':
      if (messageData.competitionId) {
        widgetType = 'HooryGameList'
        tempWidgetConfig.competitionIds = messageData.competitionId
      } else {
        widgetType = 'HoorySearch'
        tempWidgetConfig.initialValue = messageData.teamName
      }
      break
    case 'ASK_MARKET':
    case 'ASK_MARKET_GROUP':
    case 'ASK_MARKET_NAME':
      widgetType = 'HoorySingleGame'
      tempWidgetConfig.sport = messageData.sportAlias
      tempWidgetConfig.region = messageData.gameRegion
      tempWidgetConfig.competition = messageData.competitionId
      tempWidgetConfig.game = messageData.gameId
      break
    case 'ASK_CONFIRM_DETAILS':
      widgetType = 'HooryBetslip'
      tempWidgetConfig.initialAmount = parseInt(
        (messageData.amount || '').replace(/[^0-9]/g, ''),
        10
      )
      tempWidgetConfig.marketId = parseInt(messageData.marketId, 10)
      tempWidgetConfig.eventId = parseInt(messageData.eventId, 10)
      tempWidgetConfig.gameId = parseInt(messageData.gameId, 10)
      tempWidgetConfig.competitionId = parseInt(messageData.competitionId, 10)

      break
    case 'ASK_LOGIN':
      widgetType = 'HooryAccount'
      break
    case 'SHOW_BALANCE':
      widgetType = 'HooryBalance'
      break
  }

  const handleSelectBetOption = (optionData: SelectCallback) => {
    const metadata: Record<string, any> = {}
    let messageToSend = 'N/A'

    switch (betFlow?.step) {
      case 'ask_sport':
      case 'ask_game':
      case 'ask_competition':
        // eslint-disable-next-line no-case-declarations
        const teamNames = (optionData.name || '').split(' vs ')
        messageToSend = optionData.name || ''
        metadata.sport = optionData.sportType
        metadata.sportAlias = optionData.sportTypeAlias
        metadata.teamName = teamNames[0] || ''
        metadata.opponentTeam = teamNames[1] || ''
        metadata.competition = optionData.competitionName
        metadata.competitionId = optionData.competitionId
        metadata.game = optionData.name
        metadata.gameDate = optionData.gameDate
        metadata.gameId = optionData.gameId
        metadata.region = optionData.region
        break
      case 'ask_market':
      case 'ask_market_group':
      case 'ask_market_name':
        messageToSend = `${optionData.marketName || ''} - ${optionData.eventName || ''}`
        metadata.market = optionData.marketGroupName
        metadata.subMarket = optionData.marketName
        metadata.marketGroupId = optionData.marketGroupId
        metadata.event = optionData.eventName
        metadata.marketId = optionData.marketId
        metadata.eventId = optionData.eventId

        break
      case 'ask_confirm_details':
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

        break
      case 'ask_login':
        if (optionData.status === 'success') {
          messageToSend = 'Signed in successfully!'
          metadata.authToken = optionData.auth_token
          metadata.email = optionData.email
          metadata.firstName = optionData.first_name
          metadata.lastName = optionData.last_name
          metadata.userId = optionData.user_id
          metadata.username = optionData.username
        } else {
          messageToSend = 'Cancel'
        }
        break
    }

    // setMessageItem({
    //   ...messageData,
    //   ...newMessageData
    // });

    // eslint-disable-next-line no-console
    console.log('Widget optionData::::', optionData, '... We sent:', messageToSend, metadata)
    sendMessageHandler && sendMessageHandler({
      message: messageToSend,
      metadata
    })
  }

  const handleSkipButtonClick = () => {
    sendMessageHandler && sendMessageHandler({
      message: 'Cancel',
      metadata: {}
    })
  }

  const showCancelButton = true
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
        isDisabled={!isLastMessage}
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
