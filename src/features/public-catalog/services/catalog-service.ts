import "server-only";

import { serverApiRequest } from "@/lib/api/server";
import { catalogCourses, catalogProducts, catalogTeachers } from "@/features/public-catalog/data/catalog";
import type { AccessPackage, CatalogCourse, CatalogTeacher, StoreProduct } from "../types/catalog";

type RawCourse = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  teacher: { id: string; name: string };
  subject: { id: string; name: string };
  grade: { id: string; name: string };
  term: { id: string; name: string };
  units?: Array<{
    id: string;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      description: string | null;
      durationSeconds: number | null;
      isFreePreview: boolean;
      relatedExamId: string | null;
      attachments?: Array<{ id: string; title: string }>;
    }>;
  }>;
  updatedAt: string;
};

type RawPackage = {
  id: string;
  courseId: string;
  type: AccessPackage["type"];
  title: string;
  description: string | null;
  price: number | string;
  accessDurationDays: number | null;
  includeFutureLessons: boolean;
  counts: { lessons: number; exams: number; attachments: number };
};

type RawStoreProduct = {
  id: string;
  courseId: string | null;
  packageId: string | null;
  type: StoreProduct["type"];
  title: string;
  description: string | null;
  price: number | string;
  isFree: boolean;
  previewMetadata: Record<string, unknown> | null;
  course?: { id: string; title: string; slug: string } | null;
};

export type WebsiteSection = {
  id: string;
  type: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  metadata: unknown;
  ctaLabel: string | null;
  ctaUrl: string | null;
  position: number;
};

const duration = (seconds: number | null) => {
  if (!seconds) return "—";
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} دقيقة`;
};

function mapPackage(item: RawPackage): AccessPackage {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    price: Number(item.price),
    duration: item.accessDurationDays ? `${item.accessDurationDays} يومًا` : "وصول دائم",
    scope: item.description ?? "وفق نطاق الباقة المحدد",
    exams: item.counts.exams,
    files: item.counts.attachments,
    futureLessons: item.includeFutureLessons,
  };
}

async function loadCourses(): Promise<CatalogCourse[]> {
  const rawCourses = await serverApiRequest<RawCourse[]>("catalog/courses", {
    next: { revalidate: 60 },
  });
  const packages = await serverApiRequest<RawPackage[]>("catalog/packages", {
    next: { revalidate: 60 },
  });
  return rawCourses.map((course) => ({
    id: course.id,
    title: course.title,
    subject: course.subject.name,
    grade: course.grade.name,
    gradeId: course.grade.id,
    term: course.term.name,
    teacherId: course.teacher.id,
    mode: "ONLINE",
    description: course.description ?? "",
    cover: course.coverImage ?? "/marketing/course-math.svg",
    coverAlt: `غلاف ${course.title}`,
    updatedAt: new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium" }).format(new Date(course.updatedAt)),
    units: (course.units ?? []).map((unit) => ({
      id: unit.id,
      title: unit.title,
      lessons: unit.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        preview: lesson.isFreePreview,
        duration: duration(lesson.durationSeconds),
      })),
      examCount: unit.lessons.filter((lesson) => lesson.relatedExamId).length,
      attachmentCount: unit.lessons.reduce((sum, lesson) => sum + (lesson.attachments?.length ?? 0), 0),
    })),
    packages: packages.filter((item) => item.courseId === course.id).map(mapPackage),
    groups: [],
    onlineExams: 0,
    attachments: (course.units ?? []).reduce((sum, unit) => sum + unit.lessons.reduce((count, lesson) => count + (lesson.attachments?.length ?? 0), 0), 0),
  }));
}

export async function getPublicCourses() {
  try {
    return await loadCourses();
  } catch {
    // Public-only fallback keeps the marketing/catalog shell usable during outages.
    return catalogCourses;
  }
}

export async function getPublicCourse(id: string) {
  return (await getPublicCourses()).find((course) => course.id === id) ?? null;
}

export async function getPublicTeachers(): Promise<CatalogTeacher[]> {
  try {
    const raw = await serverApiRequest<RawCourse[]>("catalog/courses", { next: { revalidate: 60 } });
    const byTeacher = new Map<string, CatalogTeacher>();
    for (const course of raw) {
      const current = byTeacher.get(course.teacher.id);
      byTeacher.set(course.teacher.id, {
        id: course.teacher.id,
        name: course.teacher.name,
        subject: current?.subject ?? course.subject.name,
        grades: [...new Set([...(current?.grades ?? []), course.grade.name])],
        mode: "ONLINE",
        intro: "مدرس للكورسات المنشورة على المنصة.",
        initials: course.teacher.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join(" "),
      });
    }
    return [...byTeacher.values()];
  } catch {
    return catalogTeachers;
  }
}

export async function getPublicTeacher(id: string) {
  return (await getPublicTeachers()).find((teacher) => teacher.id === id) ?? null;
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  try {
    const [items, courses] = await Promise.all([
      serverApiRequest<RawStoreProduct[]>("catalog/store", { next: { revalidate: 60 } }),
      loadCourses(),
    ]);
    return items.map((item) => {
      const preview = item.previewMetadata ?? {};
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        publisher: typeof preview.publisher === "string" ? preview.publisher : "Qalag EDU",
        grade: typeof preview.grade === "string" ? preview.grade : "كل الصفوف",
        gradeId: typeof preview.gradeId === "string" ? preview.gradeId : "all",
        subject: typeof preview.subject === "string" ? preview.subject : (item.course?.title ?? "مادة تعليمية"),
        description: item.description ?? "",
        pageCount: typeof preview.pageCount === "number" ? preview.pageCount : undefined,
        format: typeof preview.format === "string" ? preview.format : "ملف رقمي",
        price: item.isFree ? 0 : Number(item.price),
        cover: typeof preview.cover === "string" ? preview.cover : "/marketing/course-arabic.svg",
        coverAlt: `غلاف ${item.title}`,
        teacherId: courses.find((course) => course.id === item.courseId)?.teacherId,
        courseId: item.courseId ?? undefined,
        packageId: item.packageId ?? undefined,
      };
    });
  } catch {
    return catalogProducts;
  }
}

export async function getStoreProduct(id: string) {
  return (await getStoreProducts()).find((product) => product.id === id) ?? null;
}

export async function getWebsiteSections() {
  try {
    return await serverApiRequest<WebsiteSection[]>("website/sections", { next: { revalidate: 60 } });
  } catch {
    return [];
  }
}
