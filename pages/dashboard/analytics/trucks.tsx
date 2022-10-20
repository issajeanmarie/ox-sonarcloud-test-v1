/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { AnalyticLinks } from "../../../components/Analytics/AnalyticLinks";
import AnalyticTrucks from "../../../components/Analytics/Trucks/AnalyticTrucks";

import { useLazyDownloadTruckAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import Content from "../../../components/Shared/Content";
import { useSelector } from "react-redux";
import { handleAPIRequests } from "../../../utils/handleAPIRequests";
import { daysList } from "./DTOs/daysList";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import { useRouter } from "next/router";
import AnalyticsTopNavigator from "../../../components/Analytics/AnalyticsTopNavigator";
import PageNotFound from "../../../components/Shared/PageNotFound";

type DepotTypes = {
  depotName: string | undefined;
  depotId: number | undefined;
};

const Analytics = () => {
  const router = useRouter();
  const { query } = useRouter();

  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);
  const [isDateCustom, setIsDateCustom] = useState(false);
  const [, setActive] = useState<string>("TRUCKS");
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

  const depotsState = useSelector(
    (state: { depots: { payload: DepotTypes } }) => state.depots.payload
  );

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

  const handleSearch = (value: any) => {
    setSearchQuery(value);
  };

  useEffect(() => {
    if (router.isReady) {
      if (Object.keys(query).length === 0 || !query.currentTab) {
        changeRoute(`${routes.Analytics.url}?currentTab=TRUCKS`);
        setActive("TRUCKS");
      }
    }
  }, [router.isReady, query, router, query?.currentTab]);

  const toggleActiveHandler = (id: string) => {
    setActive(id);
    id === "TRUCKS" && changeRoute(`${routes.Analytics.url}?currentTab=TRUCKS`);
    id === "REVENUE" &&
      changeRoute(`${routes.RevenueAnalytics.url}?currentTab=REVENUE`);
    id === "MAP" && changeRoute(`${routes.MapAnalytics.url}?currentTab=MAP`);
    id === "KPIs" && changeRoute(`${routes.KPIsAnalytics.url}?currentTab=KPIs`);
  };

  return (
    <Layout>
      {router.isReady && query?.currentTab !== "TRUCKS" ? (
        <PageNotFound />
      ) : (
        <>
          <AnalyticsTopNavigator
            headerLinks={AnalyticLinks}
            setActive={setActive}
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
              <AnalyticTrucks
                active={query?.currentTab}
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
            </div>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
