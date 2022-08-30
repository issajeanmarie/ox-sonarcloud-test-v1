import { Col } from "antd";
import React from "react";
import ClientOrderHistoryTable from "../../../Analytics/Tables/Clients/ClientOrderHistoryTable";
import Header from "./Header";

const SingleClientLeft = () => {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
      <Header />
      <ClientOrderHistoryTable />
    </Col>
  );
};

export default SingleClientLeft;
