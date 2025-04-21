<script lang="ts">
  import { type LucideIcon } from "lucide-vue-next";
  import { type InjectionKey, onMounted, onUnmounted, provide, ref } from "vue";

  import Toast, { type ToastVariants } from "./Toast.vue";

  export interface ToastData {
    icon?: LucideIcon;
    title?: string;
    description?: string;
    variant?: ToastVariants["variant"];
  }

  export interface Toast extends ToastData {
    id: number;
    lifetime: number;
  }

  interface Props {
    maxToast?: number;
    toastLifetime?: number;
  }

  export type ToastContext = {
    addToast: (toast: ToastData) => void;
  };

  export const toastKey = Symbol() as InjectionKey<ToastContext>;
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<Props>(), {
    maxToast: 5,
    toastLifetime: 5000,
  });

  let id = 0;

  const stopLifetime = ref<boolean>(false);

  const toasts = ref<Toast[]>([]);

  const addToast = (toast: ToastData) => {
    if (toasts.value.length == props.maxToast) {
      toasts.value.shift();
    }

    toasts.value.push({ id: id++, lifetime: props.toastLifetime, ...toast });
  };

  const killToast = (id: Toast["id"]) => {
    resumeToastLifetime();
    toasts.value = toasts.value.filter((toast) => toast.id != id);
  };

  const stopToastLifetime = () => {
    stopLifetime.value = true;
  };

  const resumeToastLifetime = () => {
    stopLifetime.value = false;
  };

  const onBeforeLeave = (el: Element) => {
    const toastItem = el as HTMLElement;
    const { top, left } = toastItem.getBoundingClientRect();
    toastItem.style.top = top + "px";
    toastItem.style.left = left + "px";
  };

  const onVisibilityChange = () => {
    if (toasts.value.length) {
      if (document.hidden) {
        stopToastLifetime();
      } else {
        resumeToastLifetime();
      }
    }
  };

  onMounted(() => {
    document.addEventListener("visibilitychange", onVisibilityChange);
  });

  onUnmounted(() => {
    document.removeEventListener("visibilitychange", onVisibilityChange);
  });

  provide(toastKey, { addToast });
</script>

<template>
  <slot />

  <Teleport to="body">
    <TransitionGroup
      tag="ol"
      class="fixed right-2 bottom-2 flex flex-col gap-y-2"
      enter-from-class="translate-y-full"
      leave-to-class="opacity-0 translate-x-full"
      enter-active-class="transition-all"
      leave-active-class="transition-all fixed -z-10"
      move-class="transition-all"
      @before-leave="onBeforeLeave"
      @mouseenter="stopToastLifetime"
      @mouseleave="resumeToastLifetime"
      @mousemove="stopToastLifetime"
    >
      <li v-for="toast in toasts" :key="toast.id">
        <Toast :toast :stop-lifetime @kill="killToast(toast.id)" />
      </li>
    </TransitionGroup>
  </Teleport>
</template>
