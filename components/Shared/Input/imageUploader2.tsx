import React, { useEffect, useState } from "react";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";
import { s3Clients } from "../../../helpers/AWSClient";

const { Text } = Typography;

const ImageUploader = ({
  uploadLoading,
  setUploadLoading,
  setUploadFailure,
  setUploadedPicInfo,
  setUploadSuccess,
  src
}: any) => {
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [preview, setPreview] = useState<any | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(src);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // F(x) to upload to AWS
  const handlePhotoData = (files: File[]) => {
    setUploadLoading(true);

    // S3 TO UPLOAD
    s3Clients.s3UploadFile(
      files[0],
      setUploadLoading,
      setUploadSuccess,
      setUploadFailure,
      setUploadedPicInfo
    );

    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(files[0]);
  };

  return (
    <>
      <input
        className="w-[120px] h-[120px] absolute z-10 opacity-0 pointer"
        type="file"
        onChange={(e: any) => handlePhotoData(e.target.files)}
      />
      {src ? (
        <Image
          preview={true}
          src={preview}
          style={{ borderRadius: "4px", width: "120px", height: "120px" }}
          alt="Profile picture"
          className="img_fit"
        />
      ) : (
        <Row align="middle" gutter={12}>
          <Col>
            <div className="image_upload_container flex flex-col border border-dashed relative items-center w-[120px] h-[120px] ">
              {uploadLoading ? (
                <LoadingOutlined spin={uploadLoading} className="mt-14" />
              ) : (
                <>
                  <input
                    className="w-[120px] h-[120px] absolute z-10 opacity-0 pointer"
                    type="file"
                    onChange={(e: any) => handlePhotoData(e.target.files)}
                  />
                  <Image
                    className="mt-10"
                    width={24}
                    preview={false}
                    alt=""
                    src={preview}
                  />
                  <span>
                    + <br />
                  </span>
                  <Text>Add image</Text>
                </>
              )}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ImageUploader;
