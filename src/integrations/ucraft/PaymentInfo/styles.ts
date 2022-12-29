import styled from "styled-components";
import { theme } from "styled-components-helpers";

export const StyledPaymentDiv = styled.div`
  display: flex;
  flex-direction: column;

  padding: 12px 10px;
  margin-bottom: 12px;
  margin-top: 16px;

  height: 64px;

  background: ${theme("whitePearl")};
  box-shadow: 0px 1px 2px ${theme("inputWidgetShadow")};
  border-radius: 8px;

  && span {
    height: 20px;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    color: ${theme("widgetColor")};
  }
`;

export const StyledSpan = styled.span`
  height: 16px;

  font-size: 12px;
  line-height: 16px;

  opacity: 0.4;
`;
