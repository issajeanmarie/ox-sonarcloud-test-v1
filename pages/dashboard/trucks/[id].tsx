import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import info from "antd/lib/message";
import ViewTruck from "../../../components/Analytics/Trucks/ViewTruck";
import Layout from "../../../components/Shared/Layout";
import { useLazyGetSingleTruckQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";

const SingleTruck = () => {
  const router = useRouter();
  const { id: truckId } = router.query;

  const [getSingleTruck, { isLoading, data: truckData }] =
    useLazyGetSingleTruckQuery();
  const componentDidMount = useRef(false);

  useEffect(() => {
    if (!componentDidMount.current && truckId) {
      getSingleTruck(truckId)
        .unwrap()
        .then()
        .catch((err) => info.error(err?.data?.message || "Something is wrong"));

      componentDidMount.current = true;
    }
  }, [truckId, getSingleTruck]);

  return (
    <Layout>
      <ViewTruck
        truckId={truckId}
        truckData={truckData}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default SingleTruck;
