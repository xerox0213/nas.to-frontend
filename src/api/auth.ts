import { UnauthenticatedError } from "@/errors";
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
