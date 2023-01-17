import React from 'react'
import { useTranslation } from 'react-i18next'
import BettingWidget, { WidgetConfig, SelectCallback } from './BettingWidget'
import { useMessageContext } from '../../contexts'
import { BetFlowData } from './types'
import { StyledSkipButton, StyledSkipButtonWrapper } from './styles'
import { useFormSlots } from '../../hooks'

function BetFlowMessage () {
  const {
    isInWidget,
    sendMessageHandler,
    isLastMessage,
    field
  } = useMessageContext()

  const { t } = useTranslation('ui')
  const messageData = useFormSlots() as BetFlowData
  console.log({
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
    case 'BET_PLACE':
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
    case 'SIGNIN':
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
    let messageToSend = ''
    messageToSend = JSON.stringify(optionData)

    if (
      field?.custom_type === 'CONFIRMATION_DETAILS' ||
      field?.custom_type === 'BET_PLACE'
    ) {
      switch (optionData.status) {
        case 'success':
          messageToSend = 'success'
          break
        case 'cancel':
          messageToSend = '/restart'
          break
        case 'unauthorized':
          messageToSend = 'SIGNIN'
          break
        case 'error':
          // messageToSend = '/error'
          // metadata.error = optionData.message || 'unknown'
          break
      }
    } else if (field?.custom_type === 'SIGNIN') {
      if (optionData.status === 'success') {
        messageToSend = 'BET_PLACE'
      } else {
        messageToSend = '/error'
      }
    }

    if (!messageToSend) return

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
