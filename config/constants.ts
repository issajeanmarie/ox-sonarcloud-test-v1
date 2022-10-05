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

export const PREVENTATIVE_MAINTENANCE_CHECKLIST = {
  options: [
    { id: 0, value: "NEEDS_REPAIR", name: "Needs Repair" },
    { id: 1, value: "REPAIRED", name: "Repaired" },
    { id: 2, value: null, name: "N/A" }
  ],
  steps: [
    {
      id: 0,
      name: "brakeSystem",
      title: "Brake System",
      list: [
        { id: 0, name: "Service brake", status: null },
        { id: 1, name: "Parking brake", status: null },
        { id: 2, name: "Brake pads and  shoes", status: null },
        { id: 3, name: "Brake drums and/disks", status: null },
        { id: 4, name: "Brake hose/pipes", status: null },
        { id: 5, name: "Low pressure warning device", status: null }
      ]
    },

    {
      id: 1,
      name: "couplingDevices",
      title: "Coupling Devices",
      list: [
        { id: 0, name: "Fifth wheel", status: null },
        { id: 1, name: "Pintle hooks", status: null },
        {
          id: 2,
          name: "Drawbar/towbar eye and tongue",
          status: null
        }
      ]
    },

    {
      id: 2,
      name: "engineOperation",
      title: "Engine Operation",
      list: [
        { id: 0, name: "Fan and drive belt", status: null },
        { id: 1, name: "Engine sound", status: null },
        { id: 2, name: "Oil filter", status: null },
        { id: 3, name: "Air filter", status: null },
        { id: 4, name: "Fuel filter", status: null },
        { id: 5, name: "Leakage", status: null },
        { id: 6, name: "Oil pressure", status: null },
        { id: 7, name: "Radiator", status: null },
        { id: 8, name: "Hoses", status: null },
        { id: 9, name: "Hoses (Brittle, Cracked)", status: null },
        { id: 10, name: "Battery", status: null }
      ]
    },

    {
      id: 3,
      name: "exhaustSystem",
      title: "Exhaust System",
      list: [
        { id: 0, name: "Leakage", status: null },
        { id: 1, name: "Muffler", status: null }
      ]
    },

    {
      id: 4,
      name: "fuelSystem",
      title: "Fuel System",
      list: [
        { id: 0, name: "Fuel leak", status: null },
        {
          id: 1,
          name: "Fuel tank filler cap missing",
          status: null
        },
        {
          id: 2,
          name: "Fuel tank securely attached",
          status: null
        },
        {
          id: 3,
          name: "Check for damage to wiring and fuel line",
          status: null
        }
      ]
    },

    {
      id: 5,
      name: "lightingDevices",
      title: "Lighting Devices",
      list: [
        { id: 0, name: "Head lights", status: null },
        { id: 1, name: "Brake lights", status: null },
        { id: 2, name: "Tail lights", status: null },
        { id: 3, name: "Dash lights", status: null },
        { id: 4, name: "Clearance lights", status: null },
        { id: 5, name: "Turn indicators", status: null },
        { id: 6, name: "Hazard lights", status: null }
      ]
    },

    {
      id: 6,
      name: "safetyEquipment",
      title: "Safety Equipment",
      list: [
        {
          id: 0,
          name: "Seat belts available and working",
          status: null
        },
        { id: 1, name: "Fire extinguisher", status: null },
        { id: 2, name: "Fags, flares", status: null },
        { id: 3, name: "Decals", status: null },
        { id: 4, name: "Spare bulbs, fuses", status: null }
      ]
    },

    {
      id: 7,
      name: "safeLoading",
      title: "Safe Loading",
      list: [
        {
          id: 0,
          name: "Protection against shifting cargo",
          status: null
        },
        { id: 1, name: "Lift gate and accessories", status: null }
      ]
    },

    {
      id: 8,
      name: "steeringMechanism",
      title: "Steering Mechanism",
      list: [
        { id: 0, name: "Steering wheel free play", status: null },
        { id: 1, name: "Steering column", status: null },
        { id: 2, name: "Front axle beam", status: null },
        { id: 3, name: "Steering gear box", status: null },
        { id: 4, name: "Pitman arm", status: null },
        { id: 5, name: "Power steering", status: null },
        { id: 6, name: "Ball and socket joints", status: null },
        { id: 7, name: "Tie rods, drag links", status: null },
        { id: 8, name: "Steering Boots", status: null }
      ]
    },

    {
      id: 9,
      name: "suspension",
      title: "Suspension",
      list: [
        { id: 0, name: "U-bolts and spring hangers", status: null },
        { id: 1, name: "Spring assembly", status: null },
        {
          id: 2,
          name: "Tongue, radius or tracking components",
          status: null
        },
        { id: 3, name: "Driveshaft Boots", status: null },
        { id: 4, name: "Bushings", status: null },
        { id: 5, name: "Shock absorbers", status: null }
      ]
    },

    {
      id: 10,
      name: "wheelsAndTires",
      title: "Wheels And Tires",
      list: [
        { id: 0, name: "Condition", status: null },
        { id: 1, name: "Air pressure", status: null },
        { id: 2, name: "Chains", status: null },
        { id: 3, name: "Wheels and rims", status: null },
        { id: 4, name: "Lock or side rings", status: null },
        { id: 5, name: "Fasteners", status: null },
        { id: 6, name: "Welds", status: null },
        { id: 7, name: "Wheel bearing", status: null }
      ]
    },

    {
      id: 11,
      name: "windshieldAndAc",
      title: "Windshield A/Ac",
      list: [
        {
          id: 0,
          name: "Glass free of cracks, discoloration",
          status: null
        },
        { id: 1, name: "Wiper power unit, blades", status: null },
        { id: 2, name: "Cabin filter", status: null },
        { id: 3, name: "Functionality", status: null }
      ]
    },

    {
      id: 12,
      name: "miscellaneous",
      title: "Miscellaneous",
      list: [
        { id: 0, name: "Heater/defroster", status: null },
        { id: 1, name: "Mirrors", status: null },
        { id: 2, name: "Frame", status: null },
        { id: 3, name: "Body", status: null },
        { id: 4, name: "Seats", status: null }
      ]
    },

    {
      id: 13,
      name: "transmission",
      title: "Transmission",
      list: [
        { id: 0, name: "Gear shifting", status: null },
        { id: 1, name: "Clutch free play", status: null },
        { id: 2, name: "Support mountings", status: null },
        { id: 3, name: "4WD", status: null },
        { id: 4, name: "Propeller shaft", status: null },
        { id: 5, name: "Differential", status: null },
        { id: 6, name: "Clutch", status: null },
        { id: 7, name: "Gear box", status: null },
        { id: 8, name: "Transfer box", status: null }
      ]
    }
  ]
};

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
