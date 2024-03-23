import type { Facility } from "@/types";

const fac: Facility = {
  id: "PHZH",
  faa_id: "ZHN",
  name: "Honolulu Control Facility",
  navbarName: "Honolulu CF",
  skipMajor: false,
  logo: "https://cdn.vhcf.net/assets/logo/hibiscus/logo_solid.png",
  customRoutes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/facilities/hcf/views/pages/Homepage.vue"),
    },
  ],
  domain: "vhcf.net",
  apiUrl: "https://api.vhcf.net",
  devApiUrl: "https://api.dev.vhcf.net",
  certificationsHideNone: false,
  navbarClasses: "bg-slate-800 text-white",
  boundaries: {
    center: [
      [20.000001, -150.000001],
      [18.75, -152.333333],
      [19.166667, -153.85],
      [17.000001, -156.000001],
      [17.000001, -160.000001],
      [20.000001, -164.000001],
      [24.000001, -164.000001],
      [26.2, -161.333333],
      [26.0325, -155.589167],
      [25.161667, -154.563333],
      [24.543333, -153.848333],
      [23.916667, -153.136667],
      [23.165, -152.295],
      [22.501667, -151.565],
      [21.733333, -151.078333],
      [20.868333, -150.536667],
      [20.000001, -150.000001],
    ],
  },
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
  center: [39.861667, -104.673056],
  resources: ["SOPs", "LOAs", "vATIS", "Misc"],
  defaultZoom: 6,
  airports: [
    {
      icao: "PHLI",
      name: "Lihue/Kauaui Island Airport",
      latitude: 21.975983,
      longitude: -159.338958,
    },
    {
      icao: "PHHI",
      name: "Wheeler Air Force Base",
      latitude: 21.4835,
      longitude: -158.039667,
    },
    {
      icao: "PHNG",
      name: "Kaneohe Bay MCAS",
      latitude: 21.450333,
      longitude: -157.768667,
    },
    {
      icao: "PHNL",
      name: "Honolulu International Airport",
      latitude: 21.318681,
      longitude: -157.922428,
    },
    {
      icao: "PHJR",
      name: "Kalaeloa Airport",
      latitude: 21.3073539,
      longitude: -158.0703017,
    },
    {
      icao: "PHMK",
      name: "Molokai Airport",
      latitude: 21.152175,
      longitude: -157.096683,
    },
    {
      icao: "PHNY",
      name: "Lanai City Airport",
      latitude: 20.7856,
      longitude: -156.951,
    },
    {
      icao: "PHOG",
      name: "Kahului Airport",
      latitude: 20.89865,
      longitude: -156.430458,
    },
    {
      icao: "PHKO",
      name: "Kona International Airport",
      latitude: 19.738767,
      longitude: -156.045631,
    },
    {
      icao: "PHTO",
      name: "Hilo International Airport",
      latitude: 19.721375,
      longitude: -155.048469,
    },
  ],
  links: [
    {
      title: "Profile",
      sublinks: [
        {
          title: "Schedule Training",
          href: "https://vhcf.trafft.com",
        },
      ],
    },
  ],
};

export default fac;
