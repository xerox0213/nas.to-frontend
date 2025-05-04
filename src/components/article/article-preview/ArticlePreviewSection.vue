<script lang="ts">
  import { tv } from "tailwind-variants";

  import type { ArticlePreview } from "@/types/article";

  const articlePreviewSectionTv = tv({
    slots: {
      listCard: "mb-5 space-y-5",
      loadMoreBtn: "mx-auto",
      infoText: "text-center",
    },
  });

  interface Props {
    title: string;
    isPending: boolean;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isError: boolean;
    articles: ArticlePreview[];
  }

  interface Emits {
    nextPage: [];
  }
</script>

<script setup lang="ts">
  import Button from "@/components/ui/button/Button.vue";
  import Title from "@/components/ui/title/Title.vue";

  import ArticlePreviewCard from "./ArticlePreviewCard.vue";
  import ArticlePreviewCardSkeleton from "./ArticlePreviewCardSkeleton.vue";

  defineProps<Props>();

  defineEmits<Emits>();

  const { infoText, listCard, loadMoreBtn } = articlePreviewSectionTv();
</script>

<template>
  <Title heading="h1" class="mb-4">{{ title }}</Title>

  <section>
    <ol v-if="isPending" :class="listCard()">
      <li v-for="i in 10" :key="i">
        <ArticlePreviewCardSkeleton />
      </li>
    </ol>

    <ol v-if="articles.length" :class="listCard()">
      <ArticlePreviewCard
        v-for="article in articles"
        :key="article.id"
        :article
      />
    </ol>

    <p
      v-if="isError || (!isPending && !articles.length)"
      role="alert"
      aria-live="assertive"
      :class="infoText()"
    >
      <span v-if="isError">
        Uh, Oh! Something went wrong, please try later... 🤔
      </span>

      <span v-else> There are nothing around... 🍃 </span>
    </p>

    <Button
      v-if="hasNextPage && !isError"
      :loading="isFetchingNextPage"
      :class="loadMoreBtn()"
      @click="$emit('nextPage')"
    >
      Load more
    </Button>
  </section>
</template>
