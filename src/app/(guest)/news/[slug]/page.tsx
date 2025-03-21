import type { Metadata } from "next";
import { NewsArticle } from "@/components/news/news-single/news-article";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

// This would typically come from a CMS or API
export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  // In a real app, fetch the news article data based on the slug
  return {
    title: `News Article | Itach Education`,
    description: "Latest news and updates from Itach Education",
  };
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  return (
    <>
      <Header />
      <NewsArticle slug={params.slug} />
      <Footer />
    </>
  );
}