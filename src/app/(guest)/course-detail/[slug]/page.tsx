"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Users, BarChart, BookOpen, FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Overview } from "@/components/courses/courses-single/overview";
import { Curriculum } from "@/components/courses/courses-single/curriculum";
import { Teacher } from "@/components/courses/courses-single/teacher";
import { FAQs } from "@/components/courses/courses-single/faqs";
import { Reviews } from "@/components/courses/courses-single/reviews";
import { CommentForm } from "@/components/courses/courses-single/component-form";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { sendRequest } from "@/utils/api";
import { useLessonContext } from "./context";

export default function CourseDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = use(params);

  localStorage.setItem("courseSlug", slug);

  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState<boolean>(true);

  const [courseData, setCourseData] = useState<any>(null);

  const fetchCourses = async () => {
    setLoading(true);

    try {
      const resCourses = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses/slug`,
        queryParams: {
          slug: slug,
        },
        method: "GET",
      });
      setCourseData(resCourses?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const courseMetadata = {
    duration: "2 Weeks",
    students: "156 Students",
    level: "All levels",
    category: "Photography",
    lessons: "20 Lessons",
    quizzes: "3 Quizzes",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-900 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm">
                <span>{courseMetadata?.category}</span>
                <span className="mx-2 text-gray-300">by</span>
                <span>{courseData?.teacher?.full_name}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                {courseData?.title}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseMetadata.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{courseMetadata.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span>{courseMetadata.level}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{courseMetadata.lessons}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileCheck className="h-4 w-4" />
                  <span>{courseMetadata.quizzes}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="relative">
                <img
                  src={
                    "/assets/images/" + courseData?.thumbnail_url ||
                    "/assets/images/not_found.jpg"
                  }
                  alt="Course Preview"
                  className="rounded-xl"
                  width={400}
                  height={300}
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="mb-2 text-sm line-through text-gray-400">
                      {courseData?.original_price} VNĐ
                    </span>
                    <span className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {courseData?.price} VNĐ
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
      <div className="container md:max-w-9/12 ml-auto mr-auto mx-auto px-4 py-8">
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
                <Overview overview={courseData?.overview} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="curriculum">
                <Curriculum chapters={courseData?.chapters} courseSlug={slug} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="teacher">
                <Teacher teacher={courseData?.teacher} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="faqs">
                <FAQs faqs={courseData?.faqs} />
                <CommentForm />
              </TabsContent>

              <TabsContent value="reviews">
                <Reviews
                  stats={courseData?.stats}
                  reviews={courseData?.reviews}
                />
                <CommentForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
