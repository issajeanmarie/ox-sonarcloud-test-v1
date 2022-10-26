/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientsTableTypes } from "../../../lib/types/pageTypes/Clients/ClientsTableTypes";
import { ClientsTableProps } from "../../../lib/types/pageTypes/Clients/ClientsTableProps";
import RowsWrapper from "../RowsWrapper";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { numbersFormatter } from "../../../helpers/numbersFormatter";
import CustomButton from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { routes } from "../../../config/route-config";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { useDeleteClientMutation } from "../../../lib/api/endpoints/Clients/clientsEndpoint";
import { useRouter } from "next/router";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

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

  const dispatch = useDispatch();

  const router = useRouter();

  const handleDeleteClientSuccess = ({ payload }: any) => {
    dispatch(displayPaginatedData({ deleted: true, payload: { id: payload } }));

    setIsModalVisible(false);
  };

  const handleDeleteClient = () => {
    handleAPIRequests({
      request: deleteClient,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteClientSuccess
    });
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
      title: <span className="text_ellipsis">Pending payment</span>,
      key: "pendingPayment",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          {record?.pendingAmount ? (
            <Text className="text-sm font-bold red">
              {numbersFormatter(record?.pendingAmount)} Rwf
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
        <Row align="middle" gutter={16} wrap={false}>
          <Col className="my-[-12px]">
            <CustomButton
              form=""
              onClick={() => showModal(setItemToDelete(record?.id))}
              type="danger"
              size="icon"
              icon={
                <Image
                  src="/icons/ic-actions-remove.svg"
                  alt="OX Delivery Logo"
                  width={12}
                  preview={false}
                />
              }
            />
          </Col>

          <Col className="my-[-12px]">
            <CustomButton
              form=""
              onClick={() => router.push(`${routes.Clients.url}/${record.id}`)}
              type="view"
              size="small"
            >
              View
            </CustomButton>
          </Col>
        </Row>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table light_white_header light_white_table"
        columns={columns}
        dataSource={clients?.payload?.content}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isClientsFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="WARNING!"
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
