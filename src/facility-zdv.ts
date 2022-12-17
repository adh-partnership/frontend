import type { Facility } from "@/types";

const fac: Facility = {
  id: "KZDV",
  name: "Denver ARTCC",
  logo: "https://cdn.denartcc.org/assets/img/logo_150.png",
  minVisitorRating: "S1",
  domain: "denartcc.org",
  apiUrl: "https://api.denartcc.org",
  devApiUrl: "https://api.dev.denartcc.org",
  homeIntroText:
    "Welcome to Denver ARTCC! Denver ARTCC covers approximately 285,000 square miles of airspace over the all or part of the states of Colorado, Arizona, New Mexico, Utah, Kansas, Nebraska, South Dakota, Wyoming, and Montana. We are a division of VATSIM, the Virtual Air Traffic Simulation Network's VATUSA Division. We are a group of volunteers who enjoy the challenge of controlling air traffic in a realistic environment. We are always looking for new members to join our team.",
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
  center: [39.861667, -104.673056],
  defaultZoom: 6,
  airports: [
    {
      icao: "KASE",
      name: "Aspen-Pitkin County Airport",
      latitude: 39.22333333333333,
      longitude: -106.86916666666667,
    },
    {
      icao: "KBJC",
      name: "Rocky Mountain Metropolitan Airport",
      latitude: 39.90861111111111,
      longitude: -105.11694444444444,
    },
    {
      icao: "KCPR",
      name: "Casper/Natrona County International Airport",
      latitude: 42.90833333333333,
      longitude: -106.46333333333334,
    },
    {
      icao: "KCYS",
      name: "Cheyenne Regional Airport",
      latitude: 41.15527777777778,
      longitude: -104.81138888888889,
    },
    {
      icao: "KPUB",
      name: "Pueblo Memorial Airport",
      latitude: 38.28916666666667,
      longitude: -104.49638888888889,
    },
    {
      icao: "KCOS",
      name: "City of Colorado Springs Municipal Airport",
      latitude: 38.80583333333333,
      longitude: -104.700833333,
    },
    {
      icao: "KRCA",
      name: "Ellsworth Air Force Base",
      latitude: 44.14527777777778,
      longitude: -103.10361111111111,
    },
    {
      icao: "KGJT",
      name: "Grand Junction Regional Airport",
      latitude: 39.1225,
      longitude: -108.52675,
    },
    {
      icao: "KDEN",
      name: "Denver International Airport",
      latitude: 39.86166666666667,
      longitude: -104.67305555555556,
    },
    {
      icao: "KBKF",
      name: "Griffith-Jennings Memorial Airport",
      latitude: 39.70166666666667,
      longitude: -104.75166666666667,
    },
    {
      icao: "KRAP",
      name: "Rapid City Regional Airport",
      latitude: 44.04527777777778,
      longitude: -103.0575,
    },
    {
      icao: "KAPA",
      name: "Centennial Airport",
      latitude: 39.57083333333333,
      longitude: -104.84805555555556,
    },
    {
      icao: "KEGE",
      name: "Eagle County Regional Airport",
      latitude: 39.64277777777778,
      longitude: -106.9175,
    },
    {
      icao: "KFMN",
      name: "Four Corners Regional Airport",
      latitude: 36.7412511,
      longitude: -108.22916666666667,
    },
    {
      icao: "KCFO",
      name: "Colorado Air and Space Port Airport",
      latitude: 39.7841944,
      longitude: -104.5376389,
    },
    {
      icao: "KFNL",
      name: "Fort Collins-Loveland Municipal Airport",
      latitude: 40.45166666666667,
      longitude: -105.0113256,
    },
    {
      icao: "KLMO",
      name: "Vance Brand Airport",
      latitude: 40.164167,
      longitude: -105.163611,
    },
    {
      icao: "KGUR",
      name: "Gunnison-Crested Butte Regional Airport",
      latitude: 42.25975,
      longitude: -104.7283056,
    },
    {
      icao: "KSBS",
      name: "Steamboat Springs Airport",
      latitude: 40.5162608,
      longitude: -106.8663017,
    },
  ],
};

export default fac;
