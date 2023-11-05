import React, { Component } from 'react';
import ErrorPage from '../pages/ErrorPage';

class ErrorBoundary extends Component {
    state = {
      hasError: false,
      error: { message: '', stack: '' },
      info: { componentStack: '' }
    };
  
    static getDerivedStateFromError = error => {
      return { hasError: true };
    };
  
    componentDidCatch = (error, info) => {
      this.setState({ error, info });
    };
  
    render() {
      const { hasError, error, info } = this.state;
      const { children } = this.props;
  
      return hasError ? <ErrorPage/> : children;
    }
  }

export default ErrorBoundary;
