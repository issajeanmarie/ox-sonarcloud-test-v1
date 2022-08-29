/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useMapAnalyticsQuery,
  useKPIsAnalyticsQuery
} from "../../lib/api/endpoints/Analytics/analyticEndpoints";
import { RootState } from "../../lib/redux/store";
import { useSelector } from "react-redux";
import { useCategoriesQuery } from "../../lib/api/endpoints/Category/categoryEndpoints";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { SearchType } from "../../lib/types/pageTypes/Analytics/Inputs";

const Analytics = () => {
  const [active, setActive] = useState<string>("trucks");
  const [sorter, setSorter] = useState("REVENUE");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory]: any = useState([]);
  const { depotData } = useSelector((state: RootState) => state.depot);
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const {
    data: truckData,
    isLoading: truckLoading,
    isFetching: truckFetching
  } = useTruckAnalyticsQuery({
    depot: depotData?.id,
    start: startDate,
    end: endDate,
    sortBy: sorter,
    direction: "",
    search: searchQuery
  });

  const {
    data: revenueData,
    isLoading: revenueLoading,
    isFetching: revenueFetching
  } = useRevenueAnalyticsQuery({
    depot: depotData?.id,
    start: startDate,
    end: endDate
  });

  const {
    data: mapData,
    isLoading: mapLoading,
    isFetching: mapFetching
  } = useMapAnalyticsQuery({
    depot: depotData?.id,
    category: selectedCategory[0]
  });

  const {
    data: KPIsData,
    isLoading: KPIsLoading,
    isFetching: KPIsFetching
  } = useKPIsAnalyticsQuery({
    depot: depotData?.id,
    start: startDate,
    end: endDate
  });

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const onSortChange = (sorter: string) => {
    setSorter(sorter);
  };

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
  };

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    setSelectedCategory(e);
  };

  const handleSearch = (e: SearchType) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout>
      <TopNavigator
        headerLinks={AnalyticLinks}
        setActive={setActive}
        active={active}
        toggleActiveHandler={toggleActiveHandler}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
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
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
            handleSearch={handleSearch}
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
        {active === "map" && (
          <AnalyticMap
            active={active}
            isCategoriesLoading={isCategoriesLoading}
            categories={categories}
            onCategoryChange={onCategoryChange}
            mapData={mapData}
            mapLoading={mapLoading}
            mapFetching={mapFetching}
          />
        )}
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
