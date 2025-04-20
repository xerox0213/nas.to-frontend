import {
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "@/errors";
import type { LoginCredentials } from "@/pages/Login.vue";
import type { RegistrationCredentials } from "@/pages/Register.vue";
import type { User } from "@/types";

import { API_BASE_URL, options } from "./utils";

export const getCsrf = async () => {
  await fetch(`${API_BASE_URL}/sanctum/csrf-cookie`);
};

export const getUser = async (): Promise<User> => {
  await getCsrf();

  const res = await fetch(`${API_BASE_URL}/api/user`, options("GET"));

  if (!res.ok) {
    const error = await res.json();

    if (res.status == 401) {
      throw new UnauthenticatedError(error);
    } else {
      throw error;
    }
  }

  const user = (await res.json()) as User;

  return user;
};

export const register = async (credentials: RegistrationCredentials) => {
  await getCsrf();

  const res = await fetch(
    `${API_BASE_URL}/api/register`,
    options("POST", credentials),
  );

  if (!res.ok) {
    const error = await res.json();

    switch (res.status) {
      case 422:
        throw new ValidationError(error.message, error.errors);
    }
  }
};

export const login = async (credentials: LoginCredentials) => {
  await getCsrf();

  const res = await fetch(
    `${API_BASE_URL}/api/login`,
    options("POST", credentials),
  );

  if (!res.ok) {
    const error = await res.json();

    switch (res.status) {
      case 401:
        throw new UnauthorizedError(error.message);
      case 422:
        throw new ValidationError(error.message, error.errors);
    }
  }
};
