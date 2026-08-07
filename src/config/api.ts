const configuredApiUrl = process.env.NEXT_PUBLIC_QALAGEDU_API_URL?.trim();

export const apiConfig = {
  baseUrl: configuredApiUrl?.replace(/\/$/, "") ?? "",
  csrfCookieName:
    process.env.NEXT_PUBLIC_QALAGEDU_CSRF_COOKIE_NAME?.trim() ||
    "qalagedu_session_csrf",
} as const;

export function apiUrl(path: string) {
  if (!apiConfig.baseUrl) {
    throw new Error("QALAGEDU_API_URL_MISSING");
  }

  return `${apiConfig.baseUrl}/${path.replace(/^\//, "")}`;
}
