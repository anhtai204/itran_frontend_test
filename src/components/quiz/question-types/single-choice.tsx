"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface SingleChoiceProps {
  question: {
    id: string;
    text: string;
    options: string[];
    correctAnswer?: number;
  };
  currentAnswer: number | null;
  onAnswerSelect: (optionIndex: number) => void;
  showResult: boolean;
}

export function SingleChoice({
  question,
  currentAnswer,
  onAnswerSelect,
  showResult,
}: SingleChoiceProps) {
  // Generate a unique ID for this question instance
  const instanceId = useId();

  return (
    <RadioGroup
      value={currentAnswer !== null ? currentAnswer.toString() : undefined}
      onValueChange={(value) => onAnswerSelect(Number.parseInt(value))}
      className="space-y-3 mt-4"
    >
      {question.options.map((option, index) => {
        const isCorrect = showResult && index === question.correctAnswer;
        const isIncorrect =
          showResult &&
          currentAnswer === index &&
          index !== question.correctAnswer;
        const optionId = `${instanceId}-option-${question.id}-${index}`;

        return (
          <div
            key={optionId}
            className={cn(
              "mt-0 mb-0 flex items-center rounded-md border border-gray-200 dark:border-gray-700",
              isCorrect &&
                "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900",
              isIncorrect &&
                "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900"
            )}
          >
            <RadioGroupItem
              value={index.toString()}
              id={optionId}
              disabled={showResult}
              className="mr-2 ml-2"
            />
            <Label
              htmlFor={optionId}
              className="pt-3 pb-3 inline-block flex-grow cursor-pointer"
            >
              {option}
            </Label>
            {showResult && isCorrect && (
              <span className="mr-3 text-green-600 dark:text-green-400 text-sm font-medium">
                Đáp án đúng
              </span>
            )}
            {showResult && isIncorrect && (
              <span className="mr-3 text-red-600 dark:text-red-400 text-sm font-medium">
                Đáp án sai
              </span>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}
