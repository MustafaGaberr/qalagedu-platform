import { buildMockAttendanceData } from "@/features/student-attendance/data/mock-attendance";
import type { AttendanceRecord, StudentAttendanceData, StudentAttendanceRepository } from "@/features/student-attendance/types/attendance";

export class MockStudentAttendanceRepository implements StudentAttendanceRepository {
  async getAttendanceOverview(): Promise<StudentAttendanceData> { return buildMockAttendanceData(); }
  async getAttendanceRecords(): Promise<AttendanceRecord[]> { return buildMockAttendanceData().records; }
}
