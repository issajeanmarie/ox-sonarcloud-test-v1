/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Input from "../Shared/Input";
import { requiredField } from "../../lib/validation/InputValidations";
import Button from "../Shared/Button";
import CircleCheckbox from "../Shared/Custom/CircleCheckbox";
import { Col, Row } from "antd";
import { s3Clients } from "../../helpers/AWSClient";
import Image from "antd/lib/image";
import {
  useUploadTruckDocumentMutation,
  useEditTruckDocumentMutation
} from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displaySingleTruck } from "../../lib/redux/slices/trucksSlice";
import moment from "moment";
import ModalWrapper from "./ModalWrapper";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { WarningMessage } from "../Shared/Messages/WarningMessage";
import {
  useEditOrderDocumentMutation,
  useUploadOrderDocumentMutation
} from "../../lib/api/endpoints/Orders/ordersEndpoints";
import {
  useEditSaleDocumentMutation,
  useUploadSaleDocumentMutation
} from "../../lib/api/endpoints/Warehouse/salesEndpoints";

type RequestTypes = {
  title: string;
  validFrom: string;
  validTo: string;
};

type Props = {
  isVisible: boolean;
  setIsVisible: any;
  truckData: any;
  isUserEditing?: boolean;
  editTruckData?: any;
  setEditTruckData?: any;
  isDocumentForOrder?: boolean;
  isDocumentForSale?: boolean;
};

