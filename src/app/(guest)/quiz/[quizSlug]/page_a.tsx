"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/components/quiz/quiz-question_a";
import { QuizTimer } from "@/components/quiz/quiz-timer";
import { QuizNavigation } from "@/components/quiz/quiz-navigation";
import { QuizResult } from "@/components/quiz/quiz-result";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuizSidebar } from "@/components/quiz/quiz-sidebar";
import { QuizViewToggle } from "@/components/quiz/quiz-view-toggle";

// Mock function to fetch quiz data
async function getQuizData(slug: string, chapterSlug: string, quizId: string) {
  // In a real application, this would fetch from an API
  const quizzes = {
    "react-fundamentals": {
      "core-concepts": {
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
                  leftImage: "/assets/images/not_found.jpg",
                  rightText: "React",
                },
                {
                  id: "img2",
                  leftImage: "/assets/images/not_found.jpg",
                  rightText: "Vue",
                },
                {
                  id: "img3",
                  leftImage: "/assets/images/not_found.jpg",
                  rightText: "Angular",
                },
                {
                  id: "img4",
                  leftImage: "/assets/images/not_found.jpg",
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
                  id: "blank-1",
                  correctAnswer: "state",
                },
                {
                  id: "blank-2",
                  correctAnswer: "setState",
                },
                {
                  id: "blank-3",
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
      },
    },
  };

  // Wait a bit to simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    !quizzes[slug] ||
    !quizzes[slug][chapterSlug] ||
    !quizzes[slug][chapterSlug][quizId]
  ) {
    return null;
  }

  return quizzes[slug][chapterSlug][quizId];
}

export default function QuizPage({
  params,
}: {
  params: {
    slug: string;
    chapterSlug: string;
    lessonSlug: string;
    quizId: string;
  };
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const chapterSlug = resolvedParams.chapterSlug;
  const lessonSlug = resolvedParams.lessonSlug;
  const quizId = resolvedParams.quizId;

  // console.log("quiz page: ", slug, chapterSlug, lessonSlug, quizId);

  const router = useRouter();

  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState<"single" | "multiple">("single");

  useEffect(() => {
    setIsMounted(true);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getQuizData(slug, chapterSlug, quizId);
        setQuizData(data);

        if (data) {
          // Initialize answers array with nulls
          setAnswers(new Array(data.questions.length).fill(null));
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug, chapterSlug, quizId]);

  // Handle answer selection
  const handleAnswerSelect = (optionIndex: number, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (viewMode === "single") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    } else {
      if (currentQuestion === 0) {
        setCurrentQuestion(quizData.questions.length / 10);
      } else {
        setCurrentQuestion(currentQuestion - 10);
      }
    }
  };

  // Navigate to next question
  const handleNext = (questionIndex?: number) => {
    if (viewMode === "single") {
      if (typeof questionIndex === "number") {
        setCurrentQuestion(questionIndex);
        return;
      }

      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    } else {
      if (currentQuestion === quizData.questions.length / 10) {
        setCurrentQuestion(0);
      } else {
        setCurrentQuestion(currentQuestion + 10);
      }
    }
  };

  // Handle quiz submission
  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setQuizCompleted(true);
    setTimeTaken(quizData.timeLimit - timeTaken);
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

  const toggleViewMode = (mode: "single" | "multiple") => {
    setViewMode(mode);
    if (mode === "multiple") {
      setCurrentQuestion(currentQuestion - (currentQuestion % 10));
    }
  };

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
          <Link href={`/courses/${slug}/${chapterSlug}`}>
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại chương học
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Quiz not started yet - show intro screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
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
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={startQuiz} size="lg" className="flex-1">
                  Bắt đầu làm bài
                </Button>
                <Link
                  href={`/courses/${slug}/${chapterSlug}`}
                  className="flex-1"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    Quay lại
                  </Button>
                </Link>
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
        <div className="max-w-3xl mx-auto">
          <QuizResult
            score={score}
            totalQuestions={quizData.questions.length}
            timeTaken={timeTaken}
            onReview={reviewAnswers}
            courseSlug={slug}
            chapterSlug={chapterSlug}
            lessonSlug={lessonSlug}
          />
        </div>
      </div>
    );
  }

  // Quiz in progress or reviewing answers
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="mx-auto">
        {showResults && (
          <div className="flex justify-start mb-6">
            <Link href={`/courses/${slug}/${chapterSlug}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại chương học
              </Button>
            </Link>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h1 className="text-xl font-bold">{quizData.title}</h1>
              {!showResults && (
                <QuizTimer
                  duration={quizData.timeLimit}
                  onTimeUp={handleTimeUp}
                  isPaused={quizCompleted}
                />
              )}
            </div>

            <div className="p-6">
              {viewMode === "multiple" && (
                <div className="mb-6">
                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={quizData.questions.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                    answeredQuestions={answers
                      .map((answer, index) => (answer !== null ? index : -1))
                      .filter((index) => index !== -1)}
                    isLastQuestion={
                      currentQuestion === quizData.questions.length - 1
                    }
                    viewMode={viewMode}
                  />
                </div>
              )}
              <QuizQuestion
                questions={quizData.questions}
                currentQuestion={currentQuestion}
                answers={answers}
                onAnswerSelect={handleAnswerSelect}
                showResult={showResults}
                viewMode={viewMode}
              />

              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={quizData.questions.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSubmit={handleSubmit}
                answeredQuestions={answers
                  .map((answer, index) => (answer !== null ? index : -1))
                  .filter((index) => index !== -1)}
                isLastQuestion={
                  currentQuestion === quizData.questions.length - 1
                }
              />
            </div>
          </div>

          <div className="md:w-1/4 bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-6">
            <QuizViewToggle viewMode={viewMode} onToggle={toggleViewMode} />

            <QuizSidebar
              totalQuestions={quizData.questions.length}
              currentQuestion={currentQuestion}
              answeredQuestions={answers
                .map((answer, index) => (answer !== null ? index : -1))
                .filter((index) => index !== -1)}
              correctAnswers={quizData.questions.map(
                (question, index) => question.correctAnswer === answers[index]
              )}
              allQuestionsAnswered={
                answers.filter((answer) => answer !== null).length ===
                quizData.questions.length
              }
              showResults={showResults}
              onSubmit={handleSubmit}
              onQuestionSelect={setCurrentQuestion}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
