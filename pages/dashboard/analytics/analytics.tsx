/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import TopNavigator from "../../../components/Shared/TopNavigator";
import { AnalyticLinks } from "../../../components/Analytics/AnalyticLinks";
import AnalyticTrucks from "../../../components/Analytics/Trucks/AnalyticTrucks";
import AnalyticRevenues from "../../../components/Analytics/Revenues/AnalyticRevenues";
import AnalyticMap from "../../../components/Analytics/Map/AnalyticMap";
import AnalyticKPIs from "../../../components/Analytics/KPIs/AnalyticKPIs";
import {
  useRevenueAnalyticsQuery,
  useMapAnalyticsQuery,
  useKPIsAnalyticsQuery,
  useLazyDownloadTruckAnalyticsQuery
} from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import DaysCalculator from "../../../helpers/daysCalculator";
import Content from "../../../components/Shared/Content";
import { useSelector } from "react-redux";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";

const daysList = [
  { id: 0, name: "Last 7 days", value: 7 },
  { id: 1, name: "Last 15 days", value: 15 },
  { id: 2, name: "Last month", value: 30 },
  { id: 3, name: "Last 2 months", value: 60 }
];

type DepotTypes = {
  depotName: string | undefined;
  depotId: number | undefined;
};

const Analytics = () => {
  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);
  const [isDateCustom, setIsDateCustom] = useState(false);
  const [active, setActive] = useState<string>("trucks");
  const [sorter, setSorter] = useState<any>({});
  const [selectedDepot, setSelectedDepot] = useState<any>({
    id: 0,
    name: "All depots"
  });
  const [startDate, setStartDate] = useState(
    localStorage.getItem("ox_startDate")
      ? localStorage.getItem("ox_startDate")
      : ""
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("ox_endDate") ? localStorage.getItem("ox_endDate") : ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory]: any = useState([]);
  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const { start, end } = DaysCalculator(selectedDay?.value || "");

  const depotsState = useSelector(
    (state: { depots: { payload: DepotTypes } }) => state.depots.payload
  );

  const {
    data: revenueData,
    isLoading: revenueLoading,
    isFetching: revenueFetching
  } = useRevenueAnalyticsQuery({
    depot: depotsState?.depotId,
    start: isDateCustom ? startDate : start,
    end: isDateCustom ? endDate : end
  });

  const {
    data: mapData,
    isLoading: mapLoading,
    isFetching: mapFetching
  } = useMapAnalyticsQuery({
    depot: depotsState?.depotId,
    category: selectedCategory[0]
  });

  const {
    data: KPIsData,
    isLoading: KPIsLoading,
    isFetching: KPIsFetching
  } = useKPIsAnalyticsQuery({
    depot: selectedDepot?.id || "",
    start: isDateCustom ? startDate : start,
    end: isDateCustom ? endDate : end
  });

  const [
    downloadTruckAnalytics,
    { isLoading: isDownloadingTruckReport, isFetching: isDownloadFetching }
  ] = useLazyDownloadTruckAnalyticsQuery();

  const handleDownloadAnalyticsSuccess = (file: File) => {
    handleDownloadFile({
      file,
      name: "Truck-Report",
      fileFormat: "PDF"
    });
  };

  const handleDownloadClients = () => {
    handleAPIRequests({
      request: downloadTruckAnalytics,
      file_type: "PDF",
      depot: depotsState?.depotId || "",
      start: startDate,
      end: endDate,
      sortBy: sorter?.value || "",
      direction: "",
      search: searchQuery,
      handleSuccess: handleDownloadAnalyticsSuccess
    });
  };

  const toggleActiveHandler = (id: string) => {
    setActive(id);
  };

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    localStorage.setItem("ox_startDate", date);
    setIsDateCustom(true);
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    localStorage.setItem("ox_endDate", date);
    setIsDateCustom(true);
  };

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    setSelectedCategory(e);
  };

  const handleSearch = (value: any) => {
    setSearchQuery(value);
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
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        isDateCustom={isDateCustom}
        setIsDateCustom={setIsDateCustom}
        daysList={daysList}
        selectedDepot={selectedDepot}
        setSelectedDepot={setSelectedDepot}
      />

      <Content navType="FULL">
        <div className="mx-4 relative">
          {active === "trucks" && (
            <AnalyticTrucks
              active={active}
              sorter={sorter}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
              handleSearch={handleSearch}
              handleDownloadClients={handleDownloadClients}
              isDownloadingTruckReport={isDownloadingTruckReport}
              isDownloadFetching={isDownloadFetching}
              selectedSort={sorter}
              setSelectedSort={setSorter}
              depotsState={depotsState}
              startDate={startDate}
              endDate={endDate}
            />
          )}
          {active === "revenue" && (
            <AnalyticRevenues
              active={active}
              revenueData={revenueData?.payload}
              revenueLoading={revenueLoading}
              revenueFetching={revenueFetching}
              start={startDate || start || ""}
              end={endDate || end || ""}
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
      </Content>
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);