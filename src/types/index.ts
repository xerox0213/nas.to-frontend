export type User = {
  id: number;
  name: string;
  email: string;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};
