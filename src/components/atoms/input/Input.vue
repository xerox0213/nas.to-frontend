<script lang="ts">
  import { tv } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  const input = tv({
    base: "border-global-border rounded-sm border px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50",
  });

  interface Props {
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();
  const model = defineModel<string>();
</script>

<template>
  <input v-model="model" :class="input({ class: props.class })" />
</template>
