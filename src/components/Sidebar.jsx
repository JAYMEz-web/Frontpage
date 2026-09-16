function Sidebar({ selectedCategory, onCategorySelect, categories, allItemsCount, savedCount, feedHealth, sidebarOpen, activeTab, onTabChange}) {
  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="mobile-tabs">
        <span className={`tab ${activeTab === "feed" ? "active" : ""}`} onClick={() => onTabChange("feed")}>Feed</span>
        <span className={`tab ${activeTab === "digest" ? "active" : ""}`} onClick={() => onTabChange("digest")}>Digest</span>
        <span className={`tab ${activeTab === "discover" ? "active" : ""}`} onClick={() => onTabChange("discover")}>Discover</span>
      </div>
      <h2 className="sidebar-title">Categories</h2>
      <ul className="category-list">
        <li
          className={`category-item ${selectedCategory === "All items" ? 'active' : ''}`}
          onClick={() => onCategorySelect("All items")}
        >
          <span>All items</span>
          <span className="category-count">{allItemsCount}</span>
        </li>
        <li
          className={`category-item ${selectedCategory === "Saved" ? 'active' : ''}`}
          onClick={() => onCategorySelect("Saved")}
        >
          <span>Saved</span>
          <span className="category-count">{savedCount}</span>
        </li>
        {categories.map((category) => (
          <li key={category.name}
            className={`category-item ${category.name === selectedCategory ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.name)}
          >
            <span>{category.name}</span>
            <span className="category-count">{category.count}</span>
          </li>
        ))}
      </ul>

      <div className="feed-health">
        <span className={`health-dot ${feedHealth.failed > 0 ? 'warning' : 'healthy'}`}></span> 
        {feedHealth.failed > 0  
           ? ` ${feedHealth.failed} feed${feedHealth.failed > 1 ? 's' : ''} unavailable`
           : "All feeds healthy"}
      </div>
    </div>
  )
}

export default Sidebar