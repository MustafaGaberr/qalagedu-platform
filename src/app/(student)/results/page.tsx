import { UnifiedResultsPage } from "@/features/student-learning/components/learning-pages";
import { getUnifiedResults } from "@/features/student-learning/services/learning-service";
export default function ResultsRoute() { return <UnifiedResultsPage results={getUnifiedResults()} />; }
