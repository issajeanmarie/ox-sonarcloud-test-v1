import React, { useState } from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import TopNavigator from "../../components/Shared/TopNavigator";
import { AnalyticLinks } from "../../components/Analytics/AnalyticLinks";
import AnalyticTrucks from "../../components/Analytics/Trucks/AnalyticTrucks";
import AnalyticRevenues from "../../components/Analytics/Revenues/AnalyticRevenues";
import AnalyticMap from "../../components/Analytics/Map/AnalyticMap";
import AnalyticKPIs from "../../components/Analytics/KPIs/AnalyticKPIs";

const Analytics = () => {
  const [active, setActive] = useState<string>("trucks");

  const toggleActiveHandler = (id: string) => {
    setActive(id);
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
        {active === "trucks" && <AnalyticTrucks active={active} />}
        {active === "revenues" && <AnalyticRevenues active={active} />}
        {active === "map" && <AnalyticMap active={active} />}
        {active === "KPIs" && <AnalyticKPIs active={active} />}
      </div>
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
