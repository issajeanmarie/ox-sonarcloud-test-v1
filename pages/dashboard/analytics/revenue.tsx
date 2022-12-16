/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { AnalyticLinks } from "../../../components/Analytics/AnalyticLinks";
import AnalyticRevenues from "../../../components/Analytics/Revenues/AnalyticRevenues";
import { useRevenueAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import DaysCalculator from "../../../helpers/daysCalculator";
import Content from "../../../components/Shared/Content";
import { useSelector } from "react-redux";
import { daysList } from "../../../components/Analytics/DTOs/daysList";
import AnalyticsTopNavigator from "../../../components/Analytics/AnalyticsTopNavigator";
import { useRouter } from "next/router";
import { changeRoute } from "../../../helpers/routesHandler";
import { routes } from "../../../config/route-config";
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
      {router.isReady && !revenueLoading && query?.currentTab !== "REVENUE" ? (
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

          <Content isOverflowHidden={false} navType="FULL">
            <div className="px-4 relative">
              <AnalyticRevenues
                active={query?.currentTab}
                revenueData={revenueData?.payload}
                revenueLoading={revenueLoading}
                revenueFetching={revenueFetching}
                start={startDate || start || ""}
                end={endDate || end || ""}
              />
            </div>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
