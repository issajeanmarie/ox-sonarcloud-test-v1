import React, { useState, useEffect, FC } from "react";
import Form from "antd/lib/form";
import Image from "antd/lib/image";
import Button from "../Shared/Button";
import Input from "../Shared/Input";
import { requiredField } from "../../lib/validation/InputValidations";
import ImageUploader from "../Shared/Input/imageUploader";
import { useCreateTruckRepairLogMutation } from "../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";
import {
  useLazyGetRepairServicesQuery,
  useUpdateRepairLogMutation
} from "../../lib/api/endpoints/settings/settingsEndpoints";
import moment from "moment";
import { Query } from "../../lib/types/shared";

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  truckId: Query;
  logData: any;
  setLogData: any;
}

const NewRepairLogModal: FC<Props> = ({
  isVisible,
  setIsVisible,
  truckId,
  logData,
  setLogData
}) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(null);
  const [uploadedPicInfo, setUploadedPicInfo] = useState();
  const [, setUploadSuccess] = useState(false);
  const [allIMGs, setAllIMGs] = useState<string[]>([]);

  const [
    getRepairServices,
    { data: repairServices, isFetching: repairServicesFetching }
  ] = useLazyGetRepairServicesQuery();

  const [updateRepairLog, { isLoading: isUpdateRepairLogLoading }] =
    useUpdateRepairLogMutation();

  useEffect(() => {
    handleAPIRequests({
      request: getRepairServices,
      page: 0,
      size: 1000
    });
  }, []);

  const repairServiceOptions = repairServices?.payload?.content?.map(
    (service: { id: number; name: string }) => ({
      label: `${service.name}`,
      value: service.id
    })
  );

  const [
    getRepairServices,
    { data: repairServices, isFetching: repairServicesFetching }
  ] = useLazyGetRepairServicesQuery();

  useEffect(() => {
    handleAPIRequests({
      request: getRepairServices,
      page: 0,
      size: 1000
    });
  }, []);

  const repairServiceOptions = repairServices?.payload?.content?.map(
    (service: { id: number; name: string }) => ({
      label: `${service.name}`,
      value: service.id
    })
  );

  const dispatch = useDispatch();

  const [createTruckRepairLog, { isLoading }] =
    useCreateTruckRepairLogMutation();

  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields();
    setLogData();
    setAllIMGs([]);
  };

  useEffect(() => {
    if (uploadedPicInfo) {
      const imagesCopy = [...allIMGs];
      imagesCopy.push(uploadedPicInfo);
      setAllIMGs(imagesCopy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedPicInfo]);

  const [form] = Form.useForm();

  const handleCreateRepairLogSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ payload }));
    form.resetFields();
    handleCancel();
  };

  const onFinish = (values: any) => {
    const data = {
      ...values,
      spareParts: [values.spareParts],
      images: allIMGs,
      truckId
    };

    if (logData) {
      handleAPIRequests({
        request: updateRepairLog,
        id: truckId,
        repairId: logData.id,
        ...data,
        showSuccess: true,
        handleSuccess: handleCreateRepairLogSuccess
      });
    } else {
      handleAPIRequests({
        request: createTruckRepairLog,
        id: truckId,
        ...data,
        showSuccess: true,
        handleSuccess: handleCreateRepairLogSuccess
      });
    }
  };

  useEffect(() => {
    if (logData) {
      form.setFieldsValue({
        inDate: moment(logData.inDate),
        outDate: moment(logData.outDate),
        cost: logData.cost,
        odometer: logData.odometer,
        serviceDescription: logData.description,
        spareParts: logData.spareParts[0],
        serviceId: logData?.service?.id
      });

      logData.images.forEach((img: string) => setAllIMGs([...allIMGs, img]));
    }
  }, [form, logData]);

  return (
    <ModalWrapper
      title="New Repair log"
      isModalVisible={isVisible}
      setIsModalVisible={setIsVisible}
      loading={isLoading || uploadLoading}
      onCancel={handleCancel}
      footerContent={
        <Button
          form="createLogRepair"
          loading={isLoading || isUpdateRepairLogLoading}
          type="primary"
          htmlType="submit"
          disabled={uploadLoading}
        >
          Save
        </Button>
      }
    >
      <Form
        name="createLogRepair"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        title="Plate number"
        id="createLogRepair"
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
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 my-5">
          <div className="flex-1">
            <div>
              <Input
                name="serviceId"
                type="select"
                label="Service done"
                placeholder="Ex: Fuel system"
                loading={repairServicesFetching}
                rules={requiredField("Service done")}
                options={repairServiceOptions}
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
      </Form>
    </ModalWrapper>
  );
};

export default NewRepairLogModal;
