import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";
import { GiRotaryPhone } from "react-icons/gi";
import { BsTruck, BsPersonSquare } from "react-icons/bs";
import { routes } from "../../config/route-config";

export const ManageMenus = [
  {
    defaultSelectedKey: "1",
    defaultOpenKey: "sub1",
    icon: GiRotaryPhone,
    name: routes.Orders.name,
    url: routes.Orders.url,
  },
  {
    defaultSelectedKey: "2",
    defaultOpenKey: "sub2",
    icon: AiOutlineUser,
    name: routes.Clients.name,
    url: routes.Clients.url,
  },
  {
    defaultSelectedKey: "3",
    defaultOpenKey: "sub3",
    icon: BsTruck,
    name: routes.Trucks.name,
    url: routes.Trucks.url,
  },
  {
    defaultSelectedKey: "4",
    defaultOpenKey: "sub4",
    icon: BsPersonSquare,
    name: routes.Accounts.name,
    url: routes.Accounts.url,
  },
];

export const MoreMenus = [
  {
    defaultSelectedKey: "5",
    defaultOpenKey: "sub5",
    icon: SiSimpleanalytics,
    name: routes.Analytics.name,
    url: routes.Analytics.url,
  },
  {
    defaultSelectedKey: "6",
    defaultOpenKey: "sub6",
    icon: AiOutlineSetting,
    name: routes.Settings.name,
    url: routes.Settings.url,
  },
];

export const DepotMenuItems = [
  {
    defaultSelectedKey: "7",
    defaultOpenKey: "sub7",
    icon: SiSimpleanalytics,
    name: "All depots",
  },
  {
    defaultSelectedKey: "8",
    defaultOpenKey: "sub8",
    icon: SiSimpleanalytics,
    name: "Tyazo depot",
  },
  {
    defaultSelectedKey: "9",
    defaultOpenKey: "sub9",
    icon: SiSimpleanalytics,
    name: "LHS depot",
  },
  {
    defaultSelectedKey: "10",
    defaultOpenKey: "sub10",
    icon: SiSimpleanalytics,
    name: "Nyamata depot",
  },
];
