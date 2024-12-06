import React from 'react';
import LoadingState from './LoadingState';

interface Genre {
  name: string;
  count: number;
}

interface GenreListProps {
  genres?: Genre[];
  isLoading?: boolean;
}

const GenreList: React.FC<GenreListProps> = ({ genres = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-card rounded-xl p-4 md:p-6">
        <h2 className="text-xl font-bold mb-4">Genres</h2>
        <LoadingState type="text" count={8} />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4">Genres</h2>
      <div className="space-y-2">
        {genres.map((genre, index) => (
          <button
            key={index}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors group"
          >
            <span className="font-medium group-hover:text-primary transition-colors">
              {genre.name}
            </span>
            <span className="text-sm text-gray-400">
              {genre.count.toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
