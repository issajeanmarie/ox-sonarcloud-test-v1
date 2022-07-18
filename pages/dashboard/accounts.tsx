import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";

const Accounts = () => {
  return <Layout />;
};

export default WithPrivateRoute(Accounts);
