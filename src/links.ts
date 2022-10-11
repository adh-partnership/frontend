import { RouteLocationRaw } from "vue-router";

export interface Link {
  title: string;
  to?: string | RouteLocationRaw;
  href?: string;
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
        href: "https://www.skyvector.com",
        title: "SkyVector",
      },
      {
        to: { name: "NotImplemented" },
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
