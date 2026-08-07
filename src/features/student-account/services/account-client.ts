import { apiRequest } from "@/lib/api/client";

export type StudentProfileUpdate = { phone?: string | null; guardianName?: string | null; guardianPhone?: string | null };

export const updateStudentProfile = (input: StudentProfileUpdate) =>
  apiRequest("student/profile", { method: "PATCH", body: input });
