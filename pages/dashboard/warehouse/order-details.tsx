import { Row } from "antd";
import React from "react";
import SingleOrderLeft from "../../../components/Warehouse/OrderDetails/Left/SingleOrderLeft";
import SingleOrderRight from "../../../components/Warehouse/OrderDetails/Right/SingleOrderRight";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import SingleOrderTop from "../../../components/Warehouse/OrderDetails/SingleOrderTop";

const OrderDetails = () => {
  return (
    <Layout>
      <div className="m-0 h-full overflow-hidden">
        <SingleOrderTop />
        <Row className="p-5 flex justify-between gap-5">
          <SingleOrderLeft />

          <SingleOrderRight />
        </Row>
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(OrderDetails);
