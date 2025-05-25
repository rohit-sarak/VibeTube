import { useState, useEffect } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // Mock video data
  const videos = [
    {
      id: 1,
      title: "React Tutorial for Beginners",
      author: "Code with Mosh",
      views: "1.2M views",
      timestamp: "3 years ago",
      thumbnail: "https://picsum.photos/400/225?random=1 ",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      author: "Traversy Media",
      views: "950K views",
      timestamp: "2 years ago",
      thumbnail: "https://picsum.photos/400/225?random=2 ",
    },
    {
      id: 3,
      title: "CSS Flexbox Explained",
      author: "Kevin Powell",
      views: "780K views",
      timestamp: "1 year ago",
      thumbnail: "https://picsum.photos/400/225?random=3 ",
    },
    {
      id: 4,
      title: "Web Development Full Course",
      author: "freeCodeCamp.org",
      views: "3.4M views",
      timestamp: "4 years ago",
      thumbnail: "https://picsum.photos/400/225?random=4 ",
    },
    {
      id: 5,
      title: "UI Design Tips for Beginners",
      author: "DesignCourse",
      views: "620K views",
      timestamp: "2 years ago",
      thumbnail: "https://picsum.photos/400/225?random=5 ",
    },
    {
      id: 6,
      title: "How to Learn Programming Fast",
      author: "Programming with Mosh",
      views: "2.1M views",
      timestamp: "3 years ago",
      thumbnail: "https://picsum.photos/400/225?random=6 ",
    },
    {
      id: 7,
      title: "Python Crash Course",
      author: "Corey Schafer",
      views: "1.8M views",
      timestamp: "2 years ago",
      thumbnail: "https://picsum.photos/400/225?random=7 ",
    },
    {
      id: 8,
      title: "HTML & CSS Full Tutorial",
      author: "The Net Ninja",
      views: "1.5M views",
      timestamp: "3 years ago",
      thumbnail: "https://picsum.photos/400/225?random=8 ",
    },
  ];

  // Filter videos by search query
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle login
  const handleLogin = () => {
    const name = prompt("Enter your username:");
    if (name) {
      setUsername(name);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify({ isLoggedIn: true, username: name }));
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("user");
  };

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUser.username);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#f9f9f9] text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-2">
          {/* Left section - Logo and Menu button */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" className="mr-1">
                <path d="M23.498 6.186a2.966 2.966 0 0 0-2.087-2.087C19.186 3.5 12 3.5 12 3.5s-7.185 0-9.41.599A2.966 2.966 0 0 0 .503 6.186C0 8.46 0 12 0 12s0 3.54.502 5.814a2.966 2.966 0 0 0 2.087 2.087C4.814 20.5 12 20.5 12 20.5s7.185 0 9.41-.599a2.965 2.965 0 0 0 2.087-2.087C24 15.54 24 12 24 12s0-3.54-.502-5.814zM9.5 15.5v-7l6.5 3.5z"/>
              </svg>
              <span className="font-bold text-lg">YouTube</span>
            </div>
          </div>

          {/* Middle section - Search */}
          <form onSubmit={(e) => e.preventDefault()} className="hidden md:flex flex-grow max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                id="search-input"
                aria-label="Search YouTube"
                className="w-full px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-0 top-0 h-full px-4 bg-gray-100 rounded-r-full border border-l-0 border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </form>

          {/* Right section - User controls */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-gray-900 hidden md:block focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
              aria-label="Create"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </button>
            <button 
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
              aria-label="Upload"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </button>
            <button 
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-2"
              aria-label="Notifications"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            {!isLoggedIn ? (
              <button 
                onClick={handleLogin}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Log in"
              >
                Sign In
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label={`Logged in as ${username}`}
              >
                <img src="https://picsum.photos/200/300?random=9 " alt="User profile" className="w-6 h-6 rounded-full" />
                <span className="text-sm font-medium">{username}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-2">
          <form onSubmit={(e) => e.preventDefault()} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                id="mobile-search-input"
                aria-label="Search YouTube"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                aria-label="Submit search"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
          <nav role="navigation" aria-label="Main navigation">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab("Home")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "Home" ? "bg-gray-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={activeTab === "Home" ? "page" : undefined}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("Trending")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "Trending" ? "bg-gray-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={activeTab === "Trending" ? "page" : undefined}
                >
                  Trending
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("Subscriptions")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "Subscriptions" ? "bg-gray-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={activeTab === "Subscriptions" ? "page" : undefined}
                >
                  Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("Library")}
                  className={`w-full text-left px-4 py-2 rounded-md ${
                    activeTab === "Library" ? "bg-gray-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                  }`}
                  aria-current={activeTab === "Library" ? "page" : undefined}
                >
                  Library
                </button>
              </li>
            </ul>

            <hr className="my-4 border-gray-200" />

            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">History</h3>
            <ul className="space-y-1">
              <li><button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md w-full text-left">Watch History</button></li>
              <li><button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md w-full text-left">Search History</button></li>
            </ul>

            <hr className="my-4 border-gray-200" />

            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Playlists</h3>
            <ul className="space-y-1">
              <li><button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md w-full text-left">Liked Videos</button></li>
              <li><button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md w-full text-left">Favorites</button></li>
              <li><button className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md w-full text-left">Watch Later</button></li>
            </ul>
          </nav>
        </aside>

        {/* Mobile menu (Overlay) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <div 
              className="bg-white w-64 h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <nav role="navigation" aria-label="Mobile main navigation">
                <ul className="space-y-2">
                  {["Home", "Trending", "Subscriptions", "Library"].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          setActiveTab(item);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-md ${
                          activeTab === item ? "bg-gray-100 text-red-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                        }`}
                        aria-current={activeTab === item ? "page" : undefined}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold mb-4">{activeTab}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id} 
                  className="cursor-pointer group"
                  tabIndex="0"
                  role="button"
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedVideo(video);
                    }
                  }}
                >
                  <div className="relative overflow-hidden rounded-lg aspect-video mb-2 group-hover:opacity-90 transition-opacity">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      10:00
                    </div>
                  </div>
                  <div className="flex">
                    <img 
                      src={`https://picsum.photos/200/300?random= ${video.id}`} 
                      alt={video.author} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-sm line-clamp-2">{video.title}</p>
                      <p className="text-xs text-gray-600 truncate">{video.author}</p>
                      <p className="text-xs text-gray-600">{video.views} • {video.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
