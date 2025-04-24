import { inject } from "vue";

import {
  type ToastCtx,
  ToastCtxKey,
} from "@/components/ui/toast/ToastProvider.vue";

export const useToast = () => {
  const { addToast } = inject(ToastCtxKey) as ToastCtx;

  return { toast: addToast };
};
