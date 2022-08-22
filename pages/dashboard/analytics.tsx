import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import TopNavigator from "../../components/Shared/TopNavigator";
import { AnalyticLinks } from "../../components/Analytics/AnalyticLinks";
import AnalyticTrucks from "../../components/Analytics/Trucks/AnalyticTrucks";
import AnalyticRevenues from "../../components/Analytics/Revenues/AnalyticRevenues";
import AnalyticMap from "../../components/Analytics/Map/AnalyticMap";
import AnalyticKPIs from "../../components/Analytics/KPIs/AnalyticKPIs";
import {
  useTruckAnalyticsQuery,
  useRevenueAnalyticsQuery,
  useKPIsAnalyticsQuery
} from "../../lib/api/endpoints/Analytics/analyticEndpoints";
import { RootState } from "../../lib/redux/store";
import { useSelector } from "react-redux";

const Analytics = () => {
  const [active, setActive] = useState<string>("trucks");
  const [sorter, setSorter] = useState("REVENUE");
  const { depotData } = useSelector((state: RootState) => state.depot);

  const {
    data: truckData,
    isLoading: truckLoading,
    isFetching: truckFetching
  } = useTruckAnalyticsQuery({
    depot: depotData?.id,
    start: "",
    end: "",
    sortBy: sorter,
    direction: ""
  });

  const {
    data: revenueData,
    isLoading: revenueLoading,
    isFetching: revenueFetching
  } = useRevenueAnalyticsQuery({
    depot: depotData?.id,
    start: "",
    end: ""
  });

  const {
    data: KPIsData,
    isLoading: KPIsLoading,
    isFetching: KPIsFetching
  } = useKPIsAnalyticsQuery({
    depot: depotData?.id,
    start: "",
    end: ""
  });

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const onSortChange = (sorter: string) => {
    setSorter(sorter);
  };

  return (
    <Layout>
      <TopNavigator
        headerLinks={AnalyticLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
      />
      <div className={`${active !== "map" ? "px-5" : "px-0"} `}>
        {active === "trucks" && (
          <AnalyticTrucks
            active={active}
            truckData={truckData}
            truckLoading={truckLoading}
            truckFetching={truckFetching}
            onSortChange={onSortChange}
            sorter={sorter}
          />
        )}
        {active === "revenues" && (
          <AnalyticRevenues
            active={active}
            revenueData={revenueData?.payload}
            revenueLoading={revenueLoading}
            revenueFetching={revenueFetching}
          />
        )}
        {active === "map" && <AnalyticMap active={active} />}
        {active === "KPIs" && (
          <AnalyticKPIs
            active={active}
            KPIsData={KPIsData?.payload}
            KPIsLoading={KPIsLoading}
            KPIsFetching={KPIsFetching}
          />
        )}
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
