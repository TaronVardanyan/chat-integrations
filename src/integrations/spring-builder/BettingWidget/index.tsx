import React, { useEffect, useState, memo } from 'react'
import { FILES_PATH } from './constants'
import { ConfirmStepData, MarketStepData, TeamStepData, WidgetConfig } from '../types'
import {
  StyledWidgetWrapper,
  StyledClickBlocker,
  StyledLoadingSkeleton
} from './styles'

export type SelectCallback = TeamStepData & MarketStepData & ConfirmStepData;

type Props = {
  widgetType?: string;
  onSelect: (data: SelectCallback) => void;
  isDisabled?: boolean;
  isInWidget?: boolean;
  widgetConfig?: WidgetConfig;
  widgetKey?: string;
};

function BettingWidget ({
  widgetType,
  onSelect,
  widgetConfig,
  isDisabled,
  isInWidget,
  widgetKey
}: Props) {
  const [isLoaded, setIsLoaded] = useState(Boolean(document.getElementById('SP_WIDGET_JS_FILE')))
  const tempConfig: WidgetConfig = { ...widgetConfig }
  if (onSelect) {
    const callbackFnName = `hoorySuccessCallback_${widgetKey}`
    window[callbackFnName] = (data: TeamStepData & MarketStepData & ConfirmStepData) => {
      onSelect(data)
      delete window[callbackFnName]
    }
    tempConfig.hasCallback = true
    tempConfig.callbackName = callbackFnName
  }

  useEffect(() => {
    if (!isLoaded) {
      const mainScript = document.createElement('script')
      const runTimeScript = document.createElement('script')
      const styledRef = document.createElement('link')
      mainScript.id = 'SP_WIDGET_JS_FILE'
      mainScript.src = `${FILES_PATH}/js/main.chunk.js?widgetKey=${widgetKey}`
      runTimeScript.src = `${FILES_PATH}/js/runtime-main.js?widgetKey=${widgetKey}`
      styledRef.href = `${FILES_PATH}/css/main.chunk.css?widgetKey=${widgetKey}`
      styledRef.rel = 'stylesheet'
      styledRef.type = 'text/css'
      document.body.appendChild(mainScript)
      document.body.appendChild(runTimeScript)
      document.body.appendChild(styledRef)

      mainScript.onload = function () {
        setIsLoaded(true);
        (window as any).initHooryWidgets()
      }
    } else {
      (window as any).initHooryWidgets()
    }
  }, [isLoaded])

  return (
    <StyledWidgetWrapper $isDisabled={isDisabled} $isInWidget={isInWidget}>
      <div
        data-widget={widgetType}
        data-configs={JSON.stringify(tempConfig)}
        data-loaded="false"
      />
      {isDisabled && <StyledClickBlocker />}
      {!isLoaded && <StyledLoadingSkeleton />}
    </StyledWidgetWrapper>
  )
}

export default memo(BettingWidget)
