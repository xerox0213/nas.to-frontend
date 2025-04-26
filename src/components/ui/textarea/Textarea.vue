<script lang="ts">
  import { tv, type VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  const textarea = tv({
    base: "bg-background border-global-border rounded-sm border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
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

  type TextareaVariants = VariantProps<typeof textarea>;

  interface Props {
    size?: TextareaVariants["size"];
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const model = defineModel<string>();

  const props = defineProps<Props>();
</script>

<template>
  <textarea
    v-model="model"
    :class="textarea({ size, class: props.class })"
  ></textarea>
</template>
