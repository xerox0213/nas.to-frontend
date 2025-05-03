import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "@/types/user";

const setup = () => {
  const initialized = ref<boolean>(false);
  const user = ref<User>();

  return { initialized, user };
};

export const useUserStore = defineStore("user", setup);
