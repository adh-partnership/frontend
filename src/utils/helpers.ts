/* eslint-disable import/prefer-default-export */
import type { Controller } from "@/types";

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
  if (controller.status === "visitor") {
    return "Visiting Controller";
  }

  return "Controller";
};