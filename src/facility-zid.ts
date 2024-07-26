import type { Facility } from "@/types";

const fac: Facility = {
  id: "KZID",
  faa_id: "ZID",
  name: "Indianapolis ARTCC",
  navbarName: " ",
  logo: "https://cdn.zidartcc.org/assets/img/indy_logo.svg",
  skipMajor: false,
  domain: "zidartcc.org",
  apiUrl: "https://api.zidartcc.org",
  devApiUrl: "https://api.dev.zidartcc.org",
  navbarClasses: "bg-black-deep text-white",
  footerClasses: "bg-black-deep text-white",
  primaryBackground: "bg-black-deep",
  certificationsHideNone: true,
  resources: ["SOPs", "LOAs", "vATIS", "Misc"],
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/zid/views/pages/Homepage.vue"),
    },
    {
      path: "/staffing_request",
      name: "StaffingRequest",
      component: () => import("@/facilities/zid/views/pages/StaffingRequest.vue"),
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
      [40.0, -88.25],
      [40.0, -86.1],
      [40.354167, -85.525],
      [40.666667, -84.683333],
      [40.775, -84.683333],
      [40.908333, -84.7],
      [40.783333, -83.745833],
      [40.7375, -83.65],
      [40.558333, -83.5],
      [40.508333, -83.333333],
      [40.6, -81.783333],
      [40.216667, -81.633333],
      [39.75, -81.55],
      [39.166667, -80.5],
      [39.166667, -80.4],
      [38.766667, -80.566667],
      [38.041667, -80.716667],
      [37.466667, -80.841667],
      [37.304167, -80.745833],
      [36.183333, -85.4],
      [36.9, -85.583333],
      [37.013889, -85.745833],
      [37.3, -86.15],
      [37.275, -87.397222],
      [37.725, -88.316667],
      [38.15, -88.233333],
      [38.485278, -88.094444],
      [39.868333, -88.148056],
      [39.904167, -88.183333],
      [40.0, -88.25],
    ],
  },
  center: [38.6088, -84.208],
  defaultZoom: 6,
  airports: [
    {
      icao: "KCVG",
      name: "Cincinnati/Northern Kentucky International Airport",
      latitude: 39.0488375,
      longitude: -84.6678208,
    },
    {
      icao: "KSDF",
      name: "Louisville Muhammad Ali International Airport",
      latitude: 38.174085,
      longitude: -85.7364936,
    },
    {
      icao: "KIND",
      name: "Indianapolis International Airport",
      latitude: 39.7173056,
      longitude: -86.2946389,
    },
    {
      icao: "KCMH",
      name: "John Glenn Columbus International Airport",
      latitude: 39.9969467,
      longitude: -82.8921592,
    },
  ],
  // This merges with the `links` in src/facility.ts using title as the key
  links: [
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
  staticResources: [],
};

export default fac;
