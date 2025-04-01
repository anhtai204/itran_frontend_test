"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  FileText,
  Video,
  MessageSquare,
  FileQuestion,
  Upload,
  BookOpen,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { notFound } from "next/navigation";

interface lessonSidebarProps {
  chapterSlug: string;
  lessonSlug: string;
  courseStructure: any;
  sidebarIsOpen: boolean;
  expandedChapters: Record<string, boolean>;
  setLessonSlug: (slug: string) => void;
  setChapterSlug: (slug: string) => void;
  setSidebarIsOpen: (isOpen: boolean) => void;
  toggleChapter: (slug: string) => void;
}

export default function LessonSidebar({
  chapterSlug,
  lessonSlug,
  courseStructure,
  sidebarIsOpen,
  expandedChapters,
  setLessonSlug,
  setChapterSlug,
  setSidebarIsOpen,
  toggleChapter,
}: lessonSidebarProps) {
  // if (!courseStructure) {
  //   notFound();
  // }

  const setSlug = (chapterSlug: string, lessonSlug: string) => {
    setChapterSlug(chapterSlug);
    setLessonSlug(lessonSlug);
  };

  const onLessonClick = (chapterSlug: string, lessonSlug: string) => {
    setSlug(chapterSlug, lessonSlug);
  };

  const getLessonIcon = (type: string) => {
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

  const onClose = () => {
    setSidebarIsOpen(false);
  };

  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") {
  //       onClose();
  //     }
  //   };
  // }, [chapterSlug, lessonSlug]);

  return (
    <aside
      className={cn(
        "h-full lg:block w-full md:w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-y-auto",
        "fixed lg:relative top-0 left-0 z-40 h-full transition-transform duration-300 ease-in-out",
        sidebarIsOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
        <h2 className="font-semibold text-lg">Nội dung khóa học</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 h-screen overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4 hidden md:block">
          {courseStructure?.title}
        </h2>

        {courseStructure?.chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4">
            <button
              onClick={() => toggleChapter(chapter.slug)}
              className="flex items-center justify-between w-full text-left font-medium py-2 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span>{chapter.title}</span>
              {expandedChapters[chapter.slug] ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedChapters[chapter.slug] && (
              <ul className="mt-1 space-y-1 pl-2">
                {chapter.lessons.map((lesson) => {
                  const isActive = lesson.slug === lessonSlug;

                  return (
                    <li key={lesson.id}>
                      <div
                        className={cn(
                          "flex items-center py-2 px-2 rounded-md text-sm",
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                        onClick={() =>
                          onLessonClick &&
                          onLessonClick(chapter.slug, lesson.slug)
                        }
                      >
                        <span className="mr-2 flex-shrink-0">
                          {getLessonIcon(lesson.type)}
                        </span>
                        <span className="flex-grow truncate">
                          {lesson.title}
                        </span>
                        <span className="ml-2 flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600" />
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
