import { RouteLocationRaw } from "vue-router";

export interface Link {
  title: string;
  to?: string | RouteLocationRaw;
  href?: string;
  sublinks?: Link[];
  auth?: boolean;
  roles?: string[];
}

const Links: Link[] = [
  {
    title: "Home",
    to: { name: "Home" },
  },
  {
    title: "Events",
    to: { name: "NotImplemented" },
  },
  {
    title: "Pilots",
    to: "#",
    sublinks: [
      {
        href: "https://www.skyvector.com",
        title: "SkyVector",
      },
      {
        to: { name: "Map" },
        title: "Facility Map",
      },
      {
        to: { name: "NotImplemented" },
        title: "Feedback",
      },
    ],
  },
  {
    title: "Facility",
    to: "#",
    sublinks: [
      {
        to: { name: "Staff" },
        title: "Staff",
      },
      {
        to: { name: "Roster" },
        title: "Roster",
      },
      {
        to: { name: "InactiveRoster" },
        title: "Inactive Roster",
        auth: true,
        roles: ["atm", "datm", "wm"],
      },
      {
        to: { name: "NotImplemented" },
        title: "Documents",
      },
      {
        to: { name: "NotImplemented" },
        title: "Visitor Application",
      },
      {
        to: { name: "NotImplemented" },
        title: "Contact Staff",
      },
    ],
  },
];

export default Links;
