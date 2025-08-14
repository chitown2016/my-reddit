// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsView from './components/PostsView';
import RawJsonView from './components/RawJsonView';
import DesignSystemShowcase from './components/DesignSystemShowcase';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading time to ensure everything is initialized
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div>
          <h2>Loading Reddit App...</h2>
          <p>Please wait while the application initializes.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <NetworkStatus />
      <Router>
        <Routes>
          <Route path="/" element={<PostsView />} />
          <Route path="/raw-json" element={<RawJsonView />} />
          <Route path="/design-system" element={<DesignSystemShowcase />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
