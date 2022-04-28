import React from "react";
import { Form, Row, Col, Input, Button } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  emailValidation,
  passwordValidation,
} from "../../../lib/validation/InputValidations";
import { routes } from "../../../config/route-config";
import { LoginTypes } from "../../../lib/types/LoginTypes";

const Login = () => {
  const router = useRouter();
  const onFinish = (values: LoginTypes) => {
    router.push(routes.Orders.url);
    return values;
  };

  return (
    <Form name="Login" onFinish={onFinish} layout="vertical" title="Login">
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item label="Email" name="username" rules={emailValidation}>
            <Input className="ox_input" placeholder="example@gmail.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              margin: "0",
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "10",
            }}
          >
            <span className="text12 fowe400 text-decoration-underline">
              <Link href="/forgot-password">Forgot password?</Link>
            </span>
          </div>
          <Form.Item
            label="Password"
            name="password"
            rules={passwordValidation}
          >
            <Input.Password
              className="ox_input"
              placeholder="* * * * * * * *"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button
            type="primary"
            htmlType="submit"
            className="btn_dark_yellow btn_full"
          >
            LOGIN
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
