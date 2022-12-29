import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import UploadLoadingIcon from "@hoory-com/shared-assets/icons/UploadLoadingIcon/index.svg";
import DeleteImageIcon from "@hoory-com/shared-assets/icons/DeleteImageIcon/index.svg";
import InputCheckIcon from "@hoory-com/shared-assets/icons/InputCheckIcon/index.svg";
import { getBase64, bytesToMegabytes } from "./fileUtils";
import {
  CustomizedUpload,
  StyledUploadContainer,
  StyledPlusIcon,
  StyledErrorMessage,
  StyledUploadedFilePreview,
  StyledDeleteAndCheckIcons,
  StyledText,
} from "./styles";
import LoaderWrapper from "../LoaderWrapper";

type Props = {
  sizeLimit: number;
  uploadedLogo: string;
  setUploadedLogo: (uploadedLogo: string) => void;
  isSaved: boolean;
  isSkipped: boolean;
};

function Base64Uploader({
  sizeLimit,
  uploadedLogo,
  setUploadedLogo,
  isSaved,
  isSkipped,
}: Props) {
  const { t } = useTranslation("ui");
  const [selectedFile, setSelectedFile] = useState<UploadFile | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [selectedFile]);

  function checkFileValidity(file: RcFile) {
    setError("");
    const fileSizeInMegaBytes = bytesToMegabytes(file.size);
    const isValidFileSize = fileSizeInMegaBytes <= sizeLimit;

    if (!isValidFileSize) {
      setError(t("rasaForm.uploadSizeError", { limit: sizeLimit }));
    }

    return isValidFileSize;
  }

  function removeUploadedImage() {
    setSelectedFile(undefined);
    setUploadedLogo("");
  }

  const handleChange: UploadProps["onChange"] = async function (event) {
    if (event.file.status === "uploading") {
      setLoading(true);
    }
    const file = event.file.originFileObj;

    if (file) {
      const uploadedFile = await getBase64(file);
      setSelectedFile(event.fileList[0]);

      if (uploadedFile) {
        setUploadedLogo(uploadedFile as string);
      }
    }
  };

  const onFileAdded: UploadProps["customRequest"] = (subject) => {
    if (subject.onSuccess) {
      subject.onSuccess({}, new XMLHttpRequest());
    }
  };

  function showFileName(fileName: string) {
    if (fileName.length > 10) {
      const fileFullName = fileName.split(".");

      return fileFullName[0].length > 10
        ? `${fileFullName[0].slice(0, 10)}....${fileFullName[1]}`
        : `${fileFullName[0]}.${fileFullName[1]}`;
    }

    return fileName;
  }

  return (
    <>
      {!selectedFile && (
        <StyledUploadContainer $isSkipped={isSkipped}>
          <CustomizedUpload
            accept=".png,.jpeg,.jpg,.svg"
            listType="picture-card"
            beforeUpload={checkFileValidity}
            onChange={handleChange}
            customRequest={onFileAdded}
            showUploadList={false}
            disabled={isSkipped || Boolean(uploadedLogo)}
          >
            {loading ? (
              <LoaderWrapper src={UploadLoadingIcon} size="36px" />
            ) : (
              <StyledPlusIcon />
            )}
          </CustomizedUpload>
          <span>{t("rasaForm.uploadLogo")}</span>
          <StyledText>{t("rasaForm.maxSize", { limit: sizeLimit })}</StyledText>
        </StyledUploadContainer>
      )}

      {selectedFile?.originFileObj && (
        <StyledUploadedFilePreview>
          <img src={uploadedLogo as string} alt="Uploaded Logo" />
          <div>
            <p>{showFileName(selectedFile.originFileObj?.name)}</p>
            <span>
              {(
                selectedFile.originFileObj?.size &&
                selectedFile.originFileObj?.size / 1000
              ).toFixed(1)}
              kb
            </span>
          </div>

          <StyledDeleteAndCheckIcons>
            {!isSaved ? (
              <div onClick={removeUploadedImage}>
                <img src={DeleteImageIcon} alt="x" />
              </div>
            ) : (
              <img src={InputCheckIcon} alt="Check Icon" />
            )}
          </StyledDeleteAndCheckIcons>
        </StyledUploadedFilePreview>
      )}

      {error && (
        <StyledErrorMessage $isError={!!error}>{error}</StyledErrorMessage>
      )}
    </>
  );
}

export default Base64Uploader;
