import React from 'react';
import { ArrowRight } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] to-[#1a1a2e] text-white px-4 py-8">
      <header className="text-center mb-8">
        <img 
          src="/logo.png" 
          alt="AniWave" 
          className="h-8 md:h-12 mx-auto mb-4 md:mb-6"
        />
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-400 text-sm md:text-base">
          <Link to="/home" className="hover:text-purple-400">Home</Link>
          <Link to="/trending" className="hover:text-purple-400">Trending</Link>
          <Link to="/new-release" className="hover:text-purple-400">New Release</Link>
          <Link to="/recent-update" className="hover:text-purple-400">Recent Update</Link>
          <Link to="/app" className="hover:text-purple-400">App</Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="search-bar mb-6 md:mb-8">
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full bg-white/5 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm md:text-base"
            />
          </div>

          <div className="text-center mb-8 md:mb-12">
            <img 
              src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=800" 
              alt="Chopper" 
              className="mx-auto mb-4 md:mb-6 max-w-full md:max-w-md rounded-lg"
            />
            <Link 
              to="/home"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm md:text-base"
            >
              Go to homepage
              <ArrowRight size={18} />
            </Link>
          </div>

          <ShareButtons shares={21500} />

          <section className="prose prose-invert max-w-none text-sm md:text-base">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Aniwave.se - Your Ultimate Destination for Free Anime Streaming</h1>
            <p className="text-gray-400 mb-6">
              Aniwave is a free anime streaming website where users can watch and use premium features without registration. By late 2016, we noticed that many free anime streaming sites had poor user interfaces (UI) and user experiences (UX). So, our team created 9anime to give anime fans a better option.
            </p>
            <p className="text-gray-400 mb-8">
              AniWave arrived at the end of 2023. This new name marks a fresh start with better offerings for anime fans.
            </p>

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">What is Aniwave.to?</h2>
            <p className="text-gray-400 mb-8">
              Aniwave.to is a free site where you can watch anime online in high definition. You can choose between English subtitles or dubbing. You can also download any anime without registration or payment. Everything on here is free! User accounts are optional for creating watchlists, importing watchlists, saving favorite anime shows, and continuing watching where you left off. You can also make new folders and use Watch2Gether with friends to watch online together.
            </p>

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">Is Aniwave.se Safe?</h2>
            <p className="text-gray-400 mb-8">
              Yes, Aniwave is safe. We made this site to improve UX, ensuring user safety. Please report anything suspicious. We do run ads to keep the site going, but we aim to ensure a safe experience.
            </p>

            <h2 className="text-xl md:text-2xl font-bold mb-4 text-purple-400">Why is Aniwave.se the Best Site to Watch Anime Free Online?</h2>
            <ul className="text-gray-400 space-y-4 mb-8">
              <li><strong className="text-purple-400">Extensive Content Library:</strong> Our library was second only to Kissanime before it shut down. We keep adding new and old anime, making us the largest anime library online.</li>
              <li><strong className="text-purple-400">Great Streaming Experience:</strong> We use top-quality streaming servers. You can also pick the fastest one for your location.</li>
              <li><strong className="text-purple-400">High-Quality Resolution:</strong> Our videos are in the highest resolution. We also have quality settings for smooth streaming no matter your internet speed.</li>
              <li><strong className="text-purple-400">Frequent Updates:</strong> We update content every hour, mostly automatically, ensuring you get the latest episodes fast.</li>
              <li><strong className="text-purple-400">User-Friendly Interface:</strong> We focus on simplicity and ease of use. We have all the features of other anime sites, plus more.</li>
              <li><strong className="text-purple-400">Device Compatibility:</strong> AniWave works well on both desktop and mobile devices, even with old browsers. You can enjoy anime anywhere.</li>
            </ul>

            <p className="text-gray-400 mb-4">
              If you want a good and safe place to watch anime for free, try us. If you like our service, please share with your friends and bookmark our site. Anix, Zoro, Animeplay, 9anime.
            </p>

            <p className="text-gray-400">Thank you!</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Landing;