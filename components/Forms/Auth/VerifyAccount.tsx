import React from "react";
import { useRouter } from "next/router";
import Form from "antd/lib/form";
import { passwordValidation } from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { ResetPasswordTypes } from "../../../lib/types/pageTypes/Auth/ResetPasswordTypes";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { Col, Row } from "antd";
import { useVerifyAdminMutation } from "../../../lib/api/endpoints/Auth/authEndpoints";
import { GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const VerifyAccount = () => {
  const router = useRouter();
  const { token } = router.query;
  const [verifyAccount, { isLoading }] = useVerifyAdminMutation();

  const handleSuccess = (res: GenericResponse) => {
    SuccessMessage(res.message);
    router.replace(routes.login.url);
  };

  const handleFailure = () => {
    router.replace(routes.login.url);
  };

  const onFinish = (values: ResetPasswordTypes) => {
    handleAPIRequests({
      request: verifyAccount,
      ...values,
      token,
      handleSuccess,
      handleFailure,
      showSuccess: true
    });
  };

  return (
    <Form
      name="VerifyAccountForm"
      onFinish={onFinish}
      layout="vertical"
      title=""
    >
      <Row>
        <Col flex="auto">
          <Input
            label="New password"
            name="password"
            placeholder="New password"
            type="password"
            rules={passwordValidation}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="mt-2">
          <Button
            loading={isLoading}
            type="primary"
            className="mt-5"
            htmlType="submit"
          >
            Set password
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default VerifyAccount;
