"use client";

import type React from "react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BlogDetail } from "@/components/blog/blog-detail";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      <BlogDetail />
      <Footer />
    </div>
  );
}
