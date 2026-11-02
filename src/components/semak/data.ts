import type { FeedItem, ModuleId, PlatformKey, SentimentKey } from "./types";

export const MODULE_META: Record<ModuleId, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Campaign performance at a glance" },
  feed: {
    title: "Media & Social Listening",
    subtitle: "Real-time mentions across Malaysian & regional channels",
  },
  sentiment: {
    title: "Sentiment Analysis",
    subtitle: "How audiences feel, by platform and language",
  },
  amec: {
    title: "AMEC / Barcelona Principles Reporting",
    subtitle: "Outcome-based measurement, mapped to objectives",
  },
  roi: {
    title: "PR Value & ROI Calculator",
    subtitle: "Outcome-based value, not advertising equivalency",
  },
  kol: { title: "Influencer & KOL Tracking", subtitle: "Key voices amplifying the campaign" },
  crisis: {
    title: "Crisis & Spike Alerts",
    subtitle: "Anomaly detection across monitored sources",
  },
  competitor: {
    title: "Competitor Benchmarking",
    subtitle: "Share of voice vs. industry events",
  },
  media: {
    title: "Journalist & Media Contacts",
    subtitle: "Relationship status across key Malaysian outlets",
  },
};

export const SENTIMENT_COLORS: Record<SentimentKey, { color: string; bg: string }> = {
  positive: { color: "#2E8B57", bg: "#E7F3EC" },
  neutral: { color: "#6B6455", bg: "#F1EFE8" },
  negative: { color: "#C1443C", bg: "#FBEAE8" },
};

export const PLATFORM_FILTERS: { value: PlatformKey; label: string }[] = [
  { value: "all", label: "All sources" },
  { value: "facebook", label: "Facebook" },
  { value: "x", label: "X (Twitter)" },
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "news", label: "News portals" },
  { value: "forum", label: "Forums" },
  { value: "whatsapp", label: "WhatsApp/Telegram" },
];

