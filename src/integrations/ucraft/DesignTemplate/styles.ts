import styled from "styled-components";
import { theme } from "styled-components-helpers";

export const TemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const TemplateBlock = styled.div`
  display: flex;
  padding: 12px 10px;
  height: 84px;
  background: ${theme("whitePearl")};
  box-shadow: 0 1px 2px ${theme("inputWidgetShadow")};
  border-radius: 8px;
`;

export const TemplateSkeletonBlock = styled(TemplateBlock)`
  && > div:nth-child(2) {
    margin: 12px 0 0 12px;
  }
`;

export const ImageWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 12px;
  border-radius: 8px;
`;

export const TemplateImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: none;
`;

export const TemplateInfo = styled.div`
  font-weight: 400;
  overflow: hidden;
`;

export const TemplateName = styled.div`
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  color: ${theme("widgetColor")};
  text-overflow: ellipsis;
`;

export const TemplateIndustry = styled.div`
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: ${theme("subTitleGrey")};
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TemplateState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding-left: 4px;
`;

export const ActionBlock = styled.div`
  margin-top: 16px;

  && > button:first-child {
    margin-bottom: 8px;
  }
`;

export const ErrorMessage = styled.span`
  display: inline-block;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-top: 6px;
  color: ${theme("redError")};
`;
