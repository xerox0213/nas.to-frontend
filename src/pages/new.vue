<script lang="ts">
  import { FilePlus } from "lucide-vue-next";

  import { createArticle } from "@/api/article";
  import ArticleForm, {
    type ArticleValues,
    type Ctx,
    type Submitted,
  } from "@/components/article/ArticleForm.vue";
  import Title from "@/components/ui/title/Title.vue";
  import { useToast } from "@/composables/useToast";
  import {
    CsrfMismatchError,
    ServerError,
    ValidationError,
  } from "@/errors/api";
  import {
    csrfMismatchErrorToast,
    serverErrorToast,
    typeErrorToast,
  } from "@/errors/toast";
  import MainLayout from "@/layouts/MainLayout.vue";
  import type { ValidationErrors } from "@/types/api";

  type CreateArticleErrors = ValidationErrors<ArticleValues>;
</script>

<script setup lang="ts">
  const { toast } = useToast();

  const onSubmit = async (
    values: ArticleValues,
    ctx: Ctx,
    submitted: Submitted,
  ) => {
    try {
      await createArticle(values);

      toast({
        icon: FilePlus,
        title: "Article Created",
        description: "Your new article has been successfully created.",
        variant: "success",
      });

      ctx.resetForm();
    } catch (e) {
      if (e instanceof ValidationError) {
        const errors: CreateArticleErrors = e.errors;
        ctx.setErrors(errors);
      } else if (e instanceof CsrfMismatchError) {
        toast(csrfMismatchErrorToast);
      } else if (e instanceof ServerError) {
        toast(serverErrorToast);
      } else if (e instanceof TypeError) {
        toast(typeErrorToast);
      }
    } finally {
      submitted();
    }
  };
</script>

<template>
  <MainLayout>
    <section
      class="border-global-border mx-auto my-5 max-w-[800px] rounded-sm border p-5"
    >
      <Title class="mb-10 text-center">Write your article ✏️</Title>
      <ArticleForm @submit="onSubmit" />
    </section>
  </MainLayout>
</template>
