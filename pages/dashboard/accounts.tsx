import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const Accounts = () => {
  return (
    <Layout>
      <p>Accounts apge</p>
    </Layout>
  );
};

export default WithPrivateRoute(Accounts);
