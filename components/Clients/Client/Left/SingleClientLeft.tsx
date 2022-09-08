import { Col } from "antd";
import React, { FC } from "react";
import { SingleClientLeftTypes } from "../../../../lib/types/pageTypes/Clients/SingleClientLeftTypes";
import ClientOrderHistoryTable from "../../../Tables/Clients/ClientOrderHistoryTable";
import Header from "./Header";

const SingleClientLeft: FC<SingleClientLeftTypes> = ({ clientOrders }) => {
  return (
    <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
      <Header orders={clientOrders?.orders} />
      <ClientOrderHistoryTable orders={clientOrders?.orders?.content} />
    </Col>
  );
};

export default SingleClientLeft;
