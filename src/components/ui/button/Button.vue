<script lang="ts">
  import { LoaderCircle } from "lucide-vue-next";
  import { tv, type VariantProps } from "tailwind-variants";
  import { type HTMLAttributes } from "vue";
  import type { RouterLinkProps } from "vue-router";

  const button = tv({
    base: "flex items-center justify-center gap-x-2 rounded-sm text-center transition-colors disabled:pointer-events-none disabled:opacity-50",
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
        small: "px-3 py-1 text-xs",
        medium: "px-4 py-2 text-sm",
        large: "text-md px-5 py-3",
      },
      icon: {
        false: "",
        true: "",
      },
      isActive: {
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
      {
        isActive: true,
        variant: "primary",
        class: "bg-primary/90",
      },
      {
        isActive: true,
        variant: "secondary",
        class: "bg-secondary/80",
      },
      {
        isActive: true,
        variant: "destructive",
        class: "bg-destructive/90",
      },
      {
        isActive: true,
        variant: "outline",
        class: "bg-secondary",
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
    loading?: boolean;
    to?: RouterLinkProps["to"];
    activeClass?: RouterLinkProps["activeClass"];
    exactActiveClass?: RouterLinkProps["exactActiveClass"];
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();
</script>

<template>
  <button
    v-if="!to"
    :class="button({ variant, size, icon, class: props.class })"
    :disabled="loading"
  >
    <LoaderCircle
      v-if="loading"
      class="animate-spin"
      :class="{
        'size-(--size-icon-small)': size === 'small',
        'size-(--size-icon-medium)': size === undefined || size === 'medium',
        'size-(--size-icon-large)': size === 'large',
      }"
    />
    <slot>{{ label }}</slot>
  </button>

  <RouterLink v-else v-slot="{ href, navigate, isActive, isExactActive }" :to>
    <a
      :href="href"
      :class="
        button({
          variant,
          size,
          icon,
          isActive: isActive || isExactActive,
          class: `${props.class} ${isActive && activeClass} ${isExactActive && exactActiveClass}`,
        })
      "
      @click="navigate"
    >
      <slot>{{ label }}</slot>
    </a>
  </RouterLink>
</template>
