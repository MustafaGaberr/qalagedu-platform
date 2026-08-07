export type AuthSubmissionState =
  | {
      status: "idle";
      message?: undefined;
    }
  | {
      status: "success" | "error";
      message: string;
    };

export type AuthUser = {
  id: string;
  name: string;
  loginIdentifier: string;
  phone: string | null;
  role: "STUDENT" | "TEACHER_ADMIN" | "ASSISTANT" | "SUPER_ADMIN";
  studentProfile: {
    educationalGrade: string;
    guardianName: string | null;
    guardianPhone: string | null;
  } | null;
};

export type AuthSession = {
  user: AuthUser;
  session: { expiresAt: string };
  role: AuthUser["role"];
  workspace: {
    teacherId: string | null;
    assignmentId: string | null;
    courseIds: string[] | null;
    gradeIds: string[] | null;
    groupIds: string[] | null;
  };
  permissions: string[];
  csrfToken?: string;
};
