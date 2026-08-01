export type EducationalGrade = {
  value: string;
  label: string;
};

export const educationalGrades = [
  { value: "prep-1", label: "الصف الأول الإعدادي" },
  { value: "prep-2", label: "الصف الثاني الإعدادي" },
  { value: "prep-3", label: "الصف الثالث الإعدادي" },
  { value: "secondary-1", label: "الصف الأول الثانوي" },
  { value: "secondary-2", label: "الصف الثاني الثانوي" },
  { value: "secondary-3", label: "الصف الثالث الثانوي" },
] satisfies EducationalGrade[];
