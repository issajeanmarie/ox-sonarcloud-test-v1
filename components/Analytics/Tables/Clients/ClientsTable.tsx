/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import { ClientsTableTypes } from "../../../../lib/types/pageTypes/Clients/ClientsTableTypes";
import { ClientsTableProps } from "../../../../lib/types/pageTypes/Clients/ClientsTableProps";
import RowsWrapper from "../RowsWrapper";
import { numbersFormatter } from "../../../../helpers/numbersFormatter";
import CustomButton from "../../../Shared/Button";
import { ClientsTableData } from "../Dummies/ClientsTableData";
import { Image } from "antd";
import { FC } from "react";
import ActionModal from "../../../Shared/ActionModal";
import { changeRoute } from "../../../../helpers/routesHandler";
import { routes } from "../../../../config/route-config";

const { Text } = Typography;

const ClientsTable: FC<ClientsTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible
}) => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Name</span>
        </div>
      ),
      key: "Name",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <Text className="normalText fowe700">
              {record?.firstName} {record?.lastName}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.phoneNumber}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Email",
      key: "email",
      render: (text: ClientsTableTypes, record: ClientsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.email}</Text>
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
      render: () => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <CustomButton
              onClick={showModal}
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
            <CustomButton
              onClick={() => changeRoute(routes.Client.url)}
              type="view"
              size="small"
            >
              View
            </CustomButton>
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
        dataSource={ClientsTableData}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => null}
        loading={false}
      />
    </>
  );
};

export default ClientsTable;
