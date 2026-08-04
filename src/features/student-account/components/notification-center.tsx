"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BellIcon,
  CheckCheckIcon,
  CheckCircle2Icon,
  CircleIcon,
  SearchIcon,
} from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  mockMarkAllNotificationsAsRead,
  mockMarkNotificationAsRead,
} from "@/features/student-account/services/account-service";
import type { StudentAccountNotification } from "@/features/student-account/types/account";

type NotificationCenterProps = {
  initialNotifications: StudentAccountNotification[];
};

export function NotificationCenter({
  initialNotifications,
}: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(() =>
    initialNotifications.map((item) => ({ ...item })),
  );
  const [query, setQuery] = useState("");

  const unreadCount = notifications.filter((item) => !item.isRead).length;
  const visibleNotifications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return notifications.filter((item) =>
      `${item.title} ${item.message}`.toLowerCase().includes(normalizedQuery),
    );
  }, [notifications, query]);

  async function markOneAsRead(notificationId: string) {
    const updated = await mockMarkNotificationAsRead(notificationId);

    if (!updated) return;

    setNotifications((current) =>
      current.map((item) =>
        item.id === notificationId ? { ...updated } : item,
      ),
    );
  }

  async function markAllAsRead() {
    const updated = await mockMarkAllNotificationsAsRead();
    const updatedById = new Map(updated.map((item) => [item.id, item]));

    setNotifications((current) =>
      current.map((item) => ({ ...(updatedById.get(item.id) ?? item) })),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">الإشعارات</h1>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} إشعارات غير مقروءة.`
              : "تمت قراءة جميع الإشعارات."}{" "}
            حالة القراءة مؤقتة وقد تعود بعد تحديث الصفحة.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <CheckCheckIcon data-icon="inline-start" />
          تحديد الكل كمقروء
        </Button>
      </div>

      <div className="relative">
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="البحث في الإشعارات"
          placeholder="ابحثي في الإشعارات"
          className="ps-9"
        />
      </div>

      {visibleNotifications.length > 0 ? (
        <div className="space-y-3">
          {visibleNotifications.map((item) => (
            <Card key={item.id} className="min-w-0">
              <CardContent className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
                <div className="flex min-w-0 flex-1 gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <BellIcon aria-hidden="true" className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1 text-start">
                    <div className="flex flex-wrap items-center gap-2">
                      <strong className="leading-6">{item.title}</strong>
                      <span
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                        aria-label={item.isRead ? "إشعار مقروء" : "إشعار غير مقروء"}
                      >
                        {item.isRead ? (
                          <CheckCircle2Icon aria-hidden="true" className="size-3.5" />
                        ) : (
                          <CircleIcon aria-hidden="true" className="size-3.5 text-primary" />
                        )}
                        {item.isRead ? "مقروء" : "غير مقروء"}
                      </span>
                    </div>
                    <p className="mt-1 break-words text-sm leading-6 text-muted-foreground">
                      {item.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:shrink-0">
                  {!item.isRead ? (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => markOneAsRead(item.id)}
                      aria-label={`تحديد ${item.title} كمقروء`}
                    >
                      <CheckCircle2Icon data-icon="inline-start" />
                      تحديد كمقروء
                    </Button>
                  ) : null}
                  {item.relatedRoute ? (
                    <Button
                      size="sm"
                      render={<Link href={item.relatedRoute} />}
                      nativeButton={false}
                    >
                      {item.actionLabel ?? "عرض التفاصيل"}
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد إشعارات مطابقة"
          description="غيّري كلمات البحث لعرض بقية الإشعارات."
        />
      )}
    </div>
  );
}
