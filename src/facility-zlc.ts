import type { Facility } from "@/types";

const fac: Facility = {
  id: "KZLC",
  faa_id: "ZLC",
  name: "Salt Lake City ARTCC",
  logo: "https://cdn.zlcartcc.org/assets/img/logo.png",
  skipMajor: false,
  minVisitorRating: "S1",
  domain: "zlcartcc.org",
  apiUrl: "https://api.zlcartcc.org",
  devApiUrl: "https://api.dev.zlcartcc.org",
  navbarClasses: "bg-saltlake-orange dark:bg-saltlake-orange text-white",
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/zlc/views/pages/Homepage.vue"),
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
      [44.958333, -103.166667],
      [44.7, -101.483333],
      [43.708333, -101.408333],
      [43.288889, -100.1],
      [42, -99.016667],
      [39.983333, -99.058333],
      [39.466667, -98.8],
      [37.5, -102.55],
      [36.716667, -105],
      [36.716667, -106.083333],
      [36.2, -107.466667],
      [36.033333, -108.216667],
      [35.7, -110.233333],
      [35.766667, -111.841667],
      [36.420833, -111.504167],
      [36.733333, -111.608333],
      [37.4125, -111.879167],
      [37.833333, -110.883333],
      [38.129167, -110.156944],
      [38.2, -109.983333],
      [38.933333, -109.983333],
      [39.216667, -109.983333],
      [39.583333, -110.3],
      [40, -109.166667],
      [40.85, -109.1],
      [41.366667, -108.275],
      [41.608333, -108],
      [42.416667, -107.05],
      [43.883333, -107.283333],
      [44.316667, -106.266667],
      [45.2375, -106],
      [45.116667, -104.25],
      [44.958333, -103.166667],
    ],
  },
  center: [40.7883933, -104.673056],
  defaultZoom: 6,
  airports: [
    {
      icao: "KSLC",
      name: "Salt Lake City International Airport",
      latitude: 40.7883933,
      longitude: -111.9777733,
    },
  ],
  // This merges with the links in src/facility.ts using title as the key
  links: [
    {
      title: "Profile",
      sublinks: [
        {
          title: "Schedule Training",
          href: "https://www.picktime.com/vzdv",
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
  ],
};

export default fac;
