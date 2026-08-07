import "server-only";

import { cookies } from "next/headers";
import { apiUrl } from "@/config/api";
import { ApiError, type ApiErrorPayload } from "./errors";

type ServerRequestInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

export async function serverApiRequest<T>(path: string, init: ServerRequestInit = {}) {
  const cookieStore = await cookies();
  const headers = new Headers(init.headers);
  const cookieHeader = cookieStore.toString();
  if (cookieHeader) headers.set("cookie", cookieHeader);

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      ...init,
      headers,
      cache: init.cache ?? "no-store",
    });
  } catch {
    throw new ApiError();
  }

  const body = response.status === 204
    ? undefined
    : await response.json().catch(() => undefined);
  if (!response.ok) {
    throw new ApiError((body ?? {}) as ApiErrorPayload, response.status);
  }
  if (body && typeof body === "object" && "success" in body && "data" in body) {
    return (body as { data: T }).data;
  }
  return body as T;
}
