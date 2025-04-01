"use client";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ChapterProvider } from "./context";

const CourseDetailLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default CourseDetailLayout;
