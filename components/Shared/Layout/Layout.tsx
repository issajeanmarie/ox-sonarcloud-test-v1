import React, { useEffect, useState } from "react";
import Layout from "antd/lib/layout";
import { getMenuFold, setMenuFold } from "../../../helpers/handleLocalStorage";
import AppSider from "./AppSider";
import AppHeader from "./AppHeader";

const { Content } = Layout;

export type Types = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Types) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const menuRes = getMenuFold();
    setCollapsed(menuRes);
  }, []);

  const toggle = () => {
    setMenuFold({ menuFold: !collapsed });
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <AppSider collapsed={collapsed} />

      <Layout>
        <AppHeader collapsed={collapsed} toggle={toggle} />

        <Content className="bg-ox-white text-black contents_container">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
