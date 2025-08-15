import { configureStore } from '@reduxjs/toolkit';
import redditReducer, { 
  fetchRedditData, 
  searchRedditPosts, 
  clearError, 
  clearData, 
  setSearchQuery, 
  clearSearch, 
  setCategory,
  CATEGORIES 
} from '../redditSlice';

// Mock fetch
global.fetch = jest.fn();

const createTestStore = () => {
  return configureStore({
    reducer: {
      reddit: redditReducer,
    },
  });
};

describe('Reddit Slice', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    fetch.mockClear();
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const state = store.getState().reddit;
      expect(state).toEqual({
        data: null,
        loading: false,
        error: null,
        searchQuery: '',
        isSearching: false,
        selectedCategory: 'all',
        categories: CATEGORIES,
        retryCount: 0,
        lastErrorTime: null,
      });
    });
  });

  describe('Categories', () => {
    it('should have predefined categories', () => {
      expect(CATEGORIES).toHaveProperty('all');
      expect(CATEGORIES).toHaveProperty('technology');
      expect(CATEGORIES).toHaveProperty('programming');
      expect(CATEGORIES).toHaveProperty('gaming');
      expect(Object.keys(CATEGORIES)).toHaveLength(15);
    });

    it('should have correct category structure', () => {
      Object.values(CATEGORIES).forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('subreddit');
        expect(category).toHaveProperty('description');
      });
    });
  });

  describe('Reducers', () => {
    it('should handle clearError', () => {
      // Set initial error state
      store.dispatch({ type: 'reddit/fetchRedditData/rejected', payload: 'Test error' });
      expect(store.getState().reddit.error).toBe('Test error');

      // Clear error
      store.dispatch(clearError());
      expect(store.getState().reddit.error).toBeNull();
    });

    it('should handle clearData', () => {
      // Set initial data state
      store.dispatch({ type: 'reddit/fetchRedditData/fulfilled', payload: { test: 'data' } });
      expect(store.getState().reddit.data).toEqual({ test: 'data' });

      // Clear data
      store.dispatch(clearData());
      expect(store.getState().reddit.data).toBeNull();
    });

    it('should handle setSearchQuery', () => {
      store.dispatch(setSearchQuery('test query'));
      expect(store.getState().reddit.searchQuery).toBe('test query');
    });

    it('should handle clearSearch', () => {
      // Set search state
      store.dispatch(setSearchQuery('test query'));
      store.dispatch({ type: 'reddit/searchRedditPosts/fulfilled', payload: { data: {}, searchQuery: 'test' } });
      
      expect(store.getState().reddit.searchQuery).toBe('test');
      expect(store.getState().reddit.isSearching).toBe(true);

      // Clear search
      store.dispatch(clearSearch());
      expect(store.getState().reddit.searchQuery).toBe('');
      expect(store.getState().reddit.isSearching).toBe(false);
    });

    it('should handle setCategory', () => {
      store.dispatch(setCategory('technology'));
      expect(store.getState().reddit.selectedCategory).toBe('technology');
      expect(store.getState().reddit.isSearching).toBe(false);
      expect(store.getState().reddit.searchQuery).toBe('');
    });
  });

  describe('Async Thunks', () => {
    describe('fetchRedditData', () => {
      it('should handle pending state', async () => {
        fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
        
        const promise = store.dispatch(fetchRedditData());
        
        expect(store.getState().reddit.loading).toBe(true);
        expect(store.getState().reddit.error).toBeNull();
        expect(store.getState().reddit.isSearching).toBe(false);
        
        // Clean up
        promise.abort();
      });

      it('should handle fulfilled state', async () => {
        const mockData = { data: { children: [] } };
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        await store.dispatch(fetchRedditData());

        expect(store.getState().reddit.loading).toBe(false);
        expect(store.getState().reddit.data).toEqual(mockData);
        expect(store.getState().reddit.error).toBeNull();
        expect(store.getState().reddit.isSearching).toBe(false);
        expect(fetch).toHaveBeenCalledWith('/api/reddit/r/popular.json?limit=25&raw_json=1', expect.objectContaining({
          signal: expect.any(Object)
        }));
      });

      it('should handle rejected state', async () => {
        // Mock fetch to reject immediately for all 3 retry attempts
        fetch.mockRejectedValueOnce(new Error('Network error'));
        fetch.mockRejectedValueOnce(new Error('Network error'));
        fetch.mockRejectedValueOnce(new Error('Network error'));

        await store.dispatch(fetchRedditData());

        expect(store.getState().reddit.loading).toBe(false);
        expect(store.getState().reddit.error).toBe('Error loading data for All Posts: Network error');
        expect(store.getState().reddit.isSearching).toBe(false);
      }, 20000);

      it('should fetch from correct subreddit based on category', async () => {
        // Set category to technology
        store.dispatch(setCategory('technology'));
        
        const mockData = { data: { children: [] } };
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        await store.dispatch(fetchRedditData());

        expect(fetch).toHaveBeenCalledWith('/api/reddit/r/technology.json?limit=25&raw_json=1', expect.objectContaining({
          signal: expect.any(Object)
        }));
      }, 10000);
    });

    describe('searchRedditPosts', () => {
      it('should handle pending state', async () => {
        fetch.mockImplementation(() => new Promise(() => {})); // Never resolves
        
        const promise = store.dispatch(searchRedditPosts('test query'));
        
        expect(store.getState().reddit.loading).toBe(true);
        expect(store.getState().reddit.error).toBeNull();
        expect(store.getState().reddit.isSearching).toBe(true);
        
        // Clean up
        promise.abort();
      });

      it('should handle fulfilled state', async () => {
        const mockData = { data: { children: [] } };
        const searchQuery = 'test query';
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        await store.dispatch(searchRedditPosts(searchQuery));

        expect(store.getState().reddit.loading).toBe(false);
        expect(store.getState().reddit.data).toEqual(mockData);
        expect(store.getState().reddit.searchQuery).toBe(searchQuery);
        expect(store.getState().reddit.error).toBeNull();
        expect(store.getState().reddit.isSearching).toBe(true);
        expect(fetch).toHaveBeenCalledWith('/api/reddit/search.json?q=test%20query&limit=25&raw_json=1', expect.objectContaining({
          signal: expect.any(Object)
        }));
      });

      it('should handle rejected state', async () => {
        // Mock fetch to reject immediately for all retry attempts
        fetch.mockRejectedValueOnce(new Error('Search failed'));
        fetch.mockRejectedValueOnce(new Error('Search failed'));

        await store.dispatch(searchRedditPosts('test'));

        expect(store.getState().reddit.loading).toBe(false);
        expect(store.getState().reddit.error).toBe('Error loading data for search for "test": Search failed');
        expect(store.getState().reddit.isSearching).toBe(false);
      }, 20000);

      it('should encode search query properly', async () => {
        const mockData = { data: { children: [] } };
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        });

        await store.dispatch(searchRedditPosts('cake recipes & tips'));

        expect(fetch).toHaveBeenCalledWith('/api/reddit/search.json?q=cake%20recipes%20%26%20tips&limit=25&raw_json=1', expect.objectContaining({
          signal: expect.any(Object)
        }));
      }, 10000);
    });
  });
}); 