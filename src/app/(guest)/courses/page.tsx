"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CourseListing } from "@/components/courses/courses";
import { sendRequest } from "@/utils/api";
import CoursesLoading from "./loading";
import { useCoursesContext } from "./context";

const CoursesPage = () => {
  const {
    courses,
    courses_meta,
    course_categories,
    levels,
    course_categories_meta,
    teachers,
    teachers_meta,
    levels_meta,
    loading,
    setCourses,
    setCoursesMeta,
    setCourseCategories,
    setLevels,
    setCourseCategoriesMeta,
    setTeachers,
    setTeachersMeta,
    setLevelsMeta,
    setLoading,
  } = useCoursesContext();

  return (
    <>
      {loading ? (
        <CoursesLoading />
      ) : (
        <CourseListing
          courses={courses}
          course_categories={course_categories}
          teachers={teachers}
          levels={levels}
          courses_meta={courses_meta}
          course_categories_meta={course_categories_meta}
          teachers_meta={teachers_meta}
          levels_meta={levels_meta}
        />
      )}
    </>
  );
};

export default CoursesPage;
