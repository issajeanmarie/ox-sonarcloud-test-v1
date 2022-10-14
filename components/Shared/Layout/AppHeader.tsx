/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "antd/lib/image";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import ProfileBox from "../ProfileBox";
import { useSettingsQuery } from "../../../lib/api/endpoints/settings/settingsEndpoints";

const AppHeader = ({ collapsed, toggle }: any) => {
  const { data } = useSettingsQuery();

  return (
    <div className="w-full flex items-center p-4 bg-white shadow-[0px_-6px_24px_#2A35481A] z-[900]">
      <div className="flex-1 flex items-center justify-between">
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
          {/* <Image
            className="radius8 img_fit"
            width={15}
            src="/icons/bell.svg"
            preview={false}
            alt=""
          /> */}

          <ProfileBox
            user={{
              names: data?.payload?.names,
              sub: data?.payload?.email
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
