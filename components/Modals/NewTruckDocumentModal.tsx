import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Modal from "antd/lib/modal";
import Typography from "antd/lib/typography";
import Input from "../Shared/Input";
import info from "antd/lib/message";
import { requiredField } from "../../lib/validation/InputValidations";
import Button from "../Shared/Button";
import CircleCheckbox from "../Shared/Custom/CircleCheckbox";
import { Col, Row } from "antd";
import { s3Clients } from "../../helpers/AWSClient";
import Image from "antd/lib/image";
import { useUploadTruckDocumentMutation } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displaySingleTruck } from "../../lib/redux/slices/trucksSlice";

const { Text } = Typography;

type RequestTypes = {
  title: string;
  validFrom: string;
  validTo: string;
};

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  truckData: any;
};

const NewTRuckDocumentModal = ({
  isVisible,
  setIsVisible,
  truckData
}: Props) => {
  const [photoData, setPhotoData] = useState<any>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState("");
  const [truckDocumentData, setTruckDocumentData] = useState({});

  const [uploadTruckDocument, { isLoading }] = useUploadTruckDocumentMutation();
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsVisible(false);
  };

  const initialValues = {};

  const handlePhotoData = (files: File) => setPhotoData(files);

  const handleNewDocumentSuccess = (res: any) => {
    info.success(res.message);

    dispatch(
      displaySingleTruck({
        ...truckData,
        documents: [res.payload, ...truckData.documents]
      })
    );

    handleCancel();
  };

  const onFinish = ({ title, validFrom, validTo }: RequestTypes) => {
    setTruckDocumentData({
      title,
      validFrom,
      validTo
    });

    // S3 TO UPLOAD
    if (photoData?.length > 0) {
      setUploadLoading(true);
      s3Clients.s3UploadFile(
        photoData[0],
        setUploadLoading,
        setUploadSuccess,
        setUploadFailure,
        setUploadedPicInfo
      );
    } else {
      setUploadSuccess(true);
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    if (uploadSuccess) {
      handleAPIRequests({
        request: uploadTruckDocument,
        id: 62,
        url: uploadedPicInfo,
        ...truckDocumentData,
        handleSuccess: handleNewDocumentSuccess
      });

      setUploadSuccess(false);
      setUploadFailure(null);
    }
  }, [uploadSuccess, uploadFailure]);

  const [form] = Form.useForm();

  return (
    <Modal
      title={false}
      footer={false}
      visible={isVisible}
      closable={!isLoading}
      onCancel={handleCancel}
      centered
      maskClosable={!isLoading}
    >
      <div className="m-10">
        <div className="text-2xl font-bold  text-ox-dark mb-10">
          UPLOAD DOCUMENT
        </div>

        <Form
          name="CreateTruck"
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
          form={form}
          title="Plate number"
        >
          <div className="flex gap-10 mb-5">
            <div className="flex-1">
              <div>
                <Input
                  name="title"
                  type="text"
                  placeholder="Format (AAA 000 A)"
                  inputType="text"
                  label="Document title"
                  rules={requiredField("Title")}
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div>
              <Text className="heading2 mb-[8px]">Document</Text>
              <input
                name="truckDocument"
                placeholder="Upload file"
                className="styledInput"
                type="file"
                onChange={(e: any) => handlePhotoData(e.target.files)}
              />
            </div>
          </div>

          <Row gutter={24} align="middle">
            <Col>Has an expiry date</Col>

            <Col>
              <CircleCheckbox
                defaultValue={true}
                checked={false}
                setState={() => null}
                state={false}
              />
            </Col>
          </Row>

          <div className="flex gap-10 my-5">
            <div className="flex-1">
              <div>
                <Input
                  rules={requiredField("Start date")}
                  name="validFrom"
                  type="date"
                  label="Date"
                  suffixIcon={
                    <Image
                      src="/icons/ic-actions-calendar.svg"
                      alt="Calendar icon"
                      width={18}
                      height={18}
                    />
                  }
                />
              </div>
            </div>

            <div className="flex-1">
              <div>
                <Input
                  rules={requiredField("End date")}
                  type="date"
                  label="Valid to"
                  name="validTo"
                  placeholder="Start"
                  suffixIcon={
                    <Image
                      preview={false}
                      src="/icons/ic-actions-calendar.svg"
                      alt=""
                      width={18}
                    />
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex gap-10 my-5">
            <div className="flex-1"></div>

            <div className="flex-1">
              <Button
                loading={uploadLoading || isLoading}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default NewTRuckDocumentModal;
