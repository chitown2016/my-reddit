import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRedditData, searchRedditPosts, clearSearch, setCategory, CATEGORIES } from '../features/reddit/redditSlice';
import { Link } from 'react-router-dom';
import PostDetailModal from './PostDetailModal';
import '../styles/design-system.css';

function PostsView() {
  const dispatch = useDispatch();
  const { data: redditData, loading, error, searchQuery, isSearching, selectedCategory, categories } = useSelector(state => state.reddit);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRedditData());
  }, [dispatch, selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      dispatch(searchRedditPosts(localSearchQuery.trim()));
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    dispatch(clearSearch());
    dispatch(fetchRedditData());
  };

  const handleCategoryChange = (categoryKey) => {
    dispatch(setCategory(categoryKey));
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  // Helper function to get video URL from post data
  const getVideoUrl = (post) => {
    // Check for Reddit video
    if (post.data.is_video && post.data.media && post.data.media.reddit_video) {
      return post.data.media.reddit_video.fallback_url;
    }
    
    // Check for external video (YouTube, etc.)
    if (post.data.media && post.data.media.oembed) {
      return post.data.media.oembed.url;
    }
    
    // Check for secure media
    if (post.data.secure_media && post.data.secure_media.reddit_video) {
      return post.data.secure_media.reddit_video.fallback_url;
    }
    
    return null;
  };

  // Helper function to get audio URL from post data
  const getAudioUrl = (post) => {
    // Reddit often separates video and audio streams
    if (post.data.media && post.data.media.reddit_video && post.data.media.reddit_video.dash_url) {
      // Try to extract audio from DASH manifest
      return post.data.media.reddit_video.dash_url;
    }
    
    if (post.data.secure_media && post.data.secure_media.reddit_video && post.data.secure_media.reddit_video.dash_url) {
      return post.data.secure_media.reddit_video.dash_url;
    }
    
    return null;
  };

  // Helper function to check if post has video content
  const hasVideo = (post) => {
    return post.data.is_video || 
           (post.data.media && post.data.media.reddit_video) ||
           (post.data.secure_media && post.data.secure_media.reddit_video) ||
           (post.data.media && post.data.media.oembed && post.data.media.oembed.type === 'video');
  };

  // Helper function to render video with proper audio handling
  const renderVideo = (post) => {
    const videoUrl = getVideoUrl(post);
    const audioUrl = getAudioUrl(post);
    
    if (!videoUrl) return null;

    // For Reddit videos, we might need to handle audio separately
    if (post.data.is_video && post.data.media && post.data.media.reddit_video) {
      const redditVideo = post.data.media.reddit_video;
      
      return (
        <div className="video-container">
          <video 
            controls 
            className="post-video"
            preload="metadata"
            crossOrigin="anonymous"
            muted={false}
            playsInline
            onLoadedMetadata={(e) => {
              // Try to unmute if video was muted by browser
              if (e.target.muted) {
                e.target.muted = false;
              }
            }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    // For external videos (YouTube, etc.)
    return (
      <div className="video-container">
        <video 
          controls 
          className="post-video"
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="app">
        <h1 className="animate-fade-in">Reddit Popular Posts</h1>
        <div className="loading animate-fade-in stagger-1">
          <div className="loading-spinner mx-auto mb-md"></div>
          <p>Loading Reddit data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1 className="animate-fade-in">Reddit Popular Posts</h1>
        
        {/* Navigation - Keep available even in error state */}
        <nav className="nav-bar animate-fade-in stagger-1">
          <Link to="/" className="nav-link active">Posts</Link>
          <Link to="/raw-json" className="nav-link">Raw JSON</Link>
          <Link to="/design-system" className="nav-link">Design System</Link>
        </nav>
        
        <div className="error-container animate-bounce-in">
          <div className="card">
            <div className="card-header text-center">
              <div className="text-error text-4xl mb-md animate-pulse">⚠️</div>
              <h2 className="text-error">Something went wrong</h2>
            </div>
            <div className="card-body text-center">
              <p className="text-secondary mb-lg">
                We encountered an error while loading Reddit data. This might be due to:
              </p>
              <ul className="text-left text-secondary mb-lg" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <li>• Network connectivity issues</li>
                <li>• Reddit API temporary unavailability</li>
                <li>• Rate limiting from Reddit</li>
                <li>• Browser compatibility issues</li>
              </ul>
              
              <div className="error-details mb-lg">
                <details className="text-left">
                  <summary className="text-primary cursor-pointer hover-glow">
                    Technical Details
                  </summary>
                  <div className="mt-md p-md bg-secondary text-white rounded">
                    <code className="text-sm">{error}</code>
                  </div>
                </details>
              </div>
              
              <div className="error-actions flex gap-md justify-center flex-wrap">
                <button 
                  onClick={() => {
                    dispatch(fetchRedditData());
                  }}
                  className="btn btn-primary hover-glow"
                >
                  🔄 Try Again
                </button>
                
                <button 
                  onClick={() => {
                    dispatch(clearSearch());
                    dispatch(fetchRedditData());
                  }}
                  className="btn btn-secondary"
                >
                  🏠 Go to Popular Posts
                </button>
                
                <button 
                  onClick={() => {
                    window.location.reload();
                  }}
                  className="btn btn-outline"
                >
                  🔃 Refresh Page
                </button>
              </div>
              
              <div className="mt-lg text-center">
                <p className="text-muted text-sm">
                  Still having issues? Try visiting{' '}
                  <a 
                    href="https://reddit.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover-glow"
                  >
                    Reddit directly
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1 className="animate-fade-in">Reddit Popular Posts</h1>
      
      {/* Navigation */}
      <nav className="nav-bar animate-fade-in stagger-1">
        <Link to="/" className="nav-link active">Posts</Link>
        <Link to="/raw-json" className="nav-link">Raw JSON</Link>
        <Link to="/design-system" className="nav-link">Design System</Link>
      </nav>
      
      {/* Category Filter */}
      <div className="category-section animate-fade-in stagger-2">
        <h3>Filter by Category:</h3>
        <div className="category-grid">
          {Object.entries(categories).map(([key, category], index) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`category-button ${selectedCategory === key ? 'active' : ''} animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              title={category.description}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search Interface */}
      <div className="search-section animate-fade-in stagger-3">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="Search Reddit posts (e.g., 'cake recipes')"
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍 Search
          </button>
          {isSearching && (
            <button type="button" onClick={handleClearSearch} className="clear-button">
              ✕ Clear Search
            </button>
          )}
        </form>
        
        {isSearching && searchQuery && (
          <div className="search-info animate-fade-in-up">
            <p>Searching for: <strong>"{searchQuery}"</strong></p>
          </div>
        )}
      </div>

      {redditData && redditData.data && redditData.data.children && (
        <div className="posts-section animate-fade-in stagger-4">
          <h2 className="animate-slide-in-left">
            {isSearching 
              ? `Search Results for "${searchQuery}"` 
              : `${categories[selectedCategory]?.name || 'Popular Posts'}`
            } 
            ({redditData.data.children.length})
          </h2>
          <div className="posts-grid">
            {redditData.data.children.map((post, index) => {
              const isVideo = hasVideo(post);
              
              return (
                <div 
                  key={post.data.id} 
                  className="post-card hover-lift animate-scale-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    cursor: 'pointer' 
                  }}
                  onClick={() => handlePostClick(post)}
                >
                  <h3>{post.data.title}</h3>
                  <p className="author">by {post.data.author}</p>
                  <p className="subreddit">r/{post.data.subreddit}</p>
                  <div className="post-stats">
                    <span>👍 {post.data.ups}</span>
                    <span>💬 {post.data.num_comments}</span>
                    {isVideo && <span>🎥 Video</span>}
                  </div>
                  
                  {/* Display video if available */}
                  {isVideo && renderVideo(post)}
                  
                  {/* Display thumbnail if no video and thumbnail exists */}
                  {!isVideo && post.data.thumbnail && post.data.thumbnail !== 'self' && (
                    <img 
                      src={post.data.thumbnail} 
                      alt="Post thumbnail" 
                      className="thumbnail"
                    />
                  )}
                  
                  {/* Link to full Reddit post for all posts */}
                  <div className="post-link">
                    <a 
                      href={`https://reddit.com${post.data.permalink}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="reddit-link hover-glow"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📖 View on Reddit ({post.data.num_comments} comments)
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      <PostDetailModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default PostsView; 