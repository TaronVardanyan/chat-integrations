import styled from 'styled-components'
import { ifProp } from 'styled-components-helpers'
import { Skeleton } from 'antd'

export const StyledClickBlocker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`

export const StyledWidgetWrapper = styled.div<{ $isDisabled?: boolean; $isInWidget?: boolean }>`
  width: calc(100vw - 99px);
  font-family: geomanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji' !important;
  
  max-width: 500px;
  border-radius: 13px;
  overflow: hidden;
  background: #fff;
  
  ${ifProp(
    '$isInWidget',
    `
    margin-right: auto;
    `,
    `
    margin-left: auto;
    `
  )}

  ${ifProp(
    '$isDisabled',
    `
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    cursor: not-allowed;
    `
  )}
  
  // Custom specific style to overwrite SP widget
  .searchBar-wrapper--result {
    border-radius: 9px;
  }
  .market-collapse > div:nth-child(2) {
    display: none;
  }
  .betslipContainer {
    box-shadow: none !important;
  }
  .internalLoadingBlock {
    position: relative !important;
  }
`

export const StyledLoadingSkeleton = styled(Skeleton)`
  height: 200px;
  width: 100%;
`
