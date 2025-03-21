'use client'
import type React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { useParams } from "next/navigation";
import BlogDetail from "@/components/blog/blog-detail/blog-detail";

const BlogPostPage = () => {
  
  const params = useParams();
  const slug = params.slug;

  console.log('>>params: ', params);
  console.log('>>>slug: ', slug);
  console.log('>>>type of slug: ', typeof(slug));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-purple-900 dark:to-gray-800">
      <Header />
      <BlogDetail slug={slug}/>
      <Footer />
    </div>
  );
}

export default BlogPostPage;
