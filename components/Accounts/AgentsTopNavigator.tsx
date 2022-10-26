/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React, { useState } from "react";
import { FC } from "react";
import { AgentsTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Agents/AgentsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewAgent from "../Forms/Accounts/Agents/AddNewAgent";
import { usePostAgentMutation } from "../../lib/api/endpoints/Accounts/agentsEndpoints";
import Navbar from "../Shared/Content/Navbar";
import Button from "../Shared/Button";
import Heading1 from "../Shared/Text/Heading1";
import { localeString } from "../../utils/numberFormatter";
import { handleAPIRequests } from "../../utils/handleAPIRequests";
import { useDispatch } from "react-redux";
import { displayPaginatedData } from "../../lib/redux/slices/paginatedData";

const AgentsTopNavigator: FC<AgentsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Agents
}) => {
  const [form] = Form.useForm();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [postAgent, { isLoading }] = usePostAgentMutation();

  const dispatch = useDispatch();

  const handleAddAgentSuccess = ({ payload }: any) => {
    setPhoneNumber("");
    form.resetFields();
    setIsModalVisible(false);

    dispatch(displayPaginatedData({ payload }));
  };

  const onAddAgentFinish = (values: any) => {
    phoneNumber &&
      handleAPIRequests({
        request: postAgent,
        names: values?.names,
        email: values?.email,
        phone: phoneNumber,
        gender: values?.gender,
        showSuccess: true,
        handleSuccess: handleAddAgentSuccess
      });
  };

  const LeftSide = (
    <Col className="flex items-center gap-4">
      <Row gutter={24} align="middle">
        <Col>
          <Heading1>{localeString(Agents?.totalElements)} Agents</Heading1>
        </Col>
      </Row>
    </Col>
  );

  const RightSide = (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-6 w-[120px]">
        <Button type="primary" onClick={showModal}>
          NEW AGENT
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ModalWrapper
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        title="NEW AGENT"
        loading={isLoading}
        footerContent={
          <Button
            form="AddNewAgent"
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            ADD AGENT
          </Button>
        }
      >
        <AddNewAgent
          onAddAgentFinish={onAddAgentFinish}
          isLoading={isLoading}
          form={form}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
        />
      </ModalWrapper>

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default AgentsTopNavigator;
