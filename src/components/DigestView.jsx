
function DigestView ({ articles, onArticleClick, onBookmarkClick }) {
    const oneDayAgo = Date.now() -24* 60 * 60 *1000

    const recentUnread = articles.filter((article) => {
        const articleTime = new Date(article.rawDate).getTime()
        return !article.read && articleTime >= oneDayAgo
    })

    const groupedByCatergory = {}
    recentUnread.forEach((article) => {
        if (!groupedByCatergory[article.category]) {
            groupedByCatergory[article.category] = []
        }
        groupedByCatergory[article.category].push(article)
    })

    const categoryNames = Object.keys(groupedByCatergory)

    if (categoryNames.length === 0) {
        return <p className="digest-empty">You're all caught - nothing new in the last 24 hours.</p>
    }

    return (
        <div className="article-list">
            {categoryNames.map((categoryName) =>(
                <div key={categoryName} className="digest-group">
                    <h3 className="digest-group-title">{categoryName}</h3>
                    {groupedByCatergory[categoryName].map((article) => (
                        <div 
                          key={article.id}
                          className="article-item"
                          onClick={() => onArticleClick(article)}
                        >
                            <div className="article-content">
                                <div className="article-meta">
                                    {article.sourceIcon && (
                                        <img src={article.sourceIcon} alt="" className="source-icon" />
                                    )}
                                    {article.source} . {article.time}
                                </div>
                                <h3 className="article-title">{article.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            ))}            
        </div>
    )
}

export default DigestView
