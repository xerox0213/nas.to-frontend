<script setup lang="ts">
  import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

  import { articleDetailsTv } from "./ArticleDetails.vue";

  const { coverImage, body, headerWrapper, metaDataWrapper, articleContent } =
    articleDetailsTv();
</script>

<template>
  <div class="cursor-progress">
    <Skeleton :class="coverImage()" />

    <div :class="body()">
      <div :class="headerWrapper()">
        <Skeleton class="size-10 rounded-full" />
        <div :class="metaDataWrapper()">
          <Skeleton class="h-2 w-28 rounded-full" />
          <Skeleton class="h-2 w-28 rounded-full" />
        </div>
      </div>

      <div :class="articleContent()">
        <Skeleton class="h-8 w-full rounded-full" />
        <Skeleton class="h-24 rounded-sm" />
      </div>
    </div>
  </div>
</template>
