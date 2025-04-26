import "vue-router";

import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import NewArticle from "@/pages/NewArticle.vue";
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
    component: Home,
    name: "home",
    path: "/",
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: NewArticle,
    path: "/new",
    name: "new-article",
    meta: {
      requiresAuth: true,
    },
  },
];

const history: RouterOptions["history"] = createWebHistory();

const router = createRouter({
  routes,
  history,
});

// router.beforeEach(authGuard);

export { router };
