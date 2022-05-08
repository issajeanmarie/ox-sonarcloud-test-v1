import React from "react";
import { Layout } from "antd";
import { ChildrenType } from "../../lib/types/components/ChildrenType";
import AppSider from "./AppSider";
import AppHeader from "../Shared/AppHeader";
import { DashboardLayout, DashboardContents } from "./styles";

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <DashboardLayout>
      <AppSider />

      <Layout>
        <AppHeader />
        <DashboardContents>{children}</DashboardContents>
      </Layout>
    </DashboardLayout>
  );
};

export default AppLayout;
