"use client";

import { useCoursesContext } from "@/app/(guest)/courses/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CoursesSearchbar = () => {
  const { setSearchQuery } = useCoursesContext();
  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-800 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Explore Our Courses
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Discover thousands of courses to help you grow your skills and advance
          your career
        </p>

        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              id="search_input"
              placeholder="Search for courses..."
              className="pl-10 pr-4 py-6 rounded-full text-gray-800 bg-white dark:text-white dark:bg-gray-300 border-0 shadow-lg"
            />
            <Button
              onClick={() =>
                setSearchQuery(document.getElementById("search_input")?.value)
              }
              className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoursesSearchbar;
