<script lang="ts">
  import { tv } from "tailwind-variants";
  import { type HTMLAttributes } from "vue";

  const labelTv = tv({
    base: "text-sm font-medium",
  });

  interface Props {
    label?: string;
    required?: boolean;
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();
</script>

<template>
  <label :class="labelTv({ class: props.class })">
    <slot>{{ label }}</slot>
    <span v-if="required" aria-hidden="true"> *</span>
  </label>
</template>
