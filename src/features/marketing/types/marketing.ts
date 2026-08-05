import type { LucideIcon } from "lucide-react";

export type MarketingImage = { src: string; alt: string };

export type HeroBanner = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  imageAlt: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  textPlacement: "start" | "center";
  focalPosition: string;
  order: number;
  active: boolean;
};

export type Benefit = { title: string; description: string; icon: LucideIcon };

export type EducationalStage = {
  id: string;
  label: string;
  description: string;
  onlineHref: string;
  centerHref: string;
};

export type TeacherPreview = {
  id: string;
  name: string;
  subject: string;
  grades: string;
  availability: "online" | "center" | "both";
  initials: string;
  courseHref: string;
  scheduleHref?: string;
};

export type PackageType = "course" | "lesson" | "monthly" | "term" | "revision";

export type CoursePreview = {
  id: string;
  title: string;
  teacher: string;
  grade: string;
  subject: string;
  packageType: PackageType;
  delivery: "online" | "center" | "both";
  lessonCount?: number;
  price: string;
  previousPrice?: string;
  image: MarketingImage;
  href: string;
};

export type StoreProduct = {
  id: string;
  title: string;
  publisher: string;
  grade: string;
  subject: string;
  type: string;
  price?: string;
  image: MarketingImage;
};

export type CenterSchedule = {
  id: string;
  teacher: string;
  subject: string;
  grade: string;
  day: string;
  startTime: string;
  duration: string;
  location: string;
};

export type Testimonial = { quote: string; author: string; relation: string };

export type FaqItem = { question: string; answer: string };
