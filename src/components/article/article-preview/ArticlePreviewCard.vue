<script lang="ts">
  import { tv } from "tailwind-variants";

  import Avatar from "@/components/ui/avatar/Avatar.vue";
  import Title from "@/components/ui/title/Title.vue";
  import type { ArticlePreview } from "@/types/article";

  export const articlePreviewTv = tv({
    slots: {
      root: "bg-background relative rounded-lg",
      link: "absolute inset-0 z-0 rounded-lg",
      authorWrapper: "flex items-center gap-x-2",
      authorDataWrapper: "flex flex-col gap-y-1",
      coverImage: "",
      fallbackCoverImage: "bg-skeleton",
      content:
        "border-global-border space-y-2 rounded-b-lg border-x border-b px-4 pt-8 pb-4",
      authorName: "text-sm",
      createdDate: "text-foreground-accent text-xs",
    },
    compoundSlots: [
      {
        slots: ["root", "link"],
        class: "rounded-lg",
      },
      {
        slots: ["coverImage", "fallbackCoverImage"],
        class: "block h-52 w-full rounded-t-lg object-cover lg:h-72",
      },
    ],
  });

  interface Props {
    article: ArticlePreview;
  }
</script>

<script setup lang="ts">
  defineProps<Props>();

  const {
    root,
    link,
    coverImage,
    fallbackCoverImage,
    content,
    authorWrapper,
    authorDataWrapper,
    authorName,
    createdDate,
  } = articlePreviewTv();
</script>

<template>
  <li :class="root()">
    <RouterLink
      :to="{ name: 'articles.show', params: { id: article.id } }"
      :class="link()"
    />

    <img
      v-if="article.cover_image_url"
      :src="article.cover_image_url"
      alt=""
      loading="lazy"
      :class="coverImage()"
    />

    <div v-else :class="fallbackCoverImage()"></div>

    <div :class="content()">
      <div :class="authorWrapper()">
        <Avatar
          :src="article.author.avatar_image_url"
          :alt="article.author.name"
        />

        <div :class="authorDataWrapper()">
          <span :class="authorName()">{{ article.author.name }}</span>
          <span :class="createdDate()">{{ article.created_at }}</span>
        </div>
      </div>

      <Title heading="h2">{{ article.title }}</Title>
    </div>
  </li>
</template>
