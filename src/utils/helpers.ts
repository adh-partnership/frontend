/* eslint-disable import/prefer-default-export */
import type { Controller } from "@/types";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertTime = (since: string): string => {
  const now = new Date();
  const then = new Date(since);
  const dur = now.getTime() - then.getTime();

  const hours = Math.floor(dur / (1000 * 60 * 60));
  const minutes = Math.floor((dur % (1000 * 60 * 60)) / (1000 * 60));

  if (minutes < 10) {
    return `${hours}+0${minutes}`;
  }

  return `${hours}+${minutes}`;
};

export const getControllerTitle = (controller: Controller): string => {
  if (controller.roles.includes("atm")) {
    return "Air Traffic Manager";
  }
  if (controller.roles.includes("datm")) {
    return "Deputy Air Traffic Manager";
  }
  if (controller.roles.includes("ta")) {
    return "Training Administrator";
  }
  if (controller.roles.includes("ec")) {
    return "Events Coordinator";
  }
  if (controller.roles.includes("fe")) {
    return "Facility Engineer";
  }
  if (controller.roles.includes("wm")) {
    return "Webmaster";
  }
  if (controller.rating === "I1" && controller.status === "home") {
    return "Instructor";
  }
  if (controller.roles.includes("mtr")) {
    return "Mentor";
  }
  if (controller.controller_type === "visitor") {
    return "Visiting Controller";
  }

  return "Controller";
};

export const toTitleCase = (str: string): string => {
  let r = str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
  // Special cases
  ["Lrrs", "Afb", "Arb", "Aaf", "Nas", "Cgs", "Cgas", "Mcas"].forEach((a) => {
    r = r.replace(a, a.toUpperCase());
  });
  return r;
};
