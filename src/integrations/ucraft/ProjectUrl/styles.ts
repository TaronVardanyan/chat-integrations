import styled from "styled-components";
import { Typography } from "antd";
import { theme } from "styled-components-helpers";

const { Paragraph } = Typography;

export const UrlContent = styled.div`
  display: flex;
`;

export const DomainName = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${theme("widgetColor")};
`;

export const ProjectUrlWrapper = styled(Paragraph)`
  && {
    max-width: 220px;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
    color: ${theme("widgetColor")};
  }
`;
