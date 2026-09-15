export const categories = [
  { name: "Frontend", count: 14 },
  { name: "Design", count: 11 },
  { name: "Backend & DevOps", count: 8 },
  { name: "AI & ML", count: 8 },
]

export const articles = [
  {
    id: 1,
    source: "Smashing Magazine",
    time: "2h ago",
    title: "Practical guide to designing for colorblind users",
    excerpt: "How to design interfaces that work for everyone without sacrificing visual richness.",
    read: false,
    category: "Design",
    bookmarked: false,
  },
  {
    id: 2,
    source: "Cloudflare Blog",
    time: "3h ago",
    title: "How we reduced P99 latency with edge-first caching",
    excerpt: "Lessons applicable to any distributed system, from our engineering team.",
    read: false,
    category: "Backend & DevOps",
    bookmarked: false,
  },
  {
    id: 3,
    source: "Josh Comeau",
    time: "5h ago",
    title: "The surprising truth about CSS container queries",
    excerpt: "A much more powerful mental model than most developers realize.",
    read: true,
    category: "Frontend",
    bookmarked: false,
  },
]