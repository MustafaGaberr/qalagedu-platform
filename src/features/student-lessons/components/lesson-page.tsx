import type { StudentLessonDetails } from "@/features/student-lessons/types/lessons";

import { LessonAssessmentCard } from "./lesson-assessment-card";
import { LessonContent } from "./lesson-content";
import { LessonCurriculumNavigator } from "./lesson-curriculum-navigator";
import { LessonHeader } from "./lesson-header";
import { LessonNotes } from "./lesson-notes";
import { LessonPlayer } from "./lesson-player";
import { LessonPrevNextNavigation } from "./lesson-prev-next-navigation";
import { LessonResources } from "./lesson-resources";

type LessonPageProps = {
  lesson: StudentLessonDetails;
};

export function LessonPage({ lesson }: LessonPageProps) {
  return (
    <div className="flex flex-col gap-5 lg:gap-6">
      <LessonHeader lesson={lesson} />
      <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start">
        <div className="flex min-w-0 flex-col gap-5 overflow-hidden">
          <LessonPlayer lesson={lesson} />
          <LessonPrevNextNavigation
            previousLesson={lesson.previousLesson}
            nextLesson={lesson.nextLesson}
          />
          <LessonContent lesson={lesson} />
          <LessonResources resources={lesson.resources} />
        </div>
        <div className="flex min-w-0 flex-col gap-5 xl:sticky xl:top-24">
          <LessonCurriculumNavigator
            modules={lesson.curriculum}
            currentLessonId={lesson.id}
          />
          <LessonAssessmentCard assessment={lesson.assessment} />
          <LessonNotes placeholder={lesson.studentNotesPlaceholder} />
        </div>
      </div>
    </div>
  );
}
