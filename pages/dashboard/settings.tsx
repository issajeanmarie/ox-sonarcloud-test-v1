import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const Settings = () => {
  return (
    <Layout>
      <p>Settings page</p>
    </Layout>
  );
};

export default WithPrivateRoute(Settings);
