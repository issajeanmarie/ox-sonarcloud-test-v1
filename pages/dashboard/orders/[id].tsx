import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import ViewOrder from "../../../components/Orders/ViewOrder";

const ViewOrderPage = () => {
  const router = useRouter();
  const { id: orderId } = router.query;

  return (
    <Layout>
      <ViewOrder orderId={orderId} />
    </Layout>
  );
};

export default WithPrivateRoute(ViewOrderPage);
