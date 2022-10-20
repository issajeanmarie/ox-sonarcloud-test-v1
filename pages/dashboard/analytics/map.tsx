/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Shared/Layout";
import WithPrivateRoute from "../../../components/Shared/Routes/WithPrivateRoute";
import { AnalyticLinks } from "../../../components/Analytics/AnalyticLinks";
import AnalyticMap from "../../../components/Analytics/Map/AnalyticMap";
import { useLazyMapAnalyticsQuery } from "../../../lib/api/endpoints/Analytics/analyticEndpoints";
import { useCategoriesQuery } from "../../../lib/api/endpoints/Category/categoryEndpoints";
import Content from "../../../components/Shared/Content";
import { useSelector } from "react-redux";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { BackendErrorTypes } from "../../../lib/types/shared";
import { ErrorMessage } from "../../../components/Shared/Messages/ErrorMessage";
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

  const { data: categories, isLoading: isCategoriesLoading } =
    useCategoriesQuery();

  const [selectedCategories, setSelectedCategories]: any = useState([]);

  const depotsState = useSelector(
    (state: { depots: { payload: DepotTypes } }) => state.depots.payload
  );

  const [
    mapAnalytics,
    { isLoading: mapLoading, data: mapData, isFetching: mapFetching }
  ] = useLazyMapAnalyticsQuery();

  const onStartDateChange = (_: string, date: string) => {
    setStartDate(date);
    localStorage.setItem("ox_startDate", date);
    setIsDateCustom(true);
    return startDate;
  };
  const onEndDateChange = (_: string, date: string) => {
    setEndDate(date);
    localStorage.setItem("ox_endDate", date);
    setIsDateCustom(true);
    return endDate;
  };

  const onCategoryChange = (e: CheckboxValueType[], id: number) => {
    setSelectedCategories([...selectedCategories, id]);
    mapAnalytics({
      depot: depotsState?.depotId,
      categories: selectedCategories?.length !== 0 ? selectedCategories : ""
    })
      .unwrap()
      .then()
      .catch((err: BackendErrorTypes) => ErrorMessage(err?.data?.message));
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
      {router.isReady && !mapLoading && query?.currentTab !== "MAP" ? (
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

          <Content isOverflowHidden={true} navType="FULL">
            <div className="relative">
              <AnalyticMap
                active={query?.currentTab}
                isCategoriesLoading={isCategoriesLoading}
                categories={categories}
                onCategoryChange={onCategoryChange}
                mapData={mapData}
                mapLoading={mapLoading}
                mapFetching={mapFetching}
              />
            </div>
          </Content>
        </>
      )}
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
