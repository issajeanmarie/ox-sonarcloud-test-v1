/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Image, Row } from "antd";
import React, { FC, useState } from "react";
import { usePostClientRecipientMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientOrderRecipientTypes } from "../../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import {
  BackendErrorTypes,
  GenericResponse
} from "../../../../lib/types/shared";
import AddClientRecipient from "../../../Forms/Clients/AddClientRecipient";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import { ErrorMessage } from "../../../Shared/Messages/ErrorMessage";
import { SuccessMessage } from "../../../Shared/Messages/SuccessMessage";
import ClientOrderRecipientTable from "../../../Tables/Clients/ClientOrderRecipientTable";

const ClientOrderRecipient: FC<ClientOrderRecipientTypes> = ({ client }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [postClientRecipient, { isLoading: isPostingRecipient }] =
    usePostClientRecipientMutation();

  const onAddClientRecipientFinish = (values: any) => {
    postClientRecipient({
      id: client?.id,
      names: values?.names,
      phone: values?.phone
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };
  return (
    <Row className="bg-[#FFFFFF] rounded shadow-[0px_0px_19px_#00000008] mt-4">
      <Row justify="space-between" align="middle" className="w-full p-8">
        <Col flex="auto">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">ORDER RECIPIENT</span>
          </div>
        </Col>

        <Col flex="none">
          <CustomButton
            onClick={showModal}
            type="secondary"
            size="icon"
            icon={
              <Image
                src="/icons/ic-actions-add-simple.svg"
                alt="OX Delivery Logo"
                width={12}
                preview={false}
              />
            }
          />
        </Col>
      </Row>
      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="w-full p-8">
        {client?.affiliates?.length > 0 ? (
          <ClientOrderRecipientTable recipients={client?.affiliates} />
        ) : (
          <span className="font-light">Order recipients will appear here</span>
        )}
      </div>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="ADD CLIENT RECIPIENT"
        loading={isPostingRecipient}
      >
        <AddClientRecipient
          onAddClientRecipientFinish={onAddClientRecipientFinish}
          isLoading={isPostingRecipient}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientOrderRecipient;
