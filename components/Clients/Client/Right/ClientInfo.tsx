/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Form, Row } from "antd";
import React, { FC, useState } from "react";
import { abbreviator } from "../../../../helpers/abbreviator";
import { useEditClientMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientInfoTypes } from "../../../../lib/types/pageTypes/Clients/ClientInfoTypes";
import {
  BackendErrorTypes,
  GenericResponse
} from "../../../../lib/types/shared";
import MediumAvatar from "../../../Avatars/MediumAvatar";
import EditNewClient from "../../../Forms/Clients/EditClient";
import { YellowEditIcon } from "../../../Icons";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";
import ClientInfoWrapper from "./ClientInfoWrapper";

const ClientInfo: FC<ClientInfoTypes> = ({ client }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal: any = () => {
    form.setFieldsValue(client);
    setIsModalVisible(true);
  };

  const [editClient, { isLoading: isEditingClient }] = useEditClientMutation();

  const onEditClientFinish = (values: any) => {
    editClient({
      id: client?.id,
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      source: values?.source,
      tinNumber: values?.tinNumber,
      economicStatus: values?.economicStatus
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008]">
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
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        <ClientInfoWrapper title="Phone number" infoItem={client?.phone} />
        <ClientInfoWrapper title="Source" infoItem={client?.source} />
        <ClientInfoWrapper title="Economic class" infoItem="-" />
        <ClientInfoWrapper title="Email" infoItem={client?.email} />
      </div>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title={`Edit ${client?.names && client?.names.split(" ")[0]}`}
        loading={isEditingClient}
      >
        <EditNewClient
          onEditClientFinish={onEditClientFinish}
          isLoading={isEditingClient}
          form={form}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientInfo;
