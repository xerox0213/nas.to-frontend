<script setup lang="ts">
  defineProps<{
    error?: string;
  }>();

  const slots = defineSlots<{
    default?(): unknown;
  }>();
</script>

<template>
  <span v-if="error || slots.default" class="text-destructive text-sm">
    <slot>{{ error }}</slot>
  </span>
</template>
