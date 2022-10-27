export const BASE_API_URL = process.env.NEXT_PUBLIC_API_HOST;
export const BASE_API_WS_URL = process.env.NEXT_PUBLIC_API_WS_HOST;
export const JWT_SECRET = process.env.NEXT_PUBLIC_API_JWT_KEY;
export const LS_MENU_FOLDED = "LS_MENU_FOLDED";
export const OX_ORDERS_FILTERS = "OX_ORDERS_FILTERS";
export const OX_NEW_ORDER_VALUES = "OX_NEW_ORDER_VALUES";
export const OX_DEPOT_FILTER = "OX_DEPOT_FILTER";

export const STATIC_DAYS = [
  { id: 0, name: "MONDAY" },
  { id: 1, name: "TUESDAY" },
  { id: 2, name: "WEDNESDAY" },
  { id: 3, name: "THURSDAY" },
  { id: 4, name: "FRIDAY" },
  { id: 5, name: "SATURDAY" },
  { id: 6, name: "SUNDAY" }
];

export const PAYMENT_STATUS = [
  { key: 0, label: "Payment pending", value: "PAYMENT_PENDING" },
  { key: 1, label: "Payment paid", value: "PAYMENT_PAID" },
  { key: 2, label: "Payment half paid", value: "PAYMENT_HALF_PAID" },
  { key: 3, label: "Payment written off", value: "PAYMENT_WRITTEN_OFF" },
  { key: 4, label: "Order enqueue", value: "ORDER_ENQUEUE" },
  { key: 5, label: "Order started", value: "ORDER_STARTED" },
  { key: 6, label: "Order completed", value: "ORDER_COMPLETED" },
  { key: 7, label: "Order cancelled", value: "ORDER_CANCELLED" }
];

export const ECONOMIC_STATUS = [
  { label: "INDIVIDUAL", value: "INDIVIDUAL" },
  { label: "COMPANY", value: "COMPANY" },
  { label: "GROUP", value: "GROUP" },
  { label: "UBUDEHE CATEGORY A", value: "UBUDEHE_CATEGORY_A" },
  { label: "UBUDEHE CATEGORY B", value: "UBUDEHE_CATEGORY_B" },
  { label: "UBUDEHE CATEGORY C", value: "UBUDEHE_CATEGORY_C" },
  { label: "UBUDEHE CATEGORY D", value: "UBUDEHE_CATEGORY_D" },
  { label: "UBUDEHE CATEGORY E", value: "UBUDEHE_CATEGORY_E" },
  { label: "WAREHOUSE", value: "WAREHOUSE" }
];

export const classes = {
  navbar: "rounded w-9 shadow-[0px_0px_19px_#00000008] bg-white  px-2 center",
  text: {
    h1: "text-[21px] font-bold  text-ox-dark",
    text_light: "font-extralight text-[17px]"
  },

  content_section: "overflow-auto",
  overflowHidden: "overflow-hidden"
};
