"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Clock,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface QuizLessonProps {
  content: {
    questionCount: number;
    timeLimit: string;
    description: string;
    quizSlug: string;
  };
  courseSlug: string;
  chapterSlug: string;
  lessonSlug: string;
  onJoinQuiz: (href: string) => void;
}

export default function QuizLesson({
  content,
  courseSlug,
  chapterSlug,
  lessonSlug,
  onJoinQuiz,
}: QuizLessonProps) {
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-fit space-y-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
        <div className="text-center py-8">
          <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Bài kiểm tra: React Hooks</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Kiểm tra kiến thức của bạn với bài kiểm tra này.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                {content.questionCount} Câu hỏi
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">
                Thời gian: {content.timeLimit}
              </span>
            </div>
          </div>

          {/* <Link href={`/courses/${courseSlug}/study/${content.quizId}`}> */}
          <Button
            className="px-6 py-3"
            onClick={() => onJoinQuiz(window.location.href, content.quizSlug)}
          >
            Bắt đầu làm bài
          </Button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
