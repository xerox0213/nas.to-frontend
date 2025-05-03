<script lang="ts">
  interface Props {
    id: number;
  }
</script>

<script setup lang="ts">
  import MainLayout from "@/layouts/MainLayout.vue";

  defineProps<Props>();
</script>

<template>
  <MainLayout>
    <span>Article n°{{ id }}</span>
  </MainLayout>
</template>
