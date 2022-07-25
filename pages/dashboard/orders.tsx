import React from "react";
import Orders from "../../components/Orders";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const OrdersPage = () => {
  return (
    <Layout>
      <Orders />
    </Layout>
  );
};

export default WithPrivateRoute(OrdersPage);
