<script lang="ts">
  interface Props {
    label?: string;
    required?: boolean;
  }
</script>

<script setup lang="ts">
  defineProps<Props>();
</script>

<template>
  <label class="text-sm font-medium">
    <slot>{{ label }}</slot>
    <span v-if="required" aria-hidden="true">*</span>
  </label>
</template>
