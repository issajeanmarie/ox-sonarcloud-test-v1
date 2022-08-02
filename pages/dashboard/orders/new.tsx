import React from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";

const NewOrderPage = () => {
  return (
    <Layout>
      <p>New order page</p>
    </Layout>
  );
};

export default WithPrivateRoute(NewOrderPage);
