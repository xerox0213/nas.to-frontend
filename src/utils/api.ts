import Cookies from "js-cookie";
import { merge } from "lodash";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiUrl = (endpoint: string) => {
  if (endpoint.startsWith("/")) {
    return `${API_BASE_URL}${endpoint}`;
  } else {
    return `${API_BASE_URL}/${endpoint}`;
  }
};

export const basicOptions = (method: RequestInit["method"]): RequestInit => {
  return {
    method,
    headers: {
      Accept: "application/json",
      "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN") ?? "",
    },
    credentials: "include",
  };
};

export const jsonOptions = (
  method: RequestInit["method"],
  body: object,
): RequestInit => {
  const jsonOptions = {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  };

  return merge(basicOptions(method), jsonOptions);
};
