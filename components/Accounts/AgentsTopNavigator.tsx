/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row } from "antd";
import React from "react";
import { FC } from "react";
import { AgentsTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Agents/AgentsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewAgent from "../Forms/Accounts/Agents/AddNewAgent";
import { usePostAgentMutation } from "../../lib/api/endpoints/Accounts/agentsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";
import Navbar from "../Shared/Content/Navbar";
import Button from "../Shared/Button";
import Heading1 from "../Shared/Text/Heading1";
import { localeString } from "../../utils/numberFormatter";

const AgentsTopNavigator: FC<AgentsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Agents
}) => {
  const [form] = Form.useForm();
  const [postAgent, { isLoading }] = usePostAgentMutation();

  const onAddAgentFinish = (values: any) => {
    postAgent({
      names: values?.names,
      email: values?.email,
      phone: values?.phone,
      gender: values?.gender
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((err: BackendErrorTypes) =>
        ErrorMessage(
          err?.data?.payload
            ? err?.data?.payload[0]?.messageError
            : err?.data?.message
        )
      );
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
      >
        <AddNewAgent
          onAddAgentFinish={onAddAgentFinish}
          isLoading={isLoading}
          form={form}
        />
      </ModalWrapper>

      <Navbar LeftSide={LeftSide} RightSide={RightSide} type="CENTER" />
    </>
  );
};

export default AgentsTopNavigator;
