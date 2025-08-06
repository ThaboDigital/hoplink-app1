import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = 'md', 
  showLabel = false,
  className = ''
}) => {
  const { theme, setTheme, isDark, toggleTheme } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleQuickToggle = () => {
    toggleTheme();
  };

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    setShowDropdown(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Quick Toggle Button */}
      <button
        onClick={handleQuickToggle}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDropdown(!showDropdown);
        }}
        className={`
          ${sizeClasses[size]} 
          flex items-center justify-center 
          rounded-lg border border-gray-300 dark:border-gray-600 
          bg-white dark:bg-gray-800 
          text-gray-700 dark:text-gray-300 
          hover:bg-gray-50 dark:hover:bg-gray-700 
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-hoblink-accent focus:ring-offset-2
        `}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode (right-click for options)`}
      >
        {isDark ? (
          // Moon icon for dark mode
          <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg className={iconSizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        )}
      </button>

      {showLabel && (
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
            <div className="py-1">
              <button
                onClick={() => handleThemeSelect('light')}
                className={`
                  w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                  flex items-center space-x-2
                  ${theme === 'light' ? 'text-hoblink-accent font-medium' : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Light Mode</span>
              </button>
              
              <button
                onClick={() => handleThemeSelect('dark')}
                className={`
                  w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                  flex items-center space-x-2
                  ${theme === 'dark' ? 'text-hoblink-accent font-medium' : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span>Dark Mode</span>
              </button>
              
              <button
                onClick={() => handleThemeSelect('system')}
                className={`
                  w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                  flex items-center space-x-2
                  ${theme === 'system' ? 'text-hoblink-accent font-medium' : 'text-gray-700 dark:text-gray-300'}
                `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>System</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;