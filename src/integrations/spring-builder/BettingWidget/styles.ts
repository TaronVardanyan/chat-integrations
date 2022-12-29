import styled from 'styled-components';
import { IFPTT } from '@hoory/helpers/frontend';
import { Skeleton } from 'antd';

export const StyledClickBlocker = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

export const StyledWidgetWrapper = styled.div<{ $isDisabled?: boolean; $isInWidget?: boolean }>`
  width: calc(100% + 24px);
  margin: 0 -12px 18px -12px;
  max-width: 575px;
  font-family: geomanist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji' !important;

  ${IFPTT(
    '$isInWidget',
    `
    margin-right: auto;
    `,
    `
    margin-left: auto;
    `
  )}

  ${IFPTT(
    '$isDisabled',
    `
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
    cursor: not-allowed;
    `
  )}
  
  .market-collapse > div:nth-child(2) {
    display: none;
  }
`;

export const StyledLoadingSkeleton = styled(Skeleton)`
  height: 200px;
  width: 100%;
`;
