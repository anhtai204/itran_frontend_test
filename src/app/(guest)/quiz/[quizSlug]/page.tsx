"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import {
  QuizQuestion,
  type Question,
  type Answer,
} from "@/components/quiz/quiz-question";
import { QuizTimer } from "@/components/quiz/quiz-timer";
import { QuizSidebar } from "@/components/quiz/quiz-sidebar";
import { QuizViewToggle } from "@/components/quiz/quiz-view-toggle";
import { QuizNavigation } from "@/components/quiz/quiz-navigation";
import { QuizResult } from "@/components/quiz/quiz-result";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock function to fetch quiz data
async function getQuizData(quizSlug: string) {
  // In a real application, this would fetch from an API
  const quizzes = {
    "hooks-quiz": {
      id: "hooks-quiz",
      title: "Kiểm tra kiến thức về React Hooks",
      description:
        "Bài kiểm tra này sẽ đánh giá hiểu biết của bạn về React Hooks và cách sử dụng chúng.",
      timeLimit: 1200, // 20 minutes in seconds
      passingScore: 70, // 70%
      questions: [
        {
          id: "q1",
          text: "useState Hook được sử dụng để làm gì?",
          type: "single-choice",
          options: [
            "Quản lý state trong functional components",
            "Tạo side effects trong functional components",
            "Tối ưu hóa performance của component",
            "Kết nối với Redux store",
          ],
          correctAnswer: 0,
        },
        {
          id: "q2",
          text: "Những Hook nào là Hook tích hợp sẵn trong React?",
          type: "multiple-choice",
          options: [
            "useState",
            "useEffect",
            "useHistory",
            "useContext",
            "useDispatch",
            "useRef",
          ],
          correctAnswers: [0, 1, 3, 5],
        },
        {
          id: "q3",
          text: "Có thể gọi Hooks bên trong điều kiện if?",
          type: "true-false",
          correctAnswer: false,
        },
        {
          id: "q4",
          text: "Ghép các Hook với mô tả chức năng tương ứng:",
          type: "matching",
          items: [
            {
              id: "item1",
              left: "useState",
              right: "Quản lý state trong component",
            },
            {
              id: "item2",
              left: "useEffect",
              right: "Thực hiện side effects",
            },
            {
              id: "item3",
              left: "useContext",
              right: "Truy cập context",
            },
            {
              id: "item4",
              left: "useRef",
              right: "Lưu trữ giá trị không gây re-render",
            },
          ],
        },
        {
          id: "q5",
          text: "Ghép các logo với framework/thư viện tương ứng:",
          type: "image-matching",
          items: [
            {
              id: "img1",
              leftImage: "/assets/images/React.jpg",
              rightText: "React",
            },
            {
              id: "img2",
              leftImage: "/assets/images/Vue.jpg",
              rightText: "Vue",
            },
            {
              id: "img3",
              leftImage: "/assets/images/Angular.png",
              rightText: "Angular",
            },
            {
              id: "img4",
              leftImage: "/assets/images/svelte.jpg",
              rightText: "Svelte",
            },
          ],
        },
        {
          id: "q6",
          text: "Điền vào chỗ trống để hoàn thành đoạn code sử dụng useState hook: const [#1, #2] = useState(#3)",
          type: "fill-blanks",
          blanks: [
            {
              id: "1",
              correctAnswer: "state",
            },
            {
              id: "2",
              correctAnswer: "setState",
            },
            {
              id: "3",
              correctAnswer: "initialState",
            },
          ],
          options: [
            "state",
            "setState",
            "initialState",
            "value",
            "updateValue",
            "defaultValue",
            "props",
          ],
        },
      ],
    },
  };

  // Wait a bit to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!quizzes[quizSlug]) {
    return null;
  }

  return quizzes[quizSlug];
}

