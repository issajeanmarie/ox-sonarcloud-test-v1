import React from "react";
import Router from "next/router";
import Link from "next/link";
import Form from "antd/lib/form";
import { emailValidation } from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import Input from "../../Shared/Input";
import Button from "../../Shared/Button";
import { Col, Row } from "antd";
import { useForgotPasswordMutation } from "../../../lib/api/endpoints/Auth/authEndpoints";
import { SuccessMessage } from "../../Shared/Messages/SuccessMessage";
import { BackendErrorTypes, GenericResponse } from "../../../lib/types/shared";
import { ErrorMessage } from "../../Shared/Messages/ErrorMessage";
import { ForgetPasswordTypes } from "../../../lib/types/pageTypes/Auth/ForgetPasswordTypes";

const ForgetPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = (values: ForgetPasswordTypes) => {
    forgotPassword({
      username: values?.username,
      fromFinance: false,
      fromApp: true
    })
      .unwrap()
      .then((res: GenericResponse) => {
        SuccessMessage(res?.message);
        Router.replace(routes.ResetPasswordSent.url);
      })
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
  };

  return (
    <Form
      name="ForgetPassword"
      onFinish={onFinish}
      layout="vertical"
      title="ForgetPassword"
    >
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Input
            name="username"
            type="text"
            label="Email"
            placeholder="example@gmail.com"
            rules={emailValidation}
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
            Submit
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="mt-6">
          <div className="w-full flex justify-center items-center">
            <Link href={routes.login.url}>
              <a className="link animate">I remember my password</a>
            </Link>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default ForgetPasswordForm;
