import { notificationIconMap } from "@/features/student-dashboard/components/notification-icons";
import type { StudentNotification } from "@/features/student-dashboard/types/dashboard";
import { cn } from "@/lib/utils";

type NotificationsListProps = {
  notifications: StudentNotification[];
};

export function NotificationsList({ notifications }: NotificationsListProps) {
  return (
    <section className="rounded-lg border bg-card p-4 shadow-sm shadow-foreground/5">
      <div className="text-start">
        <h2 className="text-base font-semibold text-foreground">
          النشاط والتنبيهات
        </h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          آخر ما يحتاج انتباهك داخل الحساب.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {notifications.map((item) => {
          const Icon = notificationIconMap[item.type];

          return (
            <article
              key={item.id}
              className={cn(
                "flex gap-3 rounded-lg border p-3 text-start",
                item.unread ? "bg-secondary/65" : "bg-background"
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card text-primary ring-1 ring-border">
                <Icon aria-hidden="true" className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-6 text-foreground">
                    {item.title}
                  </h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.dateLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
