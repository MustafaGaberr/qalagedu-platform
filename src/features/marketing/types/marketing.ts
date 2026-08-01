import type { LucideIcon } from "lucide-react";

export type ValueItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type JourneyStep = {
  title: string;
  description: string;
};

export type FeatureHighlight = {
  title: string;
  description: string;
  icon: LucideIcon;
  previewLabel: string;
};

export type CoursePreview = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  grade: string;
  lessons: number;
  status: "available" | "soon";
  image: {
    src: string;
    alt: string;
  };
};

export type TeacherPreview = {
  id: string;
  name: string;
  subject: string;
  bio: string;
  initials: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
