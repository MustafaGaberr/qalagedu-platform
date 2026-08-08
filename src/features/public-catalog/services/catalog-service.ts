import "server-only";

import { appConfig } from "@/config/app";
import { serverApiRequest } from "@/lib/api/server";
import type { AccessPackage, CatalogCourse, CatalogTeacher, SearchResult, StoreProduct, StudyMode } from "../types/catalog";

type RawCourse = {
  id: string; slug: string; title: string; description: string | null; coverImage: string | null; studyMode: "ONLINE" | "CENTER" | "HYBRID";
  teacher: { id: string; name: string; teacherProfile?: { subject: string | null; bio: string | null; photoUrl: string | null } | null };
  subject: { id: string; name: string }; grade: { id: string; name: string }; term: { id: string; name: string }; updatedAt: string;
  units?: Array<{ id: string; title: string; lessons: Array<{ id: string; title: string; durationSeconds: number | null; isFreePreview: boolean; relatedExamId: string | null; thumbnailUrl: string | null; attachments?: Array<{ id: string; title: string }> }> }>;
};
type RawTeacher = { id: string; name: string; teacherProfile: { subject: string | null; bio: string | null; photoUrl: string | null } | null; coursesAsTeacher: Array<{ id: string; studyMode: "ONLINE" | "CENTER" | "HYBRID"; grade: { id: string; name: string } }> };
type RawPackage = { id: string; courseId: string; type: AccessPackage["type"]; title: string; description: string | null; thumbnailUrl: string | null; price: number | string; accessDurationDays: number | null; includeFutureLessons: boolean; counts: { lessons: number; exams: number; attachments: number } };
type RawStoreProduct = { id: string; courseId: string | null; packageId: string | null; type: StoreProduct["type"]; title: string; description: string | null; imageUrl: string | null; price: number | string; isFree: boolean; previewMetadata: Record<string, unknown> | null; course?: { id: string; title: string; slug: string } | null };

export type WebsiteSection = { id: string; type: "HERO_BANNER" | "FEATURED_TEACHERS" | "FEATURED_COURSES" | "FINAL_REVISIONS" | "STORE_HIGHLIGHTS" | "TESTIMONIALS" | "NEWS" | "CTA"; title: string | null; subtitle: string | null; body: string | null; imageUrl: string | null; metadata: Record<string, unknown> | null; ctaLabel: string | null; ctaUrl: string | null; position: number };
export type PublicBrand = { brandName: string; shortName: string; centerName: string; logoSrc: string };

const mode = (value: RawCourse["studyMode"]): StudyMode => value === "HYBRID" ? "BOTH" : value;
const duration = (seconds: number | null) => seconds ? `${Math.max(1, Math.round(seconds / 60))} دقيقة` : "—";
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join(" ");
const mapPackage = (item: RawPackage): AccessPackage => ({ id: item.id, type: item.type, title: item.title, price: Number(item.price), duration: item.accessDurationDays ? `${item.accessDurationDays} يومًا` : "وصول دائم", scope: item.description ?? "وفق نطاق الباقة", exams: item.counts.exams, files: item.counts.attachments, futureLessons: item.includeFutureLessons, thumbnailUrl: item.thumbnailUrl ?? undefined });

