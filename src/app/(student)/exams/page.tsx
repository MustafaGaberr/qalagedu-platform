import { ExamsListingPage } from "@/features/student-learning/components/learning-pages";
import { getAssignedExams } from "@/features/student-learning/services/learning-service";
export default async function ExamsRoute() { return <ExamsListingPage exams={await getAssignedExams()} />; }
