import Link from "next/link";
import { Star, Clock, Users, BarChart } from "lucide-react";
import { Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface CourseProps {
  course: {
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
  };
}
export function CourseListItem({ course }: CourseProps) {
  const discount = Math.round(
    ((course?.original_price - course?.price) / course.original_price) * 100
  );

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        course.featured ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-1/3">
          <img
            src={
              "./assets/images/" + course.thumbnail_url ||
              "./assets/images/not_found.jpg"
            }
            alt={course.title}
            className="w-full h-48 md:h-full object-cover"
          />
          {course.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-indigo-500">
              Featured
            </Badge>
          )}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded">
            {discount}% OFF
          </div>
        </div>

        <div className="p-5 md:w-2/3 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-0.5 rounded">
              {course.category}
            </span>
            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded">
              {course.level}
            </span>
          </div>

          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2">
            {course.title}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            by {course.instructor}
          </p>

          <div className="flex items-center mb-3">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(course.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {course.rating}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              ({course.reviewCount} reviews)
            </span>
          </div>

          <div className="text-xs flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>2 Weeks</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>156 Students</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>{course.level}</span>
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ${course.price}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                ${course.originalPrice}
              </span>
            </div>

            <Link href={`/course-detail/${course.slug}`}>
              <Button className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600">
                View Course
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
