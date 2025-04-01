"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Filter, Grid, List, Star, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCoursesContext } from "@/app/(guest)/courses/context";
import { useEffect } from "react";

const CoursesSidebar = () => {
  const {
    sortOption,
    viewMode,
    activeFilterCount,
    course_categories,
    teachers,
    levels,
    selectedCategories,
    selectedteachers,
    selectedLevel,
    priceRange,
    selectedRating,
    isFilterOpen,
    courses_meta,
    setPageSize,
    setSortOption,
    setViewMode,
    setSelectedRating,
    setSelectedLevel,
    setPriceRange,
    toggleCategory,
    toggleTeacher,
    clearFilters,
    setIsFilterOpen,
  } = useCoursesContext();

  useEffect(() => {
    if (viewMode === "grid") {
      setPageSize(9);
    } else {
      setPageSize(5);
    }
  }, [viewMode]);

  return (
    <>
      {/* Filter Sidebar - Mobile Toggle */}
      <div className="lg:hidden flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {activeFilterCount}
            </span>
          )}
        </Button>

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

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className={`lg:w-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6 ${
          isFilterOpen ? "block" : "hidden lg:block"
        } ${
          isFilterOpen
            ? "fixed inset-0 z-40 overflow-auto lg:static lg:z-0"
            : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filters</h2>
          {isFilterOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
          {activeFilterCount > 0 && (
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-purple-600 dark:text-purple-400 p-0 h-auto"
            >
              Clear all
            </Button>
          )}
        </div>

        <Accordion
          type="multiple"
          defaultValue={["category", "teacher", "price", "rating", "level"]}
          className="space-y-4"
        >
          {/* Category Filter */}
          <AccordionItem
            value="category"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-base font-medium py-2">
              Course Category
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {course_categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <label
                      htmlFor={`${category.id}`}
                      className="text-sm flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{category.name}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        ({category.count})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Teacher Filter */}
          <AccordionItem
            value="teacher"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-base font-medium py-2">
              Teachers
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${teacher.id}`}
                      checked={selectedteachers.includes(teacher.id)}
                      onCheckedChange={() => toggleTeacher(teacher.id)}
                    />
                    <label
                      htmlFor={`${teacher.id}`}
                      className="text-sm flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{teacher.full_name || "<null>"}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        ({teacher.count})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Filter */}
          <AccordionItem
            value="price"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-base font-medium py-2">
              Price
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                <Slider
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                    <span className="text-sm">{priceRange[0]} VNĐ</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-1">
                    <span className="text-sm">{priceRange[1]} VNĐ</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating Filter */}
          <AccordionItem
            value="rating"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-base font-medium py-2">
              Rating
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={selectedRating?.toString() || ""}
                onValueChange={(value) =>
                  setSelectedRating(Number.parseInt(value) || null)
                }
              >
                <div className="space-y-2 pt-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={rating.toString()}
                        id={`${rating}`}
                      />
                      <label
                        htmlFor={`${rating}`}
                        className="text-sm flex items-center cursor-pointer"
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2">
                          {rating === 5 ? "& up" : `& up`}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          {/* Level Filter */}
          <AccordionItem
            value="level"
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <AccordionTrigger className="text-base font-medium py-2">
              Level
            </AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={selectedLevel || ""}
                onValueChange={setSelectedLevel}
              >
                <div className="space-y-2 pt-2">
                  {levels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.id} id={`${level.id}`} />
                      <label
                        htmlFor={`${level.id}`}
                        className="text-sm flex-1 flex justify-between items-center cursor-pointer"
                      >
                        <span>{level.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          ({level.count})
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {isFilterOpen && (
          <div className="mt-6 lg:hidden">
            <Button
              className="w-full rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600"
              onClick={() => setIsFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
export default CoursesSidebar;
