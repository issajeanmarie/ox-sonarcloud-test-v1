import { useRouter } from "next/router";
import React from "react";
import ViewClient from "../../../components/Clients/ViewClient";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";

const SingleClient = () => {
  const router = useRouter();
  const { id: clientId } = router.query;

  return (
    <Layout>
      <ViewClient clientId={clientId} />
    </Layout>
  );
};

export default WithPrivateRoute(SingleClient);
