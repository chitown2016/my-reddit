import React from 'react';

function PostDetailModal({ post, isOpen, onClose }) {
  if (!isOpen || !post) return null;

  // Helper function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // Helper function to get video URL
  const getVideoUrl = (post) => {
    if (post.data.is_video && post.data.media && post.data.media.reddit_video) {
      return post.data.media.reddit_video.fallback_url;
    }
    if (post.data.media && post.data.media.oembed) {
      return post.data.media.oembed.url;
    }
    if (post.data.secure_media && post.data.secure_media.reddit_video) {
      return post.data.secure_media.reddit_video.fallback_url;
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

  // Helper function to render video
  const renderVideo = (post) => {
    const videoUrl = getVideoUrl(post);
    if (!videoUrl) return null;

    return (
      <div className="modal-video-container">
        <video 
          controls 
          className="modal-video"
          preload="metadata"
          crossOrigin="anonymous"
          muted={false}
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Post Details</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="modal-body">
          <div className="post-detail-header">
            <h3 className="post-title">{post.data.title}</h3>
            <div className="post-meta">
              <span className="post-author">by {post.data.author}</span>
              <span className="post-subreddit">r/{post.data.subreddit}</span>
              <span className="post-date">{formatDate(post.data.created_utc)}</span>
            </div>
          </div>

          <div className="post-stats-detailed">
            <div className="stat-item">
              <span className="stat-icon">👍</span>
              <span className="stat-value">{formatNumber(post.data.ups)}</span>
              <span className="stat-label">Upvotes</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💬</span>
              <span className="stat-value">{formatNumber(post.data.num_comments)}</span>
              <span className="stat-label">Comments</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <span className="stat-value">{formatNumber(post.data.score)}</span>
              <span className="stat-label">Score</span>
            </div>
            {post.data.upvote_ratio && (
              <div className="stat-item">
                <span className="stat-icon">📈</span>
                <span className="stat-value">{(post.data.upvote_ratio * 100).toFixed(1)}%</span>
                <span className="stat-label">Upvote Ratio</span>
              </div>
            )}
          </div>

          {/* Display video if available */}
          {hasVideo(post) && renderVideo(post)}

          {/* Display thumbnail if no video and thumbnail exists */}
          {!hasVideo(post) && post.data.thumbnail && post.data.thumbnail !== 'self' && (
            <div className="post-thumbnail">
              <img 
                src={post.data.thumbnail} 
                alt="Post thumbnail" 
                className="modal-thumbnail"
              />
            </div>
          )}

          {/* Display self-text content if available */}
          {post.data.selftext && (
            <div className="post-content">
              <h4>Content:</h4>
              <div className="selftext-content">
                {post.data.selftext}
              </div>
            </div>
          )}

          {/* Display URL if it's a link post */}
          {post.data.url && !post.data.is_self && (
            <div className="post-url">
              <h4>Link:</h4>
              <a 
                href={post.data.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="external-link"
              >
                {post.data.url}
              </a>
            </div>
          )}

          {/* Additional metadata */}
          <div className="post-metadata">
            <h4>Additional Information:</h4>
            <div className="metadata-grid">
              <div className="metadata-item">
                <strong>Post ID:</strong> {post.data.id}
              </div>
              <div className="metadata-item">
                <strong>Domain:</strong> {post.data.domain}
              </div>
              <div className="metadata-item">
                <strong>Over 18:</strong> {post.data.over_18 ? 'Yes' : 'No'}
              </div>
              <div className="metadata-item">
                <strong>Stickied:</strong> {post.data.stickied ? 'Yes' : 'No'}
              </div>
              {post.data.is_video && (
                <div className="metadata-item">
                  <strong>Video Duration:</strong> {post.data.media?.reddit_video?.duration || 'Unknown'}s
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="modal-actions">
            <a 
              href={`https://reddit.com${post.data.permalink}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-button primary"
            >
              📖 View on Reddit
            </a>
            <button className="action-button secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailModal; 