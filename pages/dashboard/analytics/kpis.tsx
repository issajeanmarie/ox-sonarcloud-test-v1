/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { AnalyticLinks } from "../../../components/Analytics/AnalyticLinks";
import AnalyticKPIs from "../../../components/Analytics/KPIs/AnalyticKPIs";
import { useKPIsAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import DaysCalculator from "../../../helpers/daysCalculator";
import Content from "../../../components/Shared/Content";
import { daysList } from "./DTOs/daysList";
import { useRouter } from "next/router";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
import AnalyticsTopNavigator from "../../../components/Analytics/AnalyticsTopNavigator";
import PageNotFound from "../../../components/Shared/PageNotFound";

const Analytics = () => {
  const router = useRouter();
  const { query } = useRouter();

  const [selectedDay, setSelectedDay] = useState<any>(daysList[0]);
  const [isDateCustom, setIsDateCustom] = useState(false);
  const [, setActive] = useState<string>("TRUCKS");
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

  const { start, end } = DaysCalculator(selectedDay?.value || "");
  const {
    data: KPIsData,
    isLoading: KPIsLoading,
    isFetching: KPIsFetching
  } = useKPIsAnalyticsQuery({
    depot: selectedDepot?.id || "",
    start: isDateCustom ? startDate : start,
    end: isDateCustom ? endDate : end
  });

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
      {router.isReady && !KPIsLoading && query?.currentTab !== "KPIs" ? (
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
              <AnalyticKPIs
                active={query?.currentTab}
                KPIsData={KPIsData?.payload}
                KPIsLoading={KPIsLoading}
                KPIsFetching={KPIsFetching}
              />
            </div>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
