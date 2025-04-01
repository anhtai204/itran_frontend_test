import Link from "next/link";
import {
  ChevronRight,
  Clock,
  FileText,
  BookOpen,
  Video,
  MessageSquare,
  Upload,
  FileQuestion,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  type: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  lessons: Lesson[];
}

export function Curriculum({
  chapters,
  courseSlug,
  setChapterSlug,
  setLessonSlug,
}: {
  chapters: Chapter;
  courseSlug: string;
  setChapterSlug: (slug: string) => void;
  setLessonSlug: (slug: string) => void;
}) {
  const onViewClick = (chapterSlug: string, lessonSlug: string) => {
    setChapterSlug(chapterSlug);
    setLessonSlug(lessonSlug);
    window.location.href = `/course-detail/${courseSlug}/study`;
  };

  // Function to get the appropriate icon for each lesson type
  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "assignment":
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case "quiz":
        return <FileQuestion className="h-4 w-4 text-yellow-500" />;
      case "submission":
        return <Upload className="h-4 w-4 text-purple-500" />;
      case "discussion":
        return <MessageSquare className="h-4 w-4 text-indigo-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center w-full text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">3</span>{" "}
          chapters •{" "}
          <span className="font-medium text-gray-900 dark:text-white">12</span>{" "}
          lessons •{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            4h 15m
          </span>{" "}
          total length
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["1"]} className="space-y-4">
        {chapters.map((chapter) => (
          <AccordionItem
            key={chapter.id}
            value={chapter.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full text-left">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {chapter.description}
                  </p>
                </div>
                <div className="flex items-center mt-2 md:mt-0">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
                    {chapter.duration}
                  </span>
                  <div className="w-24 md:w-32">
                    <Progress value={chapter.progress} className="h-2" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    {chapter.progress}%
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 py-2 space-y-1">
                {chapter.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/course-detail/${courseSlug}/study`}
                    className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                          lesson.completed
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        {getLessonTypeIcon(lesson.type)}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-medium ${
                            lesson.completed
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {lesson.title}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                        {lesson.duration}
                      </span>
                      {lesson.completed ? (
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">
                          Completed
                        </span>
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                {/* <Link href={`/courses/${courseSlug}/study`}> */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    onViewClick(chapter.slug, chapters.lessons[0].slug)
                  }
                >
                  View Chapter
                </Button>
                {/* </Link> */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
