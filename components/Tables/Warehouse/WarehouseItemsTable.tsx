/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { FC } from "react";
import { CloseIcon } from "../../Icons";
import { Button } from "antd";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { limitStringLengthSmall } from "../../../helpers/limitStringLength";
import {
  WarehouseItemsTableProps,
  WarehouseItemsTableTypes
} from "../../../lib/types/warehouse";
import { abbreviateNumber, localeString } from "../../../utils/numberFormatter";

const { Text } = Typography;

const WarehouseItemsTable: FC<WarehouseItemsTableProps> = ({
  items,
  setItems,
  deleteSaleItemAction
}) => {
  const deleteItem = (id: number) => {
    deleteSaleItemAction && deleteSaleItemAction(id);

    setItems(items.filter((item: any) => item?.id !== id));
    SuccessMessage("Item was removed");
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Item</span>
        </div>
      ),
      key: "Category",
      render: (
        text: WarehouseItemsTableTypes,
        record: WarehouseItemsTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <div className="flex flex-col">
              <Text className="normalText fowe900">
                {limitStringLengthSmall(record?.category || "")}
              </Text>
            </div>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "KGs",
      key: "KGs",
      render: (
        text: WarehouseItemsTableTypes,
        record: WarehouseItemsTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.weight} Kgs /{" "}
            {abbreviateNumber(Math.round(record?.weight / 50))}{" "}
            {record?.weight > 50 ? "Bags" : "Bag"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Unit price",
      key: "unitSellingPrice",
      render: (
        text: WarehouseItemsTableTypes,
        record: WarehouseItemsTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {localeString(record?.unitSellingPrice)} Rwf / Kg
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "action",
      key: "action",
      render: (
        text: WarehouseItemsTableTypes,
        record: WarehouseItemsTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => deleteItem(record?.id)}
              style={{ margin: 0, padding: 0 }}
              type="text"
            >
              {CloseIcon}
            </Button>
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <Table
      className="data_table  noborder"
      columns={columns}
      dataSource={items}
      rowKey={(record) => record?.key}
      pagination={false}
      bordered={false}
      scroll={{ x: 0 }}
      showHeader={false}
    />
  );
};

export default WarehouseItemsTable;
