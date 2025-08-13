// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsView from './components/PostsView';
import RawJsonView from './components/RawJsonView';
import DesignSystemShowcase from './components/DesignSystemShowcase';
import ErrorBoundary from './components/ErrorBoundary';
import NetworkStatus from './components/NetworkStatus';
import './App.css';

function App() {
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
