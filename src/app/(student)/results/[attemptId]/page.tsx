import { notFound } from "next/navigation";
import { ResultDetailPage } from "@/features/student-learning/components/learning-pages";
import { getUnifiedResult } from "@/features/student-learning/services/learning-service";
export default async function ResultRoute({ params }: { params: Promise<{ attemptId: string }> }) { const { attemptId } = await params; const result = getUnifiedResult(attemptId); if (!result) notFound(); return <ResultDetailPage result={result} />; }
