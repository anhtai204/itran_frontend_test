"use client";

import { Button } from "@/components/ui/button";

// Mock data
const categories = [
  { id: "all", name: "All News" },
  { id: "announcements", name: "Announcements" },
  { id: "events", name: "Events" },
  { id: "partnerships", name: "Partnerships" },
  { id: "success-stories", name: "Success Stories" },
  { id: "updates", name: "Updates" },
  { id: "webinars", name: "Webinars" },
];

interface NewsCategoriesProps {
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function NewsCategories({
  selectedCategory,
  onSelect,
}: NewsCategoriesProps) {
  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.id ||
              (category.id === "all" && !selectedCategory)
                ? "default"
                : "outline"
            }
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => onSelect(category.id === "all" ? null : category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
