"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Calendar,
  Upload,
  Github,
  Code,
} from "lucide-react";

interface SubmissionLessonProps {
  content: {
    assignmentTitle: string;
    dueDate: string;
    description: string;
  };
}

export default function SubmissionLesson({ content }: SubmissionLessonProps) {
  const [notes, setNotes] = useState("");
  const [submissionType, setSubmissionType] = useState<
    "file" | "github" | "text"
  >("file");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [textSubmission, setTextSubmission] = useState("");

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
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {content.assignmentTitle}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>{content.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Submit Your Assignment</h3>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setSubmissionType("file")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  submissionType === "file"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Upload className="h-4 w-4 mr-2" />
                File Upload
              </button>
              <button
                onClick={() => setSubmissionType("github")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  submissionType === "github"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub Link
              </button>
              <button
                onClick={() => setSubmissionType("text")}
                className={`flex items-center px-4 py-2 rounded-md ${
                  submissionType === "text"
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Code className="h-4 w-4 mr-2" />
                Text Submission
              </button>
            </div>

            {submissionType === "file" && (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                {fileUploaded ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      File uploaded successfully!
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      assignment.zip (2.4 MB)
                    </p>
                    <button
                      onClick={() => setFileUploaded(false)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Supports: ZIP, PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                    </p>
                    <button
                      onClick={() => setFileUploaded(true)}
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Browse Files
                    </button>
                  </>
                )}
              </div>
            )}

            {submissionType === "github" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="github-url"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    GitHub Repository URL
                  </label>
                  <input
                    id="github-url"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please ensure your repository is public or you have added your
                  instructor as a collaborator.
                </p>
              </div>
            )}

            {submissionType === "text" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="text-submission"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Submission
                  </label>
                  <textarea
                    id="text-submission"
                    value={textSubmission}
                    onChange={(e) => setTextSubmission(e.target.value)}
                    placeholder="Enter your code or text submission here..."
                    className="w-full h-60 p-3 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  ></textarea>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
