/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Divider, Image, Row } from "antd";
import React, { FC, useState } from "react";
import { usePostClientRecipientMutation } from "../../../../lib/api/endpoints/Clients/clientsEndpoint";
import { ClientOrderRecipientTypes } from "../../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import { handleAPIRequests } from "../../../../utils/handleAPIRequests";
import AddClientRecipient from "../../../Forms/Clients/AddClientRecipient";
import ModalWrapper from "../../../Modals/ModalWrapper";
import CustomButton from "../../../Shared/Button/button";
import ClientOrderRecipientTable from "../../../Tables/Clients/ClientOrderRecipientTable";
import Button from "../../../Shared/Button";

const ClientOrderRecipient: FC<ClientOrderRecipientTypes> = ({
  client,
  isClientFetching
}) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const [postClientRecipient, { isLoading: isPostingRecipient }] =
    usePostClientRecipientMutation();

  const handleAddClientRecipientSuccess = () => {
    setIsModalVisible(false);
    setPhoneNumber("");
  };

  const onAddClientRecipientFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: postClientRecipient,
        id: client?.id,
        names: values?.names,
        phone: phoneNumber,
        showSuccess: true,
        handleSuccess: handleAddClientRecipientSuccess
      });
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
          <ClientOrderRecipientTable
            recipients={client?.affiliates}
            isClientFetching={isClientFetching}
          />
        ) : (
          <span className="font-normal opacity-50 dark">
            No order recipients to display
          </span>
        )}
      </div>
      <ModalWrapper
        footerContent={
          <Button
            form="AddClientRecipient"
            loading={isPostingRecipient}
            type="primary"
            htmlType="submit"
          >
            ADD RECIPIENT
          </Button>
        }
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="ADD ORDER RECIPIENT"
        loading={isPostingRecipient}
      >
        <AddClientRecipient
          onAddClientRecipientFinish={onAddClientRecipientFinish}
          isLoading={isPostingRecipient}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
    </Row>
  );
};

export default ClientOrderRecipient;
