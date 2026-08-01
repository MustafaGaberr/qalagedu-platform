export type AuthSubmissionState =
  | {
      status: "idle";
      message?: undefined;
    }
  | {
      status: "success" | "error";
      message: string;
    };
