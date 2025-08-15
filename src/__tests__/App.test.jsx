import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
    it('should render PostsView by default (root route)', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Initially shows loading state
      expect(screen.getByText('Loading Reddit App...')).toBeInTheDocument();
      
      // Wait for loading to complete and show the main content
      await waitFor(() => {
        expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
      });
    });

    it('should render loading state initially', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should show the initial loading state
      expect(screen.getByText('Loading Reddit App...')).toBeInTheDocument();
      expect(screen.getByText('Please wait while the application initializes.')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render the main app structure', async () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should have the main app structure
      expect(container.firstChild).toBeInTheDocument();
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
      });
    });

    it('should have proper CSS classes', async () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
      });
      
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
      
      // Should show the initial loading state
      expect(screen.getByText('Loading Reddit App...')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('should render the main app container', async () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Should have the main app structure
      expect(container.firstChild).toBeInTheDocument();
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
      });
    });

    it('should have proper CSS classes', async () => {
      const { container } = render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.getByText('Reddit Popular Posts')).toBeInTheDocument();
      });
      
      // Check for main app structure
      const appElement = container.querySelector('.app');
      expect(appElement).toBeInTheDocument();
    });
  });
}); 