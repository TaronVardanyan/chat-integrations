import React, { memo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 as uuid } from 'uuid'
import BettingWidget, { SelectCallback } from './BettingWidget'
import { useMessageContext } from '../../contexts'
import { BetFlowData, SpringBuilderWidgetType, FieldType, WidgetConfig } from './types'
import { StyledSkipButton, StyledSkipButtonWrapper } from './styles'
import { useFormSlots } from '../../hooks'

function BetFlowMessage () {
  const {
    isInWidget,
    sendMessageHandler,
    isLastMessage,
    field
  } = useMessageContext()
  const widgetKey = useRef(uuid())

  const { t } = useTranslation('ui')
  const messageData = useFormSlots() as BetFlowData
  const currentFieldType = field?.custom_type as FieldType
  console.log({
    isLastMessage,
    key: widgetKey.current
  })

  const tempWidgetConfig: WidgetConfig = {}

  let widgetType: SpringBuilderWidgetType = ''
  switch (currentFieldType) {
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
    case 'PAYMENT_AMOUNT':
      tempWidgetConfig.isDeposit = true
      widgetType = 'HooryPaymentAmount'
      break
    case 'PAYMENT_LIST':
      tempWidgetConfig.actionType = 'deposit'
      widgetType = 'HooryPaymentList'
      break
    case 'PAYMENT_VIEW':
      tempWidgetConfig.actionType = 'deposit'
      tempWidgetConfig.amount = messageData.payment_amount.data
      tempWidgetConfig.paymentId = messageData.payment_list.paymentId
      widgetType = 'HooryPaymentView'
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
      currentFieldType === 'CONFIRMATION_DETAILS' ||
      currentFieldType === 'BET_PLACE'
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
    } else if (currentFieldType === 'SIGNIN') {
      if (optionData.status === 'success') {
        messageToSend = 'BET_PLACE'
      } else {
        messageToSend = '/error'
      }
    } else if (currentFieldType === 'PAYMENT_AMOUNT') {
      switch (optionData.status) {
        case 'unauthorized':
          messageToSend = 'SIGNIN'
          break
        case 'cancel':
          messageToSend = '/restart'
          break
      }
    } else if (currentFieldType === 'PAYMENT_LIST') {
      switch (optionData.payStatus) {
        case 'success':
          messageToSend = 'Success'
          break
        case 'cancel':
          messageToSend = '/restart'
          break
      }
    } else if (currentFieldType === 'PAYMENT_VIEW') {
      if (optionData.payStatus === 'success' || optionData.status === 'success') {
        messageToSend = 'Success'
      } else if (optionData.status === 'cancel') {
        messageToSend = '/restart'
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
        isDisabled={isLastMessage}
        widgetConfig={tempWidgetConfig}
        widgetType={widgetType}
        onSelect={handleSelectBetOption}
        widgetKey={widgetKey.current}
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

export default memo(BetFlowMessage)
