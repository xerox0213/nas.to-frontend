import type { RouterOptions } from "vue-router";

export const routes: RouterOptions["routes"] = [
  {
    component: () => import("@/pages/register.vue"),
    path: "/register",
    name: "register",
    meta: {
      requiresAuth: false,
    },
  },
  {
    component: () => import("@/pages/login.vue"),
    path: "/login",
    name: "login",
    meta: {
      requiresAuth: false,
    },
  },
  {
    component: () => import("@/pages/index.vue"),
    path: "/",
    name: "discover",
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: () => import("@/pages/new.vue"),
    path: "/new",
    name: "new-article",
    meta: {
      requiresAuth: true,
    },
  },
];
