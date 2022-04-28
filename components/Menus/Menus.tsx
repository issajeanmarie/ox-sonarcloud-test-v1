import React from "react";
import Router from "next/router";
import { Menu } from "antd";
import { DepotMenuItems, ManageMenus, MoreMenus } from "./MenuItems";
import { routes } from "../../config/route-config";

export const DepotMenus = (
  <Menu>
    <Menu.ItemGroup>
      {DepotMenuItems.map((menu) => (
        <Menu.Item
          key={menu.defaultSelectedKey}
          icon={<menu.icon style={{ color: "#9a9ea8", height: "16px" }} />}
        >
          <span className="text12 fowe400">{menu.name}</span>
        </Menu.Item>
      ))}
    </Menu.ItemGroup>
  </Menu>
);

export const RouteMenus = ({ changeRoute }: any) => {
  return (
    <Menu
      defaultSelectedKeys={[routes.Orders.name]}
      style={{ borderRight: 0, background: "#2a3548" }}
    >
      <Menu.ItemGroup
        title={
          <span className="text12 muted_text opa8 fowe400italic">Manage</span>
        }
      >
        {ManageMenus.map((menu) => (
          <Menu.Item
            className={
              Router.pathname === menu.url ? "ant-menu-item-selected" : ""
            }
            key={menu.defaultSelectedKey}
            icon={<menu.icon style={{ color: "#9a9ea8", height: "16px" }} />}
            onClick={() => changeRoute(`${menu.url}`)}
          >
            <span className="text12 fowe400">{menu.name}</span>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>

      <Menu.ItemGroup
        title={
          <span className="text12 muted_text opa8 fowe400italic">More</span>
        }
      >
        {MoreMenus.map((menu) => (
          <Menu.Item
            className={
              Router.pathname === menu.url ? "ant-menu-item-selected" : ""
            }
            key={menu.defaultSelectedKey}
            icon={<menu.icon style={{ color: "#9a9ea8", height: "16px" }} />}
            onClick={() => changeRoute(`${menu.url}`)}
          >
            <span className="text12 fowe400">{menu.name}</span>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
};
