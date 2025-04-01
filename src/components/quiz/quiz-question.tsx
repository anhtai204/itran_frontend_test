"use client";
import { SingleChoice } from "./question-types/single-choice";
import { MultipleChoice } from "./question-types/multiple-choice";
import { TrueFalse } from "./question-types/true-false";
import { Matching } from "./question-types/matching";
import { ImageMatching } from "./question-types/image-matching";
import { FillBlanks } from "./question-types/fill-banks";

export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "true-false"
  | "matching"
  | "image-matching"
  | "fill-blanks";

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  options: string[];
  correctAnswer?: number;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: string[];
  correctAnswers: number[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correctAnswer: boolean;
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  items: Array<{
    id: string;
    left: string;
    right: string;
  }>;
}

export interface ImageMatchingQuestion extends BaseQuestion {
  type: "image-matching";
  items: Array<{
    id: string;
    leftImage: string;
    rightText: string;
  }>;
}

export interface FillBlanksQuestion extends BaseQuestion {
  type: "fill-blanks";
  blanks: Array<{
    id: string;
    correctAnswer: string;
  }>;
  options: string[];
}

export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | ImageMatchingQuestion
  | FillBlanksQuestion;

export type Answer = number | number[] | boolean | Record<string, string>;

interface QuizQuestionProps {
  question: Question;
  currentAnswer: Answer | null;
  onAnswerSelect: (answer: Answer) => void;
  showResult: boolean;
  questionNumber: number;
}

export function QuizQuestion({
  question,
  currentAnswer,
  onAnswerSelect,
  showResult,
  questionNumber,
}: QuizQuestionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex items-start mb-4">
        <span className="flex items-center justify-center bg-primary/10 text-primary font-medium rounded-full w-8 h-8 mr-3 flex-shrink-0">
          {questionNumber}
        </span>
        <h3 className="text-lg font-medium">{question.text}</h3>
      </div>

      {question.type === "single-choice" && (
        <SingleChoice
          question={question}
          currentAnswer={currentAnswer as number | null}
          onAnswerSelect={onAnswerSelect as (answer: number) => void}
          showResult={showResult}
        />
      )}

      {question.type === "multiple-choice" && (
        <MultipleChoice
          question={question}
          currentAnswers={(currentAnswer as number[]) || []}
          onAnswerSelect={onAnswerSelect as (answers: number[]) => void}
          showResult={showResult}
        />
      )}

      {question.type === "true-false" && (
        <TrueFalse
          question={question}
          currentAnswer={currentAnswer as boolean | null}
          onAnswerSelect={onAnswerSelect as (answer: boolean) => void}
          showResult={showResult}
        />
      )}

      {question.type === "matching" && (
        <Matching
          question={question}
          currentAnswers={currentAnswer as Record<string, string> | null}
          onAnswerSelect={
            onAnswerSelect as (answers: Record<string, string>) => void
          }
          showResult={showResult}
          correctAnswers={question.items.reduce((acc, item) => {
            acc[item.id] = item.id;
            return acc;
          }, {} as Record<string, string>)}
        />
      )}

      {question.type === "image-matching" && (
        <ImageMatching
          question={question}
          currentAnswers={currentAnswer as Record<string, string> | null}
          onAnswerSelect={
            onAnswerSelect as (answers: Record<string, string>) => void
          }
          showResult={showResult}
          correctAnswers={question.items.reduce((acc, item) => {
            acc[item.id] = item.id;
            return acc;
          }, {} as Record<string, string>)}
        />
      )}

      {question.type === "fill-blanks" && (
        <FillBlanks
          question={question}
          currentAnswers={currentAnswer as Record<string, string> | null}
          onAnswerSelect={
            onAnswerSelect as (answers: Record<string, string>) => void
          }
          showResult={showResult}
        />
      )}
    </div>
  );
}
