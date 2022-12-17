/* eslint-disable import/prefer-default-export */
declare interface MenuItem {
  title: string;
  to?: string;
  href?: string;
}

export type Facility = {
  id: string;
  name: string;
  navbarName?: string;
  logo: string;
  apiUrl: string;
  devApiUrl: string;
  navbarClasses?: string;
  homeIntroText?: string;
  minVisitorRating: string;
  center: [number, number];
  domain: string;
  defaultZoom: number;
  boundaries: { [key: string]: [number, number][] };
  airports: { icao: string; name: string; latitude: number; longitude: number }[];
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
  id: number;
  category: string;
  description: string;
  name: string;
  url: string;

  created_at: string;
  created_by: Controller;
  updated_at: string;
  updated_by: Controller;
};

export type Controller = {
  cid: number;
  first_name: string;
  last_name: string;
  operating_initials: string;
  controller_type: string;
  certifications: {
    ground: string;
    major_ground: string;
    local: string;
    major_local: string;
    approach: string;
    major_approach: string;
    enroute: string;
  };
  rating: string;
  status: string;
  roles: string[];
  region: string;
  division: string;
  subdivision: string;
  discord_id: string;
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

export type { Link } from "@/links";
