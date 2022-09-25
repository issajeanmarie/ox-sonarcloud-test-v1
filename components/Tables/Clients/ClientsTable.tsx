/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientsTableTypes } from "../../../lib/types/pageTypes/Clients/ClientsTableTypes";
import { ClientsTableProps } from "../../../lib/types/pageTypes/Clients/ClientsTableProps";
import RowsWrapper from "../RowsWrapper";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import CustomButton from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { useDeleteClientMutation } from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const ClientsTable: FC<ClientsTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  clients,
  isClientsFetching
}) => {
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [deleteClient, { isLoading }] = useDeleteClientMutation();

  const handleDeleteClient = () => {
    deleteClient({
      id: itemToDelete
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
          <span>Names</span>
        </div>
      ),
      key: "Names",
      render: (
        text: ClientsTableTypes,
        record: ClientsTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className="normalText fowe700">{record?.names}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.phone ? record?.phone : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Email",
      key: "email",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.email ? record?.email : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Location",
      key: "location",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.location}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Pending payment",
      key: "pendingPayment",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          {record?.pendingPayment ? (
            <Text className=" text-sm font-bold red">
              {numbersFormatter(record?.pendingPayment)} Rwf
            </Text>
          ) : (
            <Text className="normalText opacity_56">...</Text>
          )}
        </RowsWrapper>
      )
    },
    {
      title: (
        <div className="flex justify-start items-center">
          <span>Action</span>
        </div>
      ),
      width: "100px",
      key: "Action",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => showModal(setItemToDelete(record?.id))}
                type="danger"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-actions-remove.svg"
                    alt="OX Delivery Logo"
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() =>
                  changeRoute(`${routes.Client.url}?client=${record?.id}`)
                }
                type="view"
                size="small"
              >
                <span className="font-bold">View</span>
              </CustomButton>
            </div>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table light_white_header light_white_table"
        columns={columns}
        dataSource={clients}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isClientsFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteClient()}
        loading={isLoading}
      />
    </>
  );
};

export default ClientsTable;
