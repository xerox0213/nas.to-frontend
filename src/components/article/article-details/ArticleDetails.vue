<script lang="ts">
  import { tv } from "tailwind-variants";

  import Avatar from "@/components/ui/avatar/Avatar.vue";
  import Markdown from "@/components/ui/markdown/Markdown.vue";
  import Title from "@/components/ui/title/Title.vue";
  import type { ArticleDetails } from "@/types/article";

  export const articleDetailsTv = tv({
    slots: {
      coverImage: "h-52 w-full rounded-t-lg object-cover lg:h-96",
      body: "border-global-border bg-background rounded-b-lg border-x border-b px-4 py-5",
      headerWrapper: "mb-5 flex gap-x-2",
      metaDataWrapper: "flex flex-col gap-y-1",
      dateWrapper: "flex flex-wrap text-sm",
      articleContent: "space-y-3",
      articleTitle: "wrap-break-word",
    },
  });

  interface Props {
    article: ArticleDetails;
  }
</script>

<script setup lang="ts">
  defineProps<Props>();

  const {
    coverImage,
    body,
    headerWrapper,
    metaDataWrapper,
    dateWrapper,
    articleContent,
    articleTitle,
  } = articleDetailsTv();
</script>

<template>
  <article>
    <a
      :href="article.cover_image_url"
      target="_blank"
      aria-labelledby="acc-name"
    >
      <img
        v-if="article.cover_image_url"
        :src="article.cover_image_url"
        alt=""
        :class="coverImage()"
      />
      <span id="acc-name" hidden>Show cover image</span>
    </a>

    <div :class="body()">
      <div :class="headerWrapper()">
        <Avatar
          :src="article.author.avatar_image_url"
          size="large"
          class="shrink-0"
        />
        <div :class="metaDataWrapper()">
          <span>{{ article.author.name }}</span>
          <div :class="dateWrapper()">
            <span>{{ article.created_at }}</span>
            <span>{{ article.updated_at }}</span>
          </div>
        </div>
      </div>

      <div :class="articleContent()">
        <Title heading="h1" :class="articleTitle()">
          {{ article.title }}
        </Title>
        <Markdown :source="article.content" />
      </div>
    </div>
  </article>
</template>
