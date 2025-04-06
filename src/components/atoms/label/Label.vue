<script lang="ts">
  interface Props {
    label?: string;
  }
</script>

<script setup lang="ts">
  defineProps<Props>();
</script>

<template>
  <label class="text-sm font-medium">
    <slot>{{ label }}</slot>
  </label>
</template>
