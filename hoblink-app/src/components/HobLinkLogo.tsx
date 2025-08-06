import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HobLinkLogoProps {
  variant?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  alt?: string;
}

const HobLinkLogo: React.FC<HobLinkLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  alt = 'HobLink'
}) => {
  const { isDark, logos } = useTheme();

  // Size classes for different logo sizes
  const sizeClasses = {
    sm: variant === 'horizontal' ? 'h-6' : 'h-8',
    md: variant === 'horizontal' ? 'h-8' : 'h-12',
    lg: variant === 'horizontal' ? 'h-10' : 'h-16',
    xl: variant === 'horizontal' ? 'h-12' : 'h-20'
  };

  // Get the appropriate logo URL based on theme and variant
  const logoUrl = isDark 
    ? logos[variant].dark 
    : logos[variant].light;

  return (
    <img
      src={logoUrl}
      alt={alt}
      className={`w-auto ${sizeClasses[size]} ${className}`}
      style={{ 
        maxWidth: 'none',
        objectFit: 'contain'
      }}
      onError={(e) => {
        // Fallback to light mode logo if dark mode logo fails to load
        const target = e.target as HTMLImageElement;
        if (target.src === logos[variant].dark) {
          target.src = logos[variant].light;
        }
      }}
    />
  );
};

export default HobLinkLogo;