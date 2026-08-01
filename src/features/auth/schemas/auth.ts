import { z } from "zod";

const phonePattern = /^(?:\+?20|0)?1[0125]\d{8}$/;

export function normalizePhone(value: string) {
  return value.replace(/[\s-]/g, "");
}

export function isReasonableEgyptianPhone(value: string) {
  return phonePattern.test(normalizePhone(value));
}

const identifierSchema = z.string().trim().min(1, "اكتب البريد الإلكتروني أو رقم الهاتف").refine(
  (value) => z.email().safeParse(value).success || isReasonableEgyptianPhone(value),
  "اكتب بريدا إلكترونيا صحيحا أو رقم موبايل مصري مناسب"
);

const passwordSchema = z
  .string()
  .min(8, "كلمة المرور يجب ألا تقل عن ٨ أحرف")
  .regex(/[A-Za-zأ-ي]/, "كلمة المرور يجب أن تحتوي على حرف واحد على الأقل")
  .regex(/\d/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل");

export const loginSchema = z.object({
  identifier: identifierSchema,
  password: z.string().min(1, "اكتب كلمة المرور"),
  remember: z.boolean(),
});

export const registerSchema = z
  .object({
    studentName: z
      .string()
      .trim()
      .min(3, "اكتب الاسم الثلاثي للطالب")
      .max(80, "الاسم طويل أكثر من اللازم"),
    studentPhone: z
      .string()
      .trim()
      .refine(isReasonableEgyptianPhone, "اكتب رقم موبايل مصري مناسب للطالب"),
    parentPhone: z
      .string()
      .trim()
      .refine(isReasonableEgyptianPhone, "اكتب رقم موبايل مصري مناسب لولي الأمر"),
    grade: z.string().min(1, "اختر المرحلة الدراسية"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "أعد كتابة كلمة المرور"),
    terms: z.boolean().refine((value) => value, "يجب الموافقة على الشروط قبل إنشاء الحساب"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
