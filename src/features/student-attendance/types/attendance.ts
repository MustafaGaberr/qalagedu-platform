export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type AttendanceRecord = { id: string; studentId: string; courseId: string; subject: string; courseTitle: string; teacherName: string; groupName: string; sessionTitle: string; sessionDate: string; startTime: string; checkInTime?: string; location: string; status: AttendanceStatus; note?: string; recordedByLabel?: string; };
export type AttendanceSummary = { totalSessions: number; presentCount: number; absentCount: number; lateCount: number; excusedCount: number; attendancePercentage: number; currentMonthPercentage: number; previousMonthPercentage: number; latestRecord: AttendanceRecord | null; };
export type SubjectAttendanceSummary = { courseId: string; subject: string; teacherName: string; groupName: string; attendedSessions: number; totalSessions: number; percentage: number; absenceCount: number; lateCount: number; statusMessage: string; };
export type StudentAttendanceData = { summary: AttendanceSummary; subjectSummaries: SubjectAttendanceSummary[]; records: AttendanceRecord[]; };

export interface StudentAttendanceRepository { getAttendanceOverview(): Promise<StudentAttendanceData>; getAttendanceRecords(): Promise<AttendanceRecord[]>; }
