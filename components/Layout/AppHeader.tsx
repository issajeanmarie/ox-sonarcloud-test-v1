/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Space from "antd/lib/space";
import Dropdown from "antd/lib/dropdown";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Image from "antd/lib/image";
import Layout from "antd/lib/layout";
import Typography from "antd/lib/typography";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import ProfileBox from "../Shared/ProfileBox";

const { Header } = Layout;
const { Title, Text } = Typography;

const AppHeader = ({ collapsed, toggle }: any) => {
  return (
    <div className="w-full flex items-center p-4 bg-white">
      <div className="flex-1 flex items-center justify-between ">
        <div className="flex items-center gap-4">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle
            }
          )}

          <Image width={40} src="/icons/OX_Logo.svg" preview={false} alt="" />
        </div>

        <div className="flex items-center gap-4">
          <Image
            className="radius8 img_fit"
            width={15}
            src="/icons/bell.svg"
            preview={false}
            alt=""
          />

          <ProfileBox
            user={{
              username: "Yves Honore",
              email: "yveshonore14@gmail.com"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
