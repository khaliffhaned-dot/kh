export type ModuleId =
  | "overview"
  | "feed"
  | "sentiment"
  | "amec"
  | "roi"
  | "kol"
  | "crisis"
  | "competitor"
  | "media";

export type SentimentKey = "positive" | "neutral" | "negative";

export type PlatformKey =
  | "all"
  | "facebook"
  | "x"
  | "tiktok"
  | "instagram"
  | "youtube"
  | "news"
  | "forum"
  | "whatsapp";

export interface FeedItem {
  platformKey: Exclude<PlatformKey, "all">;
  platform: string;
  handle: string;
  language: string;
  text: string;
  sentimentKey: SentimentKey;
  sentimentLabel: string;
  metric: string;
  timeAgo: string;
}
