import { Row } from "antd";
import React from "react";
import SingleClientLeft from "../../../components/Clients/Client/Left/SingleClientLeft";
import SingleClientRight from "../../../components/Clients/Client/Right/SingleClientRight";
import SingleClientTop from "../../../components/Clients/Client/SingleClientTop";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";

const Client = () => {
  return (
    <Layout>
      <SingleClientTop />
      <Row className="p-5 flex justify-between gap-5">
        <SingleClientLeft />
        <SingleClientRight />
      </Row>
    </Layout>
  );
};

export default WithPrivateRoute(Client);
