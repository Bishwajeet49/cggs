import type { NewsItem } from "@/types/common";
import newsData from "../../public/mock-data/news.json";

export function getNews(): NewsItem[] {
  return newsData.news as NewsItem[];
}

export function getLatestNews(limit = 3): NewsItem[] {
  return newsData.news.slice(0, limit) as NewsItem[];
}
