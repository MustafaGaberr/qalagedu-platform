import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusBadgeStatus =
  | "default"
  | "success"
  | "warning"
  | "destructive"
  | "muted";

type StatusBadgeProps = React.ComponentProps<typeof Badge> & {
  status?: StatusBadgeStatus;
};

const statusClasses: Record<StatusBadgeStatus, string> = {
  default: "",
  success:
    "bg-primary/10 text-primary ring-1 ring-primary/20 hover:bg-primary/15",
  warning:
    "bg-accent text-accent-foreground ring-1 ring-accent-foreground/10 hover:bg-accent/80",
  destructive: "",
  muted:
    "bg-muted text-muted-foreground ring-1 ring-border hover:bg-muted/80",
};

export function StatusBadge({
  className,
  status = "default",
  variant,
  ...props
}: StatusBadgeProps) {
  const resolvedVariant =
    status === "destructive" ? "destructive" : variant ?? "secondary";

  return (
    <Badge
      variant={resolvedVariant}
      className={cn(statusClasses[status], className)}
      {...props}
    />
  );
}
