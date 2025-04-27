export type User = {
  id: number;
  name: string;
  email: string;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  cover_image_url?: string;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};
