"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Calendar,
  Award,
} from "lucide-react";

interface AssignmentLessonProps {
  content: {
    instructions: string;
    dueDate: string;
    points: number;
    description: string;
  };
}

export default function AssignmentLesson({ content }: AssignmentLessonProps) {
  const [notes, setNotes] = useState("");

  // Format the due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Due: {formatDueDate(content.dueDate)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Points: {content.points}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>{content.instructions}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Submission</h3>
            <div className="flex flex-col space-y-4">
              <button className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Start Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
