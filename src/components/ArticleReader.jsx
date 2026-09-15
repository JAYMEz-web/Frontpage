function ArticleReader({ article, onClose }) {
  if (!article) return null

  return (
    <div className="reader-overlay" onClick={onClose}>
      <div className="reader-panel" onClick={(e) => e.stopPropagation()}>
        <button className="reader-close" onClick={onClose}>×</button>

        <div className="reader-scroll-area">
            <div className="reader-meta">
          {article.sourceIcon && (
            <img src={article.sourceIcon} alt="" className="source-icon" />
          )}
          {article.source} · {article.time}
        </div>

        <h1 className="reader-title">{article.title}</h1>

        <p className="reader-excerpt">{article.excerpt}</p> 
        <a      
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="reader-source-link"
        >
          Open original source →
        </a>
        </div>
     </div> 
    </div>
  )
}

export default ArticleReader