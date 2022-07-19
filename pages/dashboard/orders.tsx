import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const Orders = () => {
  return (
    <Layout>
      <h1>Orders page</h1>
    </Layout>
  );
};

export default WithPrivateRoute(Orders);
