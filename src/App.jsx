import { fetchFeed } from "./api.js";
import { useEffect, useState, useRef } from "react";

import TopNav from "./components/TopNav.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ArticleList from "./components/ArticleList.jsx";
import ArticleReader from "./components/ArticleReader.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import DigestView from "./components/DigestView.jsx";
import { categories, articles as initialArticles } from "./sampleData.js";
import './App.css'
import { LogIn } from "lucide-react";

const feedList = [
  // Frontend
  { url: "https://css-tricks.com/feed/", category: "Frontend" },
  { url: "https://www.smashingmagazine.com/feed/", category: "Frontend" },
  { url: "https://www.joshwcomeau.com/rss.xml", category: "Frontend" },
  { url: "https://kentcdodds.com/blog/rss.xml", category: "Frontend" },
  { url: "https://web.dev/feed.xml", category: "Frontend" },
  { url: "https://developer.mozilla.org/en-US/blog/rss.xml", category: "Frontend" },

  // Design
  { url: "https://sidebar.io/feed.xml", category: "Design" },
  { url: "https://www.nngroup.com/feed/rss/", category: "Design" },
  { url: "https://www.figma.com/blog/feed/", category: "Design" },
  { url: "https://alistapart.com/main/feed/", category: "Design" },
  { url: "https://uxdesign.cc/feed", category: "Design" },

  // Backend & DevOps
  { url: "https://blog.cloudflare.com/rss/", category: "Backend & DevOps" },
  { url: "https://vercel.com/atom", category: "Backend & DevOps" },
  { url: "https://github.blog/feed/", category: "Backend & DevOps" },
  { url: "https://www.netlify.com/blog/index.xml", category: "Backend & DevOps" },

  // General Tech
  { url: "https://blog.pragmaticengineer.com/rss/", category: "General Tech" },
  { url: "https://hnrss.org/best", category: "General Tech" },

  // AI & ML
  { url: "https://simonwillison.net/atom/everything/", category: "AI & ML" },
  { url: "https://huggingface.co/blog/feed.xml", category: "AI & ML" },
]

function App() {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("articles");
    return saved ? JSON.parse(saved) : initialArticles;
  });
// Save articles to localStorage whenever they change
   useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);

