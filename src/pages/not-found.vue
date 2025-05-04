<script setup lang="ts">
  import Button from "@/components/ui/button/Button.vue";
  import Title from "@/components/ui/title/Title.vue";
  import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <Title heading="h1" class="mb-10">Wops, you are lost 🔭</Title>
    <Button to="/" size="large" class="inline">
      Come back in a safe place
    </Button>
  </MainLayout>
</template>
