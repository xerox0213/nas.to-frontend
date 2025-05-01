import { LogOut, Wifi } from "lucide-vue-next";

import type { ToastData } from "@/components/ui/toast/ToastProvider.vue";

export const unauthenticatedErrorToast = {
  icon: LogOut,
  title: "Session Expired",
  description: "You've been signed out. Please log in to continue.",
};

export const csrfMismatchErrorToast: ToastData = unauthenticatedErrorToast;

export const serverErrorToast: ToastData = {
  icon: Wifi,
  title: "Uh Oh! Something went wrong",
  description: "There was a problem with your request.",
  variant: "destructive",
};
