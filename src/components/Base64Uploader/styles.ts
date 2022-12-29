import { Upload, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FC } from "react";
import styled from "styled-components";
import { ifProp, theme } from "styled-components-helpers";

export const StyledUploadContainer = styled.div<{
  $isSkipped: boolean;
}>`
  && {
    width: 100%;
    height: 112px;

    background: ${theme("whitePearl")};
    box-shadow: 0 1px 2px ${theme("inputWidgetShadow")};
    border-radius: 8px;
    margin-top: 16px;

    display: flex;
    align-items: center;
    flex-direction: column;
  }
  opacity: ${ifProp("$isSkipped", "0.4", "1")};
`;

export const CustomizedUpload: FC<UploadProps> = styled(Upload)`
  && {
    display: flex;
    justify-content: center;
  }

  && .ant-upload-select-picture-card {
    width: 36px;
    height: 36px;
    border-radius: 40px;
    border: none;
    background-color: ${theme("widgetBorder")};
    margin-top: 16px;
    margin-right: 0;
  }

  && .ant-upload-select-picture-card:hover {
    background-color: ${theme("whitePowder")};
  }
`;

export const StyledText = styled.span`
  font-size: 12px;
  opacity: 0.4;
`;

export const StyledPlusIcon = styled(PlusOutlined)`
  && {
    font-size: 16px;
    padding: 10px;
  }
`;

export const StyledErrorMessage = styled.p<{
  $isError: boolean;
}>`
  && {
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 0;

    font-weight: 400;
    font-size: 12px;
    line-height: 16px;

    color: ${theme("redError")};
    visibility: ${ifProp("$isError", "visible", "hidden")};
  }
`;

export const StyledUploadedFilePreview = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10px;
  margin-top: 16px;
  gap: 12px;
  isolation: isolate;

  width: 100%;
  height: 84px;

  background: ${theme("whitePearl")};
  box-shadow: 0 1px 2px ${theme("inputWidgetShadow")};
  border-radius: 8px;

  && img {
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }

  && div {
    display: flex;
    flex-direction: column;

    p {
      margin-bottom: 0;
    }

    span {
      font-size: 12px;
      opacity: 0.4;
    }
  }
`;

export const StyledDeleteAndCheckIcons = styled.div`
  && {
    position: absolute;
    right: 10px;

    background: ${theme("widgetBorder")};
    border-radius: 40px;
  }

  && img {
    width: 28px;
    height: 28px;
    padding: 6px;
  }

  &&:hover {
    cursor: pointer;
    background: ${theme("whitePowder")};
  }
`;
