<script setup lang="ts">
  import ArticleCard from "../ArticleCard.vue";
</script>

<template>
  <ArticleCard>
    <template #cover>
      <div class="h-52 lg:h-72">
        <slot name="cover"></slot>
      </div>
    </template>

    <template #avatar>
      <slot name="avatar"></slot>
    </template>

    <template #metadata>
      <slot name="metadata"></slot>
    </template>

    <template #content>
      <slot name="content"></slot>
    </template>
  </ArticleCard>
</template>
