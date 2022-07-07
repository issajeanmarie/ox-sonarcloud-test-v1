/* eslint-disable @typescript-eslint/no-explicit-any */
import Space from "antd/lib/space";
import Dropdown from "antd/lib/dropdown";
import Image from "antd/lib/image";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { manageSidebarMenus, moreSidebarMenus } from "../../helpers/menus";

const { Sider } = Layout;
const { Text } = Typography;

const AppSider = ({ collapsed }: any) => {
  const menus = manageSidebarMenus();
  const moreMenus = moreSidebarMenus();

  const fakeDepots = [
    "Tyazo Depot",
    "Gishanga Depot",
    "Nyamabuye Depot",
    "Karengera Depot"
  ];

  const depots = (
    <Space
      className="depot_dropdown radius5 "
      style={{ width: "90%", marginLeft: "12px" }}
    >
      {fakeDepots.map((depot) => (
        <Row gutter={12} align="middle" key={depot} className="p-2">
          <Col>
            <Image
              width={16}
              src={`/icons/headphonesalt.svg`}
              preview={false}
              alt=""
            />
          </Col>
          <Col>
            <Text className="white">{depot}</Text>
          </Col>
        </Row>
      ))}
    </Space>
  );

  return (
    <Sider
      style={{ height: "100vh" }}
      className="bg_dark"
      width={280}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Dropdown overlay={depots} placement="bottom" className="pointer">
        <Row
          align="middle"
          justify="space-between"
          className="pad24 mb12"
          style={{ borderBottom: ".8px solid black" }}
        >
          <div className="flex items-center p-5 gap-3 w-full">
            <Image
              width={22}
              src={`/icons/headphonesalt.svg`}
              preview={false}
              alt=""
            />

            {!collapsed && (
              <div className="normalText text-white">Tyazo depot</div>
            )}
            <div className="flex flex-1 justify-end">
              {!collapsed && (
                <Col>
                  <Image
                    width={12}
                    src={`/icons/expand_more_black_24dp_yellow.svg`}
                    preview={false}
                    alt=""
                  />
                </Col>
              )}
            </div>
          </div>
        </Row>
      </Dropdown>

      {!collapsed && <div className="text-gray-500 italic m-6">Manage</div>}

      <Menu
        theme="dark"
        mode="inline"
        className={`bg_dark ${!collapsed && ""}`}
        defaultSelectedKeys={["1"]}
      >
        {menus.map((menu) => (
          <Menu.Item
            className={`my_menu_bg ${!collapsed && "not_collapsed"}`}
            key={menu.name}
            icon={
              <Image
                width={18}
                src={`/icons/${menu.icon}`}
                preview={false}
                alt=""
              />
            }
          >
            <text className="text-white normalText pl-3">
              {!collapsed && menu.name}
            </text>
          </Menu.Item>
        ))}
      </Menu>

      {!collapsed && <div className="text-gray-500 italic m-6">More</div>}

      <Menu
        theme="dark"
        mode="inline"
        className="bg_dark"
        defaultSelectedKeys={["1"]}
      >
        {moreMenus.map((moreMenu) => {
          if (moreMenu.name === "Settings") {
            return (
              <Menu.Item
                className={`my_menu_bg ${!collapsed && "not_collapsed"}`}
                key={moreMenu.name}
                icon={
                  <Image
                    width={18}
                    src={`/icons/${moreMenu.icon}`}
                    preview={false}
                    alt=""
                  />
                }
              >
                <text className="text-white normalText pl-3">
                  {!collapsed && moreMenu.name}
                </text>

                {/* NOTIFICATION LETTER */}
                <Space
                  className={`radius50 fowe400 bg_yellow white notification_letter ${
                    collapsed ? "collapsed_on" : "collapsed_off"
                  }`}
                >
                  N
                </Space>
              </Menu.Item>
            );
          }

          return (
            <Menu.Item
              className={`white fowe300 text14 my_menu_bg ${
                !collapsed && "not_collapsed"
              }`}
              key={moreMenu.name}
              icon={
                <Image
                  width={18}
                  src={`/icons/${moreMenu.icon}`}
                  preview={false}
                  alt=""
                />
              }
            >
              <text className="text-white normalText pl-3">
                {!collapsed && moreMenu.name}
              </text>
            </Menu.Item>
          );
        })}
      </Menu>

      <Row
        className="help_desk bg_black pad24 radius5 pointer"
        align="middle"
        justify="space-between"
      >
        <div className="flex items-center p-3 gap-3 w-full">
          <Image
            width={22}
            src={`/icons/headphonesalt.svg`}
            preview={false}
            alt=""
          />

          {!collapsed && (
            <Col>
              <text className="normalText text-white">Help Desk</text>
            </Col>
          )}
          <div className="flex-1 flex justify-end">
            {!collapsed && (
              <Image
                width={22}
                src={`/icons/keyboard_forwad_black_24dp.svg`}
                preview={false}
                alt=""
              />
            )}
          </div>
        </div>
      </Row>
    </Sider>
  );
};

export default AppSider;
