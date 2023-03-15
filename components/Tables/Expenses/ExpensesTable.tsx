import { Checkbox, Table } from "antd";
import React, { FC, useState } from "react";
import Typography from "antd/lib/typography";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { LoadingOutlined } from "@ant-design/icons";
import CustomButton from "../../Shared/Button/button";
import Button from "../../Shared/Button";
import { dateFormatter } from "../../../utils/dateFormatter";
import { ExpensesTableTypes } from "../../../lib/types/pageTypes/Expenses/ExpensesTableTypes";
import { ExpensesTableProps } from "../../../lib/types/pageTypes/Expenses/ExpensesTableProps";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import { abbreviateNumber } from "../../../utils/numberFormatter";
import FilePreview from "../../Shared/FilePreview";
import ViewExpense from "../../Expenses/ViewExpense";
import { Expense } from "../../../lib/types/expenses";
import { userType } from "../../../helpers/getLoggedInUser";
import {
  useLazyDownloadFromQBQuery,
  useLazyDownloadFromServerQuery
} from "../../../lib/api/endpoints/Expenses/expensesEndpoint";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";

const { Column } = Table;
const { Text } = Typography;

const ResourcesTable: FC<ExpensesTableProps> = ({
  expenses,
  isExpensesFetching,
  onSelectRows,
  showEditModal,
  showDeleteModal,
  showApproveModal,
  onQBAuthFailure
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [itemToView, setItemToView] = useState<Expense>();
  const [itemsToDownload, setItemsToDownload] = useState<Expense[]>([]);
  const [downloadFromServer, { isFetching: isLoadingFromServer }] =
    useLazyDownloadFromServerQuery();
  const [downloadFromQB, { isFetching: isLoadingFromQB }] =
    useLazyDownloadFromQBQuery();

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

  const expensesToSelect = expenses?.payload?.content.filter(
    (expense: Expense) => expense.status !== "APPROVED"
  );

  const onToggleRows = () => {
    let newRows = [];
    if (selectedRows.length !== expensesToSelect.length) {
      newRows = expensesToSelect.map((record: ExpensesTableTypes) => record.id);
    }

    setSelectedRows(newRows);
    onSelectRows && onSelectRows(newRows);
  };

  const showViewModal = (record: Expense) => {
    setItemToView(record);
    setIsViewModalVisible(true);
  };

  const downloadFile = (expense: Expense) => {
    setItemsToDownload([...itemsToDownload, expense]);
    if (expense.qbAttachableId && expense.qbAttachableFileName) {
      handleAPIRequests({
        request: downloadFromQB,
        handleSuccess: (res: any) => handleDownloadFromQBSuccess(res, expense),
        handleFailure: (res: any) => handleDownloadFailure(res, expense),
        showFailure: false,
        id: expense.id
      });
    } else {
      handleAPIRequests({
        request: downloadFromServer,
        handleSuccess: (file: File) => handleDownloadSuccess(file, expense),
        handleFailure: (res: any) => handleDownloadFailure(res, expense),
        showFailure: false,
        id: expense.id
      });
    }
  };

  const handleDownloadSuccess = (file: File, expense: Expense) => {
    const name =
      expense.attachmentUrl.split("/")[
        expense.attachmentUrl.split("/").length - 1
      ];
    const fileFormat =
      expense.attachmentUrl.split(".")[
        expense.attachmentUrl.split(".").length - 1
      ];

    setItemsToDownload(
      itemsToDownload.filter((item) => item.id !== expense.id)
    );

    handleDownloadFile({
      file,
      name,
      fileFormat
    });
  };

  const handleDownloadFromQBSuccess = (res: any, expense: Expense) => {
    setItemsToDownload(
      itemsToDownload.filter((item) => item.id !== expense.id)
    );

    if (window) {
      window.open(res?.payload, "_blank", "noreferrer");
    }
  };

  const handleDownloadFailure = (res: any, expense: Expense) => {
    setItemsToDownload(
      itemsToDownload.filter((item) => item.id !== expense.id)
    );

    if (
      res?.status === 401 ||
      (res?.data?.message &&
        (res.data.message.indexOf("Access is denied") !== -1 ||
          res.data.message.indexOf("Token expired") !== -1 ||
          res.data.message.indexOf("Token revoked") !== -1))
    ) {
      onQBAuthFailure();
    } else {
      ErrorMessage(
        res?.data?.message || "No attachable found for this expense"
      );
    }
  };

  const onApprove = (id: number) => {
    setIsViewModalVisible(false);
    showApproveModal(id);
  };

  const isApproveDisabled = (expense: Expense) => {
    return (
      !expense.depot ||
      !expense.date ||
      !expense.qbSupplierId ||
      !expense.amount ||
      !expense.qbTruckId ||
      !expense.qbLocationId ||
      !expense.description ||
      !expense.attachmentUrl ||
      !expense.qbPaymentMethodId ||
      !expense.qbPaymentType ||
      !expense.qbAccountId ||
      !expense.qbCategoryId ||
      (!userType().isAdmin && !userType().isSuperAdmin)
    );
  };

  return (
    <>
      <Table
        className="data_table"
        rowClassName={(record: ExpensesTableTypes) =>
          `rounded${record.status === "APPROVED" ? " bg_light_white" : ""}`
        }
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
                  selectedRows.length === expensesToSelect.length
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
                disabled={record.status === "APPROVED"}
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
                {abbreviateNumber(record.amount || 0) + " RWF"}
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
            const child =
              record.qbAttachableFileName || record?.attachmentUrl ? (
                <FilePreview
                  className="h-9 w-56 !pr-2 !pl-2"
                  fileName={
                    record.qbAttachableFileName ||
                    record.attachmentUrl.split("/")[
                      record.attachmentUrl.split("/").length - 1
                    ]
                  }
                  onClick={() => downloadFile(record)}
                  disabled={
                    itemsToDownload.find((item) => item.id === record.id) &&
                    (isLoadingFromServer || isLoadingFromQB)
                  }
                  suffixIcon={
                    itemsToDownload.find((item) => item.id === record.id) &&
                    (isLoadingFromServer || isLoadingFromQB) ? (
                      <LoadingOutlined
                        width={14}
                        className="text-sm text-ox-red"
                      />
                    ) : (
                      <Image
                        src={"/icons/download_2.svg"}
                        alt=""
                        width={14}
                        preview={false}
                      />
                    )
                  }
                />
              ) : (
                "---"
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
                      disabled={isApproveDisabled(record)}
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

                <Col className="my-[-12px]">
                  <CustomButton
                    type="normal"
                    size="icon"
                    disabled={record?.status === "APPROVED"}
                    onClick={() => showEditModal(record)}
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
                    disabled={record?.status === "APPROVED"}
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

      <ModalWrapper
        setIsModalVisible={setIsViewModalVisible}
        isModalVisible={isViewModalVisible}
        title="EXPENSE TRACKER"
        loading={false}
        footerWidth={24}
        footerContent={
          itemToView && itemToView.status === "PENDING" ? (
            <Row gutter={[16, 16]} align="middle" justify="space-between">
              <Col flex="none">
                <span className="heading2">PENDING APPROVAL</span>
              </Col>
              <Col flex="none">
                <Button type="success" onClick={() => onApprove(itemToView.id)}>
                  APPROVE
                </Button>
              </Col>
            </Row>
          ) : (
            <Row gutter={[16, 16]} align="middle" justify="space-between">
              <Col flex="none">
                <span className="heading2">APPROVED EXPENSE</span>
              </Col>
            </Row>
          )
        }
      >
        <ViewExpense
          expense={itemToView as Expense}
          onQBAuthFailure={onQBAuthFailure}
        />
      </ModalWrapper>
    </>
  );
};

export default ResourcesTable;
