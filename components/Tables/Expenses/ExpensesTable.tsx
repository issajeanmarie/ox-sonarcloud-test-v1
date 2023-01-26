import { Checkbox, Table } from "antd";
import React, { FC, useState, SetStateAction } from "react";
import Typography from "antd/lib/typography";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "../../Shared/Button/button";
import Button from "../../Shared/Button";
import { dateFormatter } from "../../../utils/dateFormatter";
import { ExpensesTableTypes } from "../../../lib/types/pageTypes/Expenses/ExpensesTableTypes";
import { ExpensesTableProps } from "../../../lib/types/pageTypes/Expenses/ExpensesTableProps";
import ActionModal from "../../Shared/ActionModal";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch } from "react-redux";
import { abbreviateNumber } from "../../../utils/numberFormatter";
import FilePreview from "../../Shared/FilePreview";
import ViewExpense from "../../Expenses/ViewExpense";
import { Expense } from "../../../lib/types/expenses";
import { useDeleteExpenseMutation } from "../../../lib/api/endpoints/Expenses/expensesEndpoint";

const { Column } = Table;
const { Text } = Typography;

const ResourcesTable: FC<ExpensesTableProps> = ({
  expenses,
  isExpensesFetching,
  onSelectRows,
  showEditModal
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isApproveModalVisible, setIsApproveModalVisible] =
    useState<boolean>(false);
  const [itemToAprove, setItemToAprove] =
    useState<SetStateAction<number | undefined>>();
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [itemToView, setItemToView] = useState<Expense>();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const dispatch = useDispatch();

  const onToggleRow = (id: number) => {
    let newRows = [];
    if (selectedRows.includes(id)) {
      newRows = selectedRows.filter((row) => row !== id);
    } else {
      newRows = [...selectedRows, id];
    }
    setSelectedRows(newRows);
    onSelectRows && onSelectRows(newRows);
  };

  const onToggleRows = () => {
    let newRows = [];
    if (selectedRows.length !== expenses?.payload?.content.length) {
      newRows = expenses?.payload?.content.map(
        (record: ExpensesTableTypes) => record.id
      );
    }

    setSelectedRows(newRows);
    onSelectRows && onSelectRows(newRows);
  };

  const handleApproveExpenseSuccess = () => {
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete } })
    );
    setIsApproveModalVisible(false);
  };

  const handleApproveExpense = () => {
    handleAPIRequests({
      request: deleteExpense,
      id: itemToAprove,
      showSuccess: true,
      handleSuccess: handleApproveExpenseSuccess
    });
  };

  const handleDeleteExpenseSuccess = () => {
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete } })
    );
    setIsDeleteModalVisible(false);
  };

  const handleDeleteExpense = () => {
    handleAPIRequests({
      request: deleteExpense,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteExpenseSuccess
    });
  };

  const showApproveModal = (id: number) => {
    setItemToAprove(id);
    setIsApproveModalVisible(true);
  };

  const showDeleteModal = (id: number) => {
    setItemToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showViewModal = (record: Expense) => {
    setItemToView(record);
    setIsViewModalVisible(true);
  };

  const handleDownloadFile = (link: string) => {
    if (window) {
      window.open(link, "_blank", "noreferrer");
    }
  };

  return (
    <>
      <Table
        className="data_table"
        rowClassName="rounded"
        dataSource={expenses?.payload?.content}
        rowKey={(record: ExpensesTableTypes) => {
          return record.id;
        }}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isExpensesFetching)}
      >
        <Column
          width="4%"
          key="key"
          title={() => {
            return (
              <Checkbox
                checked={
                  selectedRows.length > 0 &&
                  selectedRows.length === expenses?.payload?.content.length
                }
                onChange={() => onToggleRows()}
              />
            );
          }}
          render={(text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Checkbox
                checked={selectedRows.includes(record.id)}
                onChange={() => onToggleRow(record.id)}
              />
            );
            return { children: child, props: { "data-label": "Toggle" } };
          }}
        />

        <Column
          width="4%"
          key="key"
          title="#"
          render={(
            _text: ExpensesTableTypes,
            _record: ExpensesTableTypes,
            index
          ) => {
            const child = (
              <Text className="normalText opacity_56">{index + 1}</Text>
            );
            return { children: child, props: { "data-label": "#" } };
          }}
        />

        <Column
          width="26%"
          key="supplier"
          title="Supplier"
          render={(_text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Text className="normalText fowe700">
                {record?.qbSupplierName}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Supplier" }
            };
          }}
        />

        <Column
          width="26%"
          key="truck"
          title="Truck"
          render={(text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Text className="normalText opacity_56 text_ellipsis">
                {record?.qbTruckName}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Truck" }
            };
          }}
        />

        <Column
          width="26%"
          key="date"
          title="Date"
          render={(_text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Text className="normalText opacity_56">
                {dateFormatter(record?.date)}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Date" }
            };
          }}
        />

        <Column
          width="26%"
          key="amount"
          title="Amount"
          render={(text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Text className="normalText fowe700 text_ellipsis">
                {record?.amount && abbreviateNumber(record.amount) + " RWF"}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Amount" }
            };
          }}
        />

        <Column
          width="85%"
          key="attachment"
          title="Attachment"
          render={(text: ExpensesTableTypes, record: ExpensesTableTypes) => {
            const child = (
              <Text className="normalText opacity_56 text_ellipsis">
                {record?.attachmentUrl ? (
                  <FilePreview
                    className="h-9 !pr-2 !pl-2"
                    fileName={
                      record.attachmentUrl.split("/")[
                        record.attachmentUrl.split("/").length - 1
                      ]
                    }
                    onClick={() => handleDownloadFile(record.attachmentUrl)}
                    suffixIcon={
                      <Image
                        src="/icons/download_2.svg"
                        alt=""
                        width={14}
                        preview={false}
                      />
                    }
                  />
                ) : (
                  "---"
                )}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Attachment" }
            };
          }}
        />

        <Column
          width="20%"
          key="key"
          title="Action"
          render={(record: Expense) => {
            const child = (
              <Row align="middle" gutter={16} wrap={false}>
                <Col className="my-[-12px]">
                  {record.status === "APPROVED" ? (
                    <CustomButton
                      type="normal"
                      size="icon"
                      disabled
                      icon={
                        <Image
                          src="/icons/double-check.svg"
                          alt=""
                          width={16}
                          preview={false}
                        />
                      }
                    />
                  ) : (
                    <CustomButton
                      type="success"
                      size="icon"
                      onClick={() => showApproveModal(record?.id)}
                      icon={
                        <Image
                          src="/icons/check.svg"
                          alt=""
                          width={16}
                          preview={false}
                        />
                      }
                    />
                  )}
                </Col>

                <Col
                  className="my-[-12px]"
                  onClick={() => showEditModal(record)}
                >
                  <CustomButton
                    type="normal"
                    size="icon"
                    icon={
                      <Image
                        src="/icons/ic-contact-edit.svg"
                        alt=""
                        width={12}
                        preview={false}
                      />
                    }
                  />
                </Col>

                <Col className="my-[-12px]">
                  <CustomButton
                    type="danger"
                    size="icon"
                    className="bg_danger"
                    onClick={() => showDeleteModal(record?.id)}
                    icon={
                      <Image
                        src="/icons/ic-actions-remove.svg"
                        alt=""
                        width={16}
                        preview={false}
                      />
                    }
                  />
                </Col>

                <Col className="my-[-12px]">
                  <CustomButton
                    onClick={() => showViewModal(record)}
                    type="view"
                    size="small"
                  >
                    View
                  </CustomButton>
                </Col>
              </Row>
            );
            return { children: child, props: { "data-label": "" } };
          }}
        />
      </Table>

      {/* Action Modal */}
      <ActionModal
        isModalVisible={isApproveModalVisible}
        setIsModalVisible={setIsApproveModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleApproveExpense()}
        loading={isDeleting}
      />
      <ActionModal
        isModalVisible={isDeleteModalVisible}
        setIsModalVisible={setIsDeleteModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteExpense()}
        loading={isDeleting}
      />

      <ModalWrapper
        setIsModalVisible={setIsViewModalVisible}
        isModalVisible={isViewModalVisible}
        title="EXPENSE TRACKER"
        loading={isDeleting}
        footerWidth={24}
        footerContent={
          <Row gutter={[16, 16]} align="middle" justify="space-between">
            <Col flex="none">
              <span className="heading2">PENDING APPROVAL</span>
            </Col>
            <Col flex="none">
              <Button type="success" loading={isDeleting}>
                APPROVE
              </Button>
            </Col>
          </Row>
        }
      >
        <ViewExpense expense={itemToView as Expense} />
      </ModalWrapper>
    </>
  );
};

export default ResourcesTable;
