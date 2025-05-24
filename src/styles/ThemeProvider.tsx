import React, { createContext, useContext, ReactNode, useMemo, useState, useEffect, useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme, ThemeMode } from './theme';

// Theme context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

// Create context with undefined as default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use theme
// This makes it easier to consume the theme in any component
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Extend styled-components DefaultTheme with our theme
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

/**
 * ThemeProvider component that provides theme context to all children
 * Handles theme switching between light and dark modes
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'light' 
}) => {
  // State to track the current theme mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  
  // Get the current theme based on mode
  const currentTheme = useMemo(() => 
    themeMode === 'dark' ? darkTheme : lightTheme
  , [themeMode]);

  // Toggle between light and dark theme
  const toggleTheme = useCallback(() => {
    setThemeMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      // Save theme preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newMode);
      }
      return newMode;
    });
  }, []);

  // Set theme on initial load
  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setThemeMode(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check for system preference
      setThemeMode('dark');
    }
  }, []);

  // Add/remove dark class on body when theme changes
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      theme: currentTheme,
      toggleTheme,
      isDarkMode: themeMode === 'dark',
    }),
    [currentTheme, toggleTheme, themeMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
