import "vue-router";

import { createRouter, createWebHistory } from "vue-router";

import { authGuard } from "./guards";
import { routes } from "./routes";

export {};

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// router.beforeEach(authGuard);

export { router };
