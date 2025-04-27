import { defineStore } from "pinia";
import { ref } from "vue";

import type { User } from "@/types/api";

const setup = () => {
  const initialized = ref<boolean>(false);
  const user = ref<User>();

  return { initialized, user };
};

export const useUserStore = defineStore("user", setup);
