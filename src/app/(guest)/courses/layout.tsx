import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { CoursesProvider, useCoursesContext } from "./context";
import CoursesSearchbar from "@/components/courses/courses-layout/courses-searchbar";
import CoursesSidebar from "@/components/courses/courses-layout/courses-sidebar";

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      <CoursesProvider>
        <CoursesSearchbar />
        {/* Main Content */}
        <div className="max-w-5xl container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <CoursesSidebar />
            {children}
          </div>
        </div>
      </CoursesProvider>
      <Footer />
    </div>
  );
};
export default CoursesLayout;
