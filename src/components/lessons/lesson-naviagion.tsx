import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLessonContext } from "@/app/(guest)/course-detail/[slug]/study/context";

interface LessonNavigationProps {
  prevChapter: string | null;
  nextChapter: string | null;
  prevLesson: string | null;
  nextLesson: string | null;
  // onChangeLesson: (chapter: string, lesson: string) => void;
}

export default function LessonNavigation({
  prevChapter,
  nextChapter,
  prevLesson,
  nextLesson,
}: // onChangeLesson,
LessonNavigationProps) {
  const { setChapterSlug, setLessonSlug } = useLessonContext();
  const onChangeLesson = (chapterSlug: string, lessonSlug: string) => {
    setChapterSlug(chapterSlug);
    setLessonSlug(lessonSlug);
  };
  return (
    <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-6 flex justify-between">
      <div>
        {prevLesson && (
          <div
            // href={`/courses/${courseSlug}/${lessonSlug}/${prevLesson}`}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            onClick={() =>
              onChangeLesson &&
              prevChapter &&
              prevLesson &&
              onChangeLesson(prevChapter, prevLesson)
            }
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Bài trước
              </div>
              <div className="font-medium">Quay lại</div>
            </div>
          </div>
        )}
      </div>

      <div>
        {nextLesson && (
          <div
            // href={`/courses/${courseSlug}/${lessonSlug}/${nextLesson}`}
            className="flex items-center text-right text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            onClick={() =>
              onChangeLesson &&
              nextChapter &&
              nextLesson &&
              onChangeLesson(nextChapter, nextLesson)
            }
          >
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Bài tiếp theo
              </div>
              <div className="font-medium">Tiếp tục</div>
            </div>
            <ChevronRight className="h-5 w-5 ml-2" />
          </div>
        )}
      </div>
    </div>
  );
}
