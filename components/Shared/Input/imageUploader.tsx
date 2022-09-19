import React from "react";
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
  allIMGs
}: any) => {
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
  };

  return (
    <Row align="middle" gutter={12}>
      {allIMGs?.map((img: string) => (
        <Col key={img} className="mb-4">
          <div className="w-[120px] h-[120px] radius-4 overflow-hidden">
            <Image src={img} alt="" width="100%" preview={false} />
          </div>
        </Col>
      ))}

      <Col>
        <div className="image_upload_container flex flex-col border border-dashed relative items-center w-[120px] h-[120px]">
          {uploadLoading ? (
            <LoadingOutlined spin={uploadLoading} className="mt-14" />
          ) : (
            <>
              <input
                className="w-[100%] h-[120px] absolute z-10 opacity-0 pointer"
                type="file"
                onChange={(e: any) => handlePhotoData(e.target.files)}
              />
              <Image
                className="mt-10"
                width={24}
                preview={false}
                alt="Add sign"
                src="/icons/add_photo_alternate_FILL0_wght400_GRAD0_opsz48.svg"
              />
              <Text>Add image</Text>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ImageUploader;
