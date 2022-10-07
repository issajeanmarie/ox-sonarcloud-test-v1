export const BASE_API_URL = process.env.NEXT_PUBLIC_API_HOST;
export const JWT_SECRET = process.env.NEXT_PUBLIC_API_JWT_KEY;
export const LS_MENU_FOLDED = "LS_MENU_FOLDED";
export const OX_ORDERS_FILTERS = "OX_ORDERS_FILTERS";
export const OX_NEW_ORDER_VALUES = "OX_NEW_ORDER_VALUES";

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

export const classes = {
  navbar:
    "rounded w-9 shadow-[0px_0px_19px_#00000008] bg-white  px-2 py-3 center",
  text: {
    h1: "text-[21px] font-bold  text-ox-dark",
    text_light: "font-extralight text-[17px]"
  },

  content_section: "overflow-auto"
};
