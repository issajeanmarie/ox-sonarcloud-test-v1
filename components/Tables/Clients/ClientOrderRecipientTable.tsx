/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientOrderRecipientTableTypes } from "../../../lib/types/pageTypes/Clients/ClientOrderRecipientTypes";
import RowsWrapper from "../RowsWrapper";
import { Button } from "antd";
import { FC, useState } from "react";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import ActionModal from "../../Shared/ActionModal";
import { useDeleteClientRecipientMutation } from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useRouter } from "next/router";

const { Text } = Typography;

type ClientOrderRecipientTableProps = {
  recipients: any;
};

const ClientOrderRecipientTable: FC<ClientOrderRecipientTableProps> = ({
  recipients
}) => {
  const { query } = useRouter();
  const [itemToDelete, setItemToDelete]: any = useState();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const showModal = (record: any) => {
    setItemToDelete(record);
    setIsModalVisible(true);
  };

  const [deleteClientRecipient, { isLoading }] =
    useDeleteClientRecipientMutation();

  const handleDeleteClientRecipient = () => {
    deleteClientRecipient({
      id: query?.client,
      affiliateId: itemToDelete?.id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
          <div className="flex justify-end items-center gap-4">
            <Button
              // onClick={() => showEditModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              edit
            </Button>
            <Button
              onClick={() => showModal(record)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              del
            </Button>
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
    </>
  );
};

export default ClientOrderRecipientTable;
