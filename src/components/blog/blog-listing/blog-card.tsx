import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "../../ui/badge";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    image: StaticImport;
    author: string;
    authorAvatar: string;
    publishedAt: string;
    readTime: string;
    categories: string[];
    slug: string;
  };
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="relative">
          <Image
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
              >
                {category}
              </Badge>
            ))}
          </div>

          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <img
                src={post.authorAvatar || "/assets/images/not_found.jpg"}
                alt={post.author}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {post.author}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{post.publishedAt}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
