import { inject } from "vue";

import {
  type ToastContext,
  toastKey,
} from "@/components/ui/toast/ToastProvider.vue";

export const useToast = () => {
  const { addToast } = inject(toastKey) as ToastContext;

  return { toast: addToast };
};
