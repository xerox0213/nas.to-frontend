<script setup lang="ts">
  import ArticleForm from "@/components/article/ArticleForm.vue";
  import Header from "@/components/layout/Header.vue";
  import Main from "@/components/layout/Main.vue";
  import Title from "@/components/ui/title/Title.vue";
</script>

<template>
  <Header />
  <Main>
    <section
      class="border-global-border mx-auto my-5 max-w-[800px] rounded-sm border p-5"
    >
      <Title class="mb-10 text-center">Write your article ✏️</Title>
      <ArticleForm />
    </section>
  </Main>
</template>
