<script setup lang="ts">
  import ArticleNav from "@/components/article/ArticleNav.vue";
  import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <ArticleNav />
    <RouterView />
  </MainLayout>
</template>
