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

export const getUTCDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getUTCDate()} ${months[d.getUTCMonth()]}, ${d.getUTCFullYear()}`;
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

export const isRatingBelow = (rating: string, ratingToCompare: string): boolean => {
  const ratings = ["SUS", "OBS", "S1", "S2", "S3", "C1", "C3", "I1", "I3", "SUP", "ADM"];
  ratings[-1] = "INA";

  return ratings.indexOf(rating) < ratings.indexOf(ratingToCompare);
};
