<script setup lang="ts">
  import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

  import { articlePreviewTv } from "./ArticlePreviewCard.vue";

  const {
    root,
    coverImage,
    body: content,
    headerWrapper,
    metadataWrapper,
  } = articlePreviewTv();
</script>

<template>
  <div :class="root({ class: 'cursor-progress' })">
    <Skeleton :class="coverImage({ class: 'bg-skeleton' })" />
    <div :class="content()">
      <div :class="headerWrapper()">
        <Skeleton class="size-8 rounded-full" />
        <div :class="metadataWrapper()">
          <Skeleton class="h-2 w-24 rounded-full" />
          <Skeleton class="h-2 w-24 rounded-full" />
        </div>
      </div>
      <Skeleton class="h-7 rounded-full" />
    </div>
  </div>
</template>
