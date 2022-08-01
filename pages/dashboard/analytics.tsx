import React from "react";
import Layout from "../../components/Shared/Layout";
import WithPrivateRoute from "../../components/Shared/Routes/WithPrivateRoute";
import TopNavigator from "../../components/Shared/TopNavigator";
import { Header_Links } from "../../lib/types/links";

const Analytics = () => {
  const Links: Header_Links[] = [
    {
      label: "TRUCKS",
      id: "trucks"
    },
    {
      label: "REVENUES",
      id: "revenues"
    },
    {
      label: "MAP",
      id: "map"
    },
    {
      label: "KPIs",
      id: "KPIs"
    }
  ];

  return (
    <Layout>
      <TopNavigator headerLinks={Links} />
    </Layout>
  );
};

export default WithPrivateRoute(Analytics);
