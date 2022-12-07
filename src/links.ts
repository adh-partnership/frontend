import apiUrl from "@/utils/api";
import fac from "@/facility";
import { RouteLocationRaw } from "vue-router";

export interface Link {
  title: string;
  to?: string | RouteLocationRaw;
  href?: string;
  sublinks?: Link[];
  auth?: boolean;
  roles?: string[];
  sameWindow?: boolean;
}

const ProfileLinks: Link[] = [
  {
    title: "Discord Dashboard",
    href: `https://discord.${fac.domain}/`,
  },
  {
    title: "Logout",
    href: `${apiUrl}/v1/user/logout?redirect=${window.location.href}`,
    sameWindow: true,
  },
];

const Links: Link[] = [
  {
    title: "Home",
    to: { name: "Home" },
  },
  {
    title: "Events",
    to: { name: "Events" },
  },
  {
    to: { name: "Feedback" },
    title: "Feedback",
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
        to: { name: "Resources" },
        title: "Resources",
      },
      {
        to: { name: "VisitingApplication" },
        title: "Visitor Application",
      },
    ],
  },
];

export default Links;
export { ProfileLinks };
