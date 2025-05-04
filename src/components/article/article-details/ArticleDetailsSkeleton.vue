<script setup lang="ts">
  import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

  import ArticleCard from "../ArticleCard.vue";
  import { articleDetailsTv } from "./ArticleDetailsCard.vue";

  const { coverWrapper, contentWrapper } = articleDetailsTv();
</script>

<template>
  <ArticleCard>
    <template #cover>
      <Skeleton :class="coverWrapper()" />
    </template>

    <template #avatar>
      <Skeleton class="size-10 rounded-full" />
    </template>

    <template #metadata>
      <Skeleton class="h-3.5 w-28 rounded-full" />
      <Skeleton class="h-3 w-28 rounded-full" />
    </template>

    <template #content>
      <div :class="contentWrapper()">
        <Skeleton class="h-8 w-full rounded-full" />
        <Skeleton class="h-24 rounded-sm" />
      </div>
    </template>
  </ArticleCard>
</template>
