"use client";

import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  onReview: () => void;
}

export function QuizResult({
  score,
  totalQuestions,
  timeTaken,
  onReview,
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= 70; // Assuming 70% is passing score

  // Format time taken as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} phút ${remainingSeconds} giây`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center mb-8">
          {isPassed ? (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
          )}

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {isPassed ? "Chúc mừng!" : "Rất tiếc!"}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-center">
            {isPassed
              ? "Bạn đã hoàn thành bài kiểm tra thành công."
              : "Bạn chưa đạt điểm yêu cầu. Hãy ôn tập lại và thử lại sau."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Điểm số
            </div>
            <div className="text-xl font-bold">
              {score}/{totalQuestions} ({percentage}%)
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Thời gian
            </div>
            <div className="text-xl font-bold flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(timeTaken)}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Trạng thái
            </div>
            <div
              className={`text-xl font-bold ${
                isPassed
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {isPassed ? "Đạt" : "Chưa đạt"}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onReview} size="lg" className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Xem lại bài làm
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full flex-1"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    </div>
  );
}
