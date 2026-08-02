import { appConfig } from "@/config/app";
import { mockStudentCourseSummaries } from "@/features/student-courses/data/mock-courses";
import { mockStudentDashboardData } from "@/features/student-dashboard/data/mock-dashboard";
import type {
  AttendanceRecord,
  AttendanceStatus,
  StudentAttendanceData,
  StudentCardData,
  SubjectAttendanceSummary,
} from "@/features/student-attendance/types/attendance";

const student = mockStudentDashboardData.student;
const activeCourses = mockStudentCourseSummaries.filter(
  (course) => course.enrollmentStatus === "active"
);

function courseById(courseId: string) {
  const course = mockStudentCourseSummaries.find((item) => item.id === courseId);

  if (!course) {
    throw new Error(`Missing mock course for attendance record: ${courseId}`);
  }

  return course;
}

function makeRecord(
  id: string,
  courseId: string,
  sessionTitle: string,
  sessionDate: string,
  startTime: string,
  status: AttendanceStatus,
  options: {
    checkInTime?: string;
    location?: string;
    note?: string;
    recordedByLabel?: string;
  } = {}
): AttendanceRecord {
  const course = courseById(courseId);

  return {
    id,
    studentId: student.id,
    courseId,
    subject: course.subject,
    courseTitle: course.title,
    teacherName: course.teacher,
    groupName: course.group,
    sessionTitle,
    sessionDate,
    startTime,
    checkInTime: options.checkInTime,
    location: options.location ?? "السنتر الرئيسي - قاعة 1",
    status,
    note: options.note,
    recordedByLabel: options.recordedByLabel ?? "استقبال السنتر",
  };
}

