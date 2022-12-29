import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRasaMessageContext } from "../../../contexts";
import Base64Uploader from "../../../components/Base64Uploader";
import {
  UPLOADED_LOGO_BASE64_STORAGE_KEY,
  RASA_NO_LOGO,
  RASA_UPLOAD_COMPLETED,
} from "../constants";
import { useUpdateMessages } from "../hooks";
import { StyledButton } from "../styles";

function LogoUploader() {
  const { t } = useTranslation("ui");
  const { sendMessageHandler, color, message, field: { value }, } = useRasaMessageContext();
  const { updateMessages } = useUpdateMessages();
  const logo = localStorage.getItem(UPLOADED_LOGO_BASE64_STORAGE_KEY);
  const [uploadedLogo, setUploadedLogo] = useState(logo || "");
  const [isSaved, setIsSaved] = useState(
    Boolean(value && value === RASA_UPLOAD_COMPLETED)
  );
  const [isSkipped, setIsSkipped] = useState(
    Boolean(value && value === RASA_NO_LOGO)
  );

  function saveLogo() {
    localStorage.setItem(UPLOADED_LOGO_BASE64_STORAGE_KEY, uploadedLogo);
    sendMessageHandler &&
      sendMessageHandler({
        message: RASA_UPLOAD_COMPLETED,
        metadata: {
          updateId: message.id,
        },
        updateActionsBody: updateMessages(RASA_UPLOAD_COMPLETED),
      });
    setIsSaved(true);
  }

  function skipStep() {
    setIsSkipped(true);
    sendMessageHandler &&
      sendMessageHandler({
        message: RASA_NO_LOGO,
        metadata: {
          updateId: message.id,
        },
        updateActionsBody: updateMessages(RASA_NO_LOGO),
      });
  }

  return (
    <>
      <Base64Uploader
        sizeLimit={5}
        setUploadedLogo={setUploadedLogo}
        uploadedLogo={uploadedLogo}
        isSaved={isSaved}
        isSkipped={isSkipped}
      />
      {!isSaved && !isSkipped && (
        <StyledButton
          color={color}
          isPrimary={Boolean(uploadedLogo)}
          onClick={uploadedLogo ? saveLogo : skipStep}
          htmlType="submit"
        >
          {t(`rasaForm.${uploadedLogo ? "confirm" : "skipBtn"}`)}
        </StyledButton>
      )}
    </>
  );
}

export default LogoUploader;
