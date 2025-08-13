import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import redditReducer from '../features/reddit/redditSlice';

// Create a test store with initial state
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      reddit: redditReducer,
    },
    preloadedState: {
      reddit: {
        data: {
          data: {
            children: []
          }
        },
        loading: false,
        error: null,
        searchQuery: '',
        isSearching: false,
        selectedCategory: 'all',
        categories: {
          all: { name: 'All Posts', description: 'All posts' },
          technology: { name: 'Technology', description: 'Tech posts' }
        },
        ...initialState
      }
    }
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

describe('App Component', () => {
  describe('Routing', () => {
    it('should render PostsView by default (root route)', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should show the main posts view title
      expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
    });

    it('should render loading state initially', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should show loading state since useEffect runs and dispatches fetchRedditData
      // There are two loading elements (PostsView and RawJsonView)
      const loadingElements = screen.getAllByText('Loading Reddit data...');
      expect(loadingElements).toHaveLength(2);
    });
  });

  describe('Component Integration', () => {
    it('should render the main app structure', () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should have the main app structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have proper CSS classes', () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Check for main app structure
      const appElement = container.querySelector('.app');
      expect(appElement).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('should show loading state initially', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should show loading state - there are two loading elements
      const loadingElements = screen.getAllByText('Loading Reddit data...');
      expect(loadingElements).toHaveLength(2);
    });
  });

  describe('Component Structure', () => {
    it('should render the main app container', () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should have the main app structure
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should have proper CSS classes', () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Check for main app structure
      const appElement = container.querySelector('.app');
      expect(appElement).toBeInTheDocument();
    });
  });
}); 