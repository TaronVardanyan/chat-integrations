import { FC } from "react";
import styled from "styled-components";
import { ButtonProps } from "antd/lib/button";
import { Button } from "antd";
import { ifProp, prop, theme, makeRgbaFromProp } from "styled-components-helpers";

interface BtnProps {
  $width: string;
  $color: string;
  $isPrimary: boolean;
  $isClicked: boolean;
  $isDarkTheme: boolean;
}

export const FormButtonWrapper: FC<ButtonProps | BtnProps> = styled(Button)<{
  $width: string;
  $color: string;
  $isPrimary: boolean;
  $isClicked: boolean;
  $isDarkTheme: boolean;
}>`
  && {
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    border-radius: 8px;
    color: ${ifProp(
      { $AND: ["$isDarkTheme", "$isPrimary"] },
      theme("whitePearl"),
      theme("widgetColor")
    )};
    background-color: ${ifProp(
      "$isPrimary",
      prop("$color"),
      theme("whitePearl")
    )};
    box-shadow: 0 1px 2px ${theme("inputWidgetShadow")};
    border: 1px solid
      ${ifProp("$isPrimary", prop("$color"), theme("whitePearl"))};
  }

  &&:hover,
  &&:focus,
  &&:active {
    color: ${ifProp(
      { $AND: ["$isDarkTheme", "$isPrimary"] },
      theme("whitePearl"),
      theme("widgetColor")
    )};
    background-color: ${ifProp(
      "$isPrimary",
      makeRgbaFromProp("$color", 0.9),
      theme("whitePowder")
    )};
    box-shadow: 0 1px ${theme("inputWidgetShadow")};
    border: 1px solid
      ${ifProp(
        "$isPrimary",
        makeRgbaFromProp("$color", 0.9),
        theme("whitePowder")
      )};
  }

  &&:disabled,
  &&:disabled:hover {
    background-color: ${ifProp(
      "$isPrimary",
      prop("$color"),
      theme("whitePearl")
    )};
    opacity: 0.4;
    border: none;
    color: ${ifProp(
      { $AND: ["$isDarkTheme", "$isPrimary"] },
      theme("whitePearl"),
      theme("widgetColor")
    )};
  }
`;
