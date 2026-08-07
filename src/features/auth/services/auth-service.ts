import { apiRequest } from "@/lib/api/client";
import type { AuthSession } from "../types/auth";

export type RegisterStudentInput = {
  name: string;
  phone: string;
  password: string;
  educationalGrade: string;
  guardianPhone?: string;
  guardianName?: string;
};

export const login = (loginIdentifier: string, password: string) =>
  apiRequest<AuthSession>("auth/login", {
    method: "POST",
    body: { loginIdentifier, password },
  });

export const registerStudent = (input: RegisterStudentInput) =>
  apiRequest<AuthSession>("auth/students/register", {
    method: "POST",
    body: input,
  });

export const logout = () =>
  apiRequest<void>("auth/logout", { method: "POST" });

export const heartbeat = () =>
  apiRequest<{ lastSeenAt: string }>("auth/session/heartbeat", {
    method: "POST",
  });