const NewTRuckDocumentModal = ({
  isVisible,
  setIsVisible,
  truckData,
  isUserEditing = false,
  editTruckData,
  setEditTruckData,
  isDocumentForOrder = false,
  isDocumentForSale = false
}: Props) => {
  const [form] = Form.useForm();

  const [photoData, setPhotoData] = useState<any>([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState("");
  const [truckDocumentData, setTruckDocumentData] = useState({});
  const [hasExpiryDate, setHasExpiryDate] = useState(false);

  const [uploadTruckDocument, { isLoading }] = useUploadTruckDocumentMutation();
  const [uploadOrderDocument, { isLoading: isUploadOrderDocumentLoading }] =
    useUploadOrderDocumentMutation();
  const [uploadSaleDocument, { isLoading: isUploadSaleDocumentLoading }] =
    useUploadSaleDocumentMutation();

  const [editTruckDocument, { isLoading: editDocumentLoading }] =
    useEditTruckDocumentMutation();
  const [editOrderDocument, { isLoading: editOrderDocumentLoading }] =
    useEditOrderDocumentMutation();
  const [editSaleDocument, { isLoading: editSaleDocumentLoading }] =
    useEditSaleDocumentMutation();

  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsVisible(false);
    setEditTruckData && setEditTruckData({});
    form.setFieldsValue({ document: "" });
    setPhotoData([]);
  };

  const handlePhotoData = (files: File) => {
    setPhotoData(files);
  };

  const handleDocumentSuccess = (res: any) => {
    SuccessMessage(res.message);
    form.resetFields();
    handleCancel();

    if (!isUserEditing && !isDocumentForOrder) {
      dispatch(
        displaySingleTruck({
          ...truckData,
          documents: [res.payload, ...truckData.documents]
        })
      );
    } else if (!isDocumentForOrder) {
      const newDocumentsList: object[] = [];

      truckData?.documents?.map((document: { id: string }) => {
        if (document.id !== res?.payload.id) {
          newDocumentsList.push(document);
        } else {
          newDocumentsList.push(res?.payload);
        }
      });

      dispatch(
        displaySingleTruck({
          ...truckData,
          documents: newDocumentsList
        })
      );
    }
  };

  const onFinish = ({ title, validFrom, validTo }: RequestTypes) => {
    if (photoData?.length <= 0 && !editTruckData?.url) {
      WarningMessage("Document is required!");
      return;
    }

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
      if (!isUserEditing) {
        if (isDocumentForOrder) {
          handleAPIRequests({
            request: uploadOrderDocument,
            id: truckData?.id,
            url: uploadedPicInfo,
            sendEmail: hasExpiryDate,
            ...truckDocumentData,
            handleSuccess: handleDocumentSuccess
          });
        } else if (isDocumentForSale) {
          handleAPIRequests({
            request: uploadSaleDocument,
            id: truckData?.id,
            url: uploadedPicInfo,
            sendEmail: hasExpiryDate,
            ...truckDocumentData,
            handleSuccess: handleDocumentSuccess
          });
        } else {
          handleAPIRequests({
            request: uploadTruckDocument,
            id: truckData?.id,
            url: uploadedPicInfo,
            handleSuccess: handleDocumentSuccess,
            ...truckDocumentData
          });
        }

        setUploadSuccess(false);
        setUploadFailure(null);

        return;
      }

      handleAPIRequests({
        request: isDocumentForOrder
          ? editOrderDocument
          : isDocumentForSale
          ? editSaleDocument
          : editTruckDocument,
        id: truckData?.id,
        documentId: editTruckData?.id || 1,
        url: uploadedPicInfo || editTruckData?.url,
        handleSuccess: handleDocumentSuccess,
        ...truckDocumentData
      });

      setUploadSuccess(false);
      setUploadFailure(null);
    }
  }, [uploadSuccess, uploadFailure]);

  useEffect(() => {
    form.setFieldsValue({
      title: editTruckData?.title,
      validFrom: editTruckData?.validFrom
        ? moment(editTruckData?.validFrom, "YYYY-MM-DD HH:mm")
        : "",
      validTo: editTruckData?.validTo
        ? moment(editTruckData?.validTo, "YYYY-MM-DD HH:mm")
        : "",
      document: editTruckData?.url || ""
    });
  }, [editTruckData]);

  const areRequestsLoading =
    isLoading ||
    uploadLoading ||
    editDocumentLoading ||
    isUploadOrderDocumentLoading ||
    isUploadSaleDocumentLoading ||
    editOrderDocumentLoading ||
    editSaleDocumentLoading;

  return (
    <ModalWrapper
      title={`${isUserEditing ? "EDIT" : "UPLOAD"} A DOCUMENT`}
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={areRequestsLoading}
      onCancel={handleCancel}
      destroyOnClose
      footerContent={
        <Button
          form="EditTruckDocs"
          loading={
            uploadLoading ||
            isLoading ||
            editDocumentLoading ||
            editOrderDocumentLoading ||
            isUploadOrderDocumentLoading ||
            isUploadSaleDocumentLoading ||
            editSaleDocumentLoading
          }
          type="primary"
          htmlType="submit"
        >
          {uploadLoading
            ? "Uploading"
            : editDocumentLoading
            ? "Saving"
            : "Save"}
        </Button>
      }
    >
      <Form
        name="CreateTruck"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        title="Plate number"
        id="EditTruckDocs"
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
            <Input
              name="document"
              type="file"
              placeholder="Choose file to upload"
              inputType="file"
              label="Document"
              onChange={handlePhotoData}
              fileName={photoData[0]?.name || editTruckData?.url}
              value=""
            />
          </div>
        </div>

        <Row gutter={24} align="middle">
          <Col>
            {isDocumentForOrder || isDocumentForSale
              ? "Send an email"
              : "Has an expiry date"}
          </Col>

          <Col>
            <CircleCheckbox
              defaultValue={true}
              checked={hasExpiryDate}
              setState={setHasExpiryDate}
              state={hasExpiryDate}
            />
          </Col>
        </Row>

        <div className="flex gap-10 my-5">
          {!isDocumentForOrder && !isDocumentForSale && (
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
          )}

          {hasExpiryDate && !isDocumentForOrder && !isDocumentForSale && (
            <div className="flex-1">
              <div>
                <Input
                  rules={requiredField("Expiration date")}
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
          )}
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default NewTRuckDocumentModal;
