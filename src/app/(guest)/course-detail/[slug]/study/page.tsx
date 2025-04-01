"use client";

import React, { Suspense, useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import LessonContent from "@/components/lessons/lesson-content";
import LessonSidebar from "@/components/lessons/lesson-sidebar";
import LessonNavigation from "@/components/lessons/lesson-naviagion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizLesson from "@/components/lessons/content-type/quiz-lesson";
import { cn } from "@/lib/utils";
import { sendRequest } from "@/utils/api";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  type: string;
  completed: boolean;
}

interface Chapter {
  id: string;
  slug: string;
  title: string;
  lessons: Lesson[];
}

interface CourseStructure {
  title: string;
  chapters: Chapter[];
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const { slug } = React.use(params);

  const [lessonData, setLessonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [courseStructure, setCourseStructure] = useState();
  const [lessons, setLessons] = useState({});
  const [chapterSlug, setChapterSlug] = useState();
  const [lessonSlug, setLessonSlug] = useState();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  const fetchData = async () => {
    try {
      const resCourses = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course-chapters/course_slug`,
        queryParams: {
          course_slug: slug,
        },
        method: "GET",
      });
      setCourseStructure(resCourses?.data?.courseStructure || []);
      setLessons(resCourses?.data?.lessons || []);
      setChapterSlug(
        resCourses?.data?.courseStructure?.chapters[0]?.slug || []
      );
      setLessonSlug(
        resCourses?.data?.courseStructure?.chapters[0]?.lessons[0]?.slug || []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setJoinQuiz = (href: string, quizSlug: string) => {
    sessionStorage.setItem("hrefBeforeQuiz", href);
    // console.log(sessionStorage.getItem("hrefBeforeQuiz"));
    window.location.href = `http://localhost:3000/quiz/${quizSlug}`;
  };

  const getInitialExpandedState = (initCourseStructure: CourseStructure) => {
    return Object.fromEntries(
      initCourseStructure.chapters.map((chapter) => [
        chapter.slug,
        chapter.slug === chapterSlug, // Only expand the current chapter
      ])
    );
  };

  // Initialize expanded chapters state
  const initialExpandedState = courseStructure
    ? getInitialExpandedState(courseStructure)
    : {};

  const [expandedChapters, setExpandedChapters] =
    useState(initialExpandedState);

  const toggleChapter = (chapterSlug: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterSlug]: !prev[chapterSlug],
    }));
  };

  const handleLessonClick = (chapter: string, lesson: string) => {
    // closeSidebar();
  };

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarIsOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    setSidebarIsOpen(false);
  };

  // Mock function to fetch lesson data
  async function getLessonData(lessonSlug: string) {
    // Wait a bit to simulate network delay
    if (!lessons[lessonSlug]) {
      return null;
    }

    return lessons[lessonSlug];
  }

  useEffect(() => {
    setIsMounted(true);

    const fetchLessons = async () => {
      setIsLoading(true);
      try {
        const lessonResult = await getLessonData(
          lessonSlug as keyof typeof lessons
        );
        setLessonData(lessonResult);
        setExpandedChapters((prev) => ({
          ...prev,
          [chapterSlug]: true,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [chapterSlug, lessonSlug]);

  // if (!isMounted) {
  //   // console.log("Not mounted yet");
  //   return null; // Prevent hydration errors
  // }

  // if (isLoading) {
  //   return <LessonLoading />;
  // }

  // if (!lessonData) {
  //   notFound();
  // }
  return (
    <div className="flex flex-1 relative">
      <LessonSidebar
        chapterSlug={chapterSlug}
        lessonSlug={lessonSlug}
        courseStructure={courseStructure}
        sidebarIsOpen={sidebarIsOpen}
        expandedChapters={expandedChapters}
        setLessonSlug={setLessonSlug}
        setChapterSlug={setChapterSlug}
        setSidebarIsOpen={setSidebarIsOpen}
        toggleChapter={toggleChapter}
      />
      <main className="min-w-max flex-1 p-4 md:p-6 lg:p-8">
        <div className="min-w-max mx-auto">
          <div className="flex flex-col bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-1 relative">
              <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="fixed w-fit h-fit bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 lg:hidden shadow-sm rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden mr-2 cursor-pointer"
                    onClick={toggleSidebar}
                  >
                    <Menu className="h-8 w-8" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </div>
                <div className="max-w-4xl mx-auto">
                  {lessonData?.type === "quiz" ? (
                    <Suspense fallback={<div>Loading quiz...</div>}>
                      <QuizLesson
                        content={lessonData.content}
                        courseSlug={slug}
                        chapterSlug={chapterSlug}
                        lessonSlug={lessonSlug}
                        onJoinQuiz={setJoinQuiz}
                      />
                    </Suspense>
                  ) : (
                    <Suspense fallback={<div>Loading lesson content...</div>}>
                      <LessonContent lesson={lessonData} />
                    </Suspense>
                  )}
                  {/* <LessonNavigation
                prevChapter={lessonData?.prevChapter ?? null}
                nextChapter={lessonData?.nextChapter ?? null}
                nextLesson={lessonData?.nextLesson ?? null}
                prevLesson={lessonData?.prevLesson ?? null}
                // onChangeLesson={handleChangeLesson}
              /> */}
                </div>
              </main>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
