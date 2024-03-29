import apiUrl from "@/utils/api";
import fac from "@/facility";
import type { Link } from "@/types";

const ProfileLinks: Link[] = [
  {
    title: "Discord Dashboard",
    href: `https://discord.${fac.domain}/`,
    weight: -1,
  },
  {
    title: "My Training Notes",
    href: `/roster/me#tab2`,
    sameWindow: true,
  },
  {
    title: "Logout",
    href: `${apiUrl}/v1/user/logout?redirect=${window.location.href}`,
    sameWindow: true,
    weight: 999,
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
        to: { name: "Airports" },
        title: "Airports",
      },
      {
        href: "https://www.skyvector.com",
        title: "SkyVector",
      },
      {
        to: { name: "Map" },
        title: "Facility Map & Weather",
      },
    ],
  },
  {
    title: "Facility",
    to: "#",
    sublinks: [
      {
        to: { name: "Certifications" },
        title: "Certifications",
        auth: true,
        roles: ["atm", "datm", "ta", "wm"],
      },
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
        title: "Non-Member Roster",
        auth: true,
        roles: ["atm", "datm", "wm"],
      },
      {
        to: { name: "Resources" },
        title: "Resources",
      },
      {
        to: { name: "Activity" },
        title: "Activity",
      },
      {
        to: { name: "VisitingApplication" },
        title: "Visitor Application",
      },
    ],
  },
];

// Allow merging sublinks by title
const MergeLinks = (incomingLinks: Link[]): void => {
  incomingLinks.forEach((link) => {
    // Check if title is Profile, if so, add to Profile links
    if (link.title === "Profile") {
      if (link.sublinks) {
        ProfileLinks.push(...link.sublinks);
      }
      return;
    }
    // Otherwise, find link based on title from existing links
    const existingLink = Links.find((l) => l.title === link.title);
    if (existingLink) {
      // Merge arrays
      if (link.sublinks && existingLink.sublinks) {
        existingLink.sublinks = existingLink.sublinks.concat(link.sublinks);
      } else {
        existingLink.sublinks = link.sublinks;
      }
    } else {
      Links.push(link);
    }
  });
};

export default Links;
export { ProfileLinks, MergeLinks };
