import { mockStudentDashboardData } from "@/features/student-dashboard/data/mock-dashboard";
import type {
  StudentDashboardData,
  StudentDashboardRepository,
} from "@/features/student-dashboard/types/dashboard";

export class MockStudentDashboardRepository
  implements StudentDashboardRepository
{
  async getDashboard(): Promise<StudentDashboardData> {
    return mockStudentDashboardData;
  }
}
