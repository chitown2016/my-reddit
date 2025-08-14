import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Predefined categories with their subreddits
export const CATEGORIES = {
  'all': { name: 'All Posts', subreddit: 'popular', description: 'All popular posts' },
  'technology': { name: 'Technology', subreddit: 'technology', description: 'Tech news and discussions' },
  'programming': { name: 'Programming', subreddit: 'programming', description: 'Programming and coding' },
  'gaming': { name: 'Gaming', subreddit: 'gaming', description: 'Video games and gaming culture' },
  'science': { name: 'Science', subreddit: 'science', description: 'Scientific discoveries and research' },
  'news': { name: 'News', subreddit: 'news', description: 'Current events and world news' },
  'entertainment': { name: 'Entertainment', subreddit: 'entertainment', description: 'Movies, TV, and entertainment' },
  'sports': { name: 'Sports', subreddit: 'sports', description: 'Sports news and discussions' },
  'food': { name: 'Food', subreddit: 'food', description: 'Cooking, recipes, and food culture' },
  'travel': { name: 'Travel', subreddit: 'travel', description: 'Travel tips and destinations' },
  'fitness': { name: 'Fitness', subreddit: 'fitness', description: 'Health and fitness discussions' },
  'books': { name: 'Books', subreddit: 'books', description: 'Book recommendations and discussions' },
  'music': { name: 'Music', subreddit: 'music', description: 'Music news and discussions' },
  'art': { name: 'Art', subreddit: 'art', description: 'Artwork and creative content' },
  'photography': { name: 'Photography', subreddit: 'photography', description: 'Photography and images' }
};

// Helper function to create a more descriptive error message
const createErrorMessage = (error, context = '') => {
  // Check for specific production deployment issues
  if (error.includes('Failed to fetch') || error.includes('NetworkError')) {
    return 'Network connection failed. Please check your internet connection and try again.';
  }
  if (error.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  if (error.includes('403')) {
    return 'Access denied. The Reddit API may be temporarily unavailable.';
  }
  if (error.includes('404')) {
    return 'The requested content was not found.';
  }
  if (error.includes('500')) {
    return 'Server error. Reddit may be experiencing issues. Please try again later.';
  }
  if (error.includes('CORS') || error.includes('cross-origin')) {
    return 'Cross-origin request blocked. This might be a deployment configuration issue.';
  }
  if (error.includes('Unexpected token') || error.includes('JSON')) {
    return 'Invalid response format. The API might be returning an error page instead of JSON data.';
  }
  return `Error loading data${context ? ` for ${context}` : ''}: ${error}`;
};

// Async thunk for fetching Reddit data with retry logic
export const fetchRedditData = createAsyncThunk(
  'reddit/fetchRedditData',
  async (_, { rejectWithValue, getState }) => {
    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const state = getState();
        const currentCategory = state.reddit.selectedCategory;
        const subreddit = CATEGORIES[currentCategory]?.subreddit || 'popular';
        
        const apiUrl = `/api/reddit/r/${subreddit}.json?limit=25&raw_json=1`;
        console.log(`Attempt ${attempt}: Fetching from ${apiUrl}`);
        
        // Using Vite proxy to avoid CORS issues
        // Adding parameters to get more complete data including media
        const response = await fetch(apiUrl, {
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        console.log(`Response status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate the response structure
        if (!data || !data.data || !data.data.children) {
          console.error('Invalid response structure:', data);
          throw new Error('Invalid response format from Reddit API');
        }
        
        console.log(`Successfully fetched ${data.data.children.length} posts`);
        return data;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        lastError = error;
        
        // If it's the last attempt, reject with the error
        if (attempt === maxRetries) {
          const errorMessage = createErrorMessage(error.message, CATEGORIES[getState().reddit.selectedCategory]?.name);
          return rejectWithValue(errorMessage);
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
);

// Async thunk for searching Reddit posts with retry logic
export const searchRedditPosts = createAsyncThunk(
  'reddit/searchRedditPosts',
  async (searchQuery, { rejectWithValue }) => {
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // Encode the search query for URL
        const encodedQuery = encodeURIComponent(searchQuery);
        const apiUrl = `/api/reddit/search.json?q=${encodedQuery}&limit=25&raw_json=1`;
        console.log(`Search attempt ${attempt}: Fetching from ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        console.log(`Search response status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate the response structure
        if (!data || !data.data || !data.data.children) {
          console.error('Invalid search response structure:', data);
          throw new Error('Invalid response format from Reddit API');
        }
        
        console.log(`Successfully fetched ${data.data.children.length} search results`);
        return { data, searchQuery };
      } catch (error) {
        console.error(`Search attempt ${attempt} failed:`, error);
        lastError = error;
        
        // If it's the last attempt, reject with the error
        if (attempt === maxRetries) {
          const errorMessage = createErrorMessage(error.message, `search for "${searchQuery}"`);
          return rejectWithValue(errorMessage);
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    data: null,
    loading: false,
    error: null,
    searchQuery: '',
    isSearching: false,
    selectedCategory: 'all',
    categories: CATEGORIES,
    retryCount: 0,
    lastErrorTime: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.retryCount = 0;
      state.lastErrorTime = null;
    },
    clearData: (state) => {
      state.data = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.isSearching = false;
      state.error = null;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.isSearching = false;
      state.searchQuery = '';
      state.error = null;
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
    resetRetryCount: (state) => {
      state.retryCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reddit data
      .addCase(fetchRedditData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRedditData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.retryCount = 0;
        state.lastErrorTime = null;
      })
      .addCase(fetchRedditData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.lastErrorTime = Date.now();
      })
      // Search Reddit posts
      .addCase(searchRedditPosts.pending, (state) => {
        state.loading = true;
        state.isSearching = true;
        state.error = null;
      })
      .addCase(searchRedditPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.searchQuery = action.payload.searchQuery;
        state.isSearching = true;
        state.error = null;
        state.retryCount = 0;
        state.lastErrorTime = null;
      })
      .addCase(searchRedditPosts.rejected, (state, action) => {
        state.loading = false;
        state.isSearching = false;
        state.error = action.payload;
        state.lastErrorTime = Date.now();
      });
  },
});

export const { 
  clearError, 
  clearData, 
  setSearchQuery, 
  clearSearch, 
  setCategory,
  incrementRetryCount,
  resetRetryCount
} = redditSlice.actions;

export default redditSlice.reducer; 