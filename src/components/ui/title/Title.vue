<script lang="ts">
  import { tv } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  type Heading = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  const title = tv({
    variants: {
      heading: {
        h1: "text-4xl font-extrabold md:text-5xl",
        h2: "text-3xl font-bold md:text-4xl",
        h3: "text-2xl font-semibold md:text-3xl",
        h4: "text-xl font-medium md:text-2xl",
        h5: "text-lg font-normal md:text-xl",
        h6: "text-base font-light md:text-lg",
      },
    },
  });

  interface Props {
    heading?: Heading;
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<Props>(), {
    heading: "h1",
    class: "",
  });
</script>

<template>
  <component :is="heading" :class="title({ heading, class: props.class })">
    <slot />
  </component>
</template>
