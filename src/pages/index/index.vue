<script setup lang="ts">
  import { useInfiniteQuery } from "@tanstack/vue-query";
  import { computed } from "vue";

  import { getDiscoverArticles } from "@/api/article";
  import ArticlePreviewSection from "@/components/article/article-preview/ArticlePreviewSection.vue";

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["articles", "discover"],
    queryFn: ({ pageParam }) => getDiscoverArticles(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.links.next;
    },
  });

  const articles = computed(
    () => data.value?.pages.flatMap((page) => page.data) ?? [],
  );
</script>

<template>
  <ArticlePreviewSection
    title="Discover"
    :is-pending
    :is-fetching-next-page
    :has-next-page
    :is-error
    :articles
    @next-page="fetchNextPage"
  />
</template>