export const mockAttendanceRecords: AttendanceRecord[] = [
  makeRecord(
    "att-2026-08-02-math",
    "math-3sec",
    "تطبيقات التفاضل على الحركة",
    "2026-08-02",
    "06:30 م",
    "present",
    { checkInTime: "06:22 م", location: "السنتر الرئيسي - قاعة 1" }
  ),
  makeRecord(
    "att-2026-07-30-arabic",
    "arabic-3sec",
    "مدرسة الإحياء والبعث",
    "2026-07-30",
    "05:00 م",
    "excused",
    {
      location: "السنتر الرئيسي - قاعة 2",
      note: "تم اعتماد العذر من الإدارة.",
      recordedByLabel: "شؤون الطلاب",
    }
  ),
  makeRecord(
    "att-2026-07-28-physics",
    "physics-3sec",
    "دوائر التيار المتردد",
    "2026-07-28",
    "06:30 م",
    "late",
    {
      checkInTime: "06:44 م",
      location: "السنتر الرئيسي - معمل الفيزياء",
      note: "تأخير 14 دقيقة.",
    }
  ),
  makeRecord(
    "att-2026-07-26-math",
    "math-3sec",
    "معادلة المماس والعمودي",
    "2026-07-26",
    "06:30 م",
    "present",
    { checkInTime: "06:18 م" }
  ),
  makeRecord(
    "att-2026-07-23-arabic",
    "arabic-3sec",
    "التشبيه والاستعارة والكناية",
    "2026-07-23",
    "05:00 م",
    "present",
    { checkInTime: "04:52 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-07-21-physics",
    "physics-3sec",
    "مدخل إلى التيار المتردد",
    "2026-07-21",
    "06:30 م",
    "absent",
    {
      location: "السنتر الرئيسي - معمل الفيزياء",
      note: "لم يتم تسجيل حضور لهذه الحصة.",
    }
  ),
  makeRecord(
    "att-2026-07-19-math",
    "math-3sec",
    "تطبيقات التفاضل على الحركة",
    "2026-07-19",
    "06:30 م",
    "present",
    { checkInTime: "06:20 م" }
  ),
  makeRecord(
    "att-2026-07-16-arabic",
    "arabic-3sec",
    "مراجعة البلاغة",
    "2026-07-16",
    "05:00 م",
    "present",
    { checkInTime: "04:55 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-07-14-physics",
    "physics-3sec",
    "أساسيات الحركة الموجية",
    "2026-07-14",
    "06:30 م",
    "present",
    { checkInTime: "06:24 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-07-12-math",
    "math-3sec",
    "قواعد الاشتقاق في ورقة واحدة",
    "2026-07-12",
    "06:30 م",
    "late",
    { checkInTime: "06:39 م", note: "تأخير 9 دقائق." }
  ),
  makeRecord(
    "att-2026-07-09-arabic",
    "arabic-3sec",
    "نصوص أدبية تطبيقية",
    "2026-07-09",
    "05:00 م",
    "present",
    { checkInTime: "04:50 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-07-07-physics",
    "physics-3sec",
    "اختبار قصير على الحركة الموجية",
    "2026-07-07",
    "06:30 م",
    "present",
    { checkInTime: "06:21 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-07-05-math",
    "math-3sec",
    "مراجعة النهايات والقواعد الأساسية",
    "2026-07-05",
    "06:30 م",
    "present",
    { checkInTime: "06:17 م" }
  ),
  makeRecord(
    "att-2026-07-02-arabic",
    "arabic-3sec",
    "حل تدريبات البلاغة",
    "2026-07-02",
    "05:00 م",
    "present",
    { checkInTime: "04:48 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-06-30-physics",
    "physics-3sec",
    "مراجعة الرسوم البيانية",
    "2026-06-30",
    "06:30 م",
    "present",
    { checkInTime: "06:26 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-06-28-math",
    "math-3sec",
    "اختبار تمهيدي على التفاضل",
    "2026-06-28",
    "06:30 م",
    "present",
    { checkInTime: "06:13 م" }
  ),
  makeRecord(
    "att-2026-06-25-arabic",
    "arabic-3sec",
    "تدريب المقال القصير",
    "2026-06-25",
    "05:00 م",
    "absent",
    {
      location: "السنتر الرئيسي - قاعة 2",
      note: "غياب بدون عذر مسجل.",
    }
  ),
  makeRecord(
    "att-2026-06-23-physics",
    "physics-3sec",
    "مفاهيم التردد والطول الموجي",
    "2026-06-23",
    "06:30 م",
    "present",
    { checkInTime: "06:23 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-06-21-math",
    "math-3sec",
    "حل مسائل القواعد الأساسية",
    "2026-06-21",
    "06:30 م",
    "present",
    { checkInTime: "06:16 م" }
  ),
  makeRecord(
    "att-2026-06-18-arabic",
    "arabic-3sec",
    "مراجعة المحسنات البديعية",
    "2026-06-18",
    "05:00 م",
    "present",
    { checkInTime: "04:53 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-06-16-physics",
    "physics-3sec",
    "تجارب الحركة الموجية",
    "2026-06-16",
    "06:30 م",
    "present",
    { checkInTime: "06:19 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-06-14-math",
    "math-3sec",
    "مدخل التفاضل",
    "2026-06-14",
    "06:30 م",
    "present",
    { checkInTime: "06:15 م" }
  ),
  makeRecord(
    "att-2026-06-11-arabic",
    "arabic-3sec",
    "أسئلة بلاغة متوقعة",
    "2026-06-11",
    "05:00 م",
    "present",
    { checkInTime: "04:49 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
  makeRecord(
    "att-2026-06-09-physics",
    "physics-3sec",
    "تمهيد الكهرباء المترددة",
    "2026-06-09",
    "06:30 م",
    "present",
    { checkInTime: "06:25 م", location: "السنتر الرئيسي - معمل الفيزياء" }
  ),
  makeRecord(
    "att-2026-06-07-math",
    "math-3sec",
    "مراجعة ما قبل الاشتقاق",
    "2026-06-07",
    "06:30 م",
    "present",
    { checkInTime: "06:18 م" }
  ),
  makeRecord(
    "att-2026-06-04-arabic",
    "arabic-3sec",
    "مدخل البلاغة",
    "2026-06-04",
    "05:00 م",
    "present",
    { checkInTime: "04:51 م", location: "السنتر الرئيسي - قاعة 2" }
  ),
];

function percentage(records: AttendanceRecord[]): number {
  if (records.length === 0) {
    return 0;
  }

  const credited = records.filter((record) => record.status !== "absent").length;

  return Math.round((credited / records.length) * 100);
}

function countByStatus(records: AttendanceRecord[], status: AttendanceStatus) {
  return records.filter((record) => record.status === status).length;
}

function recordsForMonth(records: AttendanceRecord[], month: string) {
  return records.filter((record) => record.sessionDate.startsWith(month));
}

function buildSubjectSummaries(
  records: AttendanceRecord[]
): SubjectAttendanceSummary[] {
  return activeCourses.map((course) => {
    const subjectRecords = records.filter((record) => record.courseId === course.id);
    const attendedSessions = subjectRecords.filter(
      (record) => record.status !== "absent"
    ).length;
    const subjectPercentage = percentage(subjectRecords);
    const absenceCount = countByStatus(subjectRecords, "absent");
    const lateCount = countByStatus(subjectRecords, "late");
    const statusMessage =
      subjectPercentage >= 95
        ? "التزام ممتاز في هذه المادة."
        : subjectPercentage >= 90
          ? "مستوى جيد، حافظي على حضور الحصص القادمة."
          : "يفضل تعويض الغياب القادم مع المعلم.";

    return {
      courseId: course.id,
      subject: course.subject,
      teacherName: course.teacher,
      groupName: course.group,
      attendedSessions,
      totalSessions: subjectRecords.length,
      percentage: subjectPercentage,
      absenceCount,
      lateCount,
      statusMessage,
    };
  });
}

export function buildMockAttendanceData(): StudentAttendanceData {
  const records = [...mockAttendanceRecords].sort((first, second) =>
    second.sessionDate.localeCompare(first.sessionDate)
  );

  return {
    summary: {
      totalSessions: records.length,
      presentCount: countByStatus(records, "present"),
      absentCount: countByStatus(records, "absent"),
      lateCount: countByStatus(records, "late"),
      excusedCount: countByStatus(records, "excused"),
      attendancePercentage: percentage(records),
      currentMonthPercentage: percentage(recordsForMonth(records, "2026-08")),
      previousMonthPercentage: percentage(recordsForMonth(records, "2026-07")),
      latestRecord: records[0] ?? null,
    },
    subjectSummaries: buildSubjectSummaries(records),
    records,
  };
}

export const mockStudentCardData: StudentCardData = {
  studentId: student.id,
  studentCode: student.studentCode,
  fullName: student.fullName,
  firstName: student.firstName,
  grade: student.grade,
  schoolName: "مدرسة النيل الثانوية",
  centerName: appConfig.center.name,
  primaryGroup: student.group,
  profileInitials: student.avatarInitials,
  accountStatus: "active",
  accountStatusLabel: "حساب نشط",
  joinedAt: "2026-06-01",
  activeSubjects: activeCourses.map((course) => ({
    courseId: course.id,
    subject: course.subject,
    courseTitle: course.title,
    teacherName: course.teacher,
    groupName: course.group,
    statusLabel: course.enrollmentStatusLabel,
  })),
  qrIdentityToken: "stu_qr_mock_7F3K9X2M8Q61ZD",
  qrIssuedAt: "2026-06-01",
  qrStatus: "active",
};
