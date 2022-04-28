import React from "react";
import { Layout } from "antd";
import { ChildrenType } from "../../lib/types/components/ChildrenType";
import AppSider from "../Shared/AppSider";
import AppHeader from "../Shared/AppHeader";

const { Content } = Layout;

const AppLayout = ({ children }: ChildrenType) => {
  return (
    <Layout className="height100vh">
      <AppSider />
      <Layout>
        <AppHeader />
        <Content className="light_gray_background overflowY">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
