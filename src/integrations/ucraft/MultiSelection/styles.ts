import styled from "styled-components";
import { FC } from "react";
import { Button } from "antd";
import { ButtonProps } from "antd/lib/button";
import { makeRgbaFromTheme, theme, ifProp } from "styled-components-helpers";

export const ActionsWrapper = styled.div`
  &&& {
    display: flex;
    flex-wrap: wrap;
    max-width: 350px;
    background-color: transparent;
    box-shadow: none;
    margin-top: 20px;
  }
`;

export const ButtonsWrapper = styled.div`
  margin-top: 4px;
  width: 100%;
`;

export const ActionBtn: FC<
  ButtonProps & { $isSelectedOption?: boolean }
> = styled(Button)<{
  $isSelectedOption?: boolean;
  disabled: boolean;
}>`
  &&& {
    display: flex;
    align-items: center;
    margin: 0 8px 8px 0;
    padding: 8px 20px;
    height: 36px;
    border: none;
    color: ${ifProp("$isSelectedOption", theme("light"), theme("black"))};
    background-color: ${ifProp(
      "$isSelectedOption",
      makeRgbaFromTheme("widgetColor", 0.4),
      theme("light")
    )};
    border-radius: 32px;
    box-shadow: 0 0 2px ${makeRgbaFromTheme("black", 0.08)},
      0 2px 24px ${makeRgbaFromTheme("black", 0.08)};
    pointer-events: ${ifProp("disabled", "none")};

    &&:hover {
      color: ${ifProp("$isSelectedOption", theme("light"), theme("black"))};
      background-color: ${({ theme, $isSelectedOption, disabled }) => {
        if ($isSelectedOption) return makeRgbaFromTheme("widgetColor", 0.4);
        else {
          if (disabled) return theme.light;
          else return theme.whitePowder;
        }
      }};

      &&& > span {
        color: ${ifProp("$isSelectedOption", theme("light"), theme("black"))};
      }
    }
  }
`;
