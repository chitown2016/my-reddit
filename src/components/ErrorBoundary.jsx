import React from 'react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  }

  handleReload = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app">
          <h1 className="animate-fade-in">Reddit Popular Posts</h1>
          
          <div className="error-boundary animate-bounce-in">
            <div className="error-icon">💥</div>
            <h2 className="error-title">Oops! Something went wrong</h2>
            <p className="error-description">
              We're sorry, but something unexpected happened. This might be due to a temporary issue or a bug in the application.
            </p>
            
            <div className="recovery-steps">
              <h4>What you can try:</h4>
              <ol>
                <li>Click "Try Again" to reload the current page</li>
                <li>Refresh the browser page</li>
                <li>Check your internet connection</li>
                <li>Try again in a few minutes</li>
              </ol>
            </div>
            
            <div className="error-actions flex gap-md justify-center flex-wrap">
              <button 
                onClick={this.handleRetry}
                className="btn btn-primary retry-button hover-glow"
                disabled={this.state.retryCount >= 3}
              >
                🔄 Try Again {this.state.retryCount > 0 && `(${this.state.retryCount}/3)`}
              </button>
              
              <button 
                onClick={this.handleReset}
                className="btn btn-secondary"
              >
                🏠 Go Home
              </button>
              
              <button 
                onClick={this.handleReload}
                className="btn btn-outline"
              >
                🔃 Refresh Page
              </button>
            </div>
            
            {this.state.retryCount >= 3 && (
              <div className="warning-state mt-lg">
                <p>Multiple retry attempts detected. Please try refreshing the page or contact support if the issue persists.</p>
              </div>
            )}
            
            <div className="mt-lg">
              <details className="error-details">
                <summary className="text-primary cursor-pointer hover-glow">
                  Technical Details (for developers)
                </summary>
                <div className="mt-md">
                  <h5>Error:</h5>
                  <pre className="text-sm bg-secondary text-white p-md rounded overflow-auto">
                    {this.state.error && this.state.error.toString()}
                  </pre>
                  
                  <h5 className="mt-md">Stack Trace:</h5>
                  <pre className="text-sm bg-secondary text-white p-md rounded overflow-auto max-h-40">
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            </div>
            
            <div className="mt-lg text-center">
              <p className="text-muted text-sm">
                If this problem continues, please{' '}
                <a 
                  href="https://github.com/your-repo/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover-glow"
                >
                  report the issue
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 