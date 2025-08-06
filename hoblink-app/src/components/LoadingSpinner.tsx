import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-hoblink-accent',
  text = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="flex items-center space-x-3">
        <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-current ${sizeClasses[size]} ${color}`}></div>
        {text && (
          <span className={`font-medium text-gray-700 ${textSizeClasses[size]}`}>
            {text}
          </span>
        )}
      </div>
      
      {/* HobLink Logo */}
      <div className="mt-8">
        <img 
          src="https://i.postimg.cc/7GSdKBWs/Hob-Link-Light-Mode-Logo-Vertical.png" 
          alt="HobLink" 
          className="h-12 w-auto opacity-50"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;