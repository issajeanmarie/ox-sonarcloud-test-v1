/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC } from "react";
import { Col, Divider, Row, Form } from "antd";
import { abbreviator } from "../../helpers/abbreviator";
import { DriverProfileResponse } from "../../lib/types/Accounts/drivers";
import MediumAvatar from "../Avatars/MediumAvatar";
import ClientInfoWrapper from "../Clients/Client/Right/ClientInfoWrapper";
import { YellowEditIcon } from "../Icons";
import CustomButton from "../Shared/Button";
import ModalWrapper from "../Modals/ModalWrapper";
import EditDriver from "../Forms/Accounts/Drivers/EditDriver";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useEditDriverMutation } from "../../lib/api/endpoints/Accounts/driversEndpoints";

interface Props {
  driverData: DriverProfileResponse;
}

const DriverInfo: FC<Props> = ({ driverData }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [form] = Form.useForm();

  const [editDriver, { isLoading: isEditing }] = useEditDriverMutation();

  const showEditModal = () => {
    setIsEditModalVisible(true);
    form.setFieldsValue(driverData?.payload?.profileInfo);
    setPhoneNumber(driverData?.payload?.profileInfo?.phone || "");
  };

  const handleEditDriverSuccess = () => {
    form.resetFields();
    setIsEditModalVisible(false);
    setPhoneNumber("");
  };

  const onEditDriverFinish = (values: {
    names: string;
    email: string;
    gender: string;
  }) => {
    phoneNumber &&
      handleAPIRequests({
        request: editDriver,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        gender: values?.gender,
        id: driverData?.payload?.profileInfo?.id,
        showSuccess: true,
        handleSuccess: handleEditDriverSuccess
      });
  };

  return (
    <>
      <ModalWrapper
        footerContent={
          <CustomButton
            form="EditDriver"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </CustomButton>
        }
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title={`EDIT ${driverData?.payload?.profileInfo?.names?.split(" ")[0]}`}
        loading={isEditing}
      >
        <EditDriver
          onEditDriverFinish={onEditDriverFinish}
          isLoading={isEditing}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
      <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
        <Col span={24}>
          <Row justify="space-between" align="middle" className="w-full p-8">
            <Col flex="auto">
              <div className="flex items-center gap-4">
                <MediumAvatar>
                  <span className="dark font-semibold text-lg opacity-90">
                    {abbreviator(driverData?.payload?.profileInfo?.names)}
                  </span>
                </MediumAvatar>
                <span className="font-bold text-lg">
                  {driverData?.payload?.profileInfo?.names}
                </span>
              </div>
            </Col>

            <Col flex="none">
              <CustomButton
                type="secondary"
                size="small"
                onClick={showEditModal}
              >
                <span className="text-sm">{YellowEditIcon}</span>
              </CustomButton>
            </Col>
          </Row>
        </Col>
        <Divider style={{ padding: 0, margin: 0 }} />

        <Col span={24} w-full>
          <div className="w-full p-8">
            <div className="mb-4">
              <ClientInfoWrapper
                title="Email"
                infoItem={driverData?.payload?.profileInfo?.email}
              />
            </div>

            <ClientInfoWrapper
              title="Phone number"
              infoItem={driverData?.payload?.profileInfo?.phone}
            />

            <ClientInfoWrapper
              title="Gender"
              infoItem={driverData?.payload?.profileInfo?.gender}
            />

            <ClientInfoWrapper
              title="Status"
              infoItem={
                driverData?.payload?.profileInfo?.enabled
                  ? "Active"
                  : "Inactive"
              }
            />

            <ClientInfoWrapper
              title="Role"
              infoItem={driverData?.payload?.profileInfo?.role}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DriverInfo;
