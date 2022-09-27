import { routes as routeConfig } from "../config/route-config";

const AnalyticsIcon = "ic-statistics-2.svg";
const OrdersIcon = "ic-contact-phone-2.svg";
const TruckIcon = "ic-ecommerce-delivery.svg";
const AccountsIcon = "ic-security-secured-profile.svg";
const ClientsIcon = "ic-actions-user.svg";
const SettingsIcon = "ic-actions-settings.svg";

export const manageSidebarMenus = () => [
  {
    name: routeConfig.Orders.name,
    icon: OrdersIcon,
    active: false,
    url: routeConfig.Orders.url
  },
  {
    name: routeConfig.Clients.name,
    icon: ClientsIcon,
    active: false,
    url: routeConfig.Clients.url
  },
  {
    name: routeConfig.Trucks.name,
    icon: TruckIcon,
    active: false,
    url: routeConfig.Trucks.url
  },

  {
    name: routeConfig.Accounts.name,
    icon: AccountsIcon,
    active: false,
    url: routeConfig.Accounts.url
  }
];

export const moreSidebarMenus = () => [
  {
    name: routeConfig.Analytics.name,
    icon: AnalyticsIcon,
    active: false,
    url: routeConfig.Analytics.url
  },
  {
    name: routeConfig.Settings.name,
    icon: SettingsIcon,
    active: false,
    url: routeConfig.Settings.url
  }
];
