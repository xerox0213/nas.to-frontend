import type { Author } from "./user";

export type ArticleEntity = {
  id: number;
  title: string;
  content: string;
  cover_image_url?: string;
  created_at: string;
  updated_at?: string;
  user_id: number;
};

export type ArticlePreview = Omit<ArticleEntity, "user_id" | "content"> & {
  author: Author;
};

export type ArticleDetails = Omit<ArticleEntity, "user_id"> & {
  author: Author;
};
