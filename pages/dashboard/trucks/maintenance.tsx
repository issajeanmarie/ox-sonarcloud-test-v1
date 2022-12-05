/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Shared/Layout";
import { useLazyGetTruckMaintenanceChecklistQuery } from "../../../lib/api/endpoints/Trucks/trucksEndpoints";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import ViewTruckMaintenance from "../../../components/Analytics/Trucks/ViewTruckMaintenance";

const Maintenance = () => {
  const router = useRouter();
  const { id: truckId } = router.query;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };

  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const [
    getTruckMaintenanceList,
    { isFetching, isLoading, data: maintenanceData }
  ] = useLazyGetTruckMaintenanceChecklistQuery();

  useEffect(() => {
    if (truckId) {
      handleAPIRequests({
        request: getTruckMaintenanceList,
        id: truckId,
        page: 0,
        size: 40,
        start: startDate,
        end: endDate
      });
    }
  }, [truckId, startDate, endDate]);

  return (
    <Layout>
      <ViewTruckMaintenance
        truckId={truckId}
        maintenanceData={maintenanceData}
        isLoading={isFetching}
        isPageLoading={isLoading}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
    </Layout>
  );
};

export default Maintenance;
