import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import PostsView from '../PostsView';
import redditReducer, { CATEGORIES } from '../../features/reddit/redditSlice';

// Create a test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      reddit: redditReducer,
    },
    preloadedState: {
      reddit: {
        data: null,
        loading: false,
        error: null,
        searchQuery: '',
        isSearching: false,
        selectedCategory: 'all',
        categories: CATEGORIES,
        ...initialState,
      },
    },
  });
};

// Test wrapper component
const TestWrapper = ({ children, initialState = {} }) => {
  const store = createTestStore(initialState);
  return (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

describe('PostsView Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the main title', () => {
      render(
        <TestWrapper>
          <PostsView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
    });

    it('should render loading state initially', () => {
      render(
        <TestWrapper>
          <PostsView />
        </TestWrapper>
      );
      
      // Should show loading state since useEffect runs and dispatches fetchRedditData
      expect(screen.getByText('Loading Reddit data...')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading message when loading is true', () => {
      render(
        <TestWrapper initialState={{ loading: true }}>
          <PostsView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Loading Reddit data...')).toBeInTheDocument();
    });
  });
}); 