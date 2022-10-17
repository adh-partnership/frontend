import { createRouter, createWebHistory, NavigationGuard } from "vue-router";
import Home from "@/views/pages/HomePage.vue";
import useUserStore from "@/stores/users";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresRole?: string[] | string;
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/error/forbidden",
    name: "Forbidden",
    component: () => import("@/views/pages/errors/ErrorForbidden.vue"),
  },
  {
    path: "/error/not-found",
    name: "NotFound",
    component: () => import("@/views/pages/errors/ErrorNotFound.vue"),
  },
  {
    path: "/privacy",
    name: "PrivacyPolicy",
    component: () => import("@/views/pages/PrivacyPolicy.vue"),
  },
  {
    path: "/roster",
    name: "Roster",
    component: () => import("@/views/pages/RosterPage.vue"),
  },
  {
    path: "/roster/:cid",
    name: "RosterController",
    component: () => import("@/views/pages/RosterControllerPage.vue"),
    meta: {
      requiresAuth: true,
      requiresRole: ["atm", "datm", "ta", "wm", "ins", "mtr"],
    },
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
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/pages/errors/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const check: NavigationGuard = (to, from, next): void => {
  const userStore = useUserStore();
  const { requiresAuth } = to.meta;

  if (requiresAuth && !userStore.user) {
    next({ name: "Forbidden" });
  }

  if (requiresAuth && userStore.user) {
    const { requiresRole } = to.meta;
    if (requiresRole) {
      if (!userStore.user.roles.some((role) => requiresRole.includes(role))) {
        next({ name: "Forbidden" });
      }
    }
  }

  next();
};

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (!userStore.hasFetched) {
    if (userStore.loading === null || userStore.loading === undefined) {
      userStore.loading = userStore.fetchUser();
    }
    userStore.loading.then(() => {
      check(to, from, next);
    });
  } else {
    check(to, from, next);
  }
});

export default router;
