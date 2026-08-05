import type { Metadata } from "next";
import { LibraryPage } from "@/features/student-access/components/access-pages";
import { getStudentAccessData } from "@/features/student-access/services/access-service";
export const metadata: Metadata = { title: "مكتبتي" };
export default function Page() { return <LibraryPage items={getStudentAccessData().libraryItems} />; }
