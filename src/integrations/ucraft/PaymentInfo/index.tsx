import React from "react";
import { useTranslation } from "react-i18next";
import FormButton from "../../../../../FormButton";
import { useRasaMessageContext } from "../../../context";
import { redirectToDashboard } from "../../../../../../../helpers/ucraftHelpers";
import {
  UPLOADED_LOGO_BASE64_STORAGE_KEY,
  AUTH_TOKEN_KEY,
} from "../../../../../../../helpers/ucraftHelpers/constants";
import { useFormsContext } from "../../FormsContext";
import { StyledPaymentDiv, StyledSpan } from "./styles";

function PaymentInfo() {
  const { t } = useTranslation("ui");
  const { field } = useFormsContext();
  const { sendMessageHandler, color } = useRasaMessageContext();

  function navigateToDashboard() {
    localStorage.removeItem(UPLOADED_LOGO_BASE64_STORAGE_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);

    sendMessageHandler &&
      sendMessageHandler({
        message: "Subscription done",
      });

    window.open(
      redirectToDashboard(field?.field_metadata?.projectId || ""),
      "_blank"
    );
  }

  return (
    <>
      <StyledPaymentDiv>
        <span>{field?.field_metadata?.planName || ""}</span>
        <StyledSpan>{field?.field_metadata?.nextBillingDate || ""}</StyledSpan>
      </StyledPaymentDiv>
      <FormButton onClick={navigateToDashboard} color={color} isPrimary block>
        {t("rasaForm.goToDashboard")}
      </FormButton>
    </>
  );
}

export default PaymentInfo;
