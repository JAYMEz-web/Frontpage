import { Menu } from 'lucide-react'
function TopNav({searchQuery, onSearchChange, showAddFeed, onToggleAddFeed, newFeedUrl, onFeedUrlChange, onAddFeed, feedError, addFeedRef, onNavigate, currentUser, onLogout, activeTab, onTabChange, onToggleSidebar}){
    return(
        <div className="top-nav">
            <div className="top-nav-left">
                <button className="menu-btn" onClick={onToggleSidebar}>
                  <Menu size={20}/>
                </button>
                <span className="logo">Frontpage</span>
                <nav className="tabs">
                  <span 
                    className={`tab ${activeTab === "feed" ? "active" : ""}`}
                    onClick={() => onTabChange("feed")}
                  >
                    Feed
                  </span>
                  <span
                    className={`tab ${activeTab === "digest" ? "active" : ""}`}
                    onClick={() => onTabChange("digest")} 
                  >
                    Digest
                  </span>
                  <span
                    className={`tab ${activeTab === "discover" ? "active" : ""}`}
                    onClick={() => onTabChange("discover")} 
                  >
                    Discover
                  </span>
                </nav>
            </div>

        <div className="top-nav-right">
            <input 
               type="text"
               placeholder="Search articles..."
               className="search-bar"
               value={searchQuery}
               onChange={(e) => onSearchChange(e.target.value)}
            />

            <div className="add-feed-wrapper" ref={addFeedRef}>
            <button className="add-feed-btn" onClick={onToggleAddFeed}>+</button>

           {showAddFeed && (
            <div className="add-feed-popover">
              <input
                type="text"
                placeholder="e.g. example.com/feed"
                value={newFeedUrl}
                onChange={(e) => onFeedUrlChange(e.target.value)}
              />
              <button onClick={onAddFeed}>Add</button>
              {feedError && <p className="feed-error">{feedError}</p>}
            </div>
          )}
        </div>

       {currentUser ? (
          <div className="avatar-placeholder" onClick={onLogout} title="Click to log out">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <button className="login-btn" onClick={() => onNavigate("signup")}>Sign Up</button>
        )}
      </div>
    </div>
  )
}

export default TopNav