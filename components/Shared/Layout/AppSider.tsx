/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import Space from "antd/lib/space";
import Dropdown from "antd/lib/dropdown";
import Image from "antd/lib/image";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { manageSidebarMenus, moreSidebarMenus } from "../../../helpers/menus";
import { useDepotsQuery } from "../../../lib/api/endpoints/Depots/depotEndpoints";
import { depotTypes } from "../../../lib/types/depots";
const { Sider } = Layout;
const { Text } = Typography;

const AppSider = ({ collapsed }: any) => {
  const router = useRouter();
  const { depotId: depotID, depotName } = router.query;

  const { data, isLoading } = useDepotsQuery();

  const handleDepotChange = (depot: depotTypes | undefined) => {
    router.push({
      query: { depotId: depot?.id, depotName: depot?.name }
    });
  };

  const menus = manageSidebarMenus();
  const moreMenus = moreSidebarMenus();

  const depots = (
    <Space
      className="depot_dropdown rounded-md p-0"
      direction="vertical"
      style={{ width: "90%", marginLeft: "12px" }}
    >
      <div className="text-white border-b border-black p-5">
        <div className="bg-ox-yellow rounded">
          <Row align="middle">
            <Col className="p-4 pb-3 border-r border-ox-shadow-dark">
              <Image
                className="mt-1"
                width={20}
                src={`/icons/ic-ecommerce-house-white.svg`}
                preview={false}
                alt=""
              />
            </Col>

            <Col className="p-4 text-black font-bold pointer">
              Add new depot
            </Col>
          </Row>
        </div>
      </div>

      <div className="p-6">
        <Row
          className="p-4 cursor-pointer"
          onClick={() => handleDepotChange({ id: 0, name: "All depots" })}
          gutter={12}
          align="middle"
        >
          <Col>
            <Image
              width={16}
              src={`/icons/ic-ecommerce-house.svg`}
              preview={false}
              alt=""
            />
          </Col>
          <Col>
            <Text className="white">All depots</Text>
          </Col>
        </Row>

        {data?.payload?.map((depot) => (
          <Row
            className="p-4 cursor-pointer"
            onClick={() => handleDepotChange(depot)}
            gutter={12}
            align="middle"
            key={depot?.id}
          >
            <Col>
              <Image
                width={16}
                src={`/icons/ic-ecommerce-house.svg`}
                preview={false}
                alt=""
              />
            </Col>
            <Col>
              <Text className="white">{depot?.name}</Text>
            </Col>
          </Row>
        ))}
      </div>
    </Space>
  );

  return (
    <Sider
      style={{ height: "100vh" }}
      className="bg_dark"
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Dropdown
        trigger={["click"]}
        disabled={isLoading}
        overlay={depots}
        placement="bottom"
        className="pointer"
      >
        <Row
          align="middle"
          justify="space-between"
          className="pad24 mb12 border-b border-ox-dark-border"
        >
          <div className="flex justify-center items-center p-5 gap-3 w-full">
            <Image
              width={22}
              src={`/icons/ic-ecommerce-house.svg`}
              preview={false}
              alt=""
            />

            {!collapsed && (
              <div className="normalText text-white">
                {isLoading ? "Loading depots" : depotName}
              </div>
            )}

            {!collapsed && (
              <div className="flex flex-1 justify-end">
                <Col>
                  <Image
                    width={12}
                    src={`/icons/expand_more_black_24dp_yellow.svg`}
                    preview={false}
                    alt=""
                  />
                </Col>
              </div>
            )}
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
          <>
            <Menu.Item
              onClick={() =>
                router.push({
                  pathname: menu.url,
                  query: { depotId: depotID, depotName }
                })
              }
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
          </>
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
                onClick={() => {
                  router.push({
                    pathname: moreMenu.url,
                    query: { depotId: depotID, depotName }
                  });
                }}
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
                  className={`radius50 fowe400 bg_yellow rounded-full white notification_letter ${
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
              onClick={() => {
                router.push({
                  pathname: moreMenu.url,
                  query: { depotId: depotID, depotName }
                });
              }}
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

      <Row className="help_desk bg-black rounded-md pointer">
        <div className="flex items-center justify-center p-3 gap-3 w-full">
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
          {!collapsed && (
            <div className="flex-1 flex justify-end">
              <Image
                width={22}
                src={`/icons/keyboard_forwad_black_24dp.svg`}
                preview={false}
                alt=""
              />
            </div>
          )}
        </div>
      </Row>
    </Sider>
  );
};

export default AppSider;
