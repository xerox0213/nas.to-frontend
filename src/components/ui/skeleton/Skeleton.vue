<script lang="ts">
  import { tv } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  const skeleton = tv({
    base: "bg-skeleton animate-pulse cursor-progress",
  });

  interface Props {
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();
</script>

<template>
  <div :class="skeleton({ class: props.class })"></div>
</template>
