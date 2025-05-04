<script setup lang="ts">
  import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

  import ArticleCard from "../ArticleCard.vue";
  import { articlePreviewTv } from "./ArticlePreviewCard.vue";

  const { coverWrapper } = articlePreviewTv();
</script>

<template>
  <ArticleCard>
    <template #cover>
      <Skeleton :class="coverWrapper()" />
    </template>

    <template #avatar>
      <Skeleton class="size-8 rounded-full" />
    </template>

    <template #metadata>
      <Skeleton class="h-3.5 w-24 rounded-full" />
      <Skeleton class="h-3 w-24 rounded-full" />
    </template>

    <template #content>
      <Skeleton class="h-12 rounded-full" />
    </template>
  </ArticleCard>
</template>
