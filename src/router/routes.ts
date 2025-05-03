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
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("@/pages/index/index.vue"),
        name: "articles-discover.index",
      },
      {
        path: "following",
        component: () => import("@/pages/index/following.vue"),
        name: "articles-following.index",
      },
    ],
  },
  {
    component: () => import("@/pages/new.vue"),
    path: "/new",
    name: "articles.store",
    meta: {
      requiresAuth: true,
    },
  },
];
