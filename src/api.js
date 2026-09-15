const API_KEY = import.meta.env.VITE_RSS2JSON_API_KEY
export async function fetchFeed(feedUrl, category) {
  try {
    const response = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}&api_key=${API_KEY}`
  )

  if (!response.ok){
    console.warn(`Feed failed: ${feedUrl} (status ${response.status})`)
    return []
  }

  const data = await response.json()

  if (data.status !== "ok") {
    console.warn(`Feed error: ${feedUrl}`, data.message)
    return []
  }

  return data.items.map((item) => ({
    id: item.guid,
    source: data.feed.title,
    time: getRelativeTime(item.pubDate),
    rawDate: item.pubDate,
    title: stripHtml(item.title),
    excerpt: stripHtml(item.description),
    link: item.link,
    read: false,
    bookmarked: false,
    category: category,
    sourceIcon: data.feed.image
  }))
} catch (error) {
  console.warn(`Feed request failed ${feedUrl}`, error)
  return []
}

}

function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent.trim()
}

function getRelativeTime(dateString){
  const past = new Date(dateString)
  const now = new Date()
  const diffMs = now - past
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMinutes /60 )
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) return "just now"
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7)return `${diffDays}d ago`


  return past.toLocaleDateString()
}