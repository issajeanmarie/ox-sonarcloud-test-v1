/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, Row, Typography } from "antd";
import React from "react";
import CustomButton from "../Shared/Button/button";

import { FC } from "react";
import { AgentsTopNavigatorTypes } from "../../lib/types/pageTypes/Accounts/Agents/AgentsTopNavigatorTypes";
import ModalWrapper from "../Modals/ModalWrapper";
import AddNewAgent from "../Forms/Accounts/Agents/AddNewAgent";
import { numbersFormatter } from "../../helpers/numbersFormatter";
import { usePostAgentMutation } from "../../lib/api/endpoints/Accounts/agentsEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../lib/types/shared";
import { SuccessMessage } from "../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../Shared/Messages/ErrorMessage";

const { Text } = Typography;

const AgentsTopNavigator: FC<AgentsTopNavigatorTypes> = ({
  isModalVisible,
  showModal,
  setIsModalVisible,
  Agents,
  isAgentsLoading
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

  return (
    <Row
      justify="space-between"
      className="bg-white py-4 px-6 rounded shadow-[0px_0px_19px_#2A354808] border-[1px_solid_#EAEFF2A1]"
    >
      <Col className="flex items-center gap-4">
        <Text className="heading2 flex items-center">
          {isAgentsLoading ? (
            <span>...</span>
          ) : (
            <>
              {Agents?.totalElements !== 0 && (
                <>
                  {Agents?.totalElements &&
                    numbersFormatter(Agents?.totalElements)}{" "}
                </>
              )}
            </>
          )}
          {Agents?.totalElements === 0 ? (
            "No Agents"
          ) : (
            <>{Agents?.totalElements === 1 ? "Agent" : "Agents"}</>
          )}
        </Text>
      </Col>

      <Col className="flex items-center gap-4">
        <CustomButton onClick={showModal} type="primary">
          <span className="text-sm">NEW AGENT</span>
        </CustomButton>
      </Col>
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
    </Row>
  );
};

export default AgentsTopNavigator;
