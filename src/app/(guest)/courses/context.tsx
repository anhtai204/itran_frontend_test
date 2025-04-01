"use client";
import { sendRequest } from "@/utils/api";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CoursesContextProps {
  courses: any[];
  courses_meta: any;
  course_categories: any[];
  levels: any[];
  course_categories_meta: any;
  teachers: any[];
  teachers_meta: any;
  levels_meta: any;
  loading: boolean;
  isFilterOpen: boolean;
  viewMode: "grid" | "list";
  priceRange: number[];
  selectedCategories: string[];
  selectedteachers: string[];
  selectedRating: number | null;
  selectedLevel: string | null;
  sortOption: string;
  currentPage: number;
  pageSize: number;
  activeFilterCount: number;
  id_teacher_map: Map<string, string>;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  toggleCategory: (categoryId: string) => void;
  toggleTeacher: (teacher_id: string) => void;
  clearFilters: () => void;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
  setViewMode: (viewMode: "grid" | "list") => void;
  setPriceRange: (priceRange: number[]) => void;
  setSelectedCategories: (selectedCategories: string[]) => void;
  setSelectedteachers: (selectedteachers: string[]) => void;
  setSelectedRating: (selectedRating: number | null) => void;
  setSelectedLevel: (selectedLevel: string | null) => void;
  setSortOption: (sortOption: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setCourses: (coursesData: any[]) => void;
  setCoursesMeta: (coursesMetaData: any) => void;
  setCourseCategories: (courseCategoriesData: any[]) => void;
  setLevels: (levelsData: any[]) => void;
  setCourseCategoriesMeta: (courseCategoriesMetaData: any) => void;
  setTeachers: (teachersData: any[]) => void;
  setTeachersMeta: (teachersMetaData: any) => void;
  setLevelsMeta: (levelsMetaData: any) => void;
  setLoading: (loadingData: boolean) => void;
}

const CoursesContext = createContext<CoursesContextProps | undefined>(
  undefined
);

export const CoursesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [courses_meta, setCoursesMeta] = useState<any>(null);
  const [course_categories, setCourseCategories] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);

  const [course_categories_meta, setCourseCategoriesMeta] = useState<any>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teachers_meta, setTeachersMeta] = useState<any>(null);
  const [levels_meta, setLevelsMeta] = useState<any>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedteachers, setSelectedteachers] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("popular");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Toggle teacher selection
  const toggleTeacher = (teacher_id: string) => {
    setSelectedteachers((prev) =>
      prev.includes(teacher_id)
        ? prev.filter((id) => id !== teacher_id)
        : [...prev, teacher_id]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedteachers([]);
    setPriceRange([0, 10000000]);
    setSelectedRating(null);
    setSelectedLevel(null);
  };

  // Count active filters
  const activeFilterCount =
    selectedCategories.length +
    selectedteachers.length +
    (selectedRating ? 1 : 0) +
    (selectedLevel ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 10000000 ? 1 : 0);

  const id_teacher_map = new Map<string, string>(
    teachers.map((teacher) => [teacher.id, teacher.full_name])
  );

  const fetchCourses = async () => {
    setLoading(true);

    try {
      const resCourseCategories = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course-categories`,
        method: "GET",
      });
      setCourseCategories(resCourseCategories?.data?.results || []);
      setCourseCategoriesMeta(resCourseCategories?.data?.meta || null);

      const resTeachers = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/postgres/teacher-count`,
        method: "GET",
      });
      setTeachers(resTeachers?.data?.results || []);
      setTeachersMeta(resTeachers?.data?.meta || null);

      const resLevels = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/course-levels`,
        method: "GET",
      });
      setLevels(resLevels?.data?.results || []);
      setLevelsMeta(resLevels?.data?.meta || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        courses,
        courses_meta,
        course_categories,
        levels,
        course_categories_meta,
        teachers,
        teachers_meta,
        levels_meta,
        loading,
        isFilterOpen,
        viewMode,
        priceRange,
        selectedCategories,
        selectedteachers,
        selectedRating,
        selectedLevel,
        sortOption,
        currentPage,
        pageSize,
        activeFilterCount,
        id_teacher_map,
        searchQuery,
        setSearchQuery,
        toggleCategory,
        toggleTeacher,
        clearFilters,
        setIsFilterOpen,
        setViewMode,
        setPriceRange,
        setSelectedCategories,
        setSelectedteachers,
        setSelectedRating,
        setSelectedLevel,
        setSortOption,
        setCurrentPage,
        setPageSize,
        setCourses,
        setCoursesMeta,
        setCourseCategories,
        setLevels,
        setCourseCategoriesMeta,
        setTeachers,
        setTeachersMeta,
        setLevelsMeta,
        setLoading,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCoursesContext = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonProvider");
  }
  return context;
};
