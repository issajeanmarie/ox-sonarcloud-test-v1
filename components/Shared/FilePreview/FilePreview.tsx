import { Image } from "antd";
import React, { FC } from "react";
import CustomButton from "../Button/button";

interface FilePreviewProps {
  fileName: string;
  suffixIcon: React.ReactElement;
  onClick?: (value: any) => any;
  className?: string;
}

const FilePreview: FC<FilePreviewProps> = ({
  fileName,
  suffixIcon,
  onClick,
  className
}) => {
  return (
    <div
      className={`flex items-center h-[56px] border border-ox-border-color rounded pl-5 pr-4 ${className}`}
    >
      <Image
        src="/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
        alt=""
        width={16}
        preview={false}
      />
      <span className="flex-1 text-base text-ox-dark text_ellipsis ml-6 mr-2">
        {fileName}
      </span>
      <CustomButton
        type="normal"
        size="icon"
        className="file_peview button"
        icon={suffixIcon}
        onClick={onClick}
      />
    </div>
  );
};

export default FilePreview;
