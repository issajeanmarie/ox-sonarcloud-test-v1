import React from "react";
import Image from "next/image";
import { Col, Row, Skeleton, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const loadingIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#e7b522" }} spin />
);
const smallLoadingIcon = (
  <LoadingOutlined style={{ fontSize: 13, color: "#e7b522" }} spin />
);

export const AppLoadingLoader = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export const ComponentLoadingLoader = () => {
  return (
    <div
      style={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        src="/oxloader.png"
        alt=""
        width="80px"
        height="80px"
        className="animate-spin duration-1000"
      />
    </div>
  );
};

export const SmallSpinLoader = () => {
  return <Spin indicator={smallLoadingIcon} />;
};

export const TableOnActionLoading = (actionLoader: boolean) => {
  return {
    spinning: actionLoader,
    indicator: <Spin indicator={loadingIcon} />
  };
};

export const AnalyticCardsLoader = () => {
  return (
    <Col
      style={{
        background: "#ffffff",
        boxShadow: "0px 0px 19px #00000008",
        border: "1px solid #EAEFF2",
        borderRadius: "4px",
        minWidth: "15rem",
        minHeight: "7.75rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 1rem"
      }}
      flex="auto"
    >
      <span className="text28 primary_text fowe900 mabo8">
        <Skeleton title={{ width: "30%" }} active paragraph={{ rows: 0 }} />
      </span>
      <span className="fowe700 opa8 text13">
        <Skeleton title={{ width: "90%" }} active paragraph={{ rows: 0 }} />
      </span>
    </Col>
  );
};

export const ColsTableLoader = () => {
  return (
    <>
      <Row justify="space-between" gutter={[8, 8]}>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
        <Col xs={24} sm={24} md={2} lg={2} xl={2}>
          <Skeleton title={{ width: "100%" }} active paragraph={{ rows: 0 }} />
        </Col>
      </Row>
    </>
  );
};
