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
import { depotTypes, SelectedDepotTypes } from "../../../lib/types/depots";
import { getActiveMenu } from "../../../helpers/getActiveMenu";
import { routes } from "../../../config/route-config";
import { getFromLocal, saveToLocal } from "../../../helpers/handleLocalStorage";
import { OX_DEPOT_FILTER } from "../../../config/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepots } from "../../../lib/redux/slices/depotsSlice";
import { escape } from "../../../utils/keyBinders";
import Notification from "../Notification";
import { useGlobalMoMoPaymentListener } from "../../../lib/useEffects/useHandleMoMoPaymentListener";
import NewDepotModal from "../../Modals/NewDepotModal";
import { userType } from "../../../helpers/getLoggedInUser";
const { Sider } = Layout;
const { Text } = Typography;

const AppSider = ({ collapsed }: any) => {
  const [isNewDepotModalVisible, setIsNewDepotModalVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const depotsState = useSelector(
    (state: { depots: { payload: SelectedDepotTypes } }) => state.depots.payload
  );
  const [isNotifyEnabled, setIsNotifyEnabled] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    message: "",
    amount: 0
  });

  useEffect(() => {
    const savedDepots = getFromLocal(OX_DEPOT_FILTER);

    dispatch(getDepots(savedDepots || { depotId: 0, depotName: "All depots" }));
  }, [dispatch]);

  const { data, isLoading } = useDepotsQuery();

  const handleDepotChange = (depot: depotTypes | undefined) => {
    doesInclude(routes.DepotProfile.url) &&
      router.push(`${routes.DepotProfile.url}/${depot?.id}`);

    dispatch(getDepots({ depotId: depot?.id, depotName: depot?.name }));
    setIsDropdownVisible(false);

    saveToLocal({
      name: OX_DEPOT_FILTER,
      value: {
        depotId: depot?.id,
        depotName: depot?.name
      }
    });
  };

  const menus = manageSidebarMenus();
  const moreMenus = moreSidebarMenus();
  const doesInclude = (route: string) => router.pathname.includes(route);
  const showDepots =
    doesInclude(routes.Analytics.url) ||
    router.pathname === routes.Orders.url ||
    doesInclude(routes.Stock.url) ||
    doesInclude(routes.Trucks.url) ||
    doesInclude(routes.DepotProfile.url);
  doesInclude(routes.Warehouse.url);

  escape(setIsDropdownVisible);

  useGlobalMoMoPaymentListener({ setIsNotifyEnabled, setNotificationMessage });

  const showNotificationOnMenu = (menuName: string): boolean => {
    return menuName === "Settings" || menuName === "Resources";
  };

  const depots = (
    <Space
      className="depot_dropdown rounded-md p-0"
      direction="vertical"
      style={{ width: "250px", marginLeft: "12px" }}
    >
      {!userType().isSuperAdmin && (
        <div className="text-white border-b border-black p-5">
          <div className="bg-ox-yellow rounded">
            <Row align="middle" wrap={false}>
              <Col className="p-4 pb-3 border-r border-ox-shadow-dark">
                <Image
                  className="mt-1"
                  width={20}
                  src={`/icons/ic-ecommerce-house-white.svg`}
                  preview={false}
                  alt=""
                />
              </Col>

              <Col
                onClick={() => {
                  setIsDropdownVisible(false);
                  setIsNewDepotModalVisible(true);
                }}
                className="p-4 text-black font-bold pointer text_ellipsis"
              >
                Add new depot
              </Col>
            </Row>
          </div>
        </div>
      )}

      <div className="p-6 p-y-0 h-[75vh] overflow-y-auto">
        <p className="pl-4 text-gray-500">Select to switch depot</p>
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
            <Text className="white text_ellipsis">All depots</Text>
          </Col>
        </Row>

        {data?.payload?.map((depot) => (
          <Row
            className={`p-4 cursor-pointer ${
              depot.id === depotsState.depotId && "bg-black"
            }`}
            onClick={() => handleDepotChange(depot)}
            gutter={12}
            align="middle"
            justify="space-between"
            key={depot?.id}
            wrap={false}
          >
            <Col>
              <Row align="middle" gutter={12}>
                <Col>
                  <Image
                    width={16}
                    src={`/icons/ic-ecommerce-house.svg`}
                    preview={false}
                    alt=""
                  />
                </Col>
                <Col>
                  <Text className="white text_ellipsis">{depot?.name}</Text>
                </Col>
              </Row>
            </Col>

            {depot.id === depotsState.depotId && (
              <Col>
                <Image
                  onClick={() =>
                    showDepots && setIsDropdownVisible(!isDropdownVisible)
                  }
                  width={12}
                  src={`/icons/check.svg`}
                  preview={false}
                  alt=""
                />
              </Col>
            )}
          </Row>
        ))}
      </div>
    </Space>
  );

  return (
    <>
      <NewDepotModal
        isVisible={isNewDepotModalVisible}
        setIsVisible={setIsNewDepotModalVisible}
      />

      <Notification
        notify={isNotifyEnabled}
        textMessage={notificationMessage.message}
        description={`MoMo payment of ${
          notificationMessage.amount || 0
        } Rwf successful!`}
        endNotification={setNotificationMessage}
      />

      <Sider
        style={{ height: "100vh" }}
        className="bg_dark"
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Row
          align="middle"
          justify="space-between"
          className="pointer pad24 mb12  active_menu_bg"
        >
          <Col
            className={`depot_background ${collapsed ? "w-[80px] pl-2" : ""}`}
          >
            <Dropdown
              trigger={["hover"]}
              disabled={isLoading}
              overlay={showDepots ? depots : <></>}
              placement="bottom"
              className="pointer"
            >
              <div
                className={`p-5 w-full ${
                  showDepots ? "opacity-100" : "opacity-50 cursor-not-allowed"
                }`}
              >
                <Image
                  onClick={() =>
                    showDepots && setIsDropdownVisible(!isDropdownVisible)
                  }
                  width={22}
                  src={`/icons/ic-ecommerce-house.svg`}
                  preview={false}
                  alt=""
                />
              </div>
            </Dropdown>
          </Col>

          <Col
            flex={1}
            className="px-6"
            onClick={() =>
              router.push(`${routes.DepotProfile.url}/${depotsState.depotId}`)
            }
          >
            <Row justify="space-between" align="middle">
              <Col>
                {!collapsed && (
                  <div className="normalText text-white underline">
                    {isLoading ? "Loading" : depotsState?.depotName}
                  </div>
                )}
              </Col>

              <Col>
                {!collapsed && (
                  <div className="flex flex-1 justify-end">
                    <Col>
                      <Image
                        width={6}
                        src="/icons/next_btn.svg"
                        preview={false}
                        alt=""
                      />
                    </Col>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>

        {!collapsed && <div className="text-gray-500 italic m-6">Manage</div>}

        <Menu
          theme="dark"
          mode="inline"
          className={`bg_dark ${!collapsed && ""}`}
          defaultSelectedKeys={["1"]}
        >
          {menus.map((menu) => {
            const { activeMenuStyles } = getActiveMenu({ menu, router });

            return (
              <>
                <Menu.Item
                  onClick={() => router.push(menu.url)}
                  className={`my_menu_bg ${
                    !collapsed && "not_collapsed"
                  } ${activeMenuStyles} `}
                  key={menu.name}
                  icon={
                    <Image
                      className="mb-1"
                      width={18}
                      src={`/icons/${menu.icon}`}
                      preview={false}
                      alt=""
                    />
                  }
                >
                  <text className={`text-white normalText pl-3 ${menu.name}`}>
                    {!collapsed && menu.name}
                  </text>
                </Menu.Item>
              </>
            );
          })}
        </Menu>

        {!collapsed && <div className="text-gray-500 italic m-6">More</div>}

        <Menu
          theme="dark"
          mode="inline"
          className="bg_dark"
          defaultSelectedKeys={["1"]}
        >
          {moreMenus.map((moreMenu) => {
            const { activeMenuStyles } = getActiveMenu({
              menu: moreMenu,
              router
            });

            if (showNotificationOnMenu(moreMenu.name)) {
              return (
                <Menu.Item
                  onClick={() => router.push(moreMenu.url)}
                  className={`my_menu_bg ${
                    !collapsed && "not_collapsed"
                  } ${activeMenuStyles} `}
                  key={moreMenu.name}
                  icon={
                    <Image
                      className="mb-1"
                      width={18}
                      src={`/icons/${moreMenu.icon}`}
                      preview={false}
                      alt=""
                    />
                  }
                >
                  <text
                    className={`text-white normalText pl-3 ${moreMenu.name}`}
                  >
                    {!collapsed && moreMenu.name}
                  </text>

                  {/* NOTIFICATION LETTER */}
                  {/* <Space
                  className={`radius50 fowe400 bg_yellow rounded-full white notification_letter ${
                    collapsed ? "collapsed_on" : "collapsed_off"
                  }`}
                >
                  N
                </Space> */}
                </Menu.Item>
              );
            }

            return (
              <Menu.Item
                onClick={() => router.push(moreMenu.url)}
                className={`white fowe300 text14 my_menu_bg ${
                  !collapsed && "not_collapsed"
                } ${activeMenuStyles} `}
                key={moreMenu.name}
                icon={
                  <Image
                    className="mb-1"
                    width={18}
                    src={`/icons/${moreMenu.icon}`}
                    preview={false}
                    alt=""
                  />
                }
              >
                <text className={`text-white normalText pl-3 ${moreMenu.name}`}>
                  {!collapsed && moreMenu.name}
                </text>
              </Menu.Item>
            );
          })}
        </Menu>

        {/* <Row className="help_desk bg-black rounded-md pointer">
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
      </Row> */}
      </Sider>
    </>
  );
};

export default AppSider;
