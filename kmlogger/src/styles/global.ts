import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
    :root{
    /* Primary Pink Theme - Professional Palette */
    --primary: #e91e63;
    --primary-hover: #c2185b;
    --primary-light: #f8bbd9;
    --primary-dark: #ad1457;
    --primary-subtle: rgba(233, 30, 99, 0.1);
    
    /* Dark Professional Background */
    --background: #0a0a0b;
    --background-secondary: #1a1a1b;
    --background-tertiary: #2d2d30;
    --background-card: #1e1e20;
    --background-input: #2a2a2c;
    
    /* Text Colors */
    --text-primary: #ffffff;
    --text-secondary: #b3b3b3;
    --text-muted: #666666;
    --text-inverse: #000000;
    --text-error: #ff6b6b;
    --text-success: #51cf66;
    
    /* Border & Surface */
    --border: #3d3d42;
    --border-light: #4d4d52;
    --border-focus: var(--primary);
    --surface: #252527;
    --surface-hover: #2d2d30;
    --surface-elevated: #323235;
    
    /* Status Colors - Enhanced */
    --success: #4caf50;
    --success-light: #c8e6c9;
    --success-dark: #388e3c;
    --error: #f44336;
    --error-light: #ffcdd2;
    --error-dark: #d32f2f;
    --warning: #ff9800;
    --warning-light: #ffe0b2;
    --info: #2196f3;
    --info-light: #bbdefb;
    
    /* Input Specific Colors */
    --input-bg: var(--background-input);
    --input-border: var(--border);
    --input-border-focus: var(--primary);
    --input-text: var(--text-primary);
    --input-placeholder: #888888;
    --input-shadow-focus: 0 0 0 3px rgba(233, 30, 99, 0.15);
    
    /* Button Colors */
    --button-primary: var(--primary);
    --button-primary-hover: var(--primary-hover);
    --button-primary-text: #ffffff;
    --button-disabled: #3d3d42;
    --button-disabled-text: #666666;
    
    /* Enhanced Shadows */
    --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
    --shadow-xl: 0 16px 64px rgba(0, 0, 0, 0.6);
    --shadow-primary: 0 4px 20px rgba(233, 30, 99, 0.3);
    --shadow-primary-lg: 0 8px 40px rgba(233, 30, 99, 0.2);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  html{
    font-size: 16px;
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  button {
    cursor: pointer;
  }

  [disabled]{
    cursor: not-allowed;
    opacity: 0.6;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: var(--background);
    webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;