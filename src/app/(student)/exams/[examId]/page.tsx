import { notFound } from "next/navigation";
import { ExamInstructionPage } from "@/features/student-learning/components/learning-pages";
import { getAssignedExam } from "@/features/student-learning/services/learning-service";
export default async function ExamRoute({ params }: { params: Promise<{ examId: string }> }) { const { examId } = await params; const exam = await getAssignedExam(examId); if (!exam) notFound(); return <ExamInstructionPage exam={exam} />; }
