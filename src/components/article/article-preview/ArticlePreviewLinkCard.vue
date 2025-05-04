<script lang="ts">
  import { tv } from "tailwind-variants";

  import type { ArticlePreview } from "@/types/article";

  export const articlePreviewTv = tv({
    slots: {
      root: "relative",
      link: "absolute inset-0 z-0",
      cover: "bg-empty size-full object-cover",
      authorName: "text-sm",
      creationDate: "text-foreground-accent text-xs",
    },
  });

  interface Props {
    article: ArticlePreview;
  }
</script>

<script setup lang="ts">
  import Avatar from "@/components/ui/avatar/Avatar.vue";
  import Title from "@/components/ui/title/Title.vue";

  import ArticlePreviewCard from "./ArticlePreviewCard.vue";

  defineProps<Props>();

  const { root, link, cover, authorName, creationDate } = articlePreviewTv();
</script>

<template>
  <div :class="root()">
    <RouterLink
      :to="{ name: 'articles.show', params: { id: article.id } }"
      :class="link()"
    />

    <ArticlePreviewCard>
      <template #cover>
        <img
          v-if="article.cover_image_url"
          :src="article.cover_image_url"
          alt=""
          loading="lazy"
          :class="cover()"
        />
      </template>

      <template #avatar>
        <Avatar
          :src="article.author.avatar_image_url"
          :alt="article.author.name"
        />
      </template>

      <template #metadata>
        <span :class="authorName()">{{ article.author.name }}</span>
        <span :class="creationDate()">{{ article.created_at }}</span>
      </template>

      <template #content>
        <Title heading="h2">{{ article.title }}</Title>
      </template>
    </ArticlePreviewCard>
  </div>
</template>
