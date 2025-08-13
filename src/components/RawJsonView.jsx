import { useSelector, useDispatch } from 'react-redux';
import { fetchRedditData } from '../features/reddit/redditSlice';
import { Link } from 'react-router-dom';

function RawJsonView() {
  const dispatch = useDispatch();
  const { data: redditData, loading, error, searchQuery, isSearching } = useSelector(state => state.reddit);

  const handleRefresh = () => {
    dispatch(fetchRedditData());
  };

  if (loading) {
    return (
      <div className="app">
        <h1>Raw JSON Response</h1>
        <div className="loading">Loading Reddit data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h1>Raw JSON Response</h1>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Raw JSON Response</h1>
      
      {/* Navigation */}
      <nav className="nav-bar">
        <Link to="/" className="nav-link">Posts</Link>
        <Link to="/raw-json" className="nav-link active">Raw JSON</Link>
      </nav>

      {/* JSON Info */}
      <div className="json-info">
        <div className="json-header">
          <h2>
            {isSearching ? `Search Results for "${searchQuery}"` : 'Popular Posts'} - Raw JSON
          </h2>
          <button onClick={handleRefresh} className="refresh-button">
            🔄 Refresh Data
          </button>
        </div>
        
        {redditData && (
          <div className="json-stats">
            <p>
              <strong>Data Type:</strong> {isSearching ? 'Search Results' : 'Popular Posts'} | 
              <strong> Posts Count:</strong> {redditData.data?.children?.length || 0} | 
              <strong> After:</strong> {redditData.data?.after || 'None'} | 
              <strong> Before:</strong> {redditData.data?.before || 'None'}
            </p>
          </div>
        )}
      </div>
      
      {/* Raw JSON Display */}
      <div className="data-section">
        <pre className="json-display">
          {JSON.stringify(redditData, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default RawJsonView; 