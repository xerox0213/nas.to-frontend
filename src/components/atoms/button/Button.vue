<script lang="ts">
  import { tv, type VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  const button = tv({
    base: "flex items-center justify-center gap-x-2 rounded-sm transition-colors disabled:pointer-events-none disabled:opacity-50",
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "bg-background text-foreground border-global-border hover:bg-secondary border",
      },
      size: {
        small: "px-3 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-5 py-3 text-lg",
      },
      icon: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        icon: true,
        size: "small",
        class: "p-1",
      },
      {
        icon: true,
        size: "medium",
        class: "p-2",
      },
      {
        icon: true,
        size: "large",
        class: "p-3",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "medium",
      icon: false,
    },
  });

  type ButtonVariantsProps = VariantProps<typeof button>;

  interface Props {
    label?: string;
    variant?: ButtonVariantsProps["variant"];
    size?: ButtonVariantsProps["size"];
    icon?: boolean;
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();
</script>

<template>
  <button :class="button({ variant, size, icon, class: props.class })">
    <slot>{{ label }}</slot>
  </button>
</template>
