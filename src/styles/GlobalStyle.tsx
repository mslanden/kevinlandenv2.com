import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    scroll-behavior: smooth;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    min-height: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    margin-bottom: 1rem;
    line-height: 1.2;
    color: ${props => props.theme.colors.text};
  }
  
  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    transition: color 0.2s ease-in-out;
    
    &:hover {
      color: ${props => props.theme.colors.accent};
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  // Font classes for specific text styles
  .cinzel-heading {
    font-family: "Cinzel", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  
  .bodoni-display {
    font-family: "Bodoni Moda", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }
  
  .bodoni-italic {
    font-family: "Bodoni Moda", serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: italic;
  }
  
  // Utility classes
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