export const SENTIMENT_FILTERS: { value: SentimentKey | "all"; label: string }[] = [
  { value: "all", label: "All sentiment" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
];

export const FEED_ITEMS: FeedItem[] = [
  {
    platformKey: "tiktok",
    platform: "TikTok",
    handle: "@amirazlan.kl",
    language: "BM",
    text: "Sesi keynote GPRF2025 hari ni memang power, speaker dari Google Asia kongsi insight AI dalam PR.",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "2.4K likes · 340 shares",
    timeAgo: "35m ago",
  },
  {
    platformKey: "x",
    platform: "X (Twitter)",
    handle: "@kLMediaWatch",
    language: "EN",
    text: "Disappointed with the registration queue at GPRF2025 Day 1 — a two-hour wait is unacceptable for a PR conference.",
    sentimentKey: "negative",
    sentimentLabel: "Negative",
    metric: "89 likes · 210 replies",
    timeAgo: "1h ago",
  },
  {
    platformKey: "facebook",
    platform: "Facebook",
    handle: "Aisyah Rahman",
    language: "BM",
    text: "Terima kasih GPRF2025 atas peluang networking yang hebat! Dah jumpa ramai practitioner PR baru.",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "156 reactions",
    timeAgo: "2h ago",
  },
  {
    platformKey: "instagram",
    platform: "Instagram",
    handle: "@prgirl_my",
    language: "EN",
    text: "Loving the panel on measurement and AMEC frameworks at GPRF2025 — finally an event that talks numbers, not vanity metrics.",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "512 likes",
    timeAgo: "3h ago",
  },
  {
    platformKey: "youtube",
    platform: "YouTube",
    handle: "Marketing Interactive MY",
    language: "EN",
    text: "GPRF2025 Highlights: Industry Leaders Discuss the Future of PR in Southeast Asia.",
    sentimentKey: "neutral",
    sentimentLabel: "Neutral",
    metric: "3.1K views",
    timeAgo: "5h ago",
  },
  {
    platformKey: "news",
    platform: "News",
    handle: "The Business Herald MY",
    language: "EN",
    text: "Global PR Conference and Festival 2025 draws record 3,200 delegates to Kuala Lumpur.",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "Syndicated · 4 outlets",
    timeAgo: "6h ago",
  },
  {
    platformKey: "forum",
    platform: "Forum",
    handle: "commsguy88 · Lowyat.net",
    language: "BM/EN",
    text: "Anyone else at GPRF2025? Camne dengan wifi kat venue, lag gila nak upload.",
    sentimentKey: "negative",
    sentimentLabel: "Negative",
    metric: "12 replies",
    timeAgo: "8h ago",
  },
  {
    platformKey: "whatsapp",
    platform: "WhatsApp",
    handle: "PR Malaysia Community",
    language: "BM",
    text: "Reminder: sesi networking GPRF2025 malam ni kat Grand Ballroom, jangan lupa datang.",
    sentimentKey: "neutral",
    sentimentLabel: "Neutral",
    metric: "Broadcast · 1.2K members",
    timeAgo: "9h ago",
  },
  {
    platformKey: "x",
    platform: "X (Twitter)",
    handle: "@DigitalKL",
    language: "中文",
    text: "GPRF2025 的 AI 公关工作坊很有启发性,推荐给所有公关从业者。",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "78 likes",
    timeAgo: "11h ago",
  },
  {
    platformKey: "facebook",
    platform: "Facebook",
    handle: "Priya Sundaram",
    language: "Tamil",
    text: "GPRF2025 மிகவும் தகவலறிந்த மாநாடு. நெட்வொர்க்கிங் அருமை!",
    sentimentKey: "positive",
    sentimentLabel: "Positive",
    metric: "64 reactions",
    timeAgo: "13h ago",
  },
];

export const LANGUAGE_MIX = [
  { label: "English", pct: 54, color: "#0F2A44" },
  { label: "Bahasa Malaysia", pct: 31, color: "#0E7C7B" },
  { label: "中文", pct: 11, color: "#B9862F" },
  { label: "தமிழ்", pct: 4, color: "#8A6BAE" },
];

export const PLATFORM_MIX = [
  { label: "TikTok", pct: 22 },
  { label: "Facebook", pct: 28 },
  { label: "X (Twitter)", pct: 18 },
  { label: "Instagram", pct: 17 },
  { label: "YouTube + News", pct: 15 },
];

export const SENTIMENT_BY_PLATFORM = [
  { label: "Facebook", positive: 60, neutral: 30, negative: 10 },
  { label: "X (Twitter)", positive: 45, neutral: 25, negative: 30 },
  { label: "TikTok", positive: 75, neutral: 18, negative: 7 },
  { label: "Instagram", positive: 70, neutral: 22, negative: 8 },
  { label: "News portals", positive: 55, neutral: 40, negative: 5 },
];

export const SENTIMENT_BY_LANGUAGE = [
  { label: "English", positive: 62, neutral: 28, negative: 10 },
  { label: "Bahasa Malaysia", positive: 74, neutral: 20, negative: 6 },
  { label: "中文", positive: 70, neutral: 25, negative: 5 },
  { label: "தமிழ்", positive: 80, neutral: 15, negative: 5 },
];

export const POSITIVE_DRIVERS = [
  "AMEC measurement workshop",
  "Quality of networking sessions",
  "Keynote speaker line-up",
];

export const NEGATIVE_DRIVERS = [
  "Registration queue delays",
  "Venue wifi reliability",
  "Session room capacity",
];

export const AMEC_COLUMNS = [
  {
    label: "Inputs",
    body: [
      "Position GPRF2025 as SEA's leading PR industry event",
      "Budget: RM 450,000",
      "Audience: PR & comms professionals, SEA",
    ],
  },
  {
    label: "Outputs",
    body: ["12 press releases distributed", "86 media placements secured", "340 social posts amplified"],
  },
  {
    label: "Outtakes",
    body: ["78% message pull-through", "34% share of voice", "4.4/5 avg. tone quality"],
  },
  {
    label: "Outcomes",
    body: [
      "3,200 registrations (+22% YoY)",
      "Website traffic +156%",
      "Sentiment shift +12pts",
    ],
  },
  {
    label: "Impact",
    body: [
      "4.6/5 delegate satisfaction",
      "82% repeat-attendance intent",
      "Reputation index +9pts",
    ],
  },
];

export const KOL_ROWS = [
  {
    initials: "NH",
    name: "Nadia Hisham",
    platform: "Instagram",
    followers: "210K",
    engagement: "5.8%",
    sentiment: "Positive",
    language: "EN/BM",
    lastMention: "2d ago",
  },
  {
    initials: "FA",
    name: "Farid Aziz",
    platform: "TikTok",
    followers: "340K",
    engagement: "7.2%",
    sentiment: "Positive",
    language: "BM",
    lastMention: "1d ago",
  },
  {
    initials: "WT",
    name: "Wei Ling Tan",
    platform: "X (Twitter)",
    followers: "89K",
    engagement: "3.1%",
    sentiment: "Neutral",
    language: "EN/中文",
    lastMention: "3d ago",
  },
  {
    initials: "CM",
    name: "Comms Malaysia",
    platform: "YouTube",
    followers: "62K",
    engagement: "2.4%",
    sentiment: "Positive",
    language: "EN",
    lastMention: "4d ago",
  },
  {
    initials: "RK",
    name: "Ravin Kumar",
    platform: "Facebook",
    followers: "128K",
    engagement: "4.5%",
    sentiment: "Positive",
    language: "Tamil/EN",
    lastMention: "2d ago",
  },
  {
    initials: "SM",
    name: "Siti Marlina",
    platform: "TikTok",
    followers: "95K",
    engagement: "6.1%",
    sentiment: "Neutral",
    language: "BM",
    lastMention: "1d ago",
  },
];

export const CRISIS_ALERTS = [
  {
    severity: "High severity · 2h ago",
    borderColor: "#C1443C",
    textColor: "#C1443C",
    text: "Negative sentiment spike (+180%) on X regarding registration queue delays.",
    recommendation: "Recommended: issue a public acknowledgement with a queue-fix update.",
  },
  {
    severity: "Medium severity · 6h ago",
    borderColor: "#B9862F",
    textColor: "#B9862F",
    text: "Volume spike +340% on TikTok following the keynote speaker announcement.",
    recommendation: "Recommended: amplify with official clips while momentum is high.",
  },
  {
    severity: "Low severity · 1d ago",
    borderColor: "#96917F",
    textColor: "#5B6672",
    text: "Isolated complaints about venue wifi on a Lowyat.net thread.",
    recommendation: "Recommended: monitor and coordinate with venue IT.",
  },
];

export const COMPETITOR_SHARE_OF_VOICE = [
  { label: "Global PR Conference & Festival 2025", pct: 34, color: "#0F2A44" },
  { label: "Digital PR Malaysia Expo", pct: 25, color: "#96917F" },
  { label: "PR Nexus Asia Summit", pct: 22, color: "#96917F" },
  { label: "Comms World APAC", pct: 19, color: "#96917F" },
];

export const COMPETITOR_TABLE = [
  { event: "Global PR Conference & Festival 2025", mentions: "18,420", positivePct: "68%", reach: "42.6M", highlight: true },
  { event: "Digital PR Malaysia Expo", mentions: "13,200", positivePct: "71%", reach: "31.8M", highlight: false },
  { event: "PR Nexus Asia Summit", mentions: "11,900", positivePct: "61%", reach: "29.4M", highlight: false },
  { event: "Comms World APAC", mentions: "9,650", positivePct: "55%", reach: "24.1M", highlight: false },
];

export const MEDIA_CONTACTS = [
  {
    journalist: "Then Wei Jian",
    outlet: "The Business Herald MY",
    beat: "PR & Marketing",
    lang: "EN",
    lastCoverage: "2d ago",
    status: "Contacted",
    statusColor: "#2E8B57",
  },
  {
    journalist: "Nurul Ain Zulkifli",
    outlet: "Berita Nasional Digital",
    beat: "Corporate Comms",
    lang: "BM",
    lastCoverage: "1d ago",
    status: "Warm relationship",
    statusColor: "#2E8B57",
  },
  {
    journalist: "Ganesh Moorthy",
    outlet: "Tamil Nesan Online",
    beat: "Business",
    lang: "Tamil",
    lastCoverage: "—",
    status: "Not contacted",
    statusColor: "#96917F",
  },
  {
    journalist: "Chen Xiu Ying",
    outlet: "Sin Chew Business Weekly",
    beat: "Media & Marketing",
    lang: "中文",
    lastCoverage: "3d ago",
    status: "Warm relationship",
    statusColor: "#2E8B57",
  },
  {
    journalist: "Aravind Krishnan",
    outlet: "TechWire Asia",
    beat: "Digital / PR Tech",
    lang: "EN",
    lastCoverage: "5d ago",
    status: "Pitched — awaiting reply",
    statusColor: "#B9862F",
  },
];
