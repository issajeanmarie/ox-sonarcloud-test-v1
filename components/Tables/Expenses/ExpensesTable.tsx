import { Table } from "antd";
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
import {
  useDeleteResourceMutation,
  useEditResourceMutation
} from "../../../lib/api/endpoints/Resources/resourcesEndpoints";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import ReacordExpense from "../../Forms/Expenses/RecordExpense";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch } from "react-redux";
import { abbreviateNumber } from "../../../utils/numberFormatter";
import FilePreview from "../../Shared/FilePreview";
import ViewExpense from "../../Expenses/ViewExpense";

const { Column } = Table;
const { Text } = Typography;

const ResourcesTable: FC<ExpensesTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  expenses,
  isExpensesFetching
}) => {
  const [itemToUpload, setItemToUpload] =
    useState<SetStateAction<number | undefined>>();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [isViewModalVisible, setIsViewModalVisible] = useState<boolean>(false);
  const [itemToView, setItemToView]: any = useState();
  const [, { isLoading: isEditing }] = useEditResourceMutation();
  const [deleteResource, { isLoading: isDeleting }] =
    useDeleteResourceMutation();

  const dispatch = useDispatch();

  // const dispatchReplace = (newContent: any) => {
  //   dispatch(
  //     displayPaginatedData({
  //       payload: {
  //         payload: {
  //           content: [...newContent],
  //           totalPages: expenses.payload.totalPages,
  //           totalElements: expenses.payload.totalElements
  //         }
  //       },
  //       replace: true
  //     })
  //   );
  // };

  const handleUploadExpenseSuccess = () => {
    setIsModalVisible(false);
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete } })
    );
  };

  const handleUploadExpense = () => {
    handleAPIRequests({
      request: deleteResource,
      id: itemToUpload,
      showSuccess: true,
      handleSuccess: handleUploadExpenseSuccess
    });
  };

  const handleDeleteExpenseSuccess = () => {
    setIsModalVisible(false);
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete } })
    );
  };

  const handleDeleteExpense = () => {
    handleAPIRequests({
      request: deleteResource,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteExpenseSuccess
    });
  };

  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
  };

  const showViewModal = (record: any) => {
    setItemToView(record);
    setIsViewModalVisible(true);
  };

  // const handleEditExpenseSuccess = ({ payload }: any) => {
  //   setIsEditModalVisible(false);

  //   const newExpensesList: any = [];

  //   expenses?.payload?.content?.map((resource: any) => {
  //     if (resource.id === payload.id) {
  //       newExpensesList.push(payload);
  //     } else {
  //       newExpensesList.push(resource);
  //     }
  //   });

  //   dispatchReplace(newExpensesList);
  // };

  const onEditExpenseFinish = () => {
    // handleAPIRequests({
    //   request: editResource,
    //   title: values?.title,
    //   link: values?.link,
    //   id: itemToEdit?.id,
    //   showSuccess: true,
    //   handleSuccess: handleEditExpenseSuccess
    // });
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
              <Text className="normalText fowe700">{record?.supplier}</Text>
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
                {record?.truck}
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
                {record?.attachment ? (
                  <FilePreview
                    className="h-9 !pr-2 !pl-2"
                    fileName={
                      record.attachment.split("/")[
                        record.attachment.split("/").length - 1
                      ]
                    }
                    onClick={() => handleDownloadFile(record.attachment)}
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
          render={(record: any) => {
            const child = (
              <Row align="middle" gutter={16} wrap={false}>
                <Col className="my-[-12px]">
                  {record.approved ? (
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
                      onClick={() => showModal(setItemToUpload(record?.id))}
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
                    onClick={() => showModal(setItemToDelete(record?.id))}
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
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleUploadExpense()}
        loading={isDeleting}
      />
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteExpense()}
        loading={isDeleting}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT EXPENSE"
        loading={isEditing}
        footerContent={
          <Button
            form="ReacordExpense"
            type="primary"
            htmlType="submit"
            loading={isEditing}
          >
            SAVE CHANGES
          </Button>
        }
      >
        <ReacordExpense
          editExpenseData={itemToEdit}
          onRecordExpenseFinish={onEditExpenseFinish}
          isLoading={isEditing}
        />
      </ModalWrapper>

      <ModalWrapper
        setIsModalVisible={setIsViewModalVisible}
        isModalVisible={isViewModalVisible}
        title="EDIT EXPENSE"
        loading={isEditing}
        footerContent={
          <Button type="success" loading={isDeleting}>
            APPROVE
          </Button>
        }
      >
        <ViewExpense expense={itemToView} />
      </ModalWrapper>
    </>
  );
};

export default ResourcesTable;
