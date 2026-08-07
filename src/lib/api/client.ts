import { apiConfig, apiUrl } from "@/config/api";
import { ApiError, type ApiErrorPayload } from "./errors";

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

function cookieValue(name: string) {
  if (typeof document === "undefined") return undefined;
  const prefix = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix))
    ?.slice(prefix.length);
}

function unwrap<T>(body: unknown): T {
  if (
    body &&
    typeof body === "object" &&
    "success" in body &&
    "data" in body
  ) {
    return (body as { data: T }).data;
  }
  return body as T;
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}) {
  const headers = new Headers(options.headers);
  const method = (options.method ?? "GET").toUpperCase();
  const mutation = !["GET", "HEAD", "OPTIONS"].includes(method);
  const hasBody = options.body !== undefined;

  if (hasBody) headers.set("content-type", "application/json");
  if (mutation) {
    const csrf = cookieValue(apiConfig.csrfCookieName);
    if (csrf) headers.set("x-csrf-token", decodeURIComponent(csrf));
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      ...options,
      method,
      headers,
      credentials: "include",
      body: hasBody ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError();
  }

  const body = response.status === 204
    ? undefined
    : await response.json().catch(() => undefined);

  if (!response.ok) {
    const error = new ApiError((body ?? {}) as ApiErrorPayload, response.status);
    if (response.status === 401 && typeof window !== "undefined" && !path.startsWith("auth/")) {
      window.location.assign("/login?reason=session");
    }
    throw error;
  }

  return unwrap<T>(body);
}
