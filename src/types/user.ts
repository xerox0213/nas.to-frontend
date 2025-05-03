export type UserEntity = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at?: string;
  avatar_image_url?: string;
};

export type User = UserEntity;

export type Author = Omit<UserEntity, "email" | "created_at" | "updated_at">;
