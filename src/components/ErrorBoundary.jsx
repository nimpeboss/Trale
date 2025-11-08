import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      errorId: Date.now() // Unique ID for this error instance
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Send error to logging service (could be Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // In a real app, you'd send this to your error reporting service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: globalThis.location.href,
      userId: this.props.userId || 'anonymous'
    };

    // For now, just log to console. In production, send to your error service:
    // errorReportingService.captureException(error, { extra: errorData });
    console.error('Error reported:', errorData);
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
    
    // Call optional retry callback
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or use the provided fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return this.props.children || (
        <div className="error-boundary">
          <div className="error-content">
            <h2>🚨 Oops! Something went wrong</h2>
            <p>
              We apologize for the inconvenience. An unexpected error occurred while 
              playing your Pokemon game.
            </p>
            
            <div className="error-actions">
              <button 
                onClick={this.handleRetry}
                className="retry-button"
                aria-label="Retry and reload the game"
              >
                🔄 Try Again
              </button>
              
              <button 
                onClick={() => globalThis.location.reload()}
                className="reload-button"
                aria-label="Refresh the entire page"
              >
                ↻ Refresh Page
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="error-details">
                <summary>🔍 Error Details (Development Mode)</summary>
                <div className="error-info">
                  <h4>Error Message:</h4>
                  <pre>{this.state.error.message}</pre>
                  
                  <h4>Stack Trace:</h4>
                  <pre>{this.state.error.stack}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <h4>Component Stack:</h4>
                      <pre>{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  onRetry: PropTypes.func,
  userId: PropTypes.string,
};

export default ErrorBoundary;