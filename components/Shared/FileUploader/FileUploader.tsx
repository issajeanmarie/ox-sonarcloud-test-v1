import { LoadingOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { FC } from "react";
import { s3Clients } from "../../../helpers/AWSClient";

interface FileUploaderProps {
  label?: string;
  uploadLoading: boolean;
  setUploadLoading: (value: boolean) => void;
  setUploadFailure?: (err: any) => void;
  setUploadedPicInfo?: (value: string) => void;
  setUploadSuccess?: (value: boolean) => void;
  validations?: string[];
  className?: string;
}

const FileUploader: FC<FileUploaderProps> = ({
  label,
  uploadLoading,
  setUploadLoading,
  setUploadFailure,
  setUploadedPicInfo,
  setUploadSuccess,
  validations,
  className
}) => {
  const handleFileUpload = (files: File[]) => {
    if (!files.length) {
      return;
    }
    setUploadLoading && setUploadLoading(true);

    // S3 TO UPLOAD
    s3Clients.s3UploadFile(
      files[0],
      setUploadLoading,
      setUploadSuccess,
      setUploadFailure,
      setUploadedPicInfo
    );
  };

  return (
    <div
      className={`relative flex items-center w-full h-[56px] border border-dashed border-ox-border-dash pl-7 pr-11 cursor-pointer ${className}`}
    >
      <input
        className="w-full h-full absolute left-0 opacity-0 cursor-pointer"
        type="file"
        disabled={uploadLoading}
        onChange={(e: any) => handleFileUpload(e.target.files)}
        accept={validations?.join(",") ?? "*"}
      />
      {uploadLoading ? (
        <LoadingOutlined spin={uploadLoading} className="ml-4" />
      ) : (
        <>
          <Image
            src="/icons/ic-actions-add-dark.svg"
            alt=""
            width={12}
            preview={false}
          />
          <span className="pl-4 text-base font-bold cursor-pointer">
            {label || "Add file"}
          </span>
        </>
      )}
    </div>
  );
};

export default FileUploader;
