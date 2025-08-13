import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import RawJsonView from '../RawJsonView';
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

describe('RawJsonView Component', () => {
  describe('Rendering', () => {
    it('should render the main title', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Raw JSON Response')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Posts')).toBeInTheDocument();
      expect(screen.getByText('Raw JSON')).toBeInTheDocument();
    });

    it('should highlight Raw JSON as active navigation', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      const rawJsonLink = screen.getByText('Raw JSON');
      expect(rawJsonLink).toHaveClass('active');
    });

    it('should render refresh button', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('🔄 Refresh Data')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading message when loading is true', () => {
      render(
        <TestWrapper initialState={{ loading: true }}>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Loading Reddit data...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should show error message when error exists', () => {
      render(
        <TestWrapper initialState={{ error: 'Network error' }}>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Error: Network error')).toBeInTheDocument();
    });
  });

  describe('Refresh Functionality', () => {
    it('should render refresh button', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('🔄 Refresh Data')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should have correct links to other pages', () => {
      render(
        <TestWrapper>
          <RawJsonView />
        </TestWrapper>
      );
      
      const postsLink = screen.getByText('Posts');
      expect(postsLink.closest('a')).toHaveAttribute('href', '/');
      
      const rawJsonLink = screen.getByText('Raw JSON');
      expect(rawJsonLink.closest('a')).toHaveAttribute('href', '/raw-json');
    });
  });

  describe('Empty State', () => {
    it('should handle null data gracefully', () => {
      render(
        <TestWrapper initialState={{ data: null }}>
          <RawJsonView />
        </TestWrapper>
      );
      
      // Should still render the component structure
      expect(screen.getByText('Raw JSON Response')).toBeInTheDocument();
      expect(screen.getByText('🔄 Refresh Data')).toBeInTheDocument();
    });

    it('should handle undefined data gracefully', () => {
      render(
        <TestWrapper initialState={{ data: undefined }}>
          <RawJsonView />
        </TestWrapper>
      );
      
      expect(screen.getByText('Raw JSON Response')).toBeInTheDocument();
    });
  });
}); 