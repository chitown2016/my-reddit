import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn();

// Polyfill TextEncoder/TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock React Router
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Link: ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>,
  useNavigate: () => jest.fn(),
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
})); 