"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogMain } from "@/components/blog/blogs";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      <BlogMain />
      <Footer />
    </div>
  );
}
