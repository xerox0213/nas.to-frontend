import Cookies from "js-cookie";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const options = (
  method: RequestInit["method"],
  body?: RequestInit["body"],
): RequestInit => {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": Cookies.get("XRF-TOKEN") ?? "",
    },
    body,
    credentials: "include",
  };
};
