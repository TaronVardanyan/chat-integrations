import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { FILES_PATH } from './constants'
import {
  StyledWidgetWrapper,
  StyledClickBlocker,
  StyledLoadingSkeleton
} from './styles'

export type SelectCallback = {
  chosenId: number;
  chosenText: string;
  action?: string;
  sportType?: string;
  sportTypeAlias?: string;
  region?: string;
  competitionName?: string;
  name?: string;
  gameDate?: number;
  gameId?: number;
  competitionId?: number;
  marketGroupId?: string;
  marketGroupName?: string;
  marketName?: string;
  eventName?: string;
  marketId?: number;
  eventId?: number;
  status?: 'success' | 'error' | 'unauthorized' | 'cancel';
  auth_token?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_id?: string;
  username?: string;
  coeficient?: string;
  message?: string;
};
export type WidgetConfig = {
  categoryIds?: string;
  competitionIds?: string;
  moduleId?: number;
  fit?: string;
  hasCallback?: boolean;
  callbackName?: string;
  gameIds?: string;
  type?: string;
  category?: string;
  initialValue?: string;
  limit?: number;
  sport?: string;
  region?: string;
  competition?: string;
  game?: string;
  marketId?: number;
  gameId?: number;
  competitionId?: number;
  initialAmount?: number;
  eventId?: number;
};

type Props = {
  widgetType?: string;
  onSelect: (data: SelectCallback) => void;
  isDisabled?: boolean;
  isInWidget?: boolean;
  widgetConfig?: WidgetConfig;
};

function BettingWidget ({
  widgetType,
  onSelect,
  widgetConfig,
  isDisabled,
  isInWidget
}: Props) {
  const isBettingScriptsLoaded = localStorage.getItem('isBettingScriptsLoaded') || ''
  const [isLoaded, setIsLoaded] = useState(!!isBettingScriptsLoaded)
  const tempConfig: WidgetConfig = { ...widgetConfig }
  if (onSelect) {
    const callbackFnName = `hoorySuccessCallback_${uuid()}`;
    (window as any)[callbackFnName] = onSelect
    tempConfig.hasCallback = true
    tempConfig.callbackName = callbackFnName
  }

  useEffect(() => {
    if (!isLoaded) {
      const mainScript = document.createElement('script')
      const runTimeScript = document.createElement('script')
      const styledRef = document.createElement('link')
      const key = uuid()
      mainScript.src = `${FILES_PATH}/js/main.chunk.js?key=${key}`
      runTimeScript.src = `${FILES_PATH}/js/runtime-main.js?key=${key}`
      styledRef.href = `${FILES_PATH}/css/main.chunk.css?key=${key}`
      styledRef.rel = 'stylesheet'
      styledRef.type = 'text/css'
      document.body.appendChild(mainScript)
      document.body.appendChild(runTimeScript)
      document.body.appendChild(styledRef)

      mainScript.onload = function () {
        localStorage.setItem('isBettingScriptsLoaded', '1')
        setIsLoaded(true);
        (window as any).initHooryWidgets()
      }
    } else {
      (window as any).initHooryWidgets()
    }
  }, [])

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

export default BettingWidget
