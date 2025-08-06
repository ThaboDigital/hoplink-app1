import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark'; // The actual applied theme (resolved from system)
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
  logos: {
    horizontal: {
      light: string;
      dark: string;
    };
    vertical: {
      light: string;
      dark: string;
    };
  };
  favicons: {
    light: string;
    dark: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get theme from localStorage or default to system
    const savedTheme = localStorage.getItem('hoblink-theme') as Theme;
    return savedTheme || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Logo URLs
  const logos = {
    horizontal: {
      light: 'https://i.postimg.cc/jLLKWFPP/Hob-Link-Green-Light-Mode-Logo-Horizontal.png',
      dark: 'https://i.postimg.cc/mtJ47yyq/Hob-Link-Green-Dark-Mode-Logo-Horizontal.png'
    },
    vertical: {
      light: 'https://i.postimg.cc/MnBS5fsG/Hob-Link-Green-Light-Mode-Logo-Vertical.png',
      dark: 'https://i.postimg.cc/GB1153Nx/Hob-Link-Green-Dark-Mode-Logo-Vertical.png'
    }
  };

  // Favicon URLs
  const favicons = {
    light: 'https://i.postimg.cc/sB9RddCd/Hob-Link-Green-Favicon-Light-Mode.png',
    dark: 'https://i.postimg.cc/7GHrqsqC/Hob-Link-Simplified-Green-Favicon-Dark-Mode.png'
  };

  // Function to get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Function to resolve the actual theme
  const resolveTheme = (themePreference: Theme): 'light' | 'dark' => {
    if (themePreference === 'system') {
      return getSystemTheme();
    }
    return themePreference;
  };

  // Function to update favicon
  const updateFavicon = (isDarkMode: boolean) => {
    const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    if (favicon) {
      favicon.href = isDarkMode ? favicons.dark : favicons.light;
    } else {
      // Create favicon if it doesn't exist
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = isDarkMode ? favicons.dark : favicons.light;
      document.head.appendChild(newFavicon);
    }

    // Also update apple-touch-icon
    let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    if (appleTouchIcon) {
      appleTouchIcon.href = isDarkMode ? favicons.dark : favicons.light;
    } else {
      appleTouchIcon = document.createElement('link');
      appleTouchIcon.rel = 'apple-touch-icon';
      appleTouchIcon.href = isDarkMode ? favicons.dark : favicons.light;
      document.head.appendChild(appleTouchIcon);
    }
  };

  // Function to apply theme to document
  const applyTheme = (resolvedTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Update favicon
    updateFavicon(resolvedTheme === 'dark');

    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.content = resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff';

    setActualTheme(resolvedTheme);
  };

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('hoblink-theme', newTheme);
    
    const resolved = resolveTheme(newTheme);
    applyTheme(resolved);
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newActualTheme = e.matches ? 'dark' : 'light';
        applyTheme(newActualTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Initial theme application
    const resolved = resolveTheme(theme);
    applyTheme(resolved);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  // Initialize theme on first load
  useEffect(() => {
    const resolved = resolveTheme(theme);
    applyTheme(resolved);
  }, []);

  const isDark = actualTheme === 'dark';

  const value: ThemeContextType = {
    theme,
    actualTheme,
    setTheme,
    toggleTheme,
    isDark,
    logos,
    favicons
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;