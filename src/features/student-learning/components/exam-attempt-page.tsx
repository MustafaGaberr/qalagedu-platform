"use client";

/* Browser monitoring intentionally records only observable page events. */
/* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AlertTriangleIcon, Clock3Icon, ExpandIcon, ShieldAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toApiError } from "@/lib/api/errors";
import { recordAntiCheatEvent, saveExamAnswer, startExamAttempt, submitExamAttempt } from "../services/learning-client";
import type { AntiCheatEventType, ExamAnswer, ExamQuestion, OnlineExam } from "../types/learning";

type AttemptState = {
  id: string;
  expiresAt: string;
  questions: ExamQuestion[];
};

function options(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  return value.map((item, index) => {
    if (typeof item === "string") return { id: item, label: item };
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      return { id: String(record.id ?? record.value ?? index), label: String(record.label ?? record.text ?? record.value ?? index + 1) };
    }
    return { id: String(index), label: String(item) };
  });
}

export function RealExamAttemptPage({ exam }: { exam: OnlineExam | null }) {
  const [attempt, setAttempt] = useState<AttemptState | null>(null);
  const [answers, setAnswers] = useState<Record<string, string[] | boolean | string>>({});
  const [seconds, setSeconds] = useState(0);
  const [violations, setViolations] = useState<AntiCheatEventType[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fullscreenRequested, setFullscreenRequested] = useState(false);
  const [error, setError] = useState("");
  const lastEvent = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!exam || !["AVAILABLE", "IN_PROGRESS"].includes(exam.status)) return;
    void startExamAttempt(exam.id).then((result) => {
      const questions: ExamQuestion[] = result.questions.map((question) => ({
        id: question.id,
        type: question.type as ExamQuestion["type"],
        text: question.prompt,
        options: options(question.options),
        maxScore: Number(question.points),
      }));
      setAttempt({ id: result.attempt.id, expiresAt: result.attempt.expiresAt, questions });
      setSeconds(Math.max(0, Math.ceil((new Date(result.attempt.expiresAt).getTime() - Date.now()) / 1000)));
      const restored: Record<string, string[] | boolean | string> = {};
      for (const answer of result.attempt.answers) if (answer.answer !== null && answer.answer !== undefined) restored[answer.questionId] = answer.answer as string[] | boolean | string;
      setAnswers(restored);
    }).catch((reason) => setError(toApiError(reason).message));
  }, [exam?.id]);

  const submit = async () => {
    if (!attempt || submitted || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await submitExamAttempt(attempt.id);
      setSubmitted(true);
    } catch (reason) {
      setError(toApiError(reason).message);
    } finally {
      setSubmitting(false);
    }
  };

  const record = (kind: AntiCheatEventType) => {
    if (!attempt || submitted) return;
    const now = Date.now();
    if (now - (lastEvent.current[kind] ?? 0) < 1500) return;
    lastEvent.current[kind] = now;
    setViolations((current) => [...current, kind]);
    void recordAntiCheatEvent(attempt.id, kind).catch(() => undefined);
  };

  useEffect(() => {
    if (!attempt || submitted) return;
    const timer = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const hidden = () => document.hidden && record("PAGE_HIDDEN");
    const blur = () => record("WINDOW_BLUR");
    const full = () => fullscreenRequested && !document.fullscreenElement && record("FULLSCREEN_EXIT");
    const copy = () => record("COPY_ATTEMPT");
    const paste = () => record("PASTE_ATTEMPT");
    const context = () => record("CONTEXT_MENU_ATTEMPT");
    document.addEventListener("visibilitychange", hidden); window.addEventListener("blur", blur); document.addEventListener("fullscreenchange", full); window.addEventListener("copy", copy); window.addEventListener("paste", paste); window.addEventListener("contextmenu", context);
    return () => { window.clearInterval(timer); document.removeEventListener("visibilitychange", hidden); window.removeEventListener("blur", blur); document.removeEventListener("fullscreenchange", full); window.removeEventListener("copy", copy); window.removeEventListener("paste", paste); window.removeEventListener("contextmenu", context); };
  }, [attempt?.id, submitted, fullscreenRequested]);

  useEffect(() => { if (attempt && seconds === 0 && !submitted) void submit(); }, [seconds, attempt?.id]);
  useEffect(() => { if (exam?.maxViolations && violations.length >= exam.maxViolations && !submitted) void submit(); }, [violations.length]);

  const persist = async (question: ExamQuestion, value: string[] | boolean | string) => {
    if (!attempt) return;
    const answer: ExamAnswer = { questionId: question.id };
    if (Array.isArray(value)) answer.selectedOptionIds = value;
    else if (typeof value === "boolean") answer.booleanAnswer = value;
    else answer.textAnswer = value;
    try { await saveExamAnswer(attempt.id, answer); }
    catch (reason) { setError(toApiError(reason).message); }
  };

  if (!exam || !["AVAILABLE", "IN_PROGRESS"].includes(exam.status)) return <Alert><AlertTriangleIcon /><AlertTitle>المحاولة غير متاحة</AlertTitle><AlertDescription>راجعي حالة الاختبار أو عدد المحاولات المتبقية.</AlertDescription></Alert>;
  if (error && !attempt) return <Alert variant="destructive"><AlertTitle>تعذر بدء المحاولة</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>;
  if (!attempt) return <p className="text-sm text-muted-foreground">جارٍ بدء أو استكمال المحاولة من الخادم…</p>;
  if (submitted) return <Card><CardHeader><CardTitle>تم تسليم المحاولة</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-muted-foreground">تم حفظ التسليم على الخادم. قد تنتظر الإجابات النصية مراجعة المدرس.</p><Button render={<Link href="/results" />} nativeButton={false}>عرض النتائج</Button></CardContent></Card>;

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return <div className="mx-auto flex max-w-5xl flex-col gap-4"><header className="sticky top-0 z-10 rounded-lg border bg-card/95 p-4 backdrop-blur"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-primary">{exam.title}</p><p className="text-sm text-muted-foreground">التنبيهات المسجلة: {violations.length}{exam.maxViolations ? `/${exam.maxViolations}` : ""}</p></div><div className="flex items-center gap-2"><span className="rounded-lg bg-secondary px-3 py-2 font-semibold tabular-nums"><Clock3Icon className="me-1 inline size-4" />{time}</span>{exam.requiresFullscreen ? <Button variant="outline" size="sm" onClick={() => void document.documentElement.requestFullscreen?.().then(() => setFullscreenRequested(true)).catch(() => undefined)}><ExpandIcon data-icon="inline-start" />ملء الشاشة</Button> : null}<Button size="sm" disabled={submitting} onClick={submit}>{submitting ? "جارٍ التسليم…" : "تسليم"}</Button></div></div></header>{error ? <Alert variant="destructive"><AlertTitle>تعذر حفظ آخر إجراء</AlertTitle><AlertDescription>{error}</AlertDescription></Alert> : null}{violations.length ? <Alert><ShieldAlertIcon /><AlertTitle>تم تسجيل تنبيه على الخادم</AlertTitle><AlertDescription>يمكنك المتابعة؛ سيظهر هذا الحدث ضمن سجل المحاولة للمراجعة.</AlertDescription></Alert> : null}<div className="grid gap-4">{attempt.questions.map((question, index) => <Card key={question.id}><CardContent className="p-5"><p className="text-sm text-primary">السؤال {index + 1} · {question.maxScore} درجات</p><fieldset className="mt-3"><legend className="text-lg font-semibold">{question.text}</legend>{question.type === "SHORT_TEXT" ? <textarea className="mt-4 min-h-28 w-full rounded-lg border bg-background p-3 text-sm" value={typeof answers[question.id] === "string" ? answers[question.id] as string : ""} onChange={(event) => setAnswers((all) => ({ ...all, [question.id]: event.target.value }))} onBlur={() => void persist(question, typeof answers[question.id] === "string" ? answers[question.id] as string : "")} /> : question.type === "TRUE_FALSE" ? <div className="mt-4 flex gap-3">{[[true,"صح"],[false,"خطأ"]].map(([value,label]) => <label key={String(value)} className="flex items-center gap-2 rounded-lg border p-3"><input type="radio" name={question.id} checked={answers[question.id] === value} onChange={() => { const next=value as boolean; setAnswers((all)=>({...all,[question.id]:next})); void persist(question,next); }} />{label}</label>)}</div> : <div className="mt-4 grid gap-2">{question.options?.map((option) => { const selected=(answers[question.id] as string[]|undefined)??[]; const multiple=question.type==="MULTIPLE_CHOICE"; return <label key={option.id} className="flex items-center gap-3 rounded-lg border p-3"><input type={multiple?"checkbox":"radio"} name={question.id} checked={selected.includes(option.id)} onChange={(event)=>{const next=multiple?(event.target.checked?[...selected,option.id]:selected.filter(id=>id!==option.id)):[option.id];setAnswers((all)=>({...all,[question.id]:next}));void persist(question,next);}} />{option.label}</label>; })}</div>}</fieldset></CardContent></Card>)}</div></div>;
}
