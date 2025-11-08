import React from 'react';
import PropTypes from 'prop-types';

// Test component that throws an error on purpose
const ErrorTestComponent = ({ shouldError = false, errorType = 'render' }) => {
  if (shouldError) {
    if (errorType === 'render') {
      throw new Error('Test rendering error for ErrorBoundary testing');
    } else if (errorType === 'network') {
      throw new Error('Network error: Failed to fetch Pokemon data');
    } else if (errorType === 'state') {
      throw new Error('Game state error: Invalid game configuration');
    }
  }

  return (
    <div className="error-test-component">
      <h3>Error Test Component</h3>
      <p>This component is working normally. No errors thrown.</p>
    </div>
  );
};

ErrorTestComponent.propTypes = {
  shouldError: PropTypes.bool,
  errorType: PropTypes.oneOf(['render', 'network', 'state'])
};

export default ErrorTestComponent;