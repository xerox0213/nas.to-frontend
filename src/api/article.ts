import { ValidationError } from "yup";

import type { ArticleValues } from "@/components/article/ArticleForm.vue";
import { CsrfMismatchError, ServerError } from "@/errors/api";
import type { Article } from "@/types/api";
import { apiUrl, basicOptions } from "@/utils/api";

export const createArticle = async (
  values: ArticleValues,
): Promise<Pick<Article, "id">> => {
  const formData = new FormData();
  const keys = Object.keys(values) as Array<keyof typeof values>;
  keys.forEach((key) => formData.append(key, values[key]));

  const url = apiUrl("api/articles");
  const options = { ...basicOptions("POST"), body: formData };

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();

    switch (response.status) {
      case 419:
        throw new CsrfMismatchError(error.message);
      case 422:
        throw new ValidationError(error.message, error.errors);
      case 500:
        throw new ServerError(error.message);
      default:
        throw error;
    }
  }

  return response.json();
};
