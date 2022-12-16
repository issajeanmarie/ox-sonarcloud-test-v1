import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import ViewOrder from "../../../components/Orders/ViewOrder";
import SupportOrder from "../../../components/Forms/Orders/SupportOrder";

const ViewOrderPage = () => {
  const router = useRouter();
  const { id: orderId } = router.query;
  const [support, setSupport] = useState<boolean>(false);

  return (
    <Layout>
      {support ? (
        <SupportOrder orderId={orderId} setSupport={setSupport} />
      ) : (
        <ViewOrder orderId={orderId} setSupport={setSupport} />
      )}
    </Layout>
  );
};

export default WithPrivateRoute(ViewOrderPage);
