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
  {
    key: "Payment pending",
    label: "Payment pending",
    value: "PAYMENT_PENDING"
  },

  { key: "Payment paid", label: "Payment paid", value: "PAYMENT_PAID" },
  {
    key: "Payment half paid",
    label: "Payment half paid",
    value: "PAYMENT_HALF_PAID"
  },
  {
    key: "Payment written off",
    label: "Payment written off",
    value: "PAYMENT_WRITTEN_OFF"
  },
  { key: "Order enqueue", label: "Order enqueue", value: "ORDER_ENQUEUE" },
  { key: "Order started", label: "Order started", value: "ORDER_STARTED" },
  {
    key: "Order completed",
    label: "Order completed",
    value: "ORDER_COMPLETED"
  },
  { key: "Order cancelled", label: "Order cancelled", value: "ORDER_CANCELLED" }
];

export const ECONOMIC_STATUS = [
  { key: "INDIVIDUAL", label: "INDIVIDUAL", value: "INDIVIDUAL" },
  { key: "COMPANY", label: "COMPANY", value: "COMPANY" },
  { key: "GROUP", label: "GROUP", value: "GROUP" },
  {
    key: "UBUDEHE CATEGORY A",
    label: "UBUDEHE CATEGORY A",
    value: "UBUDEHE_CATEGORY_A"
  },
  {
    key: "UBUDEHE CATEGORY B",
    label: "UBUDEHE CATEGORY B",
    value: "UBUDEHE_CATEGORY_B"
  },
  {
    key: "UBUDEHE CATEGORY C",
    label: "UBUDEHE CATEGORY C",
    value: "UBUDEHE_CATEGORY_C"
  },
  {
    key: "UBUDEHE CATEGORY D",
    label: "UBUDEHE CATEGORY D",
    value: "UBUDEHE_CATEGORY_D"
  },
  {
    key: "UBUDEHE CATEGORY E",
    label: "UBUDEHE CATEGORY E",
    value: "UBUDEHE_CATEGORY_E"
  },
  { key: "WAREHOUSE", label: "WAREHOUSE", value: "WAREHOUSE" }
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

export const QB_PAYMENT_TYPES = [
  { label: "Cash", value: "Cash" },
  { label: "Check", value: "Check" },
  { label: "Credit Card", value: "CreditCard" }
];

export const PRIVACY_POLICY_CONTENT = {
  title: `OX Privacy Policy`,
  lastUpdate: `22nd January 2023`,
  intro: `OX Delivers ("Company") operates the OX App ("App"). This Privacy Policy describes how the Company collects, uses, and discloses personal information and other data related to the End User's use of the App.`,
  sections: [
    {
      id: 1,
      title: "Information We Collect",
      subTitle:
        "We may collect the following types of information from End Users:",
      details: [
        `Personal Information: We may collect personal information such as name, address, phone number, and email address when an End User creates an account on the App or submits a support request.`,
        `Location Information: We may collect location information from an End User's device when they use the App to log jobs. We use this information to track the End User's location in order to provide the transport as a service.`,
        `Usage Information: We may collect information about how the End User uses the App, such as the type of device they are using, the operating system they are using, and which features of the App they are accessing.`
      ]
    },

    {
      id: 2,
      title: "How We Use Information",
      subTitle:
        "We use the information we collect from End Users in the following ways:",
      details: [
        `To provide the services offered by the App, including the transport as a service.`,
        `To communicate with End Users about their use of the App, including to respond to support requests.`,
        `To improve the App and our services.`,
        `To comply with legal and regulatory requirements.`
      ]
    },

    {
      id: 3,
      title: "Information Disclosure",
      subTitle:
        "We may disclose the information we collect from End Users in the following circumstances:",
      details: [
        `Service Providers: We may share personal information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service.`,
        `Legal Requirements: We may disclose personal information if required by law, regulation, or other legal process, or to protect the rights, property, or safety of the Company, our End Users, or others.`,
        `Business Transfers: We may transfer personal information in connection with a merger, acquisition, reorganization, or sale of assets.`
      ]
    },

    {
      id: 4,
      title: "Information Security",
      subTitle:
        "We take reasonable measures to protect the information we collect from End Users, including implementing technical and organizational measures to prevent unauthorized access, disclosure, or use of information.",
      details: []
    },

    {
      id: 5,
      title: "Changes to this Privacy Policy",
      subTitle:
        "We may update this Privacy Policy from time to time by posting a new version on the App. End Users should review this policy periodically for changes.",
      details: []
    },

    {
      id: 6,
      title: "Contact us",
      subTitle:
        "If you have any questions or concerns about this Privacy Policy, please contact us at info@oxdelivers.com.",
      details: []
    }
  ]
};

export const END_USER_AGREEMENTS_CONTENT = {
  title: `End User License Agreement (EULA) for OX App`,
  lastUpdate: `22nd January 2023`,
  intro: `This End User License Agreement ("Agreement") is a legal agreement between you ("End User") and OX Delivers ("Company") for the use of the OX App ("App"). By using the App, you agree to be bound by the terms of this Agreement.`,
  sections: [
    {
      id: 1,
      title: "License Grant:",
      subTitle:
        "The Company grants to the End User a limited, non-exclusive, non-transferable license to use the App solely for the purpose of logging jobs/expenses as a driver for OX Delivers.",
      details: []
    },

    {
      id: 2,
      title: "Restrictions on Use:",
      subTitle:
        "The End User shall not: (a) copy, modify, or distribute the App, (b) reverse engineer, decompile, or disassemble the App, (c) attempt to bypass any security measures in the App, (d) use the App for any unlawful purpose, or (e) use the App in any way that violates the terms of this Agreement.",
      details: []
    },

    {
      id: 3,
      title: "Ownership",
      subTitle:
        "The Company retains all rights, title, and interest in and to the App, including all intellectual property rights therein.",
      details: []
    },

    {
      id: 4,
      title: "Privacy",
      subTitle:
        "The Company may collect, use, and disclose personal information and other data related to the End User's use of the App. The Company's use of this information is governed by the Company's privacy policy.",
      details: []
    },

    {
      id: 5,
      title: "Termination",
      subTitle:
        "The license granted by this Agreement shall terminate automatically if the End User breaches any of the terms of this Agreement. Upon termination, the End User shall cease all use of the App and delete all copies of the App.",
      details: []
    },

    {
      id: 6,
      title: "Disclaimer of Warranty",
      subTitle: `The App is provided "as is" without warranty of any kind. The Company disclaims all warranties, express or implied, including without limitation, warranties of merchantability and fitness for a particular purpose.`,
      details: []
    },

    {
      id: 7,
      title: "Limitation of Liability.",
      subTitle: `The Company shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use the App, even if the Company has been advised of the possibility of such damages.`,
      details: []
    },

    {
      id: 8,
      title: "Governing Law",
      subTitle: `This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction of the Republic of Rwanda.`,
      details: []
    },

    {
      id: 9,
      title: "Entire Agreement",
      subTitle: `This Agreement constitutes the entire agreement between the End User and the Company with respect to the use of the App and supersedes all prior or contemporaneous communications and proposals, whether oral or written, between the parties.`,
      details: []
    }
  ]
};

export const daysList = [
  { id: 0, name: "Last 7 days", value: 7 },
  { id: 1, name: "Last 15 days", value: 15 },
  { id: 2, name: "Last 30 days", value: 30 },
  { id: 3, name: "Last 60 days", value: 60 }
];

export const testCoordinates = [
  { lat: -1.9608289845920708, lng: 30.10096681818146 },
  { lat: -1.9609324541045734, lng: 30.101045501084283 },
  { lat: -1.9610336821110501, lng: 30.101219972097525 },
  { lat: -1.9610189386015688, lng: 30.101283004006824 },
  { lat: -1.9610196087610936, lng: 30.1012823334546 },
  { lat: -1.961061828810607, lng: 30.10135207088617 },
  { lat: -1.9611114206134297, lng: 30.10142985494446 },
  { lat: -1.961123483484163, lng: 30.10145399482462 },
  { lat: -1.9610799231172034, lng: 30.101532449435137 },
  { lat: -1.961075902160398, lng: 30.10153513165727 },
  { lat: -1.9610055354112135, lng: 30.101665889341458 },
  { lat: -1.9609720274343643, lng: 30.101732944564123 },
  { lat: -1.961125493963119, lng: 30.10185632618298 },
  { lat: -1.9612251311170328, lng: 30.101960697763563 },
  { lat: -1.961335707425363, lng: 30.10218265056112 },
  { lat: -1.9614389119694555, lng: 30.10237241684126 },
  { lat: -1.9614710796182604, lng: 30.102397227273645 },
  { lat: -1.9615823260707597, lng: 30.10233821867821 },
  { lat: -1.9616895515551693, lng: 30.10228792726122 },
  { lat: -1.9617733214626367, lng: 30.102249035231015 },
  { lat: -1.9618847736402703, lng: 30.102470317499552 },
  { lat: -1.9619645225805384, lng: 30.10262923837726 },
  { lat: -1.962103915679454, lng: 30.102804923070394 },
  { lat: -1.9622171725618396, lng: 30.102949091799122 },
  { lat: -1.9621041152917018, lng: 30.103182360378593 },
  { lat: -1.96203374858389, lng: 30.10336072727794 },
  { lat: -1.9619198215276923, lng: 30.103675216286735 },
  { lat: -1.9616852657999866, lng: 30.104028597323953 },
  { lat: -1.961328741030491, lng: 30.10432766362402 },
  { lat: -1.9606719846766125, lng: 30.104660928096266 },
  { lat: -1.9606123404633617, lng: 30.104672327485083 },
  { lat: -1.9604017631906099, lng: 30.104636402944706 },
  { lat: -1.9600929460052794, lng: 30.104471754369722 },
  { lat: -1.9598382281401323, lng: 30.104118774892974 },
  { lat: -1.959716504543248, lng: 30.103836842399094 },
  { lat: -1.959335554708618, lng: 30.10313201115981 },
  { lat: -1.9587055221027572, lng: 30.102718134263945 },
  { lat: -1.9582569477645508, lng: 30.102744072053635 },
  { lat: -1.9580371688311873, lng: 30.102812863582162 },
  { lat: -1.9575976108844506, lng: 30.103015854976395 },
  { lat: -1.9574634893308305, lng: 30.103090285154828 },
  { lat: -1.9569337654520627, lng: 30.10287376099854 },
  { lat: -1.9557864055061516, lng: 30.10212720375136 },
  { lat: -1.9550899736563614, lng: 30.101811311420153 },
  { lat: -1.9548532882015066, lng: 30.101525995731933 },
  { lat: -1.9544204918617918, lng: 30.10087529553558 },
  { lat: -1.9539967120058588, lng: 30.099904320027317 },
  { lat: -1.9540147451950562, lng: 30.099223171118652 },
  { lat: -1.9542987678676946, lng: 30.098443909738926 },
  { lat: -1.9537836949695715, lng: 30.098499168505366 },
  { lat: -1.953557153001015, lng: 30.09846420887589 },
  { lat: -1.9534331748014333, lng: 30.098414588759095 },
  { lat: -1.9537694882162868, lng: 30.096832678502494 },
  { lat: -1.95388670394843, lng: 30.09625528075879 },
  { lat: -1.954018571636096, lng: 30.095916961765223 },
  { lat: -1.9541955222747018, lng: 30.095693671239626 },
  { lat: -1.9539836323358388, lng: 30.095489552122796 },
  { lat: -1.953893466396289, lng: 30.09551210672134 },
  { lat: -1.9537796318857088, lng: 30.095568493219435 },
  { lat: -1.9535452003994127, lng: 30.095505340342502 },
  { lat: -1.953264558814945, lng: 30.09536775727745 },
  { lat: -1.952796822744364, lng: 30.09505199288297 },
  { lat: -1.9524113630405566, lng: 30.094703524322327 },
  { lat: -1.9520112512648182, lng: 30.09425581552132 },
  { lat: -1.9514939235039805, lng: 30.093765252983243 },
  { lat: -1.9509709602019387, lng: 30.093516024659806 },
  { lat: -1.9506474892801402, lng: 30.093386335709653 },
  { lat: -1.950268791549984, lng: 30.093095381388427 },
  { lat: -1.9501222715719972, lng: 30.092841642154795 },
  { lat: -1.9501076195715012, lng: 30.092594669284747 },
  { lat: -1.9504299635143956, lng: 30.0925010676955 },
  { lat: -1.951235823100508, lng: 30.092483024018307 },
  { lat: -1.9526040132311682, lng: 30.092443297641932 },
  { lat: -1.952771947422505, lng: 30.092428637150594 },
  { lat: -1.9529432628209396, lng: 30.092303459112728 },
  { lat: -1.953058224455559, lng: 30.092108361818777 },
  { lat: -1.95306611397938, lng: 30.091781320139876 },
  { lat: -1.9524518580783519, lng: 30.090977248672147 },
  { lat: -1.9519153701679233, lng: 30.090256629218754 },
  { lat: -1.9512504331545, lng: 30.08896212631742 },
  { lat: -1.9508373222580826, lng: 30.08772885844517 },
  { lat: -1.9506409656315582, lng: 30.086585852069565 },
  { lat: -1.9505530536654525, lng: 30.085590066494152 },
  { lat: -1.9508889224393977, lng: 30.085044245191884 },
  { lat: -1.951316084305404, lng: 30.08458751455423 },
  { lat: -1.951858207779326, lng: 30.084030415956775 },
  { lat: -1.9508415852326315, lng: 30.083672925552445 },
  { lat: -1.9507029548394308, lng: 30.083838701851747 },
  { lat: -1.950820170782394, lng: 30.08397064625323 }
];
