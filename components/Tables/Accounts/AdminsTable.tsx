/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Form } from "antd";
import Typography from "antd/lib/typography";
import { AdminsTableTypes } from "../../../lib/types/pageTypes/Accounts/Admins/AdminsTableTypes";
import { AdminsTableProps } from "../../../lib/types/pageTypes/Accounts/Admins/AdminsTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import Button from "../../Shared/Button";
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
import ModalWrapper from "../../Modals/ModalWrapper";
import EditAdmin from "../../Forms/Accounts/Admins/EditAdmin";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

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

  const dispatch = useDispatch();

  const [deleteAdmin, { isLoading }] = useDeleteAdminMutation();
  const [editAdmin, { isLoading: isEditing }] = useEditAdminMutation();
  const [toggleAdmin, { isLoading: isTooglingAdmin }] =
    useToggleAdminMutation();
  const [sendResetPWDToAdmin, { isLoading: isSending }] =
    useSendResetPWDToAdminMutation();

  const handleDeleteAdminSuccess = ({ payload }: any) => {
    setIsModalVisible(false);
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: payload.id } })
    );

    setIsModalVisible(false);
  };

  const handleDeleteAdmin = () => {
    handleAPIRequests({
      request: deleteAdmin,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteAdminSuccess
    });
  };

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: Admins.payload.totalPages,
            totalElements: Admins.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleEditAdminsSuccess = ({ payload }: any) => {
    form.resetFields();
    setIsEditModalVisible(false);

    const newAdminsList: any = [];

    Admins?.payload?.content?.map((agent: any) => {
      if (agent.id === payload.id) {
        newAdminsList.push(payload);
      } else {
        newAdminsList.push(agent);
      }
    });

    dispatchReplace(newAdminsList);
  };

  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
  };

  const onEditAdminFinish = (values: any) => {
    handleAPIRequests({
      request: editAdmin,
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      isGuest: checkbox,
      isSuperAdmin: !checkbox,
      id: itemToEdit?.id,
      showSuccess: true,
      handleSuccess: handleEditAdminsSuccess
    });
  };

  const handleToggleAdminSuccess = ({ payload }: any) => {
    const newAdminsList: any = [];

    Admins?.payload?.content?.map((admin: any) => {
      if (admin.id === payload.id) {
        newAdminsList.push({ ...admin, enabled: payload.enabled });
      } else {
        newAdminsList.push(admin);
      }
    });

    dispatchReplace(newAdminsList);
  };

  //toggle
  const handleToggleAdmin = (id: any) => {
    setAdminToToggle(id);
    handleAPIRequests({
      request: toggleAdmin,
      id,
      showSuccess: true,
      handleSuccess: handleToggleAdminSuccess
    });
  };

  //reset
  const handleResetPWDAdmin = (id: any) => {
    setAdminToReset(id);
    handleAPIRequests({
      request: sendResetPWDToAdmin,
      id,
      showSuccess: true
    });
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
          <Text className="normalText fowe700">
            {record?.role?.replace("_", " ")}
          </Text>
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
          ) : null}
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
                onClick={() => handleToggleAdmin(record?.id)}
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
        dataSource={Admins?.payload?.content}
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
        footerContent={
          <Button
            form="EditAdmin"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
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
