import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/roster",
    name: "Roster",
    component: () => import("@/views/pages/RosterPage.vue"),
  },
  {
    path: "/staff",
    name: "Staff",
    component: () => import("@/views/pages/StaffPage.vue"),
  },
  {
    path: "/not-implemented",
    name: "NotImplemented",
    component: () => import("@/views/pages/NotImplementedPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
