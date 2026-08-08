import "server-only";

import { cookies } from "next/headers";
import { apiUrl } from "@/config/api";
import { ApiError, type ApiErrorPayload } from "./errors";

type ServerRequestInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
  authenticated?: boolean;
};

export async function serverApiRequest<T>(path: string, init: ServerRequestInit = {}) {
  const { authenticated = true, ...requestInit } = init;
  const headers = new Headers(requestInit.headers);
  if (authenticated) {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();
    if (cookieHeader) headers.set("cookie", cookieHeader);
  }

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      ...requestInit,
      headers,
      cache: requestInit.cache ?? (requestInit.next?.revalidate === undefined ? "no-store" : undefined),
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
