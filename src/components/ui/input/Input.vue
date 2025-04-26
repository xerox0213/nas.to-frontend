<script lang="ts">
  import { tv, type VariantProps } from "tailwind-variants";
  import { type HTMLAttributes } from "vue";

  const input = tv({
    base: "border-global-border rounded-sm border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
    variants: {
      size: {
        small: "px-3 py-1 text-sm",
        medium: "px-3.5 py-1.5 text-base",
        large: "px-4 py-2 text-lg",
      },
    },
    defaultVariants: {
      size: "small",
    },
  });

  type InputVariants = VariantProps<typeof input>;

  interface Props {
    class?: HTMLAttributes["class"];
    size?: InputVariants["size"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();

  const model = defineModel<string>();
</script>

<template>
  <input v-model="model" :class="input({ size, class: props.class })" />
</template>
