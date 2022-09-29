/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import Typography from "antd/lib/typography";
import RowsWrapper from "../RowsWrapper";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import { Form, Image } from "antd";
import CustomButton from "../../Shared/Button";
import { SuppliersTableTypes } from "../../../lib/types/pageTypes/Warehouse/Suppliers/SuppliersTableTypes";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import {
  useDeleteSupplierMutation,
  useEditSupplierMutation,
  useToggleSupplierMutation
} from "../../../lib/api/endpoints/Warehouse/supplierEndpoints";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditSupplier from "../../Forms/Warehouse/Edit/EditSupplier";

const { Text } = Typography;

type SuppliersTableProps = {
  isModalVisible: boolean;
  showModal: any;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  suppliers: any;
  isSuppliersFetching: boolean;
};

const SuppliersTable: FC<SuppliersTableProps> = ({
  isModalVisible,
  setIsModalVisible,
  showModal,
  isSuppliersFetching,
  suppliers
}) => {
  const [form] = Form.useForm();

  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [itemToToggle, setItemToToggle] =
    useState<SetStateAction<number | undefined>>();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [deleteSupplier, { isLoading: isDeleting }] =
    useDeleteSupplierMutation();
  const [toggleSUpplier, { isLoading: isTogglingSupplier }] =
    useToggleSupplierMutation();
  const [editSupplier, { isLoading: isEditing }] = useEditSupplierMutation();

  //DELTE
  const handleDeleteSupplier = () => {
    deleteSupplier({
      id: itemToDelete
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //TOGGLE
  const handleToggleSupplier = (id: number) => {
    setItemToToggle(id);
    toggleSUpplier({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //EDIT
  //edit
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const onEditSupplierFinish = (values: any) => {
    editSupplier({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      tinNumber: values?.tinNumber,
      economicStatus: values?.economicStatus,
      id: itemToEdit?.id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsEditModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Name</span>
        </div>
      ),
      key: "Name",
      render: (
        text: SuppliersTableTypes,
        record: SuppliersTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className={`normalText fowe700`}>{record?.names}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "Phonenumber",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">{record?.phone}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Address",
      key: "Address",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.offices?.length !== 0 ? record?.offices[0]?.location : "-"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "TIN",
      key: "TIN",
      render: (text: SuppliersTableTypes, record: SuppliersTableTypes) => (
        <RowsWrapper>
          <Text className="normalText fowe700">
            {record?.tinNumber ? record?.tinNumber : "-"}
          </Text>
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
              !record?.enabled ? "fowe700" : "opacity_56"
            }   ${!record?.enabled && "red"}`}
          >
            {record?.enabled ? "ACTIVE" : "DEACTIVATED"}
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
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => handleToggleSupplier(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                disabled={record?.id === itemToToggle && isTogglingSupplier}
                loading={record?.id === itemToToggle && isTogglingSupplier}
                icon={
                  <Image
                    src={`/icons/ic-media-${
                      record?.enabled ? "stop" : "play"
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
                onClick={() => showModal(setItemToDelete(record?.id))}
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
    <>
      <Table
        className="data_table light_white_header light_white_table@"
        columns={columns}
        dataSource={suppliers}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isSuppliersFetching)}
      />
      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteSupplier()}
        loading={isDeleting}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT SUPPLIER"
        loading={isEditing}
      >
        <EditSupplier
          onEditSupplierFinish={onEditSupplierFinish}
          isLoading={isEditing}
          form={form}
        />
      </ModalWrapper>
    </>
  );
};

export default SuppliersTable;
