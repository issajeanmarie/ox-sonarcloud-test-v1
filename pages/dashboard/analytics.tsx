import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const Analytics = () => {
  return (
    <Layout>
      <p>Analytics page</p>
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
