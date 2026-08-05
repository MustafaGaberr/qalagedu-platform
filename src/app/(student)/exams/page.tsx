import { ExamsListingPage } from "@/features/student-learning/components/learning-pages";
import { getAssignedExams } from "@/features/student-learning/services/learning-service";
export default function ExamsRoute() { return <ExamsListingPage exams={getAssignedExams()} />; }
