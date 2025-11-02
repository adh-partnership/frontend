import type { Facility } from "@/types";

const fac: Facility = {
  id: "KZKC",
  faa_id: "ZKC",
  name: "Kansas City ARTCC",
  logo: "https://cdn.zkcartcc.org/assets/img/logo.png",
  skipMajor: false,
  domain: "zkcartcc.org",
  apiUrl: "https://api.zkcartcc.org",
  devApiUrl: "https://api.dev.zkcartcc.org",
  certificationsHideNone: true,
  navbarClasses: "bg-kansas-gray dark:bg-black-deep text-white",
  footerClasses: "bg-kansas-gray dark:bg-black-deep text-white",
  primaryBackground: "bg-kansas-blue",
  primaryHover: "bg-kansas-blue hover:bg-kansas-hover",
  resources: ["SOPs", "LOAs", "vATIS", "Misc"],
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/zkc/views/pages/Homepage.vue"),
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
      [39.466667, -98.8],
      [40.525, -93.491667],
      [40.763889, -91.741667],
      [40.783333, -91.65],
      [40, -89.75],
      [40, -88.25],
      [39.904167, -88.183333],
      [39.868333, -88.148056],
      [38.485278, -88.094444],
      [38.15, -88.233333],
      [37.725, -88.316667],
      [37.533333, -88.833333],
      [37.15, -90.566667],
      [36.725, -93.25],
      [36.491667, -94.408333],
      [36.433333, -94.683333],
      [35.870833, -95.366667],
      [36.016667, -95.6125],
      [35.870833, -96.05],
      [35.65, -96.404167],
      [35.458333, -97.083333],
      [35.491667, -97.583333],
      [35.925, -97.883333],
      [35.883333, -98.016667],
      [35.816667, -98.5],
      [35.829167, -100],
      [36.5, -101.75],
      [37.5, -102.55],
      [39.466667, -98.8],
    ],
  },
  center: [38.156, -94.837167],
  defaultZoom: 6,
  airports: [
    {
      icao: "KMCI",
      name: "Kansas City International Airport",
      latitude: 39.2976111,
      longitude: -94.7138889,
    },
    {
      icao: "KSTL",
      name: "St Louis Lambert International Airport",
      latitude: 38.7486982,
      longitude: -90.3700257,
    },
    {
      icao: "KICT",
      name: "Wichita Dwight D Eisenhower National Airport",
      latitude: 37.6499525,
      longitude: -97.4330428,
    },
    {
      icao: "KTUL",
      name: "Tulsa International Airport",
      latitude: 36.1983933,
      longitude: -95.8881053,
    },
  ],
  // This merges with the links in src/facility.ts using title as the key
  links: [
    {
      title: "Pilots",
      to: "#",
      sublinks: [
        {
          to: { name: "StaffingRequest" },
          title: "Staffing Request",
        },
        {
          title: "Profile",
          auth: true,
          rosteredController: true,
          sublinks: [
        {
          title: "Scheddy",
          href: "https://scheddy.zkcartcc.org",
        },
      ],
    },
  ],
  staticResources: [
    {
      category: "Misc",
      description: "ScratchPad Cheatsheet",
      name: "ScratchPad Cheatsheet",
      url: "https://docs.google.com/spreadsheets/d/1VgTgOgFWDQ_t6USFnl5dx2IorZMX8ACE/edit?usp=sharing&ouid=102287920074985472002&rtpof=true&sd=true",
      created_at: "2024-12-16T00:00:00.000Z",
      updated_at: "2024-12-16T00:00:00.000Z",
    },
    {
      category: "Misc",
      description: "ZKC Alias Reference Sheet",
      name: "ZKC Alias Reference Sheet",
      url: "https://docs.google.com/spreadsheets/d/1Gj_u0Fa0F2YyTYSydA2LYI5QDxfU6nOZVDDbYOiZJGE/edit?usp=sharing",
      created_at: "2024-12-16T00:00:00.000Z",
      updated_at: "2024-12-16T00:00:00.000Z",
    },
  ],
};

export default fac;
