import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log("Error caught:", error);
    console.log("Error info:", info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  }

  render() {
    // Inline styles using CSS variables from themes
    const errorBoundaryStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      padding: '20px',
      backgroundColor: 'var(--background-color)', // Use theme's background color
      color: 'var(--text-color)', // Use theme's text color
      textAlign: 'center',
    };

    const errorContainerStyle = {
      padding: '20px',
      border: `2px solid var(--primary-color)`, // Use theme's primary color for border
      borderRadius: '0px',
      backgroundColor: 'var(--background-color)', // Use theme's secondary color for container background
      maxHeight: '80vh',
      maxWidth: '80vh',
      width: '100%',
    };

    const headingStyle = {
      fontSize: '24px',
      marginBottom: '10px',
      color: 'var(--primary-color)', // Use theme's primary color for heading
    };

    const paragraphStyle = {
      fontSize: '16px',
      marginBottom: '20px',
      color: 'var(--neutral-color)', // Use theme's text color
    };

    const buttonStyle = {
      padding: '10px 20px',
      backgroundColor: 'var(--background-color)', // Use theme's primary color for button background
      color: 'var(--primary-color)', // Use theme's button text color
      border: '2px solid transparent', // Reserve space for the hover border
      borderRadius: '0px',
      outline: `2px solid var(--primary-color)`,
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease', // Smooth transition for hover effects
      position: 'relative', // Required for pseudo-element positioning
      boxShadow: 'none', // No shadow by default
    };

    const buttonHoverStyle = {
      backgroundColor: 'var(--primary-color)', 
      color: 'var(--background-color)', 
      outline: `2px solid var(--background-color)`,
      boxShadow: '8px 8px 0 0 var(--primary-color)', // Add shadow on hover
    };

    const buttonAfterStyle = {
      content: '""',
      position: 'absolute',
      top: '4px',
      left: '4px',
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent',
      border: `2px solid var(--primary-color)`,
      zIndex: -1, // Place the shadow behind the button
    };

    if (this.state.hasError) {
      return (
        <div style={errorBoundaryStyle}>
          <div style={errorContainerStyle}>
            <h2 style={headingStyle}>Something went wrong.</h2>
            <p style={paragraphStyle}>{this.state.error?.message}</p>
            <button
              style={buttonStyle}
              onClick={this.handleRetry}
              onMouseOver={e => Object.assign(e.target.style, buttonHoverStyle)} // Apply hover styles
              onMouseOut={e => Object.assign(e.target.style, buttonStyle)} // Revert to default styles
            >
              Retry
              <span style={buttonAfterStyle}></span> {/* Pseudo-element for shadow */}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;