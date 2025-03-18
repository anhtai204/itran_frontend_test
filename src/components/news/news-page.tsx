"use client";

import { useState } from "react";
import { NewsHero } from "./news-listing/news-hero";
import { NewsGrid } from "./news-listing/news-grid";
import { NewsCategories } from "./news-listing/news-categories";
import { NewsSearch } from "./news-listing/news-search";
import { NewsSidebar } from "./news-listing/news-sidebar";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

// Mock data
const TOTAL_PAGES = 10;

export function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, you would fetch news for the selected page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              News & Updates
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
              Stay updated with the latest news, announcements, and updates from
              Itach Education
            </p>
          </div>
          <div className="w-full md:w-auto flex gap-4">
            <NewsSearch onSearch={handleSearch} />
            <Button
              variant="outline"
              className="md:hidden"
              onClick={toggleFilters}
            >
              <ListFilter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <NewsSidebar
            className={`${showFilters ? "block" : "hidden"} md:block`}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          <div className="flex-1">
            <NewsHero />

            <div className="mt-10">
              <NewsCategories
                selectedCategory={selectedCategory}
                onSelect={handleCategorySelect}
              />

              <NewsGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
              />

              <div className="mt-10 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
