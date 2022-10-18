import { Table } from "antd";
import React, { FC, useState, SetStateAction } from "react";
import Typography from "antd/lib/typography";
import Image from "antd/lib/image";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Form } from "antd";
import CustomButton from "../../../components/Shared/Button/button";
import { dateFormatter } from "../../../utils/dateFormatter";
import { ResourcesTableProps } from "../../../lib/types/pageTypes/Resources/ResourcesTableProps";
import ActionModal from "../../Shared/ActionModal";
import {
  useDeleteResourceMutation,
  useEditResourceMutation
} from "../../../lib/api/endpoints/Resources/resourcesEndpoints";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditResource from "../../Forms/Resources/EditResource";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";
import { useDispatch } from "react-redux";

const { Column } = Table;
const { Text } = Typography;

type SingleResourceTypes = {
  id: number;
  title: string;
  createdAt: string;
  link: string;
  active: boolean;
};

const ResourcesTable: FC<ResourcesTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  resources,
  isResourcesFetching
}) => {
  const [form] = Form.useForm();
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [deleteResource, { isLoading }] = useDeleteResourceMutation();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();
  const [editResource, { isLoading: isEditing }] = useEditResourceMutation();

  const dispatch = useDispatch();

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: resources.payload.totalPages,
            totalElements: resources.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleDeleteResourceSuccess = () => {
    setIsModalVisible(false);
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: itemToDelete } })
    );
  };

  const handleDeleteResource = () => {
    handleAPIRequests({
      request: deleteResource,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteResourceSuccess
    });
  };

  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleEditResourceSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsEditModalVisible(false);

    const newResourcesList: any = [];

    resources?.payload?.content?.map((resource: any) => {
      if (resource.id === payload.id) {
        newResourcesList.push(payload);
      } else {
        newResourcesList.push(resource);
      }
    });

    dispatchReplace(newResourcesList);
  };

  const onEditResourceFinish = (values: any) => {
    handleAPIRequests({
      request: editResource,
      title: values?.title,
      link: values?.link,
      id: itemToEdit?.id,
      showSuccess: true,
      handleSuccess: handleEditResourceSuccess
    });
  };

  return (
    <>
      {/* Table */}

      <Table
        className="data_table"
        rowClassName="rounded"
        dataSource={resources?.payload?.content}
        rowKey={(record: SingleResourceTypes) => {
          return record.id;
        }}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isResourcesFetching)}
      >
        <Column
          width="4%"
          key="key"
          title="#"
          render={(
            _text: SingleResourceTypes,
            _record: SingleResourceTypes,
            index
          ) => {
            const child = (
              <Text className="normalText opacity_56">{index + 1}</Text>
            );
            return { children: child, props: { "data-label": "#" } };
          }}
        />

        <Column
          width="25%"
          key="title"
          title="Title"
          render={(_text: SingleResourceTypes, record: SingleResourceTypes) => {
            const child = (
              <Text className="normalText fowe700">{record?.title}</Text>
            );
            return {
              children: child,
              props: { "data-label": "Title" }
            };
          }}
        />

        <Column
          width="85%"
          key="date"
          title="Date"
          render={(_text: SingleResourceTypes, record: SingleResourceTypes) => {
            const child = (
              <Text className="normalText opacity_56">
                {dateFormatter(record?.createdAt)}
              </Text>
            );
            return {
              children: child,
              props: { "data-label": "Date" }
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
                  <a
                    href={record?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CustomButton type="view" size="small">
                      Open Link
                    </CustomButton>
                  </a>
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
        action={() => handleDeleteResource()}
        loading={isLoading}
      />

      {/* Edit Admin Modal */}
      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT RESOURCE"
        loading={isEditing}
      >
        <EditResource
          onEditResourceFinish={onEditResourceFinish}
          isLoading={isEditing}
          form={form}
        />
      </ModalWrapper>
    </>
  );
};

export default ResourcesTable;
