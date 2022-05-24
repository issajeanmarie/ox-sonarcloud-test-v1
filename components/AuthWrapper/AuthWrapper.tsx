import React from "react";
import { Col, Row } from "antd";
import Image from "antd/lib/image";
import Typography from "antd/lib/typography";
import { AuthWrapperTypes } from "../../lib/types/components/AuthWrapperTypes";

const { Title } = Typography;

const AuthWrapper = ({ children, title }: AuthWrapperTypes) => {
  return (
    <Row style={{ height: "100vh" }} className="bg_dark">
      <Col className="auth_left" xs={24} sm={24} md={16} lg={16} xl={16} />
      <Col className="auth_right" xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="form_container">
          <Row justify="end" className="mb64">
            <Col>
              <Image
                width={100}
                src="/icons/OX_Logo.svg"
                preview={false}
                alt=""
              />
            </Col>
          </Row>

          <Title className="black text24 uppercase fowe700 mb64">{title}</Title>

          {children}
        </div>
      </Col>
    </Row>
  );
};

export default AuthWrapper;
