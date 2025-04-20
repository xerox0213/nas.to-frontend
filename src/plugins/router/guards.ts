import type { RouteLocationNormalized } from "vue-router";

import { getUser } from "@/api/auth";
import { useUserStore } from "@/stores/userStore";

export const authGuard = async (to: RouteLocationNormalized) => {
  const userStore = useUserStore();

  if (!userStore.initialized) {
    try {
      userStore.initialized = true;
      const user = await getUser();
      userStore.user = user;
    } catch (error) {
      if (error instanceof TypeError) {
        return { name: "server-error" };
      }
    }
  }

  if (to.meta.requiresAuth != undefined) {
    if (to.meta.requiresAuth && !userStore.user) return { name: "login" };
    else if (!to.meta.requiresAuth && userStore.user) return { name: "home" };
  }

  return true;
};
