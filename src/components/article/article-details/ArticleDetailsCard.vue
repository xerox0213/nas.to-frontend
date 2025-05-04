<script lang="ts">
  import { tv } from "tailwind-variants";

  import Avatar from "@/components/ui/avatar/Avatar.vue";
  import Markdown from "@/components/ui/markdown/Markdown.vue";
  import Title from "@/components/ui/title/Title.vue";
  import type { ArticleDetails } from "@/types/article";

  import ArticleCard from "../ArticleCard.vue";

  export const articleDetailsTv = tv({
    slots: {
      coverWrapper: "h-52 lg:h-96",
      cover: "bg-empty size-full object-cover",
      contentWrapper: "space-y-3",
      title: "wrap-break-word",
    },
  });

  interface Props {
    article: ArticleDetails;
  }
</script>

<script setup lang="ts">
  defineProps<Props>();

  const { coverWrapper, cover, contentWrapper, title } = articleDetailsTv();
</script>

<template>
  <ArticleCard>
    <template #cover>
      <div :class="coverWrapper()">
        <a
          v-if="article.cover_image_url"
          :href="article.cover_image_url"
          target="_blank"
          aria-labelledby="acc-name"
        >
          <img :src="article.cover_image_url" alt="" :class="cover()" />
          <span id="acc-name" hidden>Show cover image</span>
        </a>
      </div>
    </template>

    <template #avatar>
      <Avatar :src="article.author.avatar_image_url" size="large" />
    </template>

    <template #metadata>
      <span>{{ article.author.name }}</span>
      <span>{{ article.created_at }} {{ article.updated_at }}</span>
    </template>

    <template #content>
      <div :class="contentWrapper()">
        <Title heading="h1" :class="title()">
          {{ article.title }}
        </Title>
        <Markdown :source="article.content" />
      </div>
    </template>
  </ArticleCard>
</template>
