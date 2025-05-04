<script lang="ts">
  import { tv } from "tailwind-variants";

  import Avatar from "@/components/ui/avatar/Avatar.vue";
  import Title from "@/components/ui/title/Title.vue";
  import type { ArticlePreview } from "@/types/article";

  export const articlePreviewTv = tv({
    slots: {
      root: "relative",
      link: "absolute inset-0 z-0",
      card: "bg-background border-global-border overflow-hidden border",
      headerWrapper: "flex gap-x-2",
      metadataWrapper: "flex flex-col gap-y-1",
      coverImage: "bg-empty block h-52 w-full object-cover lg:h-72",
      body: "space-y-2 px-4 py-5",
      authorName: "text-sm",
      createdDate: "text-foreground-accent text-xs",
    },

    compoundSlots: [
      {
        slots: ["link", "card"],
        class: "rounded-lg",
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
    card,
    link,
    coverImage,
    body,
    headerWrapper,
    metadataWrapper,
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
    <div :class="card()">
      <img
        v-if="article.cover_image_url"
        :src="article.cover_image_url"
        alt=""
        loading="lazy"
        :class="coverImage()"
      />

      <div :class="body()">
        <div :class="headerWrapper()">
          <Avatar
            :src="article.author.avatar_image_url"
            :alt="article.author.name"
          />

          <div :class="metadataWrapper()">
            <span :class="authorName()">{{ article.author.name }}</span>
            <span :class="createdDate()">{{ article.created_at }}</span>
          </div>
        </div>

        <Title heading="h2">{{ article.title }}</Title>
      </div>
    </div>
  </li>
</template>
