import type { LoginCredentials } from "@/pages/Login.vue";
import type { RegistrationCredentials } from "@/pages/Register.vue";

export type User = {
  name: string;
  email: string;
};

export type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

export type RegistrationValidationErrors =
  ValidationErrors<RegistrationCredentials>;

export type LoginValidationErrors = ValidationErrors<LoginCredentials>;
