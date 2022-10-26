/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { StockHistoryTableTypes } from "../../../lib/types/pageTypes/Warehouse/Stock/StockHistoryTableTypes";
import { Form, Image } from "antd";
import CustomButton from "../../Shared/Button";
import Button from "../../Shared/Button";
import moment from "moment";
import { FC, useState } from "react";
import { useEditStockMutation } from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditStock from "../../Forms/Warehouse/Edit/EditStock";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { useOrdersQuery } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { useSuppliersQuery } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import Link from "next/link";
import { routes } from "../../../config/route-config";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const { Text } = Typography;

type StockHistoryTableProps = {
  Stocks: any;
  isStocksFetching: boolean;
};

const StockHistoryTable: FC<StockHistoryTableProps> = ({
  Stocks,
  isStocksFetching
}) => {
  const [form] = Form.useForm();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [editStock, { isLoading: isEditing }] = useEditStockMutation();

  //edit

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const { data: orders, isLoading: isOrdersLoading } = useOrdersQuery({
    depot: "",
    driver: "",
    truck: "",
    page: "",
    size: 10000000,
    start: "",
    end: "",
    filter: "",
    momoRefCode: ""
  });

  const { data: suppliers, isLoading: isSuppliersLoading } = useSuppliersQuery({
    page: "",
    size: 10000000,
    sort: ""
  });

  const { data: depots, isLoading: isDepotsLoading } = useDepotsQuery();
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue({
      ...record,
      inDate: moment(record?.inDate, "ll"),
      expiryDate: moment(record?.expiryDate, "ll")
    });
  };

  const dispatch = useDispatch();

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: Stocks.payload.totalPages,
            totalElements: Stocks.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleEditStockSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsEditModalVisible(false);

    const newStocksList: any = [];

    Stocks?.payload?.content?.map((agent: any) => {
      if (agent.id === payload.id) {
        newStocksList.push(payload);
      } else {
        newStocksList.push(agent);
      }
    });

    dispatchReplace(newStocksList);
  };

  const onEditStockFinish = (values: any) => {
    handleAPIRequests({
      request: editStock,
      inDate: values?.inDate,
      expiryDate: values?.expiryDate,
      supplierId: values?.supplierId,
      weight: values?.weight,
      unitCost: values?.unitCost,
      depotId: values?.depotId,
      categoryId: values?.SubCategory,
      lhsOrderId: values?.lhsOrderId,
      id: itemToEdit?.id,
      showSuccess: true,
      handleSuccess: handleEditStockSuccess
    });
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Category</span>
        </div>
      ),
      key: "Category",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text
              className={`normalText ${
                record?.enabled ? "fowe700" : "opacity_56"
              }`}
            >
              {record?.category?.parentCategory?.name}
            </Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Sub-Category",
      key: "Sub-Category",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.category?.name}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Date",
      key: "Date",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.inDate && moment(record?.inDate).format("ll")}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Supplier",
      key: "Supplier",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.supplierName}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "KGs",
      key: "KGs",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text
            className={`normalText  ${
              record?.enabled ? "fowe700" : "opacity_56"
            } ${record?.weight < 1 && "red"} `}
          >
            {record?.weight}
          </Text>
        </RowsWrapper>
      )
    },

    {
      title: "Exp. Date",
      key: "ExpDate",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.expiryDate && moment(record?.expiryDate).format("ll")}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Transport",
      key: "Transport",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Link passHref href={routes.viewOrder.url + record?.lhsOrder?.id}>
            <Text className="normalText fowe700 cursor-pointer">
              {record?.lhsOrder ? (
                <span className="underline">{record?.lhsOrder?.id}</span>
              ) : (
                "-"
              )}
            </Text>
          </Link>
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "Status",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text
            className={`normalText  ${
              record?.expired ? "opacity_56" : "fowe700"
            }`}
          >
            {record?.expired ? "EXPIRED" : "NOT EXPIRED"}
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
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                form=""
                onClick={() => showEditModal(record)}
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
          </div>
        </RowsWrapper>
      )
    }
  ];
  return (
    <>
      <Table
        className="data_table light_white_header light_white_table@"
        columns={columns}
        dataSource={Stocks?.payload?.content}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isStocksFetching)}
      />
      <ModalWrapper
        footerContent={
          <Button
            form="EditStock"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT STOCK"
        loading={isEditing}
      >
        <EditStock
          onEditStockFinish={onEditStockFinish}
          form={form}
          categories={categories?.payload}
          isCategoriesLoading={isCategoriesLoading}
          orders={orders?.payload?.content}
          isOrdersLoading={isOrdersLoading}
          depots={depots?.payload}
          isDepotsLoading={isDepotsLoading}
          suppliers={suppliers}
          isSuppliersLoading={isSuppliersLoading}
          itemToEdit={itemToEdit}
        />
      </ModalWrapper>
    </>
  );
};

export default StockHistoryTable;
