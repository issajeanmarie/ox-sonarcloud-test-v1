/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ViewTruck from "../../../components/Analytics/Trucks/ViewTruck";
import Layout from "../../../components/Shared/Layout";
import {
  useGetTruckOverviewQuery,
  useLazyGetSingleTruckQuery
} from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { useDispatch, useSelector } from "react-redux";
import { displaySingleTruck } from "../../../lib/redux/slices/trucksSlice";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const SingleTruck = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const router = useRouter();
  const { id: truckId } = router.query;
  const dispatch = useDispatch();

  const [getSingleTruck, { isLoading }] = useLazyGetSingleTruckQuery();
  const { data: truckOverViewData, isLoading: isOverviewLoading } =
    useGetTruckOverviewQuery(truckId ? { id: truckId, start, end } : skipToken);

  const truckData = useSelector(
    (state: any) => state.trucks.displaySingleTruck
  );

  const handleGetTruckSuccess = (res: any) => {
    dispatch(displaySingleTruck(res));
  };

  useEffect(() => {
    if (truckId) {
      handleAPIRequests({
        request: getSingleTruck,
        id: truckId,
        handleSuccess: handleGetTruckSuccess
      });
    }
  }, [truckId, getSingleTruck]);

  return (
    <Layout>
      <ViewTruck
        truckId={truckId}
        truckData={truckData}
        truckOverViewData={truckOverViewData}
        isPageLoading={isLoading || isOverviewLoading}
        setEndDate={setEnd}
        setStartDate={setStart}
        startDate={start}
        endDate={end}
      />
    </Layout>
  );
};

export default SingleTruck;
