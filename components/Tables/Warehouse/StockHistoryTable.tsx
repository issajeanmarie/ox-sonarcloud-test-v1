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
import {
  useDeleteBatchMutation,
  useEditStockMutation
} from "../../../lib/api/endpoints/Warehouse/stockEndpoints";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditStock from "../../Forms/Warehouse/Edit/EditStock";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { useSuppliersQuery } from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import Link from "next/link";
import { routes } from "../../../config/route-config";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import ActionModal from "../../Shared/ActionModal";
import { userType } from "../../../helpers/getLoggedInUser";
import { useLhsOrdersQuery } from "../../../lib/api/endpoints/Orders/ordersEndpoints";
import { localeString } from "../../../utils/numberFormatter";

const { Text } = Typography;

type StockHistoryTableProps = {
  Stocks: any;
  isStocksFetching: boolean;
  isStockCategoriesFetching: boolean;
  tableType?: string;
  setBatches: any;
  isEditSpecificBatch: boolean;
};

const StockHistoryTable: FC<StockHistoryTableProps> = ({
  Stocks,
  isStockCategoriesFetching,
  tableType,
  setBatches,
  isEditSpecificBatch
}) => {
  const [form] = Form.useForm();

  const [itemToDelete, setItemToDelete] = useState<any>({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [editStock, { isLoading: isEditing }] = useEditStockMutation();
  const [deleteStock, { isLoading: isDeleteStockLoading }] =
    useDeleteBatchMutation();

  const user = userType();

  //edit

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();
  const { data: lhsOrders, isLoading: isLhsOrdersLoading } =
    useLhsOrdersQuery();

  const { data: suppliers, isLoading: isSuppliersLoading } = useSuppliersQuery({
    page: "",
    size: 100,
    sort: ""
  });

  const { data: depots, isLoading: isDepotsLoading } = useDepotsQuery();
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);

    form.setFieldsValue({
      ...record,
      inDate: moment(record?.inDate),
      expiryDate: moment(record?.expiryDate),
      lhsOrderId: record?.lhsOrder?.id,
      supplierId: record?.supplier.id
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

    isEditSpecificBatch &&
      setBatches({
        ...Stocks,
        payload: {
          ...Stocks.payload,
          content: [...newStocksList]
        }
      });

    isEditSpecificBatch === false && dispatchReplace(newStocksList);
  };

  const onEditStockFinish = (values: any) => {
    handleAPIRequests({
      request: editStock,
      batchId: itemToEdit?.id,
      id: itemToEdit?.warehouseItem?.id,
      ...values,
      showSuccess: true,
      handleSuccess: handleEditStockSuccess
    });
  };

  const showDeleteModal = (batch: any) => {
    setItemToDelete(batch);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteStockSuccess = () => {
    const filteredBatches = Stocks?.payload?.content?.filter(
      (batch: { id: number }) => batch.id !== itemToDelete.id
    );

    setBatches({
      ...Stocks,
      payload: {
        ...Stocks.payload,
        content: [...filteredBatches]
      }
    });

    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete.id } })
    );

    setIsDeleteModalVisible(false);
  };

  const handleDeleteStock = () => {
    handleAPIRequests({
      request: deleteStock,
      batchId: itemToDelete?.id,
      id: itemToDelete?.warehouseItem?.id,
      showSuccess: true,
      handleSuccess: handleDeleteStockSuccess
    });
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          {tableType === "STOCK_HISTORY" && <span>Category</span>}
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
            {tableType === "STOCK_HISTORY" && (
              <Text
                className={`normalText ${
                  record?.enabled ? "fowe700" : "opacity_56"
                }`}
              >
                {record?.parentCategoryName}
              </Text>
            )}
          </div>
        </RowsWrapper>
      )
    },
    {
      title: tableType === "STOCK_HISTORY" && "Sub-Category",
      key: "Sub-Category",
      render: (text: StockHistoryTableTypes, record: StockHistoryTableTypes) =>
        tableType === "STOCK_HISTORY" && (
          <RowsWrapper>
            <Text className="normalText opacity_56">
              {record?.categoryName}
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
          <Text className="normalText opacity_56 text_ellipsis">
            {record?.expiryDate && moment(record?.expiryDate).format("ll")}
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
          <Text className="normalText opacity_56 text_ellipsis">
            {record?.supplierName}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "KGs/Bags",
      key: "KGs",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText fowe700">
            {record?.weight} / {record?.weight / 50}
          </Text>
        </RowsWrapper>
      )
    },

    {
      title: <span className="nowrap">Total buying price</span>,
      key: "Buying price",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56 text_ellipsis">
            {localeString(record?.unitBuyingPrice * record?.weight)}
          </Text>
        </RowsWrapper>
      )
    },

    {
      title: <span className="nowrap">Total selling price</span>,
      key: "Selling price",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Text className="normalText opacity_56 text_ellipsis">
            {localeString(record?.unitSellingPrice * record?.weight)}
          </Text>
        </RowsWrapper>
      )
    },

    {
      title: <span className="nowrap">Exp. Date</span>,
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
      title: <span className="nowrap">LHS order</span>,
      key: "Transport",
      render: (
        text: StockHistoryTableTypes,
        record: StockHistoryTableTypes
      ) => (
        <RowsWrapper>
          <Link passHref href={routes.viewOrder.url + record?.lhsOrder?.id}>
            <Text className="normalText fowe700 cursor-pointer">
              {record?.lhsOrder ? (
                <span className="underline nowrap">
                  #{record?.lhsOrder?.id}
                </span>
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
            className={`normalText nowrap fowe700  ${
              record?.expired ? "opacity_56" : ""
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

            {user.isSuperAdmin && (
              <div className="h-1 flex items-center">
                <CustomButton
                  onClick={() => showDeleteModal(record)}
                  type="normal"
                  size="icon"
                  icon={
                    <Image
                      src="/icons/delete_forever_FILL0_wght400_GRAD0_opsz48 1.svg"
                      alt=""
                      width={16}
                      preview={false}
                    />
                  }
                />
              </div>
            )}
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
        loading={TableOnActionLoading(isStockCategoriesFetching)}
      />

      <ActionModal
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        type="danger"
        action={() => handleDeleteStock()}
        loading={isDeleteStockLoading}
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
        title="EDIT BATCH"
        loading={isEditing}
        destroyOnClose
      >
        <EditStock
          onEditStockFinish={onEditStockFinish}
          form={form}
          categories={categories?.payload}
          isCategoriesLoading={isCategoriesLoading}
          depots={depots?.payload}
          isDepotsLoading={isDepotsLoading}
          suppliers={suppliers}
          isSuppliersLoading={isSuppliersLoading}
          itemToEdit={itemToEdit}
          lhsOrders={lhsOrders?.payload?.content}
          isOrdersLoading={isLhsOrdersLoading}
        />
      </ModalWrapper>
    </>
  );
};

export default StockHistoryTable;
