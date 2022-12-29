import React from "react";
import { ButtonProps } from "antd/lib/button";
import { useRasaMessageContext } from "../../contexts";
import { FormButtonWrapper } from "./styles";

interface Props extends ButtonProps {
  isPrimary?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  color: string;
  $isClicked?: boolean;
}

function FormButton({
  children,
  isPrimary = false,
  disabled = false,
  width,
  color,
  ...props
}: Props) {
  const { isDarkTheme } = useRasaMessageContext();
  return (
    <FormButtonWrapper
      $isDarkTheme={isDarkTheme}
      $width={width}
      $color={color}
      $isPrimary={isPrimary}
      disabled={disabled}
      {...props}
    >
      {children}
    </FormButtonWrapper>
  );
}

export default FormButton;
