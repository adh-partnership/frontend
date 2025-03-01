import type { Facility } from "@/types";

const fac: Facility = {
  id: "KZLC",
  faa_id: "ZLC",
  name: "Salt Lake City ARTCC",
  logo: "https://cdn.zlcartcc.org/assets/img/logo.png",
  skipMajor: false,
  domain: "zlcartcc.org",
  apiUrl: "https://api.zlcartcc.org",
  devApiUrl: "https://api.dev.zlcartcc.org",
  certificationsHideNone: true,
  navbarClasses: "bg-saltlake-orange dark:bg-saltlake-orange text-white",
  footerClasses: "bg-saltlake-orange dark:bg-black-deep text-white",
  primaryBackground: "bg-saltlake-orange",
  primaryHover: "bg-saltlake-orange hover:bg-amber-800",
  resources: ["SOPs", "LOAs", "vATIS", "Supplements", "Misc"],
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/zlc/views/pages/Homepage.vue"),
    },
    {
      path: "/staffing_request",
      name: "StaffingRequest",
      component: () => import("@/facilities/zdv/views/pages/StaffingRequest.vue"),
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
      name: "Web Team",
      role: "web",
      canGrant: ["atm", "datm", "fe", "wm"],
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
    {
      name: "Mentor-in-Training",
      role: "mit",
      canGrant: ["atm", "datm", "ta", "wm"],
    },
  ],
  boundaries: {
    center: [
      [44.316667, -106.266667],
      [43.883333, -107.283333],
      [42.416666, -107.05],
      [41.608333, -108],
      [41.366667, -108.275],
      [40.85, -109.1],
      [40, -109.166667],
      [39.583333, -110.3],
      [39.216667, -109.983333],
      [38.933333, -109.983333],
      [38.2, -109.983333],
      [38.129167, -110.156944],
      [37.833333, -110.883333],
      [37.4125, -111.879167],
      [37.5, -112.058333],
      [37.5, -113],
      [37.716667, -113.783333],
      [37.883333, -113.65],
      [38.016667, -114.2],
      [37.883333, -116.183333],
      [37.883333, -117.016667],
      [38.083333, -117.266667],
      [39.933333, -117.366667],
      [41, -119.5],
      [42.666667, -119],
      [43.633333, -119.283333],
      [44.840555, -118.416667],
      [45.333333, -117.75],
      [45.333333, -115],
      [48.416667, -115],
      [49, -114.666667],
      [49, -103.166667],
      [45, -103.166667],
      [45.1, -104.316667],
      [45.2375, -106],
      [44.316667, -106.266667],
    ],
  },
  center: [43.20625, -111.333333],
  defaultZoom: 6,
  airports: [
    {
      icao: "KBIL",
      name: "Billings Logan International Airport",
      latitude: 45.8078491,
      longitude: -108.5435436,
    },
    {
      icao: "KBOI",
      name: "Boise Air Terminal/Gowen Field",
      latitude: 43.5643611,
      longitude: -116.2228611,
    },
    {
      icao: "KBZN",
      name: "Bozeman Yellowstone International Airport",
      latitude: 45.7772358,
      longitude: -111.1502603,
    },
    {
      icao: "KGPI",
      name: "Glacier Park International Airport",
      latitude: 48.3105,
      longitude: -114.256,
    },
    {
      icao: "KGTF",
      name: "Great Falls International Airport",
      latitude: 47.4822993,
      longitude: -111.3702794,
    },
    {
      icao: "KHIF",
      name: "Hill Air Force Base",
      latitude: 41.12394,
      longitude: -111.9730564,
    },
    {
      icao: "KHLN",
      name: "Helena Regional Airport",
      latitude: 46.6067222,
      longitude: -111.9832778,
    },
    {
      icao: "KIDA",
      name: "Idaho Falls Regional Airport",
      latitude: 43.5136733,
      longitude: -112.0708203,
    },
    {
      icao: "KJAC",
      name: "Jackson Hole Airport",
      latitude: 43.6073333,
      longitude: -110.73775,
    },
    {
      icao: "KMSO",
      name: "Missoula Montana Airport",
      latitude: 46.9163056,
      longitude: -114.0905556,
    },
    {
      icao: "KMUO",
      name: "Mountain Home Air Force Base",
      latitude: 43.0435972,
      longitude: -115.8724333,
    },
    {
      icao: "KOGD",
      name: "Ogden-Hinckley Airport",
      latitude: 41.1950704,
      longitude: -112.0121947,
    },
    {
      icao: "KPIH",
      name: "Pocatello Regional Airport",
      latitude: 42.9097925,
      longitude: -112.5959189,
    },
    {
      icao: "KPVU",
      name: "Provo Municipal Airport",
      latitude: 40.2191667,
      longitude: -111.7233611,
    },
    {
      icao: "KSLC",
      name: "Salt Lake City International Airport",
      latitude: 40.7883933,
      longitude: -111.9777733,
    },
    {
      icao: "KSUN",
      name: "Friedman Memorial Airport",
      latitude: 43.5037806,
      longitude: -114.2955583,
    },
    {
      icao: "KTWF",
      name: "Joslin Field/Magic Valley Regional Airport",
      latitude: 42.4818092,
      longitude: -114.4877361,
    },
  ],
  // This merges with the links in src/facility.ts using title as the key
  links: [
    {
      title: "Profile",
      sublinks: [
        {
          title: "Schedule Training",
          href: "https://scheddy.zlcartcc.org/",
        },
      ],
    },
    {
      title: "Pilots",
      to: "#",
      sublinks: [
        {
          to: { name: "StaffingRequest" },
          title: "Staffing Request",
        },
      ],
    },
  ],
  staticResources: [
    {
      category: "Misc",
      description: "Denver Training Academy Material",
      name: "Denver Training Academy",
      url: "https://vats.im/dta",
      created_at: "2023-05-14T18:51:57.177Z",
      updated_at: "2023-05-14T18:51:57.177Z",
    },
    {
      category: "Misc",
      description: "Controller Cheat Sheet",
      name: "Controller Cheat Sheet",
      url: "https://vats.im/zlccheatsheet",
      created_at: "2024-04-30T18:37:18",
      updated_at: "2024-03-07T18:37:18",
    },
  ],
};

export default fac;
