/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Form } from "antd";
import Typography from "antd/lib/typography";
import { AdminsTableTypes } from "../../../lib/types/pageTypes/Accounts/Admins/AdminsTableTypes";
import { AdminsTableProps } from "../../../lib/types/pageTypes/Accounts/Admins/AdminsTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import {
  useDeleteAdminMutation,
  useEditAdminMutation,
  useToggleAdminMutation,
  useSendResetPWDToAdminMutation
} from "../../../lib/api/endpoints/Accounts/adminsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditAdmin from "../../Forms/Accounts/Admins/EditAdmin";

const { Text } = Typography;

const AdminsTable: FC<AdminsTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Admins,
  isAdminsFetching
}) => {
  const [form] = Form.useForm();
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [AdminToToggle, setAdminToToggle] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [adminToReset, setAdminToReset] = useState();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [deleteAdmin, { isLoading }] = useDeleteAdminMutation();
  const [editAdmin, { isLoading: isEditing }] = useEditAdminMutation();
  const [toggleAdmin, { isLoading: isTooglingAdmin }] =
    useToggleAdminMutation();
  const [sendResetPWDToAdmin, { isLoading: isSending }] =
    useSendResetPWDToAdminMutation();

  const handleDeleteAdmin = () => {
    deleteAdmin({
      id: itemToDelete
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //edit
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const onEditAdminFinish = (values: any) => {
    editAdmin({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      isGuest: checkbox,
      isSuperAdmin: !checkbox,
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

  //toggle
  const hangleToggleAdmin = (id: any) => {
    setAdminToToggle(id);
    toggleAdmin({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //reset
  const handleResetPWDAdmin = (id: any) => {
    setAdminToReset(id);
    sendResetPWDToAdmin({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  const columns: any = [
    {
      title: (
        <div className="flex gap-10">
          <span>#</span>
          <span>Names</span>
        </div>
      ),
      key: "Names",
      render: (
        text: AdminsTableTypes,
        record: AdminsTableTypes,
        index: number
      ) => (
        <RowsWrapper>
          <div className="flex gap-10">
            <Text className="normalText opacity_56">{index + 1}</Text>
            <Text className="normalText fowe700">{record?.names}</Text>
          </div>
        </RowsWrapper>
      )
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      render: (text: AdminsTableTypes, record: AdminsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.phone ? record?.phone : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Email",
      key: "email",
      render: (text: AdminsTableTypes, record: AdminsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText opacity_56">
            {record?.email ? record?.email : "---"}
          </Text>
        </RowsWrapper>
      )
    },
    {
      title: "Role",
      key: "Role",
      render: (text: AdminsTableTypes, record: AdminsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText fowe700">{record?.role}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (text: AdminsTableTypes, record: AdminsTableTypes) => (
        <RowsWrapper>
          {!record?.enabled ? (
            <Text className=" text-sm font-bold red">DEACTIVATED</Text>
          ) : (
            <Text className="normalText opacity_56">ACTIVE</Text>
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
      render: (text: AdminsTableTypes, record: AdminsTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => handleResetPWDAdmin(record?.id)}
                loading={adminToReset === record?.id && isSending}
                type="normal"
                size="icon"
                icon={
                  <Image
                    src="/icons/ic-security-unlocked.svg"
                    alt=""
                    width={16}
                    preview={false}
                  />
                }
              />
            </div>
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
                onClick={() => hangleToggleAdmin(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                loading={record?.id === AdminToToggle && isTooglingAdmin}
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
        className="data_table light_white_header light_white_table"
        columns={columns}
        dataSource={Admins}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isAdminsFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteAdmin()}
        loading={isLoading}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT ADMIN"
        loading={isEditing}
      >
        <EditAdmin
          onEditAdminFinish={onEditAdminFinish}
          isLoading={isEditing}
          form={form}
          setCheckbox={setCheckbox}
          checkbox={checkbox}
        />
      </ModalWrapper>
    </>
  );
};

export default AdminsTable;
