import "server-only";

import { serverApiRequest } from "@/lib/api/server";
import type { AuthSession } from "../types/auth";

export const getCurrentSession = () =>
  serverApiRequest<AuthSession>("auth/me");
