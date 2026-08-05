import { ExamAttemptPage } from "@/features/student-learning/components/learning-pages";
import { getAssignedExam } from "@/features/student-learning/services/learning-service";
export default async function AttemptRoute({ params }: { params: Promise<{ examId: string }> }) { const { examId } = await params; return <ExamAttemptPage exam={getAssignedExam(examId)} />; }
