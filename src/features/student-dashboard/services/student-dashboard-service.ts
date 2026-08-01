import { MockStudentDashboardRepository } from "@/mocks/repositories/mock-student-dashboard-repository";
import type {
  StudentDashboardData,
  StudentDashboardRepository,
} from "@/features/student-dashboard/types/dashboard";

const repository = new MockStudentDashboardRepository();

export async function getStudentDashboard(
  dashboardRepository: StudentDashboardRepository = repository
): Promise<StudentDashboardData> {
  return dashboardRepository.getDashboard();
}
