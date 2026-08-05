import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type InlineSpinnerProps = { className?: string; label?: string };
export function InlineSpinner({ className, label = "جارٍ التنفيذ" }: InlineSpinnerProps) { return <LoaderCircleIcon role="status" aria-label={label} className={cn("size-4 animate-spin motion-reduce:animate-none", className)} />; }
