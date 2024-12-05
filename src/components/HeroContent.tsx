import React from 'react';
import SearchBar from './SearchBar';

const HeroContent = () => {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 mb-12 md:mb-24">
      <div className="absolute inset-0 bg-[url('https://img.bunnyccdn.co/_r/1366x768/100/db/86/db8603d2f4fa78e1c42f6cf829030a18/db8603d2f4fa78e1c42f6cf829030a18.jpg')] bg-cover bg-center opacity-10"></div> {/* Maybe have changing pictures and different sizing? */}
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Demon Slayer:{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Kimetsu no Yaiba
          </span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl mb-6">
          nawitems ourducing ninler.
        </h2>
        
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-sm md:text-base">
          You reliant for, the entl mowerr with will clecore in the slatters, unifinem your abblustay tiath for the cinarley, thend in the cramista stanige aut of thu love a.t slos's car out inative.
        </p>
        
        <SearchBar />
        
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-center items-center gap-4">
          <span className="text-sm text-gray-400">Play me this too</span>
          <button className="w-full md:w-auto px-6 py-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors">
            Move search
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;