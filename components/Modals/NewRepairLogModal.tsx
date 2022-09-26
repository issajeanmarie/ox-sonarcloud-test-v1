import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Image from "antd/lib/image";
import info from "antd/lib/message";
import Button from "../Shared/Button";
import Input from "../Shared/Input";
import { requiredField } from "../../lib/validation/InputValidations";
import ImageUploader from "../Shared/Input/imageUploader";
import { useCreateTruckRepairLogMutation } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayRepairLogs } from "../../lib/redux/slices/trucksSlice";
import ModalWrapper from "./ModalWrapper";

const NewRepairLogModal = ({ isVisible, setIsVisible, truckId }: any) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState();
  const [, setUploadSuccess] = useState(false);
  const [allIMGs, setAllIMGs] = useState([]);

  const dispatch = useDispatch();

  const [createTruckRepairLog, { isLoading }] =
    useCreateTruckRepairLogMutation();

  const handleCancel = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (uploadedPicInfo) {
      const imagesCopy = [...allIMGs];
      imagesCopy.push(uploadedPicInfo);
      setAllIMGs(imagesCopy);
    }
    // eslint-disable-next-line
  }, [uploadedPicInfo]);

  const [form] = Form.useForm();

  const handleCreateRepairLogSuccess = (res: any) => {
    dispatch(displayRepairLogs({ payload: res, add: true }));

    info.success(res.message);
    form.resetFields();
    handleCancel();
  };

  const onFinish = (values: any) => {
    const data = {
      ...values,
      spareParts: [values.spareParts],
      images: allIMGs
    };

    handleAPIRequests({
      request: createTruckRepairLog,
      id: truckId,
      ...data,
      handleSuccess: handleCreateRepairLogSuccess
    });
  };

  const initialValues = {};

  return (
    <ModalWrapper
      title="New Repair log"
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading || uploadLoading}
      onCancel={handleCancel}
    >
      <Form
        name="createLogRepair"
        initialValues={initialValues}
        onFinish={onFinish}
        layout="vertical"
        form={form}
        title="Plate number"
      >
        <div className="flex gap-10 my-5">
          <div className="flex-1">
            <div>
              <Input
                rules={requiredField("In date")}
                name="inDate"
                placeholder="14 Feb 2022"
                type="date"
                label="In"
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
                rules={requiredField("Out date")}
                type="date"
                label="Out"
                name="outDate"
                placeholder="14 Feb 2022"
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
          <div className="flex-1">
            <div>
              <Input
                name="cost"
                type="text"
                placeholder="Amount"
                inputType="number"
                label="Cost"
                rules={requiredField("Cost")}
              />
            </div>
          </div>

          <div className="flex-1">
            <div>
              <Input
                name="odometer"
                type="text"
                placeholder="Enter the odometer"
                inputType="text"
                label="Odometer"
                rules={requiredField("Spare parts field")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 my-5">
          <div className="flex-1">
            <div>
              <Input
                name="serviceDone"
                type="text"
                placeholder="Ex: Fuel system"
                inputType="text"
                label="Service done"
                rules={requiredField("Service done")}
              />
            </div>
          </div>

          <div className="flex-1">
            <div>
              <Input
                name="spareParts"
                type="text"
                placeholder="Enter the spare parts done"
                inputType="text"
                label="Spare parts used"
                rules={requiredField("Spare parts field")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 my-5">
          <div className="flex-1">
            <div>
              <Input
                name="serviceDescription"
                type="text_area"
                placeholder="Tell us more"
                inputType="text"
                label="Describe the service done"
                rules={requiredField("Service description")}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 my-5">
          <div className="flex-1">
            <div>
              <ImageUploader
                uploadLoading={uploadLoading}
                setUploadLoading={setUploadLoading}
                uploadFailure={uploadFailure}
                setUploadFailure={setUploadFailure}
                uploadedPicInfo={uploadedPicInfo}
                setUploadedPicInfo={setUploadedPicInfo}
                setUploadSuccess={setUploadSuccess}
                allIMGs={allIMGs}
                setAllIMGs={setAllIMGs}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 my-5">
          <div className="flex-1"></div>

          <div className="flex-1">
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              disabled={uploadLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </ModalWrapper>
  );
};

export default NewRepairLogModal;
