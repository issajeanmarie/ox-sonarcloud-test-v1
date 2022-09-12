/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Form, Row } from "antd";
import React, { FC, useState } from "react";
import { abbreviator } from "../../../../helpers/abbreviator";
import { useEditClientMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientInfoTypes } from "../../../../lib/types/pageTypes/Clients/ClientInfoTypes";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import MediumAvatar from "../../../Avatars/MediumAvatar";
import EditNewClient from "../../../Forms/Clients/EditClient";
import { YellowEditIcon } from "../../../Icons";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";
import ClientInfoWrapper from "./ClientInfoWrapper";
import Button from "../../../Shared/Button";

const ClientInfo: FC<ClientInfoTypes> = ({ client }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const showModal: any = () => {
    form.setFieldsValue(client);
    setIsModalVisible(true);
    setPhoneNumber(client?.phone);
  };

  const [editClient, { isLoading: isEditingClient }] = useEditClientMutation();

  const handleEditClientSuccess = () => {
    form.resetFields();
    setIsModalVisible(false);
    setPhoneNumber("");
  };

  const onEditClientFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: editClient,
        id: client?.id,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        source: values?.source,
        tinNumber: values?.tinNumber,
        economicStatus: values?.economicStatus,
        showSuccess: true,
        handleSuccess: handleEditClientSuccess
      });
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
      <Col span={24}>
        <Row justify="space-between" align="middle" className="w-full p-8">
          <Col flex="auto">
            <div className="flex items-center gap-4">
              <MediumAvatar>
                <span className="dark font-semibold text-lg opacity-90">
                  {client?.names && abbreviator(client?.names)}
                </span>
              </MediumAvatar>
              <span className="font-bold text-lg">{client?.names}</span>
            </div>
          </Col>

          <Col flex="none">
            <CustomButton onClick={showModal} type="secondary" size="small">
              <span className="text-sm">{YellowEditIcon}</span>
            </CustomButton>
          </Col>
        </Row>
      </Col>
      <Divider style={{ padding: 0, margin: 0 }} />

      <Col span={24} w-full>
        <div className="w-full p-8">
          <ClientInfoWrapper title="Phone number" infoItem={client?.phone} />
          <ClientInfoWrapper
            title="Source"
            infoItem={client?.source?.replaceAll("_", " ") || "N/A"}
          />
          <ClientInfoWrapper
            title="Economic class"
            infoItem={client?.economicStatus?.replaceAll("_", " ") || "N/A"}
          />
          <ClientInfoWrapper title="Email" infoItem={client?.email || "N/A"} />
        </div>
      </Col>

      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title={`Edit ${client?.names && client?.names.split(" ")[0]}`}
        loading={isEditingClient}
        footerContent={
          <Button
            form="EditClient"
            loading={isEditingClient}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
      >
        <EditNewClient
          onEditClientFinish={onEditClientFinish}
          isLoading={isEditingClient}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientInfo;
