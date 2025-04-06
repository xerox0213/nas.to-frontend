import { createRouter, createWebHistory, type RouterOptions } from "vue-router";

import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes: RouterOptions["routes"] = [
  {
    component: Register,
    name: "register",
    path: "/register",
  },
  {
    component: Login,
    name: "login",
    path: "/login",
  },
];

const history: RouterOptions["history"] = createWebHistory();

const router = createRouter({
  routes,
  history,
});

export { router };
