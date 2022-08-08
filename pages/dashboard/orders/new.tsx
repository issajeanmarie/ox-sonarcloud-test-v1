import React from "react";
import AddOrder from "../../../components/Orders/Add";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";

const NewOrderPage = () => {
  return (
    <Layout>
      <AddOrder />
    </Layout>
  );
};

export default WithPrivateRoute(NewOrderPage);
