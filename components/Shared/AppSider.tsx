import React from "react";
import { Layout } from "antd";
import SiderTop from "../SideBar/SiderTop";
import SiderBottom from "../SideBar/SiderBottom";

const { Sider } = Layout;

const AppSider = () => {
  return (
    <Sider className="dark_background">
      <SiderTop />
      <SiderBottom />
    </Sider>
  );
};

export default AppSider;
