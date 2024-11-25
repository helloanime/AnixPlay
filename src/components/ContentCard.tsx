import React from 'react';
import SearchBar from './SearchBar';

const ContentCard = () => {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center text-center mb-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-4"> 
          Popular Stuff:{' '} {/*Needs to be changed/updateed*/}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Kimetsu no Yaiba {/*Come up with something to say here*/}
          </span>
        </h1>
        
        <h2 className="text-3xl mb-6">
          Your Source for Anime. {/*Maybe better wording?*/}
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Description
        </p>
        
        <SearchBar />
        
        <div className="mt-12 flex justify-center items-center gap-4">
          <span className="text-sm text-gray-400">Watch this</span> {/*Any ideas on what to put here?*/}
          <button className="px-6 py-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;