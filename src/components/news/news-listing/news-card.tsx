import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  image: string;
  slug: string;
}

interface NewsCardProps {
  news: NewsItem;
}

export function NewsCard({ news }: NewsCardProps) {
  return (
    <Link href={`/news/${news.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative h-48 w-full">
          <Image
            src={news.image || "/placeholder.svg"}
            alt={news.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-indigo-600 hover:bg-indigo-700">
              {news.category}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2 line-clamp-2">
            {news.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {news.excerpt}
          </p>

          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{news.date}</span>
            {news.readTime && (
              <>
                <Clock className="h-4 w-4 mr-1" />
                <span>{news.readTime}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}