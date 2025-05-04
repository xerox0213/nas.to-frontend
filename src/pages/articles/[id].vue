<script lang="ts">
  import { useQuery } from "@tanstack/vue-query";
  import { computed } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { getMemberArticle } from "@/api/article";
  import ArticleDetails from "@/components/article/article-details/ArticleDetails.vue";
  import ArticleDetailsSkeleton from "@/components/article/article-details/ArticleDetailsSkeleton.vue";
  import { NotFoundError } from "@/errors/api";
  import MainLayout from "@/layouts/MainLayout.vue";

  interface Props {
    id: number;
  }
</script>

<script setup lang="ts">
  const props = defineProps<Props>();

  const router = useRouter();

  const route = useRoute();

  const { data, isPending, isError } = useQuery({
    queryKey: computed(() => ["articles", props.id]),
    queryFn: async () => {
      try {
        return await getMemberArticle(props.id);
      } catch (error) {
        if (error instanceof NotFoundError) {
          router.push({
            name: "not-found",
            params: { pathMatch: route.path.substring(1).split("/") },
            query: route.query,
            hash: route.hash,
          });
        } else {
          throw error;
        }
      }
    },
  });
</script>

<template>
  <MainLayout>
    <ArticleDetailsSkeleton v-if="isPending" />
    <p v-if="isError" class="text-center">
      Uh, Oh! Something went wrong, please try later... 😐
    </p>
    <ArticleDetails v-else-if="data" :article="data" />
  </MainLayout>
</template>
