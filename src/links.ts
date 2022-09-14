import { RouteLocationRaw } from "vue-router";

export interface Link {
  title: string;
  to: string | RouteLocationRaw;
  sublinks?: Link[];
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
        to: { name: "NotImplemented" },
        title: "SkyVector",
      },
      {
        to: { name: "NotImplemented" },
        title: "Weather",
      },
      {
        to: { name: "NotImplemented" },
        title: "Charts",
      },
      {
        to: { name: "NotImplemented" },
        title: "ZDV Airports",
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
        to: { name: "NotImplemented" },
        title: "Staff",
      },
      {
        to: { name: "NotImplemented" },
        title: "Roster",
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
