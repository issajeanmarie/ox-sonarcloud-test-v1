/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Form } from "antd";
import Typography from "antd/lib/typography";
import { AgentsTableTypes } from "../../../lib/types/pageTypes/Accounts/Agents/AgentsTableTypes";
import { AgentsTableProps } from "../../../lib/types/pageTypes/Accounts/Agents/AgentsTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import { Image } from "antd";
import { FC, SetStateAction, useState } from "react";
import ActionModal from "../../Shared/ActionModal";
import { TableOnActionLoading } from "../../Shared/Loaders/Loaders";
import {
  useDeleteAgentMutation,
  useEditAgentMutation,
  useToggleAgentMutation,
  useSendResetPWDToAgentMutation
} from "../../../lib/api/endpoints/Accounts/agentsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import ModalWrapper from "../../Modals/ModalWrapper";
import EditAgent from "../../Forms/Accounts/Agents/EditAgent";

const { Text } = Typography;

const AgentsTable: FC<AgentsTableProps> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Agents,
  isAgentsFetching
}) => {
  const [form] = Form.useForm();
  const [itemToDelete, setItemToDelete] =
    useState<SetStateAction<number | undefined>>();
  const [AgentToToggle, setAgentToToggle] = useState();
  const [agentToReset, setAgentToReset] = useState();

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [deleteAgent, { isLoading }] = useDeleteAgentMutation();
  const [editAgent, { isLoading: isEditing }] = useEditAgentMutation();
  const [toggleAgent, { isLoading: isTooglingAgent }] =
    useToggleAgentMutation();
  const [sendResetPWDToAgent, { isLoading: isSending }] =
    useSendResetPWDToAgentMutation();

  const handleDeleteAgent = () => {
    deleteAgent({
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

  const onEditAgentFinish = (values: any) => {
    editAgent({
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
  const hangleToggleAgent = (id: any) => {
    setAgentToToggle(id);
    toggleAgent({
      id: id
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  //reset
  const handleResetPWDAgent = (id: any) => {
    setAgentToReset(id);
    sendResetPWDToAgent({
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
        text: AgentsTableTypes,
        record: AgentsTableTypes,
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
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
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
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
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
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
        <RowsWrapper>
          <Text className="normalText fowe700">{record?.role}</Text>
        </RowsWrapper>
      )
    },
    {
      title: "Status",
      key: "status",
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
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
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                onClick={() => handleResetPWDAgent(record?.id)}
                loading={agentToReset === record?.id && isSending}
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
                onClick={() => hangleToggleAgent(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                loading={record?.id === AgentToToggle && isTooglingAgent}
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
        dataSource={Agents}
        rowKey={(record) => record?.key}
        pagination={false}
        bordered={false}
        scroll={{ x: 0 }}
        loading={TableOnActionLoading(isAgentsFetching)}
      />

      <ActionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title="warning!"
        description="This action is not reversible, please make sure you really want to proceed with this action!"
        actionLabel="PROCEED"
        type="danger"
        action={() => handleDeleteAgent()}
        loading={isLoading}
      />

      <ModalWrapper
        setIsModalVisible={setIsEditModalVisible}
        isModalVisible={isEditModalVisible}
        title="EDIT AGENT"
        loading={isEditing}
      >
        <EditAgent
          onEditAgentFinish={onEditAgentFinish}
          isLoading={isEditing}
          form={form}
        />
      </ModalWrapper>
    </>
  );
};

export default AgentsTable;
