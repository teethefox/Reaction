// src/components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🧨 Error in child component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong with the animation.</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
