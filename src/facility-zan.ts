import type { Facility } from "@/types";

const fac: Facility = {
  id: "PAZA",
  faa_id: "ZAN",
  name: "Anchorage ARTCC",
  logo: "https://cdn.vzanartcc.net/assets/img/logo-no-text.png",
  minVisitorRating: "S2",
  domain: "vzanartcc.net",
  apiUrl: "https://api.vzanartcc.net",
  devApiUrl: "https://api.dev.vzanartcc.net",
  hasOceanicCert: true,
  navbarClasses: "bg-alaska-blue dark:bg-alaska-blue text-white",
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/zan/views/pages/Homepage.vue"),
    },
    {
      path: "/oceanic",
      name: "Oceanic",
      component: () => import("@/facilities/zan/views/pages/Oceanic.vue"),
    },
  ],
  roles: [
    {
      name: "ATM",
      role: "atm",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "DATM",
      role: "datm",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "TA",
      role: "ta",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "EC",
      role: "ec",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "FE",
      role: "fe",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "WM",
      role: "wm",
      canGrant: ["atm", "datm", "wm"],
    },
    {
      name: "Events Team",
      role: "events",
      canGrant: ["atm", "datm", "ec", "wm"],
    },
    {
      name: "Facilities Team",
      role: "facilities",
      canGrant: ["atm", "datm", "fe", "wm"],
    },
    {
      name: "Instructor",
      role: "ins",
      canGrant: ["atm", "datm", "ta", "wm"],
    },
    {
      name: "Mentor",
      role: "mtr",
      canGrant: ["atm", "datm", "ta", "wm"],
    },
  ],
  boundaries: {
    center: [
      [68, -168.973056],
      [72, -158],
      [72, -141],
      [62, -141],
      [60.35, -139.183333],
      [60.351389, -139.075],
      [60.320833, -139.066667],
      [60.086111, -139.2],
      [59.991667, -139.05],
      [59.9, -138.708333],
      [59.808333, -138.666667],
      [59.770833, -138.633333],
      [59.566667, -135.033333],
      [59.470833, -135.025],
      [59.454167, -135.066667],
      [59.429167, -135.1],
      [59.3875, -134.983333],
      [59.35, -135.025],
      [59.283333, -134.958333],
      [59.25, -134.7],
      [59.191667, -134.683333],
      [59.133333, -134.575],
      [59.133333, -134.483333],
      [59.091667, -134.45],
      [59.041667, -134.383333],
      [58.975, -134.408333],
      [58.9625, -134.316667],
      [58.925, -134.3375],
      [58.858333, -134.25],
      [58.766667, -133.958333],
      [58.725, -133.833333],
      [58.6, -133.691667],
      [58.525, -133.558333],
      [58.425, -133.375],
      [58.3875, -133.458333],
      [58.275, -133.341667],
      [58.2125, -133.25],
      [58.158333, -133.175],
      [58, -133.070833],
      [57.8375, -132.866667],
      [57.7, -132.75],
      [57.616667, -132.666667],
      [57.491667, -132.55],
      [57.35, -132.366667],
      [57.208333, -132.25],
      [57.0875, -132.375],
      [57.041667, -132.041667],
      [57, -132.083333],
      [56.875, -132.133333],
      [56.808333, -131.875],
      [56.75, -131.9],
      [56.704167, -131.866667],
      [56.6, -131.841667],
      [56.6125, -131.583333],
      [56.55, -131.466667],
      [56.45, -131.183333],
      [56.408333, -131.083333],
      [56.3625, -130.783333],
      [56.266667, -130.625],
      [56.245833, -130.55],
      [56.241667, -130.466667],
      [56.141667, -130.433333],
      [56.129167, -130.341667],
      [56.095833, -130.25],
      [56.125, -130.1],
      [56.008333, -130],
      [55.916667, -130.016667],
      [55.908333, -130],
      [55.825, -130.083333],
      [55.808333, -130.125],
      [55.766667, -130.15],
      [55.716667, -130.145833],
      [55.683333, -130.108333],
      [55.583333, -130.125],
      [55.504167, -130.095833],
      [55.445833, -130.033333],
      [55.341667, -130.025],
      [55.283333, -129.970833],
      [55.191667, -130.1],
      [55.066667, -130.1875],
      [54.975, -130.266667],
      [54.85, -130.45],
      [54.795833, -130.55],
      [54.779167, -130.629167],
      [54.7625, -130.65],
      [54.741667, -130.625],
      [54.708333, -130.608333],
      [54.491667, -131.8],
      [54.583333, -132.833333],
      [54.108333, -134],
      [54.108333, -135.45],
      [54, -136],
      [53.367444, -137],
      [56.761667, -151.75],
      [56, -153],
      [53.5, -160],
      [51.4, -167.816667],
      [50.133333, -176.566667],
      [50.616667, -180],
      [51.083333, -180],
      [51.5, -180],
      [54.677778, -180],
      [60, -180],
      [62.583333, -175],
      [65, -168.973056],
      [68, -168.973056],
    ],
  },
  center: [61.17588, -149.99008],
  defaultZoom: 3,
  airports: [
    {
      icao: "PAKW",
      name: "Klawock Airport (FAA: AKW)",
      latitude: 55.579216,
      longitude: -133.07103,
    },
    {
      icao: "PAHY",
      name: "Hydaburg Seaplane Base",
      latitude: 55.206318,
      longitude: -132.82831,
    },
    {
      icao: "PAKT",
      name: "Ketchikan International Airport",
      latitude: 55.35541,
      longitude: -131.71056,
    },
    {
      icao: "PAWG",
      name: "Wrangell Airport",
      latitude: 56.485023,
      longitude: -132.3796,
    },
    {
      icao: "PAPG",
      name: "Petersburg James A. Johnson Airport",
      latitude: 56.801666,
      longitude: -132.94528,
    },
    {
      icao: "PAFE",
      name: "Kake Airport (FAA: AFE)",
      latitude: 0,
      longitude: 0,
    },
    {
      icao: "PASI",
      name: "Sitka Rocky Gutierrez Airport",
      latitude: 57.05272,
      longitude: -135.36514,
    },
    {
      icao: "PAGN",
      name: "Angoon Seaplane Base",
      latitude: 57.496597,
      longitude: -134.5697,
    },
    {
      icao: "PAJN",
      name: "Juneau International Airport",
      latitude: 58.35798,
      longitude: -134.58318,
    },
    {
      icao: "PAOH",
      name: "Hoonah Airport",
      latitude: 58.09855,
      longitude: -135.41193,
    },
    {
      icao: "PAGS",
      name: "Gustavus Airport",
      latitude: 58.42247,
      longitude: -135.70305,
    },
    {
      icao: "PAEL",
      name: "Elfin Cove Seaplane Base",
      latitude: 58.195183,
      longitude: -136.3474,
    },
    {
      icao: "PAHN",
      name: "Haines Airport",
      latitude: 59.247337,
      longitude: -135.5294,
    },
    {
      icao: "PAGY",
      name: "Skagway Airport",
      latitude: 59.453842,
      longitude: -135.3264,
    },
    {
      icao: "PAYA",
      name: "Yakutat Airport",
      latitude: 59.509937,
      longitude: -139.66862,
    },
    {
      icao: "PACV",
      name: "Merle K. (Mudhole) Smith Airport",
      latitude: 60.493435,
      longitude: -145.47572,
    },
    {
      icao: "PAVD",
      name: "Valdez Airport (Pioneer Field)",
      latitude: 61.13389,
      longitude: -146.24834,
    },
    {
      icao: "PAGK",
      name: "Gulkana Airport",
      latitude: 62.15489,
      longitude: -145.45663,
    },
    {
      icao: "PAOR",
      name: "Northway Airport",
      latitude: 62.96172,
      longitude: -141.92435,
    },
    {
      icao: "PABI",
      name: "Allen Army Airfield",
      latitude: 63.99472,
      longitude: -145.72028,
    },
    {
      icao: "PAEG",
      name: "Eagle Airport",
      latitude: 39.64015,
      longitude: -106.913605,
    },
    {
      icao: "PAEI",
      name: "Eielson Air Force Base",
      latitude: 64.6431,
      longitude: -147.06383,
    },
    {
      icao: "PAFA",
      name: "Fairbanks International Airport",
      latitude: 64.816414,
      longitude: -147.86351,
    },
    {
      icao: "PFYU",
      name: "Fort Yukon Airport",
      latitude: 66.57159,
      longitude: -145.24966,
    },
    {
      icao: "PARC",
      name: "Arctic Village Airport",
      latitude: 68.11444,
      longitude: -145.57916,
    },
    {
      icao: "PABA",
      name: "Barter Island LRRS Airport",
      latitude: 70.11312,
      longitude: -143.65268,
    },
    {
      icao: "PASC",
      name: "Deadhorse Airport",
      latitude: 70.19716,
      longitude: -148.46109,
    },
    {
      icao: "PAQT",
      name: "Nuiqsut Airport (FAA: AQT)",
      latitude: 70.209724,
      longitude: -151.00555,
    },
    {
      icao: "PATQ",
      name: "Atqasuk Edward Burnell Sr. Memorial Airport",
      latitude: 70.46747,
      longitude: -157.432,
    },
    {
      icao: "PABR",
      name: "Wiley Post–Will Rogers Memorial Airport",
      latitude: 71.28491,
      longitude: -156.76636,
    },
    {
      icao: "PAWI",
      name: "Wainwright Airport (FAA: AWI)",
      latitude: 70.63772,
      longitude: -159.99707,
    },
    {
      icao: "PPIZ",
      name: "Point Lay LRRS Airport",
      latitude: 69.73287,
      longitude: -163.00534,
    },
    {
      icao: "PAKP",
      name: "Anaktuvuk Pass Airport",
      latitude: 68.13318,
      longitude: -151.74333,
    },
    {
      icao: "PABT",
      name: "Bettles Airport",
      latitude: 66.91929,
      longitude: -151.51907,
    },
    {
      icao: "PAFM",
      name: "Ambler Airport (FAA: AFM)",
      latitude: 67.10524,
      longitude: -157.85498,
    },
    {
      icao: "PAIK",
      name: "Bob Baker Memorial Airport",
      latitude: 66.9755,
      longitude: -160.43674,
    },
    {
      icao: "PAOT",
      name: "Ralph Wien Memorial Airport",
      latitude: 66.88811,
      longitude: -162.59338,
    },
    {
      icao: "PFNO",
      name: "Robert (Bob) Curtis Memorial Airport (FAA: D76)",
      latitude: 0,
      longitude: 0,
    },
    {
      icao: "PASK",
      name: "Selawik Airport",
      latitude: 66.59991,
      longitude: -159.98322,
    },
    {
      icao: "PASH",
      name: "Shishmaref Airport",
      latitude: 66.25288,
      longitude: -166.0802,
    },
    {
      icao: "PATC",
      name: "Tin City LRRS Airport",
      latitude: 65.56441,
      longitude: -167.92198,
    },
    {
      icao: "PATE",
      name: "Teller Airport (FAA: TER)",
      latitude: 65.24037,
      longitude: -166.3391,
    },
    {
      icao: "PAOM",
      name: "Nome Airport",
      latitude: 64.50993,
      longitude: -165.44351,
    },
    {
      icao: "PAWM",
      name: "White Mountain Airport",
      latitude: 43.819984,
      longitude: -71.13475,
    },
    {
      icao: "PAGL",
      name: "Golovin Airport",
      latitude: 64.54801,
      longitude: -163.01434,
    },
    {
      icao: "PFEL",
      name: "Elim Airport",
      latitude: 64.61442,
      longitude: -162.27171,
    },
    {
      icao: "PFSH",
      name: "Shaktoolik Airport (FAA: 2C7)",
      latitude: 64.37159,
      longitude: -161.22415,
    },
    {
      icao: "PAGA",
      name: "Edward G. Pitka Sr. Airport",
      latitude: 64.73703,
      longitude: -156.95262,
    },
    {
      icao: "PAHL",
      name: "Huslia Airport (FAA: HLA)",
      latitude: 65.69793,
      longitude: -156.3511,
    },
    {
      icao: "PAIM",
      name: "Indian Mountain LRRS Airport",
      latitude: 65.9928,
      longitude: -153.70428,
    },
    {
      icao: "PATA",
      name: "Ralph M. Calhoun Memorial Airport",
      latitude: 65.173195,
      longitude: -152.1097,
    },
    {
      icao: "PANN",
      name: "Nenana Municipal Airport",
      latitude: 64.549164,
      longitude: -149.07361,
    },
    {
      icao: "PAIN",
      name: "McKinley National Park Airport (FAA: INR)",
      latitude: 63.732002,
      longitude: -148.91176,
    },
    {
      icao: "PATK",
      name: "Talkeetna Airport",
      latitude: 62.321835,
      longitude: -150.09367,
    },
    {
      icao: "PAAQ",
      name: "Palmer Municipal Airport",
      latitude: 61.600647,
      longitude: -149.09108,
    },
    {
      icao: "PANC",
      name: "Ted Stevens Anchorage International Airport",
      latitude: 61.175888,
      longitude: -149.99008,
    },
    {
      icao: "PAWD",
      name: "Seward Airport",
      latitude: 60.13016,
      longitude: -149.41788,
    },
    {
      icao: "PASO",
      name: "Seldovia Airport",
      latitude: 59.44208,
      longitude: -151.70398,
    },
    {
      icao: "PAHO",
      name: "Homer Airport",
      latitude: 59.643856,
      longitude: -151.49097,
    },
    {
      icao: "PAEN",
      name: "Kenai Municipal Airport",
      latitude: 60.570545,
      longitude: -151.24619,
    },
    {
      icao: "PAMH",
      name: "Lake Minchumina Airport (FAA: MHM)",
      latitude: 63.88327,
      longitude: -152.31668,
    },
    {
      icao: "PAUN",
      name: "Unalakleet Airport",
      latitude: 63.888508,
      longitude: -160.79933,
    },
    {
      icao: "PAFS",
      name: "Nikolai Airport (FAA: FSP)",
      latitude: 63.01882,
      longitude: -154.3575,
    },
    {
      icao: "PAMC",
      name: "McGrath Airport",
      latitude: 62.952778,
      longitude: -155.60556,
    },
    {
      icao: "PAHX",
      name: "Shageluk Airport",
      latitude: 62.691357,
      longitude: -159.56923,
    },
    {
      icao: "PANV",
      name: "Anvik Airport",
      latitude: 62.64841,
      longitude: -160.19019,
    },
    {
      icao: "PASM",
      name: "St. Mary's Airport",
      latitude: 49.913414,
      longitude: -6.29192,
    },
    {
      icao: "PAMK",
      name: "St. Michael Airport",
      latitude: 63.48996,
      longitude: -162.1103,
    },
    {
      icao: "PACZ",
      name: "Cape Romanzof LRRS Airport",
      latitude: 61.78181,
      longitude: -166.03723,
    },
    {
      icao: "PAVA",
      name: "Chevak Airport",
      latitude: 61.540348,
      longitude: -165.59898,
    },
    {
      icao: "PADM",
      name: "Marshall Don Hunter Sr. Airport (FAA: MDM)",
      latitude: 61.866318,
      longitude: -162.03372,
    },
    {
      icao: "PARS",
      name: "Russian Mission Airport",
      latitude: 61.78284,
      longitude: -161.33067,
    },
    {
      icao: "PALG",
      name: "Kalskag Airport",
      latitude: 61.535892,
      longitude: -160.34401,
    },
    {
      icao: "PANI",
      name: "Aniak Airport",
      latitude: 61.5808,
      longitude: -159.54259,
    },
    {
      icao: "PASL",
      name: "Sleetmute Airport",
      latitude: 61.700695,
      longitude: -157.16623,
    },
    {
      icao: "PASV",
      name: "Sparrevohn LRRS Airport",
      latitude: 61.10305,
      longitude: -155.57602,
    },
    {
      icao: "PAKW",
      name: "Klawock Airport (FAA: AKW)",
      latitude: 55.579216,
      longitude: -133.07103,
    },
    {
      icao: "PAIL",
      name: "Iliamna Airport",
      latitude: 59.75311,
      longitude: -154.91264,
    },
    {
      icao: "PAJZ",
      name: "Koliganek Airport (FAA: JZZ)",
      latitude: 59.726643,
      longitude: -157.25948,
    },
    {
      icao: "PABE",
      name: "Bethel Airport",
      latitude: 60.77972,
      longitude: -161.83778,
    },
    {
      icao: "PAOO",
      name: "Toksook Bay Airport",
      latitude: 60.537857,
      longitude: -165.08942,
    },
    {
      icao: "PAKI",
      name: "Kipnuk Airport (FAA: IIK)",
      latitude: 59.932953,
      longitude: -164.03052,
    },
    {
      icao: "PAPM",
      name: "Platinum Airport",
      latitude: 59.016365,
      longitude: -161.82562,
    },
    {
      icao: "PAEH",
      name: "Cape Newenham LRRS Airport",
      latitude: 58.646427,
      longitude: -162.06277,
    },
    {
      icao: "PATG",
      name: "Togiak Airport",
      latitude: 59.05322,
      longitude: -160.398,
    },
    {
      icao: "PADL",
      name: "Dillingham Airport",
      latitude: 59.04594,
      longitude: -158.50444,
    },
    {
      icao: "PAKN",
      name: "King Salmon Airport",
      latitude: 58.676666,
      longitude: -156.64917,
    },
    {
      icao: "PAIG",
      name: "Igiugig Airport",
      latitude: 59.323982,
      longitude: -155.90227,
    },
    {
      icao: "PADQ",
      name: "Kodiak Airport",
      latitude: 57.754326,
      longitude: -152.51695,
    },
    {
      icao: "PAKH",
      name: "Akhiok Airport",
      latitude: 56.93869,
      longitude: -154.18256,
    },
    {
      icao: "PAPN",
      name: "Pilot Point Airport (FAA: PNP)",
      latitude: 57.578533,
      longitude: -157.5707,
    },
    {
      icao: "PAPH",
      name: "Port Heiden Airport",
      latitude: 56.958523,
      longitude: -158.6388,
    },
    {
      icao: "PAOU",
      name: "Nelson Lagoon Airport (FAA: OUL)",
      latitude: 56.008015,
      longitude: -161.16156,
    },
    {
      icao: "PASD",
      name: "Sand Point Airport",
      latitude: 55.317883,
      longitude: -160.52284,
    },
    {
      icao: "PAVC",
      name: "King Cove Airport",
      latitude: 55.115005,
      longitude: -162.2743,
    },
    {
      icao: "PACD",
      name: "Cold Bay Airport",
      latitude: 55.20229,
      longitude: -162.7197,
    },
    {
      icao: "PAKF",
      name: "False Pass Airport",
      latitude: 54.8496,
      longitude: -163.4083,
    },
    {
      icao: "PADU",
      name: "Unalaska Airport",
      latitude: 53.898342,
      longitude: -166.54422,
    },
    {
      icao: "PADK",
      name: "Adak Airport",
      latitude: 51.881317,
      longitude: -176.64822,
    },
    {
      icao: "PASY",
      name: "Eareckson Air Station",
      latitude: 52.711815,
      longitude: 174.1258,
    },
    {
      icao: "PAPB",
      name: "St. George Airport (FAA: PBV)",
      latitude: 0,
      longitude: 0,
    },
    {
      icao: "PASN",
      name: "St. Paul Island Airport",
      latitude: 57.157745,
      longitude: -170.22989,
    },
    {
      icao: "PASA",
      name: "Savoonga Airport",
      latitude: 63.69045,
      longitude: -170.4862,
    },
    {
      icao: "PAWN",
      name: "Noatak Airport",
      latitude: 67.56355,
      longitude: -162.97737,
    },
    {
      icao: "PADG",
      name: "Red Dog Airport",
      latitude: 68.03193,
      longitude: -162.8993,
    },
  ],
  links: [
    {
      title: "Pilots",
      sublinks: [
        {
          title: "Oceanic Information",
          to: "Oceanic",
        },
      ],
    },
  ],
};

export default fac;
