import React from "react";
import Orders from "../../../components/Orders";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { JWT_SECRET } from "../../../config/constants";

const OrdersPage = () => {
  console.log(
    "JWT ENV VARIABLE: ",
    JWT_SECRET || "CAN NOT FIND JWT ENV VARIABLE"
  );

  return (
    <Layout>
      <Orders />
    </Layout>
  );
};

export default WithPrivateRoute(OrdersPage);