export default function QuizPage({
  params,
}: {
  params: { string; quizSlug: string };
}) {
  const { quizSlug } = use(params);
  const router = useRouter();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [timeGLeft, setTimeGLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);

  // View mode: "single" for one question at a time, "multiple" for all questions
  const [viewMode, setViewMode] = useState<"single" | "multiple">("single");

  // Use a ref to track the current question for cleanup
  const questionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getQuizData(quizSlug);
        setQuizData(data);

        if (data) {
          // Initialize answers array with nulls
          setAnswers(new Array(data.questions.length).fill(null));
          setCorrectAnswers(new Array(data.questions.length).fill(false));
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [quizSlug]);

  // Handle answer selection
  const handleAnswerSelect = (questionIndex: number, answer: Answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Check if an answer is correct
  const isAnswerCorrect = (
    question: Question,
    answer: Answer | null
  ): boolean => {
    if (answer === null) return false;

    switch (question.type) {
      case "single-choice":
        return answer === question.correctAnswer;

      case "multiple-choice": {
        const selectedAnswers = answer as number[];
        const correctAnswers = question.correctAnswers;

        // Check if arrays have the same length and all items match
        return (
          selectedAnswers.length === correctAnswers.length &&
          selectedAnswers.every((a) => correctAnswers.includes(a)) &&
          correctAnswers.every((a) => selectedAnswers.includes(a))
        );
      }

      case "true-false":
        return answer === question.correctAnswer;

      case "matching": {
        const userMatches = answer as Record<string, string>;

        // Check if all matches are correct
        return question.items.every((item) => userMatches[item.id] === item.id);
      }

      case "image-matching": {
        const userMatches = answer as Record<string, string>;

        // Check if all matches are correct
        return question.items.every((item) => userMatches[item.id] === item.id);
      }

      case "fill-blanks": {
        const userAnswers = answer as Record<string, string>;

        // Check if all blanks are filled correctly
        return question.blanks.every(
          (blank) => userAnswers[blank.id] === blank.correctAnswer
        );
      }

      default:
        return false;
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    // Calculate score and mark correct/incorrect answers
    let correctCount = 0;
    const newCorrectAnswers = [...correctAnswers];

    quizData.questions.forEach((question, index) => {
      const isCorrect = isAnswerCorrect(question, answers[index]);
      // console.log(question.correctAnswer === answers[index], isCorrect);
      newCorrectAnswers[index] = isCorrect;
      if (isCorrect) {
        correctCount++;
      }
    });

    setCorrectAnswers(newCorrectAnswers);
    setScore(correctCount);
    setQuizCompleted(true);
    setTimeTaken(quizData.timeLimit - timeGLeft);
  };

  // Handle time up
  const handleTimeUp = () => {
    handleSubmit();
  };

  // Start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  // Review answers
  const reviewAnswers = () => {
    setShowResults(true);
    setCurrentQuestion(0);
  };

  // Toggle view mode
  const toggleViewMode = (mode: "single" | "multiple") => {
    setViewMode(mode);
  };

  // Handle question selection from sidebar
  const handleQuestionSelect = (index: number) => {
    setCurrentQuestion(index);

    // If in multiple view mode, scroll to the selected question
    if (viewMode === "multiple" && questionRefs.current[index]) {
      questionRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Check if all questions have been answered
  const allQuestionsAnswered = answers.every((answer) => answer !== null);

  // Get answered questions indices
  const answeredQuestions = answers
    .map((answer, index) => (answer !== null ? index : -1))
    .filter((index) => index !== -1);

  if (!isMounted) {
    return null; // Prevent hydration errors
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Đang tải bài kiểm tra...
          </p>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">
            Không tìm thấy bài kiểm tra
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Bài kiểm tra bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button className="w-full" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  // Quiz not started yet - show intro screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-4">
                {quizData.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {quizData.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Số câu hỏi
                  </div>
                  <div className="text-xl font-bold">
                    {quizData.questions.length} câu
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Thời gian làm bài
                  </div>
                  <div className="text-xl font-bold">
                    {Math.floor(quizData.timeLimit / 60)} phút
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Điểm đạt
                  </div>
                  <div className="text-xl font-bold">
                    {quizData.passingScore}%
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg p-4 mb-8">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Lưu ý:
                </h3>
                <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-1 text-sm">
                  <li>
                    Bạn không thể tạm dừng bài kiểm tra sau khi đã bắt đầu
                  </li>
                  <li>
                    Đảm bảo bạn có đủ thời gian để hoàn thành bài kiểm tra
                  </li>
                  <li>Bài kiểm tra sẽ tự động nộp khi hết thời gian</li>
                  <li>Bạn cần trả lời tất cả các câu hỏi trước khi nộp bài</li>
                  <li>
                    Bạn có thể chọn xem từng câu hỏi hoặc nhiều câu hỏi cùng lúc
                  </li>
                  <li>
                    Danh sách câu hỏi luôn hiển thị ở bên phải để dễ dàng điều
                    hướng
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={startQuiz}
                  size="lg"
                  className="flex-1 min-h-10"
                >
                  Bắt đầu làm bài
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full flex-1 min-h-10"
                  onClick={() => window.history.back()}
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz completed - show results
  if (quizCompleted && !showResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <QuizResult
            score={score}
            totalQuestions={quizData.questions.length}
            timeTaken={timeTaken}
            onReview={reviewAnswers}
          />
        </div>
      </div>
    );
  }

  // Quiz in progress or reviewing answers
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
            <h1 className="text-xl font-bold">{quizData.title}</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {!quizCompleted && (
                <QuizTimer
                  duration={quizData.timeLimit}
                  onTimeUp={handleTimeUp}
                  isPaused={quizCompleted}
                  setTimeGLeft={setTimeGLeft}
                />
              )}

              <QuizViewToggle viewMode={viewMode} onToggle={toggleViewMode} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {/* Main content area - takes 3/4 of the space on large screens */}
            <div className="lg:col-span-3 p-6 h-full overflow-hidden">
              {viewMode === "single" ? (
                // Single question view
                <div>
                  <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Câu hỏi {currentQuestion + 1} / {quizData.questions.length}
                  </div>

                  <div
                    key={`question-${currentQuestion}`}
                    ref={(el) => {
                      if (el) questionRefs.current[currentQuestion] = el;
                    }}
                  >
                    <QuizQuestion
                      question={quizData.questions[currentQuestion]}
                      currentAnswer={answers[currentQuestion]}
                      onAnswerSelect={(answer) =>
                        handleAnswerSelect(currentQuestion, answer)
                      }
                      showResult={quizCompleted}
                      questionNumber={currentQuestion + 1}
                    />
                  </div>

                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                    showResult={quizCompleted}
                  />
                </div>
              ) : (
                // Multiple questions view
                <div className="space-y-8">
                  <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    Tất cả câu hỏi ({quizData.questions.length})
                  </div>

                  {quizData.questions.map((question, index) => (
                    <div
                      id={`all-question-${question.id}`}
                      key={`questions-${index}`}
                      ref={(el) => {
                        if (el) questionRefs.current[index] = el;
                      }}
                      className={cn(
                        "p-4 border border-gray-200 dark:border-gray-700 rounded-lg",
                        index === currentQuestion && "ring-2 ring-primary"
                      )}
                    >
                      <QuizQuestion
                        question={question}
                        currentAnswer={answers[index]}
                        onAnswerSelect={(answer) =>
                          handleAnswerSelect(index, answer)
                        }
                        showResult={quizCompleted}
                        questionNumber={index + 1}
                      />
                    </div>
                  ))}

                  {!quizCompleted && (
                    <div className="sticky bottom-4 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="font-medium">
                            {answeredQuestions.length}
                          </span>{" "}
                          / {quizData.questions.length} câu đã trả lời
                        </div>

                        <Button onClick={handleSubmit} className="ml-auto">
                          Nộp bài
                        </Button>
                      </div>

                      {!allQuestionsAnswered && (
                        <div className="mt-2 text-amber-600 dark:text-amber-400 text-sm">
                          Bạn cần trả lời tất cả {quizData.questions.length} câu
                          hỏi trước khi nộp bài
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar - takes 1/4 of the space on large screens */}
            <div className="hidden lg:block border-l border-gray-200 dark:border-gray-700 h-full">
              <QuizSidebar
                totalQuestions={quizData.questions.length}
                currentQuestion={currentQuestion}
                answeredQuestions={answeredQuestions}
                allQuestionsAnswered={allQuestionsAnswered}
                correctAnswers={quizCompleted ? correctAnswers : []}
                showResults={quizCompleted}
                onSubmit={handleSubmit}
                onQuestionSelect={handleQuestionSelect}
                viewMode={viewMode}
              />
            </div>
          </div>
        </div>

        {quizCompleted && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại chương học
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
