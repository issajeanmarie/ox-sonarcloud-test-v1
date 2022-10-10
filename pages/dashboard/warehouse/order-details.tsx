import { Row } from "antd";
import React from "react";
import SingleOrderLeft from "../../../components/Warehouse/OrderDetails/Left/SingleOrderLeft";
import SingleOrderRight from "../../../components/Warehouse/OrderDetails/Right/SingleOrderRight";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import SingleOrderTop from "../../../components/Warehouse/OrderDetails/SingleOrderTop";
import { useSaleDetailsQuery } from "../../../lib/api/endpoints/Warehouse/salesEndpoints";
import { useRouter } from "next/router";
import PageNotFound from "../../../components/Shared/PageNotFound";

const OrderDetails = () => {
  const { query } = useRouter();
  const router = useRouter();

  const { data: saleDetails, isLoading: isSaleLoading } = useSaleDetailsQuery({
    id: query?.sale
  });

  return (
    <Layout>
      {router.isReady && !isSaleLoading && !saleDetails ? (
        <PageNotFound />
      ) : (
        <div className="m-0 h-full overflow-hidden">
          <SingleOrderTop sale={saleDetails?.payload} />
          <Row className="p-5 flex justify-between gap-5">
            <SingleOrderLeft sale={saleDetails?.payload} />

            <SingleOrderRight sale={saleDetails?.payload} />
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(OrderDetails);
