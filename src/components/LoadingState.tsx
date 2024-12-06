import React from 'react';

interface LoadingStateProps {
  type?: 'card' | 'text' | 'full';
  count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ type = 'card', count = 1 }) => {
  const renderCardSkeleton = () => (
    <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  );

  const renderTextSkeleton = () => (
    <div className="space-y-2 animate-pulse">
      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
    </div>
  );

  const renderFullSkeleton = () => (
    <div className="w-full h-[70vh] bg-gray-800 animate-pulse rounded-xl">
      <div className="h-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (type === 'full') return renderFullSkeleton();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {type === 'card' ? renderCardSkeleton() : renderTextSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
