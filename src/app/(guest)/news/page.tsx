import type { Metadata } from "next";
import { NewsPage } from "@/components/news/news-page";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export const metadata: Metadata = {
  title: "News | Itach Education",
  description:
    "Stay updated with the latest news and announcements from Itach Education",
};

export default function News() {
  return (
    <>
      <Header />
      <NewsPage />
      <Footer />
    </>
  );
}