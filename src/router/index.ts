import { createRouter, createWebHistory, NavigationGuard, Router, RouteRecordRaw } from "vue-router";
import fac from "@/facility";
import Home from "@/views/pages/HomePage.vue";
import { nextTick } from "vue";
import useUserStore from "@/stores/users";

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresRole?: string[] | string;
    cidOverridesRole?: boolean;
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/pages/FacilityMap.vue"),
  },
  {
    path: "/error/forbidden",
    name: "Forbidden",
    component: () => import("@/views/pages/errors/ErrorForbidden.vue"),
  },
  {
    path: "/error/crash",
    name: "ErrorCrash",
    component: () => import("@/views/pages/errors/ErrorCrash.vue"),
  },
  {
    path: "/roster/:cid/training/new",
    name: "NewTrainingNote",
    component: () => import("@/views/pages/training/TrainingNoteForm.vue"),
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
    path: "/resources",
    name: "Resources",
    component: () => import("@/views/pages/Resources.vue"),
  },
  {
    path: "/roster",
    name: "Roster",
    component: () => import("@/views/pages/RosterPage.vue"),
  },
  {
    path: "/roster/inactive",
    name: "InactiveRoster",
    component: () => import("@/views/pages/InactiveRoster.vue"),
    meta: {
      requiresAuth: true,
      requiresRole: ["atm", "datm", "wm"],
    },
  },
  {
    path: "/airports",
    name: "Airports",
    component: () => import("@/views/pages/Airports.vue"),
  },
  {
    path: "/airports/:id",
    name: "AirportInfo",
    component: () => import("@/views/pages/AirportInfo.vue"),
  },
  {
    path: "/roster/:cid",
    name: "RosterController",
    component: () => import("@/views/pages/RosterControllerPage.vue"),
  },
  {
    path: "/roster/:cid/training/:id",
    name: "TrainingNote",
    component: () => import("@/views/pages/training/TrainingNoteForm.vue"),
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
    path: "/activity",
    name: "Activity",
    component: () => import("@/views/pages/ActivityPage.vue"),
  },
  {
    path: "/training/:cid/:id",
    name: "TrainingNoteView",
    component: () => import("@/views/pages/training/TrainingNote.vue"),
    meta: {
      requiresAuth: true,
      requiresRole: ["atm", "datm", "ta", "wm", "ins", "mtr"],
      cidOverridesRole: true,
    },
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("@/views/pages/Feedback.vue"),
  },
  {
    path: "/visit",
    name: "VisitingApplication",
    component: () => import("@/views/pages/VisitingApplication.vue"),
  },
  {
    path: "/events",
    name: "Events",
    component: () => import("@/views/pages/EventsPage.vue"),
  },
  {
    path: "/events/:id",
    name: "EventInfo",
    component: () => import("@/views/pages/EventInfo.vue"),
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

const buildRouter = (): Router => {
  let r;
  if (fac.customRoutes !== undefined) {
    // We need to filter out the routes by name if they are being overriden
    r = routes.filter((route) => {
      return !(fac.customRoutes as RouteRecordRaw[]).some((customRoute) => {
        return customRoute.name === route.name;
      });
    });
    // Merge the two arrays
    r = [...r, ...fac.customRoutes];
  } else {
    r = routes;
  }

  console.log("Routes: ", r);

  return createRouter({
    history: createWebHistory(),
    routes: r,
  });
};

const router = buildRouter();

const check: NavigationGuard = (to, from, next): void => {
  const userStore = useUserStore();
  const { requiresAuth } = to.meta;

  if (requiresAuth && !userStore.user) {
    next({ name: "Forbidden" });
    return;
  }

  if (requiresAuth && userStore.user) {
    const { requiresRole, cidOverridesRole } = to.meta;
    if (cidOverridesRole && to.params.cid === userStore.user.cid.toString()) {
      next();
      return;
    }
    if (requiresRole) {
      if (!userStore.user.roles.some((role) => requiresRole.includes(role))) {
        next({ name: "Forbidden" });
        return;
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

router.afterEach((to, _, __) => {
  nextTick(() => {
    document.title = `${fac.name} - ${to.name
      ?.toString()
      .replace(/([A-Z])/g, " $1")
      .trim()}`;
  });
});

export default router;
