"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Bookmark,
  ThumbsUp,
  Facebook,
  Twitter,
  Linkedin,
  LinkIcon,
} from "lucide-react";

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

// Mock data - in a real app, this would come from an API or CMS
const newsArticles = {
  "itach-education-launches-new-ai-learning-path": {
    title: "Itach Education Launches New AI Learning Path",
    content: `
      <p>We are excited to announce the launch of our comprehensive AI Learning Path, designed to take students from the basics of artificial intelligence to advanced applications in various domains.</p>
      
      <p>The AI industry is growing at an unprecedented rate, with demand for skilled professionals far outpacing supply. Our new learning path addresses this gap by providing a structured, hands-on approach to mastering AI concepts and technologies.</p>
      
      <h2>What's Included in the AI Learning Path</h2>
      
      <p>Our curriculum covers everything from foundational mathematics and statistics to cutting-edge deep learning techniques:</p>
      
      <ul>
        <li>Introduction to AI and Machine Learning</li>
        <li>Python for Data Science</li>
        <li>Mathematics for Machine Learning</li>
        <li>Data Preprocessing and Visualization</li>
        <li>Supervised and Unsupervised Learning</li>
        <li>Deep Learning with Neural Networks</li>
        <li>Natural Language Processing</li>
        <li>Computer Vision</li>
        <li>Reinforcement Learning</li>
        <li>AI Ethics and Responsible AI</li>
        <li>Capstone Projects with Industry Partners</li>
      </ul>
      
      <p>Each module combines theoretical knowledge with practical exercises, ensuring students can apply what they learn to real-world problems.</p>
      
      <h2>Industry-Aligned Curriculum</h2>
      
      <p>We've developed this learning path in collaboration with AI experts from leading tech companies to ensure our curriculum aligns with industry needs and practices. Students will work with the same tools and frameworks used in professional environments, making the transition from learning to working seamless.</p>
      
      <p>Upon completion of the learning path, students will have built a portfolio of projects demonstrating their skills to potential employers.</p>
      
      <h2>Flexible Learning Options</h2>
      
      <p>Understanding that our students have different schedules and learning preferences, we offer multiple ways to engage with the AI Learning Path:</p>
      
      <ul>
        <li>Self-paced online learning</li>
        <li>Live virtual classes with instructors</li>
        <li>Hybrid options combining self-study with regular mentorship</li>
        <li>Full-time immersive bootcamp</li>
      </ul>
      
      <p>Enrollment for the AI Learning Path opens next week. Early registrants will receive exclusive access to additional workshops and resources.</p>
      
      <p>Stay tuned for more updates on this exciting new offering!</p>
    `,
    category: "Announcements",
    author: {
      name: "Dr. Sarah Chen",
      role: "Director of AI Curriculum",
      avatar: doof,
    },
    date: "March 15, 2025",
    readTime: "5 min read",
    image: ai1,
    tags: ["AI", "Machine Learning", "Education", "Curriculum"],
    relatedNews: [
      {
        id: "recent-1",
        title: "New Partnership with Tech Industry Leaders",
        excerpt:
          "Itach Education partners with leading tech companies to provide students with real-world experience.",
        category: "Partnerships",
        date: "March 10, 2025",
        image: ai2,
        slug: "new-partnership-with-tech-industry-leaders",
      },
      {
        id: "recent-2",
        title: "Summer Coding Bootcamp Registration Now Open",
        excerpt:
          "Register now for our intensive summer coding bootcamp starting June 2025.",
        category: "Events",
        date: "March 8, 2025",
        image: ai3,
        slug: "summer-coding-bootcamp-registration",
      },
      {
        id: "recent-3",
        title: "Student Success Story: From Beginner to Senior Developer",
        excerpt:
          "Read how our student went from zero coding knowledge to a senior developer position in just 18 months.",
        category: "Success Stories",
        date: "March 5, 2025",
        image: ai4,
        slug: "student-success-story-senior-developer",
      },
    ],
  },
  // Add more articles as needed with the slug as the key
};

interface NewsArticleProps {
  slug: string;
}

export function NewsArticle({ slug }: NewsArticleProps) {
  const router = useRouter();

  // In a real app, fetch the article data based on the slug
  const article = newsArticles[slug as keyof typeof newsArticles];

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        <p className="mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/news")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to News
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-8">
      <div className="max-w-3xl container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => router.push("/news")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
            <span className="mx-2">/</span>
            <span>{article.category}</span>
          </div>

          {/* Article title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {article.author.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{article.date}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readTime}</span>
            </div>

            <Badge className="bg-indigo-600 hover:bg-indigo-700">
              {article.category}
            </Badge>
          </div>

          {/* Featured image */}
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Interaction buttons */}
          <div className="flex flex-wrap justify-between items-center mb-10">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>

          <Separator className="mb-10" />

          {/* Related news */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related News
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.relatedNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.slug}`}
                  className="block group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-40 w-full">
                      <Image
                        src={news.image || "/placeholder.svg"}
                        alt={news.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-indigo-600 hover:bg-indigo-700 text-xs">
                          {news.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {news.title}
                      </h3>

                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{news.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}