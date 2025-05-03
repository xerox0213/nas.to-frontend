export type Collection<T> = {
  data: T;
};

export type PaginationMeta = {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
};

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export type PaginatedCollection<T> = Collection<T> & {
  links: PaginationLinks;
  meta: PaginationMeta;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};
