import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter, Star, X, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseCard } from "@/components/courses/courses-listing/course-card";
import { CourseListItem } from "@/components/courses/courses-listing/course-list-item";
import { Pagination } from "../ui/pagination";
import CoursesSearchbar from "./courses-layout/courses-searchbar";
import CoursesSidebar from "./courses-layout/courses-sidebar";
import CoursesPagination from "./courses-layout/courses-pagination";
import { useCoursesContext } from "@/app/(guest)/courses/context";
import { sendRequest } from "@/utils/api";

// Sample data
interface Course {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  teacher_id?: string;
  teacher_name?: string;
  category_id?: string;
  status?: string;
  price?: number;
  duration?: number;
  slug: string;
  assistants_id?: string[];
  original_price?: number;
  featured?: boolean;
  level_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface CourseCategory {
  id: string;
  name: string;
  description?: string;
  count: number;
}

interface Teacher {
  id: string;
  full_name: string;
  count: number;
}

interface Level {
  id: string;
  name: string;
  count: number;
}

interface IProps {
  courses: Course[];
  course_categories: CourseCategory[];
  teachers: Teacher[];
  levels: Level[];
  courses_meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  course_categories_meta: {
    total: number;
  };
  teachers_meta: {
    total: number;
  };
  levels_meta: {
    total: number;
  };
}

export function CourseListing(props: IProps) {
  const {
    courses,
    course_categories,
    teachers,
    levels,
    courses_meta,
    course_categories_meta,
    teachers_meta,
    levels_meta,
  } = props;

  const {
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
    viewMode,
    setViewMode,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    activeFilterCount,
    selectedCategories,
    setSelectedCategories,
    toggleCategory,
    selectedteachers,
    setSelectedteachers,
    toggleTeacher,
    selectedRating,
    setSelectedRating,
    selectedLevel,
    setSelectedLevel,
    id_teacher_map,
    setCourses,
    setCoursesMeta,
    searchQuery,
  } = useCoursesContext();

  const fetchCourses = async () => {
    const resCourses = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/courses`,
      method: "GET",
      queryParams: {
        page: currentPage,
        limit: pageSize,
        select_categories:
          selectedCategories.length > 0
            ? "'" + selectedCategories.join("','") + "'"
            : "",
        select_teachers:
          selectedteachers.length > 0
            ? "'" + selectedteachers.join("','") + "'"
            : "",
        select_level: selectedLevel != null ? "'" + selectedLevel + "'" : "",
        price_from: priceRange[0],
        price_to: priceRange[1],
        rating: selectedRating,
        level: selectedLevel,
        sort_option: sortOption,
        search: searchQuery,
      },
    });
    setCourses(resCourses?.data?.results || []);
    setCoursesMeta(resCourses?.data?.meta || null);
  };

  useEffect(() => {
    fetchCourses();
  }, [
    currentPage,
    pageSize,
    selectedCategories,
    selectedteachers,
    selectedLevel,
    priceRange,
    selectedRating,
    selectedLevel,
    sortOption,
    searchQuery,
  ]);

  return (
    <>
      {/* Course Listing */}
      <div className="lg:w-3/4">
        {/* Desktop Sort and View Options */}
        <div className="hidden lg:flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-600 dark:text-gray-300">
              Showing <span className="font-medium">{courses_meta?.total}</span>{" "}
              results
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : ""
                }
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : ""
                }
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategories.map((categoryId) => {
              const category = course_categories.find(
                (c) => c.id === categoryId
              );
              return category ? (
                <div
                  key={categoryId}
                  className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  <span>Category: {category.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1 hover:bg-transparent"
                    onClick={() => toggleCategory(categoryId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : null;
            })}

            {selectedteachers.map((teacher_id) => {
              const teacher = teachers.find((i) => i.id === teacher_id);
              return teacher ? (
                <div
                  key={teacher_id}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  <span>Teacher: {teacher.full_name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-1 hover:bg-transparent"
                    onClick={() => toggleTeacher(teacher_id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : null;
            })}

            {(priceRange[0] > 0 || priceRange[1] < 10000000) && (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full px-3 py-1 text-sm flex items-center">
                <span>
                  Price: {priceRange[0]} VNĐ - {priceRange[1]} VNĐ
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-transparent"
                  onClick={() => setPriceRange([0, 10000000])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {selectedRating && (
              <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full px-3 py-1 text-sm flex items-center">
                <span>Rating: {selectedRating}+ stars</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-transparent"
                  onClick={() => setSelectedRating(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {selectedLevel && (
              <div className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full px-3 py-1 text-sm flex items-center">
                <span>
                  Level: {levels.find((l) => l.id === selectedLevel)?.name}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-transparent"
                  onClick={() => setSelectedLevel(null)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Course Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(
              (course) => (
                (course.teacher_name = id_teacher_map.get(
                  course.teacher_id || ""
                )),
                (<CourseCard key={course.id} course={course} />)
              )
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <CourseListItem key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}

        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={
              courses_meta?.total % pageSize > 0
                ? courses_meta?.total / pageSize + 1
                : courses_meta?.total / pageSize -
                    ((courses_meta?.total / pageSize) % 1) || 1
            }
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
