import React from "react";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

export const FileUploader = ({ children, fileName }: any) => {
  return (
    <div className="my_input w-[100%] h-[42px] flex items-center upload_input px-3 pt-1">
      {children}
      <Row
        align="middle"
        justify="space-between"
        className="w-full"
        wrap={false}
      >
        <Col className="text_ellipsis">
          {fileName || (
            <span className="pointer z-[1] opacity-25 text-sm">
              Upload file
            </span>
          )}
        </Col>

        <Col>
          <Image
            src="/icons/upload_file.svg"
            alt="Upload file"
            preview={false}
            width={24}
          />
        </Col>
      </Row>
    </div>
  );
};
