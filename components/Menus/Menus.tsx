/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Router from "next/router";
import { Menu } from "antd";
import { DepotMenuItems, ManageMenus, MoreMenus } from "./MenuItems";
import { routes } from "../../config/route-config";
import { StyledSpan, SubHeading } from "../../themes/globalStyles";

export const DepotMenus = (
  <Menu>
    <Menu.ItemGroup style={{ padding: "6px" }}>
      {DepotMenuItems.map((menu) => (
        <Menu.Item
          style={{ padding: "16px" }}
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
      style={{ background: "none", border: "none" }}
    >
      <Menu.ItemGroup
        title={
          <SubHeading
            color="white"
            fontStyle="italic"
            style={{
              color: "#9a9ea8",
              padding: "0.85rem 1.2rem",
              fontStyle: "italic",
              fontSize: "0.875rem"
            }}
          >
            Manage
          </SubHeading>
        }
      >
        {ManageMenus.map((menu) => (
          <Menu.Item
            style={{ height: "3.2rem" }}
            className={
              Router.pathname === menu.url ? "ant-menu-item-selected" : ""
            }
            key={menu.defaultSelectedKey}
            icon={
              <menu.icon
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.3rem",
                  margin: "0 0.8rem 0 1.2rem"
                }}
              />
            }
            onClick={() => changeRoute(`${menu.url}`)}
          >
            <StyledSpan style={{ color: "white" }} weight="300">
              {menu.name}
            </StyledSpan>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>

      <Menu.ItemGroup
        title={
          <SubHeading
            color="white"
            fontStyle="italic"
            style={{
              color: "#9a9ea8",
              padding: "0.85rem 1.2rem",
              fontStyle: "italic",
              fontSize: "0.875rem"
            }}
          >
            More
          </SubHeading>
        }
      >
        {MoreMenus.map((menu) => (
          <Menu.Item
            style={{ height: "3.2rem" }}
            className={
              Router.pathname === menu.url ? "ant-menu-item-selected" : ""
            }
            key={menu.defaultSelectedKey}
            icon={
              <menu.icon
                style={{
                  color: "#FFFFFF",
                  fontSize: "1.3rem",
                  margin: "0 0.8rem 0 1.2rem"
                }}
              />
            }
            onClick={() => changeRoute(`${menu.url}`)}
          >
            <StyledSpan style={{ color: "white" }} weight="300">
              {menu.name}
            </StyledSpan>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
};
