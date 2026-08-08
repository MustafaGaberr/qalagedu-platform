import "server-only";
import { cache } from "react";

import { appConfig } from "@/config/app";
import { serverApiRequest } from "@/lib/api/server";
import type { AccessPackage, CatalogCourse, CatalogTeacher, SearchResult, StoreProduct, StudyMode } from "../types/catalog";

type RawCourse = {
  id: string; slug: string; title: string; description: string | null; coverImage: string | null; studyMode: "ONLINE" | "CENTER" | "HYBRID";
  teacher: { id: string; name: string; teacherProfile?: { subject: string | null; bio: string | null; photoUrl: string | null } | null };
  subject: { id: string; name: string }; grade: { id: string; name: string }; term: { id: string; name: string }; updatedAt: string;
  units?: Array<{ id: string; title: string; lessons: Array<{ id: string; title: string; durationSeconds: number | null; isFreePreview: boolean; relatedExamId: string | null; thumbnailUrl: string | null; attachments?: Array<{ id: string; title: string }> }> }>;
  centerGroups?: Array<{ id: string; name: string; schedule: Record<string, unknown> | null; location: string | null; capacity: number; status: string; _count: { enrollments: number } }>;
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

const loadRawCourses = cache(() => serverApiRequest<RawCourse[]>("catalog/courses", { authenticated: false, next: { revalidate: 60 } }));
const loadPackages = cache(() => serverApiRequest<RawPackage[]>("catalog/packages", { authenticated: false, next: { revalidate: 60 } }));
const loadRawStoreProducts = cache(() => serverApiRequest<RawStoreProduct[]>("catalog/store", { authenticated: false, next: { revalidate: 60 } }));
const loadRawTeachers = cache(() => serverApiRequest<RawTeacher[]>("catalog/teachers", { authenticated: false, next: { revalidate: 60 } }));
const loadWebsiteSections = cache(() => serverApiRequest<WebsiteSection[]>("website/sections", { authenticated: false, next: { revalidate: 60 } }));

function homepageTeacherIds(sections: WebsiteSection[]) {
  const ids: string[] = [];
  for (const section of sections.filter((item) => item.type === "FEATURED_TEACHERS").sort((a, b) => a.position - b.position)) {
    const teacherId = section.metadata?.teacherId;
    if (typeof teacherId === "string" && !ids.includes(teacherId)) ids.push(teacherId);
    const teacherIds = section.metadata?.teacherIds;
    if (Array.isArray(teacherIds)) {
      for (const id of teacherIds) if (typeof id === "string" && !ids.includes(id)) ids.push(id);
    }
  }
  return ids.slice(0, 2);
}

function mapCourses(rawCourses: RawCourse[], packages: RawPackage[]): CatalogCourse[] {
  return rawCourses.map((course) => ({
    id: course.id, title: course.title, subject: course.subject.name, grade: course.grade.name, gradeId: course.grade.id, term: course.term.name, teacherId: course.teacher.id, teacherName: course.teacher.name, mode: mode(course.studyMode), description: course.description ?? "", cover: course.coverImage ?? appConfig.center.logo.src, coverAlt: `غلاف ${course.title}`, hasCustomCover: Boolean(course.coverImage), updatedAt: new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(new Date(course.updatedAt)),
    units: (course.units ?? []).map((unit) => ({ id: unit.id, title: unit.title, lessons: unit.lessons.map((lesson) => ({ id: lesson.id, title: lesson.title, preview: lesson.isFreePreview, duration: duration(lesson.durationSeconds), thumbnailUrl: lesson.thumbnailUrl ?? undefined })), examCount: unit.lessons.filter((lesson) => lesson.relatedExamId).length, attachmentCount: unit.lessons.reduce((sum, lesson) => sum + (lesson.attachments?.length ?? 0), 0) })),
    packages: packages.filter((item) => item.courseId === course.id).map(mapPackage), groups: (course.centerGroups ?? []).map((group) => mapCenterGroup(group)), onlineExams: 0, attachments: (course.units ?? []).reduce((sum, unit) => sum + unit.lessons.reduce((count, lesson) => count + (lesson.attachments?.length ?? 0), 0), 0),
  }));
}

function mapCenterGroup(group: NonNullable<RawCourse["centerGroups"]>[number]) {
  const schedule = group.schedule ?? {};
  const days = Array.isArray(schedule.days) ? schedule.days.filter((day): day is string => typeof day === "string").join(" و ") : "يُحدد مع السنتر";
  return {
    id: group.id,
    days,
    startTime: typeof schedule.time === "string" ? schedule.time : "يُحدد لاحقًا",
    duration: typeof schedule.duration === "string" ? schedule.duration : "ساعتان",
    room: group.location ?? group.name,
    status: group._count.enrollments < group.capacity ? "available" as const : "full" as const,
    price: typeof schedule.price === "number" ? schedule.price : 0,
  };
}

const loadCourses = cache(async (): Promise<CatalogCourse[]> => {
  const [rawCourses, packages, sections] = await Promise.all([loadRawCourses(), loadPackages(), loadWebsiteSections()]);
  const teacherIds = new Set(homepageTeacherIds(sections));
  return mapCourses(rawCourses.filter((course) => teacherIds.has(course.teacher.id)), packages);
});

export const getPublicCourses = () => loadCourses();
export async function getPublicCourse(id: string) { return (await loadCourses()).find((course) => course.id === id) ?? null; }
export async function getPublicTeachers(): Promise<CatalogTeacher[]> {
  const [items, sections] = await Promise.all([loadRawTeachers(), loadWebsiteSections()]);
  const byId = new Map(items.map((teacher) => [teacher.id, teacher]));
  return homepageTeacherIds(sections).flatMap((id) => {
    const teacher = byId.get(id);
    return teacher ? [{ id: teacher.id, name: teacher.name, subject: teacher.teacherProfile?.subject ?? "مدرس", grades: [...new Set(teacher.coursesAsTeacher.map((course) => course.grade.name))], mode: teacher.coursesAsTeacher.some((course) => course.studyMode === "HYBRID") ? "BOTH" as const : teacher.coursesAsTeacher.some((course) => course.studyMode === "CENTER") ? "CENTER" as const : "ONLINE" as const, intro: teacher.teacherProfile?.bio ?? "مدرس للكورسات المنشورة على المنصة.", initials: initials(teacher.name), photoUrl: teacher.teacherProfile?.photoUrl ?? undefined }] : [];
  });
}
export async function getPublicTeacher(id: string) { return (await getPublicTeachers()).find((teacher) => teacher.id === id) ?? null; }
export async function getStoreProducts(): Promise<StoreProduct[]> {
  const [items, courses] = await Promise.all([loadRawStoreProducts(), loadCourses()]);
  return mapStoreProducts(items, courses);
}
export async function getStoreProduct(id: string) { return (await getStoreProducts()).find((product) => product.id === id) ?? null; }
export async function getHomepageCatalog() {
  const [rawCourses, packages, products, sections] = await Promise.all([loadRawCourses(), loadPackages(), loadRawStoreProducts(), loadWebsiteSections()]);
  const teacherIds = new Set(homepageTeacherIds(sections));
  const visibleRawCourses = rawCourses.filter((course) => teacherIds.has(course.teacher.id));
  const visibleCourseIds = new Set(visibleRawCourses.map((course) => course.id));
  const courses = mapCourses(visibleRawCourses, packages);
  return { courses, products: mapStoreProducts(products.filter((product) => !product.courseId || visibleCourseIds.has(product.courseId)), courses) };
}
export const getWebsiteSections = () => loadWebsiteSections();
export const getPublicBrand = () => serverApiRequest<PublicBrand | null>("website/brand", { authenticated: false, next: { revalidate: 300 } });
export async function searchPublicCatalog(query: string) { return serverApiRequest<{ query: string; results: SearchResult[] }>(`catalog/search?q=${encodeURIComponent(query)}`, { authenticated: false, cache: "no-store" }); }

function mapStoreProducts(items: RawStoreProduct[], courses: CatalogCourse[]): StoreProduct[] {
  return items.map((item) => { const preview = item.previewMetadata ?? {}; return { id: item.id, title: item.title, type: item.type, publisher: typeof preview.teacherOrPublisher === "string" ? preview.teacherOrPublisher : appConfig.name, grade: typeof preview.grade === "string" ? preview.grade : "كل الصفوف", gradeId: typeof preview.gradeId === "string" ? preview.gradeId : "all", subject: typeof preview.subject === "string" ? preview.subject : (item.course?.title ?? "مادة تعليمية"), description: item.description ?? "", pageCount: typeof preview.pageCount === "number" ? preview.pageCount : undefined, format: typeof preview.format === "string" ? preview.format : "ملف رقمي", price: item.isFree ? 0 : Number(item.price), cover: item.imageUrl ?? appConfig.center.logo.src, coverAlt: typeof preview.coverAlt === "string" ? preview.coverAlt : `غلاف ${item.title}`, hasCustomCover: Boolean(item.imageUrl), teacherId: courses.find((course) => course.id === item.courseId)?.teacherId, courseId: item.courseId ?? undefined, packageId: item.packageId ?? undefined }; });
}
