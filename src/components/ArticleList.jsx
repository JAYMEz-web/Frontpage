import { Bookmark } from 'lucide-react'

function ArticleList({ articles, onArticleClick, onBookmarkClick, layoutMode}) {
  return (
    <div className={`article-list ${layoutMode === "card" ? "card-layout" : ""}`}>
      {articles.map((article) => (
        <div
          key={article.id}
          className={`article-item ${article.read ? 'read' : ''}`}
          onClick={() => onArticleClick(article)}
        >
          {!article.read && <span className="unread-dot"></span>}
          <div className="article-content">
            <div className="article-meta">
              {article.sourceIcon && (
                <img src={article.sourceIcon} alt="" className="source-icon" />
              )} 
              {article.source}· {article.time}
            </div>
            <h3 className="article-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
          </div>
          <button 
             className={`bookmark-btn ${article.bookmarked ? 'bookmarked' : ''}`}
             onClick={(e) => {
               e.stopPropagation();
               onBookmarkClick(article.id);
             }}
          >
            <Bookmark
              size={18}
              fill={article.bookmarked ? 'currentColor' : 'none'} 
            />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ArticleList