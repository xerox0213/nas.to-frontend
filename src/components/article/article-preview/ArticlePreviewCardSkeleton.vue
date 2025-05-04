<script setup lang="ts">
  import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

  import ArticlePreviewCard from "./ArticlePreviewCard.vue";
</script>

<template>
  <ArticlePreviewCard>
    <template #cover>
      <Skeleton class="size-full" />
    </template>

    <template #avatar>
      <Skeleton class="size-8 rounded-full" />
    </template>

    <template #metadata>
      <Skeleton class="h-3.5 w-24 rounded-full" />
      <Skeleton class="h-3 w-24 rounded-full" />
    </template>

    <template #content>
      <Skeleton class="h-10 rounded-full" />
    </template>
  </ArticlePreviewCard>
</template>
