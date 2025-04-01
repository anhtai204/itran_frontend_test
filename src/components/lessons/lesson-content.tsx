"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare, FileText } from "lucide-react";
import VideoLesson from "./content-type/video-lesson";
import PdfLesson from "./content-type/pdf-lesson";
import AssignmentLesson from "./content-type/assignment-lesson";
import QuizLesson from "./content-type/quiz-lesson";
import SubmissionLesson from "./content-type/submisson-lesson";
import DiscussionLesson from "./content-type/discussion-lesson";

interface LessonContentProps {
  lesson: any; // Using any for simplicity, but should be properly typed in a real app
  courseSlug?: string;
  chapterSlug?: string;
  lessonSlug?: string;
}

export default function LessonContent({
  lesson,
  courseSlug = "",
  chapterSlug = "",
  lessonSlug = "",
}: LessonContentProps) {
  const [notes, setNotes] = useState("");

  // Render content based on lesson type
  const renderContent = () => {
    switch (lesson?.type) {
      case "video":
        return <VideoLesson content={lesson?.content} />;
      case "pdf":
        return <PdfLesson content={lesson?.content} />;
      case "assignment":
        return <AssignmentLesson content={lesson?.content} />;
      case "quiz":
        return (
          <QuizLesson
            content={lesson?.content}
            courseSlug={courseSlug}
            chapterSlug={chapterSlug}
            lessonSlug={lessonSlug}
          />
        );
      case "submission":
        return <SubmissionLesson content={lesson?.content} />;
      case "discussion":
        return <DiscussionLesson content={lesson?.content} />;
      default:
        return <div>Unsupported lesson type</div>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {lesson?.title}
      </h1>

      {renderContent()}

      <Tabs defaultValue="description">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Mô tả
          </TabsTrigger>
          <TabsTrigger value="notes" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Ghi chú
          </TabsTrigger>
          <TabsTrigger value="discussion" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Thảo luận
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="p-4">
          <div className="text-gray-700 dark:text-gray-300">
            <p>{lesson?.content.description}</p>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="p-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ghi chú của bạn..."
            className="w-full h-40 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
          <div className="mt-2 flex justify-end">
            <Button>Lưu ghi chú</Button>
          </div>
        </TabsContent>

        <TabsContent value="discussion" className="p-4">
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
              Tham gia thảo luận
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Chia sẻ suy nghĩ và câu hỏi của bạn với các học viên khác.
            </p>
            <Button className="mt-4">Bắt đầu thảo luận</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
