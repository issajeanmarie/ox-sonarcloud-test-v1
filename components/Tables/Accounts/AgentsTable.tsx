/* eslint-disable @typescript-eslint/no-explicit-any */
import Table from "antd/lib/table";
import { Form } from "antd";
import Typography from "antd/lib/typography";
import { AgentsTableTypes } from "../../../lib/types/pageTypes/Accounts/Agents/AgentsTableTypes";
import { AgentsTableProps } from "../../../lib/types/pageTypes/Accounts/Agents/AgentsTableProps";
import RowsWrapper from "../RowsWrapper";
import CustomButton from "../../Shared/Button";
import Button from "../../Shared/Button";
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
import ModalWrapper from "../../Modals/ModalWrapper";
import EditAgent from "../../Forms/Accounts/Agents/EditAgent";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../../lib/redux/slices/paginatedData";

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
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [itemToEdit, setItemToEdit]: any = useState();

  const [deleteAgent, { isLoading }] = useDeleteAgentMutation();
  const [editAgent, { isLoading: isEditing }] = useEditAgentMutation();
  const [toggleAgent, { isLoading: isTogglingAgent }] =
    useToggleAgentMutation();
  const [sendResetPWDToAgent, { isLoading: isSending }] =
    useSendResetPWDToAgentMutation();

  const dispatch = useDispatch();

  const handleDeleteAgentSuccess = ({ payload }: any) => {
    setIsModalVisible(false);
    dispatch(
      displayPaginatedData({ deleted: true, payload: { id: payload.id } })
    );
  };

  const handleDeleteAgent = () => {
    handleAPIRequests({
      request: deleteAgent,
      id: itemToDelete,
      showSuccess: true,
      handleSuccess: handleDeleteAgentSuccess
    });
  };

  //edit
  const showEditModal = (record: any) => {
    setItemToEdit(record);
    setIsEditModalVisible(true);
    form.setFieldsValue(record);
    setPhoneNumber(record?.phone || "");
  };

  const dispatchReplace = (newContent: any) => {
    dispatch(
      displayPaginatedData({
        payload: {
          payload: {
            content: [...newContent],
            totalPages: Agents.payload.totalPages,
            totalElements: Agents.payload.totalElements
          }
        },
        replace: true
      })
    );
  };

  const handleEditAgentSuccess = ({ payload }: any) => {
    setPhoneNumber("");
    form.resetFields();
    setIsEditModalVisible(false);

    const newDriversList: any = [];

    Agents?.payload?.content?.map((agent: any) => {
      if (agent.id === payload.id) {
        newDriversList.push(payload);
      } else {
        newDriversList.push(agent);
      }
    });

    dispatchReplace(newDriversList);
  };

  const onEditAgentFinish = (values: any) => {
    handleAPIRequests({
      request: editAgent,
      names: values?.names,
      email: values?.email,
      phone: phoneNumber,
      gender: values?.gender,
      id: itemToEdit?.id,
      showSuccess: true,
      handleSuccess: handleEditAgentSuccess
    });
  };

  const handleToggleAgentSuccess = (res: any) => {
    const newResult: object[] = [];

    Agents?.payload?.content?.forEach((agent: any) => {
      if (agent?.id === res?.payload?.id) {
        newResult.push(res?.payload);
      } else {
        newResult.push(agent);
      }
    });

    const newPayload = {
      payload: {
        content: newResult,
        totalPages: Agents?.payload?.totalPages,
        totalElements: Agents?.payload?.totalElements
      }
    };

    dispatch(
      displayPaginatedData({
        payload: newPayload,
        replace: true
      })
    );
  };

  const handleToggleAgent = (id: any) => {
    setAgentToToggle(id);

    handleAPIRequests({
      request: toggleAgent,
      id: id,
      showSuccess: true,
      handleSuccess: handleToggleAgentSuccess
    });
  };

  const handleResetPWDAgent = (id: any) => {
    setAgentToReset(id);
    handleAPIRequests({
      request: sendResetPWDToAgent,
      id: id,
      showSuccess: true
    });
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
          <Text className="normalText fowe700">
            {record?.role?.replaceAll("_", " ")}
          </Text>
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
      render: (text: AgentsTableTypes, record: AgentsTableTypes) => (
        <RowsWrapper>
          <div className="flex justify-start items-center gap-4">
            <div className="h-1 flex items-center">
              <CustomButton
                form=""
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
                form=""
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
                form=""
                onClick={() => handleToggleAgent(record?.id)}
                type="normal"
                size="icon"
                className="bg_danger"
                loading={record?.id === AgentToToggle && isTogglingAgent}
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
                form=""
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
        dataSource={Agents?.payload?.content}
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
        footerContent={
          <Button
            form="EditAgent"
            loading={isEditing}
            type="primary"
            htmlType="submit"
          >
            SAVE CHANGES
          </Button>
        }
      >
        <EditAgent
          onEditAgentFinish={onEditAgentFinish}
          isLoading={isEditing}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>
    </>
  );
};

export default AgentsTable;
