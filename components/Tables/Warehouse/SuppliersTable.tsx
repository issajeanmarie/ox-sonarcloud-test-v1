/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { SuppliersTableData } from "../Dummies/SuppliersTableData";
import { Image } from "antd";
import CustomButton from "../../Shared/Button";
import { SuppliersTableTypes } from "../../../lib/types/pageTypes/Warehouse/Suppliers/SuppliersTableTypes";

const { Text } = Typography;

const SuppliersTable = () => {
  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Name</span>
        </div>
      ),
      key: "Name",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{record?.key}</Text>
            <Text className={`normalText fowe700`}>{record?.Name}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "Phonenumber",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.PhoneNumber}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Address",
      key: "Address",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.Address}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "TIN",
      key: "TIN",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText fowe700">{record?.TIN}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "Status",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text
            className={`normalText ${
              record?.Status === "DEACTIVATED" ? "fowe700" : "opacity_56"
            }   ${record?.Status === "DEACTIVATED" && "red"}`}
          >
            {record?.Status}
          </Text>
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
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                type="normal"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-contact-edit.svg"
                    alt=""
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>
            <div className="h-1 flex items-center">
              <CustomButton
                type="normal"
                size="icon"
                className="bg_danger"
                icon={
                  <Image
                    src={`/icons/ic-media-${
                      record?.Status === "ACTIVATED" ? "stop" : "play"
                    }.svg`}
                    alt=""
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>
            <div className="h-1 flex items-center">
              <CustomButton
                type="danger"
                size="icon"
                icon={
                  <Image
                    src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                    alt="OX Delivery Logo"
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table light_white_header light_white_table@"
      columns={columns}
      dataSource={SuppliersTableData}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      loading={TableOnActionLoading(false)}
    />
  );
};

export default SuppliersTable;
