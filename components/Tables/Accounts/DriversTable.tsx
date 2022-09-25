/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Dropdown, Form, Menu } from "antd";
import Typography from "antd/lib/typography";
import { DriversTableTypes } from "../../../lib/types/pageTypes/Accounts/Drivers/DriversTableTypes";
import { DriversTableProps } from "../../../lib/types/pageTypes/Accounts/Drivers/DriversTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import {
  SmallSpinLoader,
  TableOnActionLoading
} from "../../Shared/Loaders/Loaders";
import {
  useDeleteDriverMutation,
  useEditDriverMutation,
  useMakeDriverDispatcherMutation,
  useToggleDriverMutation
} from "../../../lib/api/endpoints/Accounts/driversEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditDriver from "../../Forms/Accounts/Drivers/EditDriver";

const { Text } = Typography;

const DriversTable: FC<DriversTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Drivers,
  isDriversFetching
}) => {
  const [form] = Form.useForm();
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [driverToToggle, setDriverToToggle] = useState();
  const [driverToMakeDispatcher, setDriverToMakeDispatcher] = useState<
    number | undefined
  >();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [deleteDriver, { isLoading }] = useDeleteDriverMutation();
  const [editDriver, { isLoading: isEditing }] = useEditDriverMutation();
  const [toggleDriver, { isLoading: isTooglingDriver }] =
    useToggleDriverMutation();
  const [makeDriverDispatcher, { isLoading: isMakingDispatcher }] =
    useMakeDriverDispatcherMutation();

  const handleDeleteDriver = () => {
    deleteDriver({
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

  const onEditDriverFinish = (values: any) => {
    editDriver({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      gender: values?.gender,
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
  const hangleToggleDriver = (id: any) => {
    setDriverToToggle(id);
    toggleDriver({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  // make dispatcher

  const handleMakeDispatcher = (id: number | undefined) => {
    setDriverToMakeDispatcher(id);
    makeDriverDispatcher({
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
        text: DriversTableTypes,
        record: DriversTableTypes,
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
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
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
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
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
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
        <RowsWrapper>
          {isMakingDispatcher && driverToMakeDispatcher === record?.id ? (
            <SmallSpinLoader />
          ) : (
            <Dropdown
              overlay={
                <Menu
                  style={{
                    marginTop: "15px",
                    padding: "10px"
                  }}
                >
                  <Menu.Item
                    onClick={() => handleMakeDispatcher(record?.id)}
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {record?.role === "DISPATCHER" ? (
                      <div className="flex flex-col">
                        <span>Deny the dispatcher role</span>
                        <span>
                          from{" "}
                          <span className="font-bold">{record?.names}</span>{" "}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span>
                          Make{" "}
                          <span className="font-bold">{record?.names}</span>
                        </span>
                        <span> a dispatcher</span>
                      </div>
                    )}
                  </Menu.Item>
                </Menu>
              }
              trigger={["click"]}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <span
                  className={`normalText ${
                    record?.role === "DISPATCHER"
                      ? "text-[#E3B221]"
                      : "text-black"
                  } fowe700`}
                >
                  {record?.role}
                </span>
                <Image
                  preview={false}
                  src="/icons/expand_more_black_24dp.svg"
                  alt=""
                  width={10}
                />
              </div>
            </Dropdown>
          )}
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
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
      render: (text: DriversTableTypes, record: DriversTableTypes) => (
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
                    width={12}
                    preview={false}
                  />
                }
              />
            </div>
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => hangleToggleDriver(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                loading={record?.id === driverToToggle && isTooglingDriver}
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
                    src="/icons/ic-actions-remove.svg"
                    alt="OX Delivery Logo"
                    width={12}
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
        dataSource={Drivers}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isDriversFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteDriver()}
        loading={isLoading}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT DRIVER"
        loading={isEditing}
      >
        <EditDriver
          onEditDriverFinish={onEditDriverFinish}
          isLoading={isEditing}
          form={form}
        />
      </ModalWrapper>
    </>
  );
};

export default DriversTable;
