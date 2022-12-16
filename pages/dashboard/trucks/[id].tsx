/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ViewTruck from "../../../components/Analytics/Trucks/ViewTruck";
import Layout from "../../../components/Shared/Layout";
import { useLazyGetSingleTruckQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { displaySingleTruck } from "../../../lib/redux/slices/trucksSlice";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const SingleTruck = () => {
  const router = useRouter();
  const { id: truckId } = router.query;
  const dispatch = useDispatch();
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [getSingleTruck, { isLoading }] = useLazyGetSingleTruckQuery();
  const truckData = useSelector(
    (state: any) => state.trucks.displaySingleTruck
  );

  const handleGetTruckSuccess = (res: any) => {
    dispatch(displaySingleTruck(res));
    setIsPageLoading(false);
  };

  const handleGetTruckFailure = () => {
    setIsPageLoading(false);
  };

  useEffect(() => {
    if (truckId) {
      setIsPageLoading(true);

      handleAPIRequests({
        request: getSingleTruck,
        id: truckId,
        handleSuccess: handleGetTruckSuccess,
        handleFailure: handleGetTruckFailure
      });
    }
  }, [truckId, getSingleTruck]);

  return (
    <Layout>
      <ViewTruck
        truckId={truckId}
        truckData={truckData}
        isLoading={isLoading}
        isPageLoading={isPageLoading}
      />
    </Layout>
  );
};

export default SingleTruck;
