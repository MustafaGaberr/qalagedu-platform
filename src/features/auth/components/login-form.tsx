"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { appConfig } from "@/config/app";
import { PasswordInput } from "@/features/auth/components/password-input";
import { login, logout } from "@/features/auth/services/auth-service";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/auth";
import type { AuthSubmissionState } from "@/features/auth/types/auth";
import { toApiError } from "@/lib/api/errors";

export function LoginForm() {
  const router = useRouter();
  const [submission, setSubmission] = React.useState<AuthSubmissionState>({
    status: "idle",
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmission({ status: "idle" });
    try {
      const session = await login(values.identifier, values.password);
      if (session.role !== "STUDENT") {
        await logout().catch(() => undefined);
        setSubmission({
          status: "error",
          message: "هذه المنصة مخصصة لحسابات الطلاب.",
        });
        return;
      }
      setSubmission({ status: "success", message: "تم تسجيل الدخول بنجاح." });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setSubmission({ status: "error", message: toApiError(error).message });
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-6 [&_[data-slot=field-description]]:text-sm [&_[data-slot=field-description]]:leading-6 [&_[data-slot=field-label]]:text-[0.95rem]"
    >
      {submission.status !== "idle" ? (
        <Alert variant={submission.status === "error" ? "destructive" : "default"}>
          <AlertTitle>
            {submission.status === "error" ? "تعذر تسجيل الدخول" : "تم تسجيل الدخول"}
          </AlertTitle>
          <AlertDescription>{submission.message}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.identifier}>
          <FieldLabel htmlFor="identifier">البريد الإلكتروني أو رقم الهاتف</FieldLabel>
          <Input
            id="identifier"
            inputMode="email"
            autoComplete="username"
            placeholder="student@example.com أو 01000000000"
            aria-invalid={!!form.formState.errors.identifier}
            {...form.register("identifier")}
          />
          <FieldError>{form.formState.errors.identifier?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.password}>
          <div className="flex items-center justify-between gap-3">
            <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
            <Link
              href="#"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              نسيت كلمة المرور؟
            </Link>
          </div>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="اكتب كلمة المرور"
            aria-invalid={!!form.formState.errors.password}
            {...form.register("password")}
          />
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>

        <Controller
          control={form.control}
          name="remember"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="remember"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
              <FieldContent>
                <FieldLabel htmlFor="remember">تذكرني على هذا الجهاز</FieldLabel>
                <FieldDescription>
                  تظل جلستك محمية في ملف ارتباط HTTP-only.
                </FieldDescription>
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
        تسجيل الدخول
      </Button>

      <p className="text-center text-base leading-7 text-muted-foreground">
        ليس لديك حساب؟{" "}
        <Link
          href={appConfig.authNavigation.register.href}
          className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  );
}
