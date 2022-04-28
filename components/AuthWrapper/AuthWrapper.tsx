import React from "react";
import { Col, Row } from "antd";
import { AuthWrapperTypes } from "../../lib/types/components/AuthWrapperTypes";

const AuthWrapper = ({ children, title }: AuthWrapperTypes) => {
  return (
    <Row className="height100vh dark_background">
      <Col className="auth_left" xs={24} sm={24} md={16} lg={16} xl={16} />
      <Col className="auth_right" xs={24} sm={24} md={8} lg={8} xl={8}>
        <div className="form_container radius4">
          <p className="text24 uppercase_text">{title}</p>
          {children}
        </div>
      </Col>
    </Row>
  );
};

export default AuthWrapper;
