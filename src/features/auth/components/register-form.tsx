"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appConfig } from "@/config/app";
import { educationalGrades } from "@/config/education";
import { PasswordInput } from "@/features/auth/components/password-input";
import { simulateAuthSubmission } from "@/features/auth/lib/mock-submit";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth";
import type { AuthSubmissionState } from "@/features/auth/types/auth";

export function RegisterForm() {
  const [submission, setSubmission] = React.useState<AuthSubmissionState>({
    status: "idle",
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      studentName: "",
      studentPhone: "",
      parentPhone: "",
      grade: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setSubmission({ status: "idle" });

    if (values.studentName.includes("خطأ")) {
      setSubmission({
        status: "error",
        message: "تم عرض خطأ تجريبي فقط. لا يوجد إرسال فعلي للبيانات.",
      });
      return;
    }

    const result = await simulateAuthSubmission("register");
    setSubmission({
      status: result.ok ? "success" : "error",
      message: result.message,
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 [&_[data-slot=field-description]]:text-sm [&_[data-slot=field-description]]:leading-6 [&_[data-slot=field-label]]:text-[0.95rem]"
    >
      {submission.status !== "idle" ? (
        <Alert variant={submission.status === "error" ? "destructive" : "default"}>
          <AlertTitle>
            {submission.status === "error" ? "تعذر تنفيذ المحاكاة" : "تمت المحاكاة"}
          </AlertTitle>
          <AlertDescription>{submission.message}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.studentName}>
          <FieldLabel htmlFor="studentName">اسم الطالب بالكامل</FieldLabel>
          <Input
            id="studentName"
            autoComplete="name"
            placeholder="مثال: عمر أحمد محمود"
            aria-invalid={!!form.formState.errors.studentName}
            {...form.register("studentName")}
          />
          <FieldError>{form.formState.errors.studentName?.message}</FieldError>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.studentPhone}>
            <FieldLabel htmlFor="studentPhone">رقم الطالب</FieldLabel>
            <Input
              id="studentPhone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01000000000"
              aria-invalid={!!form.formState.errors.studentPhone}
              {...form.register("studentPhone")}
            />
            <FieldError>{form.formState.errors.studentPhone?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.parentPhone}>
            <FieldLabel htmlFor="parentPhone">رقم ولي الأمر</FieldLabel>
            <Input
              id="parentPhone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="01000000000"
              aria-invalid={!!form.formState.errors.parentPhone}
              {...form.register("parentPhone")}
            />
            <FieldError>{form.formState.errors.parentPhone?.message}</FieldError>
          </Field>
        </div>

        <Controller
          control={form.control}
          name="grade"
          render={({ field }) => (
            <Field data-invalid={!!form.formState.errors.grade}>
              <FieldLabel htmlFor="grade">المرحلة الدراسية</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="grade"
                  className="w-full"
                  aria-invalid={!!form.formState.errors.grade}
                >
                  <SelectValue placeholder="اختر المرحلة" />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    {educationalGrades.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError>{form.formState.errors.grade?.message}</FieldError>
            </Field>
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.password}>
            <FieldLabel htmlFor="registerPassword">كلمة المرور</FieldLabel>
            <PasswordInput
              id="registerPassword"
              autoComplete="new-password"
              placeholder="٨ أحرف على الأقل"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
            />
            <FieldError>{form.formState.errors.password?.message}</FieldError>
          </Field>

          <Field data-invalid={!!form.formState.errors.confirmPassword}>
            <FieldLabel htmlFor="confirmPassword">تأكيد كلمة المرور</FieldLabel>
            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="أعد كتابة كلمة المرور"
              aria-invalid={!!form.formState.errors.confirmPassword}
              {...form.register("confirmPassword")}
            />
            <FieldError>
              {form.formState.errors.confirmPassword?.message}
            </FieldError>
          </Field>
        </div>

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <Field
              orientation="horizontal"
              data-invalid={!!form.formState.errors.terms}
            >
              <Checkbox
                id="terms"
                aria-invalid={!!form.formState.errors.terms}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
              <FieldContent>
                <FieldLabel htmlFor="terms">
                  أوافق على الشروط المؤقتة للمنصة
                </FieldLabel>
                <FieldDescription>
                  الروابط القانونية مؤقتة إلى أن يتم اعتماد النصوص النهائية.
                </FieldDescription>
                <FieldError>{form.formState.errors.terms?.message}</FieldError>
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        className="shadow-lg shadow-primary/15"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
        ) : null}
        إنشاء الحساب
      </Button>

      <p className="text-center text-base leading-7 text-muted-foreground">
        لديك حساب بالفعل؟{" "}
        <Link
          href={appConfig.authNavigation.login.href}
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
}
