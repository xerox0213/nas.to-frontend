import {
  UnauthenticatedError,
  UnauthorizedError,
  ValidationError,
} from "@/errors/api";
import type { LoginCredentials } from "@/pages/login.vue";
import type { RegistrationCredentials } from "@/pages/register.vue";
import type { User } from "@/types/api";

import { apiUrl, basicOptions, jsonOptions } from "../utils/api";

export const getCsrf = async () => {
  const url = apiUrl("sanctum/csrf-cookie");
  await fetch(url, basicOptions("GET"));
};

export const getUser = async (): Promise<User> => {
  await getCsrf();

  const url = apiUrl("api/user");
  const options = basicOptions("GET");

  const res = await fetch(url, options);

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

  const url = apiUrl("api/register");
  const options = jsonOptions("POST", credentials);

  const res = await fetch(url, options);

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

  const url = apiUrl("api/login");
  const options = jsonOptions("POST", credentials);

  const res = await fetch(url, options);

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
