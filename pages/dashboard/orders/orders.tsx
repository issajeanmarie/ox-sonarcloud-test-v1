import React from "react";
import Orders from "../../../components/Orders";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { JWT_SECRET } from "../../../config/constants";

const OrdersPage = () => {
  return (
    <Layout>
      <p>JWT: {JWT_SECRET || "Not available"}</p>
      <Orders />
    </Layout>
  );
};

export default WithPrivateRoute(OrdersPage);
