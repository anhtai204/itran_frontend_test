import { useState } from "react";
import { Clock, Users, BarChart, BookOpen, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Overview } from "@/components/courses/courses-single/overview";
import { Curriculum } from "@/components/courses/courses-single/curriculum";
import { Teacher } from "@/components/courses/courses-single/teacher";
import { FAQs } from "@/components/courses/courses-single/faqs";
import { Reviews } from "@/components/courses/courses-single/reviews";
import { CommentForm } from "@/components/courses/courses-single/component-form";

// Sample data
const content = `
<p className="text-gray-600 dark:text-gray-300">
LearnPress is a comprehensive LMS Plugin for. This is one of the best LMS Plugins which can be used to easily create & sell courses online. You can create a course curriculum with lessons & quizzes included which is managed with an easy-to-use interface for users. Having this LMS Plugin, now you have a chance to quickly and easily create education, online school, online-course websites with no coding knowledge required.
</p>
<p className="text-gray-600 dark:text-gray-300">
LearnPress is free and always will be, but it is still a premium high-quality LMS Plugin that definitely helps you with making money from your Based LMS. Just try and see how amazing it is. LearnPress online Course is lightweight and super powerful with lots of Add-Ons to empower its core system.How to use <a href="#">LearnPress Add-on for LearnPress?</a>
</p>
<p className="text-gray-600 dark:text-gray-300">
No comments yet! You be the first to comment..
</p>
`;

interface CourseProp {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  teacher_id?: string;
  category?: string;
  level?: string;
  duration?: number;
  price?: number;
  original_price?: number;
}

interface TeacherProp {
  id: string;
  full_name: string;
  avatar_url: string;
  description: string;
  count: number;
}

interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  description: string;
  content_type: string;
  content_url: string;
  duration: string;
  locked: boolean;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  lesson: Lesson;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface CourseDetailProps {
  course: CourseProp;
  teacher: TeacherProp;
  chapter: Chapter;
  faq: {
    result: FAQ[];
    count: number;
  };
}

const CourseDetail = (props: CourseDetailProps) => {
  const { course, teacher, chapter, faq } = props;
  // console.log(">>> course: ", course);
  // console.log(">>> teacher: ", teacher);
  // console.log(">>> chapter: ", chapter);
  // console.log(">>> faq: ", faq);
  // console.log(">>> descript: ", course.description);

  const [activeTab, setActiveTab] = useState("overview");

  const courseMetadata = {
    duration: "2 Weeks",
    students: "156 Students",
    level: "All levels",
    lessons: "20 Lessons",
    quizzes: "3 Quizzes",
    sections: [
      {
        title: "Chapter With Video Content",
        totalLessons: 5,
        totalDuration: "45 Mins",
        lessons: [
          {
            title: "Lessons with video content",
            duration: "12:30",
            preview: true,
            completed: true,
          },
          {
            title: "Lessons with video content",
            duration: "10:05",
            preview: true,
            completed: true,
          },
          {
            title: "Lessons with video content",
            duration: "5:35",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "9:25",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "8:42",
            locked: true,
          },
        ],
      },
      {
        title: "Lessons With Video Content",
        totalLessons: 3,
        totalDuration: "45 Mins",
        lessons: [
          {
            title: "Lessons with video content",
            duration: "12:30",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "10:05",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "2:25",
            locked: true,
          },
        ],
      },
      {
        title: "Lessons With Video Content",
        totalLessons: 5,
        totalDuration: "45 Mins",
        lessons: [
          {
            title: "Lessons with video content",
            duration: "12:30",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "10:05",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "5:35",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "9:25",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "8:42",
            locked: true,
          },
        ],
      },
      {
        title: "Lessons With Video Content",
        totalLessons: 5,
        totalDuration: "45 Mins",
        lessons: [
          {
            title: "Lessons with video content",
            duration: "12:30",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "10:05",
            preview: true,
          },
          {
            title: "Lessons with video content",
            duration: "9:25",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "5:35",
            locked: true,
          },
          {
            title: "Lessons with video content",
            duration: "8:42",
            locked: true,
          },
        ],
      },
    ],
    stats: {
      average: 4.0,
      total: 146,
      distribution: [
        { stars: 5, percentage: 90 },
        { stars: 4, percentage: 5 },
        { stars: 3, percentage: 2 },
        { stars: 2, percentage: 2 },
        { stars: 1, percentage: 1 },
      ],
    },
    reviews: [
      {
        author: "Laura Hipster",
        date: "October 03, 2022",
        rating: 5,
        content:
          "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultricies mi ut eleifend lacus ut. Id sed faucibus bibendum augue id cras porta. At eget euismod cursus non. Molestie dignissim sed vulputat feugiat vel.",
      },
      {
        author: "Laura Hipster",
        date: "October 03, 2022",
        rating: 4,
        content:
          "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultricies mi ut eleifend lacus ut. Id sed faucibus bibendum augue id cras porta. At eget euismod cursus non. Molestie dignissim sed vulputat feugiat vel.",
      },
      {
        author: "Laura Hipster",
        date: "October 03, 2022",
        rating: 5,
        content:
          "Quisque nec non amet quis. Varius tellus justo odio parturient mauris curabitur lorem in. Pulvinar sit ultricies mi ut eleifend lacus ut. Id sed faucibus bibendum augue id cras porta. At eget euismod cursus non. Molestie dignissim sed vulputat feugiat vel.",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-900 to-indigo-800 text-white py-12">
        <div className="max-w-5xl container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs">
                <span>Photography</span>
                <span className="mx-2 text-gray-300">by</span>
                <span>{teacher.full_name}</span>
              </div>

              <h1 className="text-1xl md:text-2xl font-bold">{course.title}</h1>

              <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration || "null"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students || "null"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span>{course.level || "null"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons || "null"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileCheck className="h-4 w-4" />
                  <span>{course.quizzes || "null"}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="relative">
                <img
                  src={"/assets/images/" + course.thumbnail_url}
                  alt="Course Preview"
                  className="rounded-xl"
                  width={400}
                  height={300}
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg line-through text-gray-400">
                      {course.original_price}
                    </span>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {course.price}
                    </span>
                  </div>
                  <Button className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600">
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <TabsTrigger
                value="overview"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="curriculum"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Curriculum
              </TabsTrigger>
              <TabsTrigger
                value="teacher"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Teacher
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                FAQs
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="overview">
                <div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: course.description || content,
                  }}
                ></div>
                {/* <Overview
                  content={
                    course.description ||
                    '<p class="mb-4 whitespace-pre-wrap"><strong>I – Tương Lai Của Công Nghệ</strong>'
                  }
                /> */}
                <CommentForm />
              </TabsContent>

              <TabsContent value="curriculum">
                <Curriculum chapters={chapter} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="teacher">
                <Teacher
                  id={teacher.id}
                  full_name={teacher.full_name}
                  avatar_url={teacher.avatar_url}
                  description={teacher.description}
                  count={teacher.count}
                />
                <CommentForm />
              </TabsContent>

              <TabsContent value="faqs">
                <FAQs faqs={faq.result} count={faq.totalItem} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="reviews">
                <Reviews
                  stats={courseMetadata.stats}
                  reviews={courseMetadata.reviews}
                />
                <CommentForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
export default CourseDetail;
