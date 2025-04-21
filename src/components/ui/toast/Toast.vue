<script lang="ts">
  import { X } from "lucide-vue-next";
  import { tv, type VariantProps } from "tailwind-variants";
  import { computed, onMounted, onUnmounted, ref, watch } from "vue";

  import { type Toast } from "./ToastProvider.vue";

  interface Props {
    toast: Toast;
    stopLifetime: boolean;
  }

  interface Emits {
    kill: [];
  }

  const toastTv = tv({
    slots: {
      root: "text-foreground relative w-[390px] overflow-hidden rounded select-none",
      wrapper: "flex gap-x-2 px-4 pt-4 pb-2",
      title: "",
      description: "text-sm",
      closeBtn: "absolute top-2 right-2",
      closeIcon: "size-4",
      lifetimeBar: "h-1.5",
    },
    variants: {
      variant: {
        primary: {
          root: "bg-background text-foreground border-global-border border",
          lifetimeBar: "bg-foreground",
        },
        destructive: {
          root: "bg-destructive text-destructive-foreground",
          lifetimeBar: "bg-destructive-accent",
        },
        success: {
          root: "bg-success text-success-foreground",
          lifetimeBar: "bg-success-accent",
        },
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  });

  const {
    root,
    wrapper,
    title,
    description,
    closeBtn,
    closeIcon,
    lifetimeBar,
  } = toastTv();

  export type ToastVariants = VariantProps<typeof toastTv>;
</script>

<script setup lang="ts">
  const props = defineProps<Props>();

  const emits = defineEmits<Emits>();

  const interval = ref<number>();

  const remainingLifetime = ref<number>(props.toast.lifetime);

  const widthLifetimeBar = computed(
    () => (remainingLifetime.value / props.toast.lifetime) * 100 + "%",
  );

  const tic = () => {
    remainingLifetime.value -= 10;

    if (remainingLifetime.value == 0) {
      emits("kill");
    }
  };

  onMounted(() => {
    interval.value = setInterval(tic, 10);
  });

  onUnmounted(() => {
    clearInterval(interval.value);
  });

  watch(
    () => props.stopLifetime,
    () => {
      if (props.stopLifetime) {
        clearInterval(interval.value);
      } else {
        interval.value = setInterval(tic, 10);
      }
    },
  );
</script>

<template>
  <div :class="root({ variant: toast.variant })">
    <div :class="wrapper()">
      <component :is="toast.icon" v-if="toast.icon" />
      <div>
        <div :class="title()">{{ toast.title }}</div>
        <div :class="description()">{{ toast.description }}</div>
      </div>
    </div>

    <div
      :class="lifetimeBar({ variant: toast.variant })"
      :style="{ width: widthLifetimeBar }"
    ></div>

    <button :class="closeBtn()">
      <X :class="closeIcon()" @click="emits('kill')" />
    </button>
  </div>
</template>
