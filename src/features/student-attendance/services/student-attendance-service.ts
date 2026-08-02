import { MockStudentAttendanceRepository } from "@/mocks/repositories/mock-student-attendance-repository";
import type {
  AttendanceRecord,
  StudentAttendanceData,
  StudentAttendanceRepository,
  StudentCardData,
} from "@/features/student-attendance/types/attendance";

const repository = new MockStudentAttendanceRepository();

export async function getStudentAttendanceOverview(
  attendanceRepository: StudentAttendanceRepository = repository
): Promise<StudentAttendanceData> {
  return attendanceRepository.getAttendanceOverview();
}

export async function getStudentAttendanceRecords(
  attendanceRepository: StudentAttendanceRepository = repository
): Promise<AttendanceRecord[]> {
  return attendanceRepository.getAttendanceRecords();
}

export async function getStudentCardData(
  attendanceRepository: StudentAttendanceRepository = repository
): Promise<StudentCardData | null> {
  return attendanceRepository.getStudentCard();
}
