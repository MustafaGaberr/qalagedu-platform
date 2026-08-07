import { RealExamAttemptPage } from "@/features/student-learning/components/exam-attempt-page";
import { getAssignedExam } from "@/features/student-learning/services/learning-service";
export default async function AttemptRoute({ params }: { params: Promise<{ examId: string }> }) { const { examId } = await params; return <RealExamAttemptPage exam={await getAssignedExam(examId)} />; }
