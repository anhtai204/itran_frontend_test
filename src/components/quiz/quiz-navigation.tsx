"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  showResult: boolean;
}

export function QuizNavigation({
  currentQuestion,
  onPrevious,
  onNext,
  onSubmit,
  showResult,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <Button
          onClick={onPrevious}
          variant="outline"
          disabled={currentQuestion === 0}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Câu trước
        </Button>

        <Button onClick={onNext} className="flex items-center gap-1">
          Câu tiếp
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      {!showResult && (
        <Button
          onClick={onSubmit}
          disabled={showResult}
          className="flex items-center gap-1"
        >
          Nộp bài
        </Button>
      )}
    </div>
  );
}
