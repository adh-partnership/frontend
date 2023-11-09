/* eslint-disable import/prefer-default-export */
import { RouteLocationRaw, RouteRecordRaw } from "vue-router";

declare interface MenuItem {
  title: string;
  to?: string;
  href?: string;
}

export interface Overflight {
  alt: number;
  arr: string;
  callsign: string;
  cid: number;
  dep: string;
  facility: string;
  hdg: number;
  lastSeen: string;
  lat: number;
  lon: number;
  route: string;
  spd: number;
  type: string;
}

export interface Airport {
  arpt_id: string;
  arpt_name: string;
  arpt_status: string;
  city: string;
  state_code: string;
  elevation: number;
  icao_id: string;
  latitude: number;
  longitude: number;
  resp_artcc_id: string;
  twr_type_code: string;
}

export interface AirportATC {
  apch_p_provider: string;
  twr_hrs: string;
}

export interface AirportCharts {
  arpt_id: string;
  chart_code: string;
  chart_name: string;
  chart_url: string;
}

export interface AirportWeather {
  arpt_id: string;
  metar: string;
  taf: string;
}

export interface CertificationItem {
  id: number;
  name: string;
  display_name: string;
  order: number;
  hidden: boolean;
  value: string;
}

export interface Link {
  title: string;
  to?: string | RouteLocationRaw;
  href?: string;
  sublinks?: Link[];
  auth?: boolean;
  roles?: string[];
  rosteredController?: boolean;
  sameWindow?: boolean;
  weight?: number;
}

export type FacilityAirport = {
  faa?: string;
  icao: string;
  name: string;
  latitude: number;
  longitude: number;
  displayHome?: boolean;
};

export type Facility = {
  id: string;
  faa_id: string;
  name: string;
  navbarName?: string;
  skipMajor: boolean;
  logo: string;
  apiUrl: string;
  devApiUrl: string;
  certificationsHideNone: boolean;
  navbarClasses?: string;
  footerClasses?: string;
  primaryBackground?: string;
  primaryHover?: string;
  minVisitorRating: string;
  center: [number, number];
  domain: string;
  defaultZoom: number;
  resources?: string[];
  staticResources?: Resource[];
  customRoutes?: RouteRecordRaw[];
  boundaries: { [key: string]: [number, number][] };
  airports: FacilityAirport[];
  roles: {
    name: string;
    role: string;
    canGrant: string[];
  }[];
  links: Link[];
  hasOceanicCert?: boolean;
};

export type ParsedMetar = {
  raw_text: string;
  raw_parts: string[];
  icao?: string;
  observed?: Date;
  wind?: {
    degrees: number;
    speed_kts: string | number;
    speed_mps: string | number;
    gust_kts?: string | number;
    gust_mps?: string | number;
    degrees_from?: number | string;
    degrees_to?: number | string;
  };
  visibility?: {
    miles: string;
    miles_float: number;
    meters: string;
    meters_float: number;
  };
  conditions: { code: string }[];
  clouds?: { code: string; base_feet_agl: number; base_meters_agl: number }[];
  ceiling?: {
    code: string;
    feet_agl: number;
    meters_agl: number;
  };
  temperature?: {
    celsius: number;
    fahrenheit: number;
  };
  dewpoint?: {
    celsius: number;
    fahrenheit: number;
  };
  humidity_percent?: number;
  barometer?: {
    hg: number;
    kpa: number;
    mb: number;
  };
  flight_category?: string;
};

export type Resource = {
  id?: number;
  category: string;
  description: string;
  name: string;
  url: string;

  created_at: string;
  created_by?: Controller;
  updated_at: string;
  updated_by?: Controller;
};

export type Controller = {
  cid: number;
  first_name: string;
  last_name: string;
  operating_initials: string;
  controller_type: string;
  certifications: { [key: string]: CertificationItem };
  rating: string;
  status: string;
  roles: string[];
  region: string;
  division: string;
  subdivision: string;
  discord_id: string;
  roster_join_date: string;
  created_at: string;
  updated_at: string;
};

export type ControllerStats = {
  cid: number;
  first_name: string;
  last_name: string;
  operating_initials: string;
  controllerType: string;
  rating: string;
  cab: number;
  terminal: number;
  enroute: number;
};

export type OnlineController = {
  cid: number;
  controller: Controller;
  frequency: string;
  online_since: string;
  position: string;
};

export type TrainingNote = {
  id: number;
  controller_id: number;
  controller: Controller | null;
  instructor_id: number;
  instructor: Controller | null;
  position: string;
  duration: string;
  session_date: string;
  type: string;
  comments: string;
};

export type VisitorApplication = {
  id: number;
  user: Controller;
  created_at: string;
  updated_at: string;
};

export type Feedback = {
  id: number;
  callsign: string;
  comments: string;
  contact_email: string;
  controller: Controller;
  position: string;
  rating: string;
  status: string;
  submitter: Controller;
  created_at: string;
};

export type EventPosition = {
  id: number;
  position: string;
  user: Controller | null;
  cid: number | null;
};

export type EventSignup = {
  id: number;
  choice1: string;
  choice2: string;
  choice3: string;
  notes: string;
  user: Controller;
};

export type Event = {
  id: number;
  banner: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  positions: EventPosition[] | null;
  signups: EventSignup[] | null;
};

export type PermissionGroups = {
  [key: string]: string[];
};
