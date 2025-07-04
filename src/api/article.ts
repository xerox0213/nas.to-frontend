import { ValidationError } from "yup";

import type { ArticleValues } from "@/components/article/ArticleForm.vue";
import { CsrfMismatchError, NotFoundError, ServerError } from "@/errors/api";
import type { PaginatedCollection } from "@/types/api";
import type {
  ArticleDetails,
  ArticleEntity,
  ArticlePreview,
} from "@/types/article";
import { apiUrl, basicOptions } from "@/utils/api";

export const createArticle = async (
  values: ArticleValues,
): Promise<Pick<ArticleEntity, "id">> => {
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

export const getDiscoverArticles = async (
  next?: string,
): Promise<PaginatedCollection<ArticlePreview>> => {
  const options = basicOptions("GET");

  const url = next || apiUrl(`api/articles/discover`);

  const response = await fetch(url, options);

  return response.json();
};

export const getMemberArticle = async (id: number): Promise<ArticleDetails> => {
  const options = basicOptions("GET");
  const url = apiUrl(`api/articles/${id}`);

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.json();

    switch (response.status) {
      case 404:
        throw new NotFoundError(error.message);
      default:
        throw error;
    }
  }

  return response.json();
};
