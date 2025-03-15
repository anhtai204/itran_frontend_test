import { useState } from "react";

import Link from "next/link";
import { Search, Calendar, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-listing/blog-card";

import ani from "@/assets/images/ani.png";
import ai from "@/assets/images/ai.webp";
import doof from "@/assets/images/doof.jpg";
import earth from "@/assets/images/earth.png";
import hnue from "@/assets/images/hnue.jpg";
import meme from "@/assets/images/meme.jpg";
import meme1 from "@/assets/images/meme1.jpg";

import ai1 from "@/assets/images/ai1.jpg";
import ai2 from "@/assets/images/ai2.jpg";
import ai3 from "@/assets/images/ai3.jpg";
import ai4 from "@/assets/images/ai4.jpg";
import ai5 from "@/assets/images/ai5.jpg";
import ai6 from "@/assets/images/ai6.png";
import ai7 from "@/assets/images/ai7.png";
import ai8 from "@/assets/images/ai8.webp";
import ai9 from "@/assets/images/ai9.webp";
import Image from "next/image";

// Sample categories
const categories = [
  { name: "All", count: 42 },
  { name: "Education Technology", count: 15 },
  { name: "E-Learning", count: 12 },
  { name: "Corporate Training", count: 8 },
  { name: "Online Courses", count: 7 },
];

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Learning Management Systems in 2023",
    excerpt:
      "Discover the best practices, trends, and tools for implementing a successful Learning Management System in your organization.",
    image: ai1,
    author: "Jane Smith",
    authorAvatar: doof,
    publishedAt: "2023-06-15",
    readTime: "8 min read",
    categories: ["Education Technology", "E-Learning"],
    slug: "ultimate-guide-learning-management-systems",
  },
  {
    id: 2,
    title: "10 Best Practices for Online Course Creation",
    excerpt:
      "Learn how to create engaging and effective online courses that keep students coming back for more.",
    image: ai2,
    author: "John Doe",
    authorAvatar: doof,
    publishedAt: "2023-05-20",
    readTime: "6 min read",
    categories: ["E-Learning", "Online Courses"],
    slug: "best-practices-online-course-creation",
  },
  {
    id: 3,
    title: "The Future of E-Learning: Trends to Watch in 2023",
    excerpt:
      "Discover the emerging trends that are shaping the future of online education and e-learning.",
    image: ai3,
    author: "Emily Johnson",
    authorAvatar: doof,
    publishedAt: "2023-06-05",
    readTime: "5 min read",
    categories: ["Education Technology", "E-Learning"],
    slug: "future-of-elearning-trends",
  },
  {
    id: 4,
    title: "How to Choose the Right LMS for Your Organization",
    excerpt:
      "A step-by-step guide to evaluating and selecting the perfect Learning Management System for your specific needs.",
    image: ai4,
    author: "Robert Wilson",
    authorAvatar: doof,
    publishedAt: "2023-06-10",
    readTime: "7 min read",
    categories: ["Corporate Training", "Education Technology"],
    slug: "choose-right-lms-organization",
  },
  {
    id: 5,
    title: "The Role of AI in Modern Education",
    excerpt:
      "Exploring how artificial intelligence is transforming the educational landscape and what it means for students and educators.",
    image: ai5,
    author: "Sarah Williams",
    authorAvatar: doof,
    publishedAt: "2023-06-12",
    readTime: "9 min read",
    categories: ["Education Technology", "E-Learning"],
    slug: "role-of-ai-in-modern-education",
  },
  {
    id: 6,
    title: "Building a Successful Corporate Training Program",
    excerpt:
      "Learn the key components of effective corporate training programs and how to implement them in your organization.",
    image: ai6,
    author: "Michael Johnson",
    authorAvatar: doof,
    publishedAt: "2023-06-08",
    readTime: "10 min read",
    categories: ["Corporate Training"],
    slug: "building-successful-corporate-training-program",
  },
];

// Featured post
const featuredPost = {
  id: 7,
  title: "The Complete Guide to Blended Learning: Strategies for Success",
  excerpt:
    "Blended learning combines traditional classroom methods with online educational materials. This comprehensive guide explores effective strategies for implementing blended learning in various educational settings.",
  image: ai1,
  author: "David Thompson",
  authorAvatar: doof,
  publishedAt: "2023-06-18",
  readTime: "12 min read",
  categories: ["Education Technology", "E-Learning", "Corporate Training"],
  slug: "complete-guide-blended-learning",
};

export function BlogMain() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on selected category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.categories.includes(selectedCategory);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="bg-gradient-to-b from-purple-900 to-indigo-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Insights, tips, and resources to help you succeed in your
            educational journey
          </p>

          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search articles..."
                className="pl-10 pr-4 py-6 rounded-full text-gray-800 dark:text-white dark:bg-gray-700 border-0 shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={
                selectedCategory === category.name ? "default" : "outline"
              }
              className={`rounded-full ${
                selectedCategory === category.name
                  ? "bg-gradient-to-r from-purple-600 to-indigo-500"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-500">
                    Featured
                  </Badge>
                </div>
                <div className="p-6 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredPost.categories.map((category, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Image
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {featuredPost.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{featuredPost.publishedAt}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {filteredPosts.length > 0 ? (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="w-10 h-10 p-0 rounded-full"
                disabled
              >
                &lt;
              </Button>
              <Button
                variant="default"
                className="w-10 h-10 p-0 rounded-full bg-purple-600 hover:bg-purple-700"
              >
                1
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                2
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                3
              </Button>
              <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                &gt;
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No articles found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <Button
              className="mt-4 rounded-full"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Get the latest articles, resources, and updates delivered straight
            to your inbox.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Your email address"
              className="rounded-full bg-white/20 border-transparent placeholder-white/70 text-white"
            />
            <Button className="rounded-full bg-white text-purple-600 hover:bg-purple-50">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