// category filter state
  const [selectedCategory, setSelectedCategory] = useState("All items");

  const [searchQuery, setSearchQuery] = useState("")
  const [showAddFeed, setShowAddFeed] = useState(false)
  const [newFeedUrl, setNewFeedUrl] = useState("")
  const [feedError, setFeedError] = useState("")

  const addFeedRef = useRef(null)

  const [selectedArticle, setSelectedArticle] = useState(null)
  const [layoutMode, setLayoutMode] = useState("list")
  const [currentPage, setCurrentPage] = useState("app")
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser")
    return saved ? JSON.parse(saved) : null
  })
  const [authError, setAuthError] = useState("")
  const [activeTab, setActiveTab] = useState("feed")
  const [feedHealth, setFeedHealth] = useState({healthy: 0, failed: 0})

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("currentUser")
    }
  }, [currentUser])

  useEffect(() => {
    async function loadFeeds() {
      const results = await Promise.all(
        feedList.map( async (feed) => {
          const articles = await fetchFeed(feed.url, feed.category)
          return { url: feed.url, success: articles.length > 0, articles}
        })
      )
      const freshArticle = results.flatMap((r) => r.articles)
      const failedCount = results.filter((r) => !r.success).length
      const healthyCount = results.filter((r) => r.success).length

      setFeedHealth({ healthy : healthyCount, failed: failedCount})
      const saved = localStorage.getItem('articles')
      const savedArticles = saved ? JSON.parse(saved) : []

      const mergeArticles = freshArticle.map((freshArticle) => {
        const existing = savedArticles.find((a) => a.id === freshArticle.id)
        if (existing) {
          return { ...freshArticle, read: existing.read, bookmarked: existing.bookmarked }
        }
        return freshArticle
      })
      setArticles(mergeArticles)
    }
    loadFeeds();
  }, []);


   useEffect(() => {
    function handleClickOutside(event) {
      if (addFeedRef.current && !addFeedRef.current.contains(event.target)) {
        setShowAddFeed(false)
        setFeedError("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
   
   const filteredArticles = articles 
   .filter((article) => {
     if (selectedCategory === "All items") return true
     if (selectedCategory === "Saved") return article.bookmarked
     return article.category == selectedCategory 
   })
  .filter((article) => 
    (article.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const categoryCounts = categories.map((category) => ({
    name: category.name,
    count: articles.filter((article) => article.category === category.name).length,
  }))

  const allItemsCount = articles.length
  const savedCount = articles.filter((article) => article.bookmarked).length

  async function handleAddFeed() {
    setFeedError("")
    const newArticles = await fetchFeed(newFeedUrl, "Uncategorized")
   
    if (newArticles.length === 0) {
      setFeedError("That doesn't look like a valid feed. Double-check the URL and try again.")
      return
    }
    setArticles((prevArticles) => [...prevArticles, ...newArticles])
    setNewFeedUrl("")
    setShowAddFeed(false)
    
  }

  function handleSignup (name, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const existingUser = users.find((u) => u.email === email)
    if(existingUser){
      setAuthError("An account with this email already exist.")
      return
    }
  
    const newUser = { name, email, password}
    localStorage.setItem("users", JSON.stringify([...users, newUser]))
    setCurrentUser(newUser)
    setAuthError("")
    setCurrentPage("app")
  }

  function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userWithEmail = users.find((u) => u.email === email)
    
    if (!userWithEmail) {
      setAuthError("No account found ")
      return
    } 
    if(userWithEmail.password !== password) {
      setAuthError("Incorrect password")
      return
     
    }

    setCurrentUser(userWithEmail)
    setAuthError("")
    setCurrentPage("app")

  }

  function handleLogout () {
    setCurrentUser(null)
  }

  function handleFeedUrlChange(value){
    setNewFeedUrl(value)
    setFeedError("")
  }

  function toggleAddFeed(){
    setShowAddFeed(!showAddFeed)
    setFeedError("")
  }

  function markAsRead(id) {
    setArticles(articles.map((article) =>
      article.id === id ? { ...article, read: true } : article
    ));
  }

  function toggleBookmark(id) {
    setArticles(articles.map((article) =>
      article.id === id ? { ...article, bookmarked: !article.bookmarked }: article
    ))
  }

  function openArticle(article){
    setSelectedArticle(article)
    if (!article.read){
      markAsRead(article.id)
    }
  }

  function closeArticle() {
    setSelectedArticle(null)
  }

    if (currentPage === "login") {
      return <Login onNavigate={setCurrentPage} onLogin={handleLogin} authError={authError}/>
    }
    if (currentPage === "signup") {
      return <Signup onNavigate={setCurrentPage} onSignup={handleSignup}/>
    }
    return (
  <div className="page-wrapper">
    <TopNav
      searchQuery={searchQuery}  
      onSearchChange={setSearchQuery}
      showAddFeed={showAddFeed}
      onToggleAddFeed={toggleAddFeed}
      newFeedUrl={newFeedUrl}
      onFeedUrlChange={handleFeedUrlChange}
      feedError={feedError}
      onAddFeed={handleAddFeed}
      addFeedRef={addFeedRef}
      onNavigate={setCurrentPage}
      currentUser={currentUser}
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    <div className="app-layout">
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)}></div>
      )}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => { setSelectedCategory(cat); setSidebarOpen(false); }}
        categories={categoryCounts}
        allItemsCount={allItemsCount}
        savedCount={savedCount}
        feedHealth={feedHealth}
        sidebarOpen={sidebarOpen}       
      />
      <div className="main-content">
        <div className="toolbar">
  <span className="toolbar-title">
    {selectedCategory}
    {activeTab === "feed" && (
      <span className="unread-count"> · {filteredArticles.filter(a => !a.read).length} unread</span>
    )}
  </span>

  {activeTab === "feed" && (
    <div className="layout-toggle">
      <button className={layoutMode === "list" ? "active" : ""} onClick={() => setLayoutMode("list")}>List</button>
      <button className={layoutMode === "card" ? "active" : ""} onClick={() => setLayoutMode("card")}>Card</button>
    </div>
  )}
</div>

{activeTab === "feed" && (
  <ArticleList
    articles={filteredArticles}
    onArticleClick={openArticle}
    onBookmarkClick={toggleBookmark}
    layoutMode={layoutMode}
  />
)}

{activeTab === "digest" && (
  <DigestView
    articles={articles}
    onArticleClick={openArticle}
    onBookmarkClick={toggleBookmark}
  />
)}

        {activeTab === "discover" && (
          <p>Discover coming soon.....</p>
        )}
      </div>
    </div>
    <ArticleReader article={selectedArticle} onClose={closeArticle}/>
  </div>
)
}

export default App