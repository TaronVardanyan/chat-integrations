import styled from 'styled-components'
import { makeRgbaFromTheme, theme } from 'styled-components-helpers'

export const StyledSkipButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  background: ${makeRgbaFromTheme('primary', 0.1)};
  border-radius: 100px;
  color: ${theme('primary')};
  font-size: 12px;
  border: none;
  margin-bottom: 20px;
  cursor: pointer;
`

export const StyledSkipButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -20px;
`
