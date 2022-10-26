import React from "react";
import { useRouter } from "next/router";
import Form from "antd/lib/form";
import { passwordValidation } from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { ResetPasswordTypes } from "../../../lib/types/pageTypes/Auth/ResetPasswordTypes";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { Col, Row } from "antd";
import { useResetPasswordMutation } from "../../../lib/api/endpoints/Auth/authEndpoints";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";

const ResetPasswordForm = () => {
  const router = useRouter();
  const query = router.query;
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = (values: ResetPasswordTypes) => {
    resetPassword({
      password: values?.password,
      token: query?.token
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res.message);
        router.replace(routes.login.url);
      })
      .catch((err: BackendErrorTypes) => {
        if (err) ErrorMessage(err?.data?.message);
        if (err === null) router.replace(routes.login.url);
      });
  };

  return (
    <Form
      name="ResetPasswordForm"
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
            form=""
          >
            Reset
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ResetPasswordForm;
