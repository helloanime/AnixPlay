import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Movie → Now"
          className="w-full px-6 py-3 bg-white/10 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <Search className="absolute left-4 text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;