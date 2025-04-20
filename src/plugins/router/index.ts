import "vue-router";

import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

import ServerError from "@/pages/errors/500.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

import { authGuard } from "./guards";

export {};

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}
const routes: RouterOptions["routes"] = [
  {
    component: Register,
    name: "register",
    path: "/register",
    meta: {
      requiresAuth: false,
    },
  },
  {
    component: Login,
    name: "login",
    path: "/login",
    meta: {
      requiresAuth: false,
    },
  },
  {
    component: ServerError,
    name: "server-error",
    path: "/error/500",
  },
];

const history: RouterOptions["history"] = createWebHistory();

const router = createRouter({
  routes,
  history,
});

router.beforeEach(authGuard);

export { router };
