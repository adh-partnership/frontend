import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
