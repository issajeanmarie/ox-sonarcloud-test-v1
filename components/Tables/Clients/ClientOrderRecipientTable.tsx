/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderRecipientTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import RowsWrapper from "../RowsWrapper";
import { Button as AntDButton, Form } from "antd";
import { FC, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import {
  useDeleteClientRecipientMutation,
  useEditClientRecipientMutation
} from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useRouter } from "next/router";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import Image from "next/image";
import Button from "../../Shared/Button";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditClientRecipient from "../../Forms/Clients/EditClientRecipient";
import { RemoveCircleOutlineIcon } from "../../Icons";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const { Text } = Typography;

type ClientOrderRecipientTableProps = {
  recipients: any;
  isClientFetching: boolean;
};

const ClientOrderRecipientTable: FC<ClientOrderRecipientTableProps> = ({
  recipients,
  isClientFetching
}) => {
  const { query } = useRouter();
  const [form] = Form.useForm();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  const showEditModal = (record: any) => {
    setItemToEdit(record?.id);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
    setPhoneNumber(record?.phone);
  };

  const [itemToDelete, setItemToDelete]: any = useState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = (record: any) => {
    setItemToDelete(record);
    setIsModalVisible(true);
  };

  const [deleteClientRecipient, { isLoading }] =
    useDeleteClientRecipientMutation();

  const handleDeleteClientRecipientSuccess = () => {
    setIsModalVisible(false);
  };

  const handleDeleteClientRecipient = () => {
    handleAPIRequests({
      request: deleteClientRecipient,
      id: query?.client,
      affiliateId: itemToDelete?.id,
      showSuccess: true,
      handleSuccess: handleDeleteClientRecipientSuccess
    });
  };

  //EDIT
  const [editClientRecipient, { isLoading: isEditing }] =
    useEditClientRecipientMutation();

  const handleEditRecipientSuccess = () => {
    setIsEditModalVisible(false);
  };

  const onEditClientRecipientFinish = (values: any) => {
    handleAPIRequests({
      request: editClientRecipient,
      id: query?.client,
      affiliateId: itemToEdit,
      names: values?.names,
      phone: phoneNumber,
      showSuccess: true,
      handleSuccess: handleEditRecipientSuccess
    });
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>name</span>
        </div>
      ),
      key: "name",
      render: (
        text: ClientOrderRecipientTableTypes,
        record: ClientOrderRecipientTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">{record?.names}</Text>
              <Text className="normalText opacity_56">{record?.phone}</Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },

    {
      title: "action",
      key: "action",
      render: (
        text: ClientOrderRecipientTableTypes,
        record: ClientOrderRecipientTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex justify-end items-center gap-8">
            <AntDButton
              onClick={() => showEditModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              <Image
                className="pointer"
                src="/icons/ic-contact-edit.svg"
                alt="Backspace icon"
                width={18}
                height={18}
              />
            </AntDButton>
            <AntDButton
              onClick={() => showModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {RemoveCircleOutlineIcon}
            </AntDButton>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table  noborder"
        columns={columns}
        dataSource={recipients}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        showHeader={false}
        loading={TableOnActionLoading(isClientFetching)}
      />
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteClientRecipient()}
        loading={isLoading}
      />
      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT RECIPIENT"
        loading={isEditing}
        footerContent={
          <Button
            form="EditClientRecipient"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
      >
        <EditClientRecipient
          onEditClientRecipientFinish={onEditClientRecipientFinish}
          isLoading={isEditing}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
    </>
  );
};

export default ClientOrderRecipientTable;
