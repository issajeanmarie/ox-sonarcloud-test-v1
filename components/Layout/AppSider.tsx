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
const { Text, Title } = Typography;

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
        <Row gutter={12} align="middle" key={depot} className="pad12 ">
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
          <Col>
            <Row gutter={16} align="middle">
              <Col>
                <Image
                  width={22}
                  src={`/icons/headphonesalt.svg`}
                  preview={false}
                  alt=""
                />
              </Col>

              {!collapsed && (
                <Col>
                  <Text className="white text14 fowe700">Tyazo depot</Text>
                </Col>
              )}
            </Row>
          </Col>

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
        </Row>
      </Dropdown>

      {!collapsed && (
        <Title className="white fowe400 pad24 italic opacity_38 text14 mb0">
          Manage
        </Title>
      )}

      <Menu
        theme="dark"
        mode="inline"
        className={`bg_dark ${!collapsed && ""}`}
        defaultSelectedKeys={["1"]}
      >
        {menus.map((menu) => (
          <Menu.Item
            className={`white fowe300 text14 my_menu_bg ${
              !collapsed && "not_collapsed"
            }`}
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
            <Title
              className="white fowe300 text14"
              style={{ margin: "1px 0 0 12px" }}
            >
              {!collapsed && menu.name}
            </Title>
          </Menu.Item>
        ))}
      </Menu>

      {!collapsed && (
        <Title className="white fowe400 pad24 italic opacity_38 text14 mb0">
          More
        </Title>
      )}

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
                <Title
                  className="white fowe300 text14"
                  style={{ margin: "1px 0 0 12px" }}
                >
                  {!collapsed && moreMenu.name}
                </Title>

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
              <Title
                className="white fowe300 text14"
                style={{ margin: "1px 0 0 12px" }}
              >
                {!collapsed && moreMenu.name}
              </Title>
            </Menu.Item>
          );
        })}
      </Menu>

      <Row
        className="help_desk bg_black pad24 radius5 pointer"
        align="middle"
        justify="space-between"
      >
        <Col>
          <Row gutter={24} align="middle">
            <Col>
              <Image
                width={22}
                src={`/icons/headphonesalt.svg`}
                preview={false}
                alt=""
              />
            </Col>

            {!collapsed && (
              <Col>
                <Text className="fowe300 white text14">Help Desk</Text>
              </Col>
            )}
          </Row>
        </Col>

        {!collapsed && (
          <Col>
            <Image
              className="opacity_43"
              width={22}
              src={`/icons/keyboard_forwad_black_24dp.svg`}
              preview={false}
              alt=""
            />
          </Col>
        )}
      </Row>
    </Sider>
  );
};

export default AppSider;
