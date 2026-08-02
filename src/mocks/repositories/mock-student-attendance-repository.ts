import {
  buildMockAttendanceData,
  mockStudentCardData,
} from "@/features/student-attendance/data/mock-attendance";
import type {
  AttendanceRecord,
  StudentAttendanceData,
  StudentAttendanceRepository,
  StudentCardData,
} from "@/features/student-attendance/types/attendance";

export class MockStudentAttendanceRepository
  implements StudentAttendanceRepository
{
  async getAttendanceOverview(): Promise<StudentAttendanceData> {
    return buildMockAttendanceData();
  }

  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    return buildMockAttendanceData().records;
  }

  async getStudentCard(): Promise<StudentCardData | null> {
    return mockStudentCardData;
  }
}
