"use client";

import Link from "next/link";
import { ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LessonHeaderProps {
  courseTitle: string;
  lessonTitle: string;
  courseSlug: string;
  chapterSlug: string;
  chapterTitle: string;
  onMenuToggle?: () => void;
}

export default function LessonHeader({
  courseTitle,
  lessonTitle,
  courseSlug,
  chapterSlug,
  chapterTitle,
  onMenuToggle,
}: LessonHeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link
            href={`/courses/${courseSlug}/${chapterSlug}`}
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 flex items-center mr-4 hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>Quay lại</span>
          </Link>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {courseTitle}
            </div>
            <h1 className="text-lg font-semibold">{lessonTitle}</h1>
          </div>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {chapterTitle}
        </div>
      </div>
    </header>
  );
}
