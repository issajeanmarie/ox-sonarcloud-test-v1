export const BASE_API_URL = process.env.NEXT_PUBLIC_API_HOST;
export const JWT_SECRET = process.env.NEXT_PUBLIC_API_JWT_KEY;
export const LS_MENU_FOLDED = "LS_MENU_FOLDED";
export const OX_ORDERS_FILTERS = "OX_ORDERS_FILTERS";
export const STATIC_DAYS = [
  { id: 0, name: "MONDAY" },
  { id: 1, name: "TUESDAY" },
  { id: 2, name: "WEDNESDAY" },
  { id: 3, name: "THURSDAY" },
  { id: 4, name: "FRIDAY" },
  { id: 5, name: "SATURDAY" },
  { id: 6, name: "SUNDAY" }
];

export const classes = {
  navbar:
    "rounded w-9 shadow-[0px_0px_19px_#00000008] bg-white  px-2 py-3 center",
  text: {
    h1: "text-[17px] font-bold flex items-center gap-5"
  },

  content_section: "overflow-scroll"
};