async function loadCourses(): Promise<CatalogCourse[]> {
  const [rawCourses, packages] = await Promise.all([
    serverApiRequest<RawCourse[]>("catalog/courses", { next: { revalidate: 60 } }),
    serverApiRequest<RawPackage[]>("catalog/packages", { next: { revalidate: 60 } }),
  ]);
  return rawCourses.map((course) => ({
    id: course.id, title: course.title, subject: course.subject.name, grade: course.grade.name, gradeId: course.grade.id, term: course.term.name, teacherId: course.teacher.id, mode: mode(course.studyMode), description: course.description ?? "", cover: course.coverImage ?? appConfig.center.logo.src, coverAlt: `غلاف ${course.title}`, updatedAt: new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(new Date(course.updatedAt)),
    units: (course.units ?? []).map((unit) => ({ id: unit.id, title: unit.title, lessons: unit.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title, preview: lesson.isFreePreview, duration: duration(lesson.durationSeconds), thumbnailUrl: lesson.thumbnailUrl ?? undefined })), examCount: unit.lessons.filter((lesson) => lesson.relatedExamId).length, attachmentCount: unit.lessons.reduce((sum, lesson) => sum + (lesson.attachments?.length ?? 0), 0) })),
    packages: packages.filter((item) => item.courseId === course.id).map(mapPackage), groups: [], onlineExams: 0, attachments: (course.units ?? []).reduce((sum, unit) => sum + unit.lessons.reduce((count, lesson) => count + (lesson.attachments?.length ?? 0), 0), 0),
  }));
}

export const getPublicCourses = () => loadCourses();
export async function getPublicCourse(id: string) { return (await loadCourses()).find((course) => course.id === id) ?? null; }
export async function getPublicTeachers(): Promise<CatalogTeacher[]> {
  const items = await serverApiRequest<RawTeacher[]>("catalog/teachers", { next: { revalidate: 60 } });
  return items.map((teacher) => ({ id: teacher.id, name: teacher.name, subject: teacher.teacherProfile?.subject ?? "مدرس", grades: [...new Set(teacher.coursesAsTeacher.map((course) => course.grade.name))], mode: teacher.coursesAsTeacher.some((course) => course.studyMode === "HYBRID") ? "BOTH" : teacher.coursesAsTeacher.some((course) => course.studyMode === "CENTER") ? "CENTER" : "ONLINE", intro: teacher.teacherProfile?.bio ?? "مدرس للكورسات المنشورة على المنصة.", initials: initials(teacher.name), photoUrl: teacher.teacherProfile?.photoUrl ?? undefined }));
}
export async function getPublicTeacher(id: string) { return (await getPublicTeachers()).find((teacher) => teacher.id === id) ?? null; }
export async function getStoreProducts(): Promise<StoreProduct[]> {
  const [items, courses] = await Promise.all([serverApiRequest<RawStoreProduct[]>("catalog/store", { next: { revalidate: 60 } }), loadCourses()]);
  return items.map((item) => { const preview = item.previewMetadata ?? {}; return { id: item.id, title: item.title, type: item.type, publisher: typeof preview.teacherOrPublisher === "string" ? preview.teacherOrPublisher : appConfig.name, grade: typeof preview.grade === "string" ? preview.grade : "كل الصفوف", gradeId: typeof preview.gradeId === "string" ? preview.gradeId : "all", subject: typeof preview.subject === "string" ? preview.subject : (item.course?.title ?? "مادة تعليمية"), description: item.description ?? "", pageCount: typeof preview.pageCount === "number" ? preview.pageCount : undefined, format: typeof preview.format === "string" ? preview.format : "ملف رقمي", price: item.isFree ? 0 : Number(item.price), cover: item.imageUrl ?? appConfig.center.logo.src, coverAlt: typeof preview.coverAlt === "string" ? preview.coverAlt : `غلاف ${item.title}`, teacherId: courses.find((course) => course.id === item.courseId)?.teacherId, courseId: item.courseId ?? undefined, packageId: item.packageId ?? undefined }; });
}
export async function getStoreProduct(id: string) { return (await getStoreProducts()).find((product) => product.id === id) ?? null; }
export const getWebsiteSections = () => serverApiRequest<WebsiteSection[]>("website/sections", { next: { revalidate: 60 } });
export const getPublicBrand = () => serverApiRequest<PublicBrand | null>("website/brand", { next: { revalidate: 300 } });
export async function searchPublicCatalog(query: string) { return serverApiRequest<{ query: string; results: SearchResult[] }>(`catalog/search?q=${encodeURIComponent(query)}`, { cache: "no-store" }); }
