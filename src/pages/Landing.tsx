import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import animeHero from '../assets/anime-hero.jpg';
import logoImage from '../assets/logo.png';

const Landing = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWatchAnime = () => {
    navigate('/home');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    setImageError(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'AnixPlay - Watch Free Anime Online',
      text: '🎬 Check out AnixPlay - The best place to watch anime online for free! HD quality, no ads, and a huge collection of anime series and movies.',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const topSearches = [
    'Dandadan', 'Solo Leveling', 'One Piece', 'Blue Lock',
    'Tower of God Season 2 Wa...', 'Dragon Ball Daima',
    'Shangri-La Frontier Season...', 'Black Clover', 'Shangri-La Frontier',
    'Bleach: Thousand-Year Blo...'
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'Best Side/Supporting Character Contest ',
      content: 'Hello everyone! I just want to say first that other than no & Pro3, Rules are simple :) First come first served...',
      author: 'Miss Dolphin',
      time: '5 hours ago',
      likes: 25
    },
    {
      id: 2,
      title: 'Time to leave',
      content: 'Dear guys, so i am leaving this site . I am moving this account to someone else who will take care of it properly and have a great future ahead. Signing off yours tru...',
      author: 'Lucy Dolphin',
      time: '5 hours ago',
      likes: 40
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      {/* Navigation */}
      <nav className="py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end mb-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <Link
              to="/home"
              className="text-white font-medium transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-pink-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-200"
            >
              Home
            </Link>
            <Link
              to="/home"
              className="text-gray-300 hover:text-white font-medium transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-pink-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-200"
            >
              Movies
            </Link>
            <Link
              to="/home"
              className="text-gray-300 hover:text-white font-medium transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-pink-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-200"
            >
              TV Series
            </Link>
            <Link
              to="/home"
              className="text-gray-300 hover:text-white font-medium transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-pink-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-200"
            >
              Most Popular
            </Link>
            <Link
              to="/home"
              className="text-gray-300 hover:text-white font-medium transform-gpu transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:text-pink-400 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-200"
            >
              Top Airing
            </Link>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="flex flex-col space-y-2">
                <Link
                  to="/home"
                  className="text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/home"
                  className="text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Movies
                </Link>
                <Link
                  to="/home"
                  className="text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TV Series
                </Link>
                <Link
                  to="/home"
                  className="text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Most Popular
                </Link>
                <Link
                  to="/home"
                  className="text-gray-300 font-medium py-2 px-4 rounded-lg hover:bg-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Top Airing
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-8 perspective-[2000px]">
        <div className="bg-[#1a1a2e] rounded-[32px] relative overflow-hidden min-h-[450px] transform-gpu hover:translate-z-12 hover:rotate-x-1 transition-transform duration-300 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.3)] will-change-transform hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:z-10 border border-gray-800/20">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden">
            <img 
              src={animeHero}
              alt="Anime Heroes" 
              className="object-cover w-full h-full transform-gpu transition-transform duration-300 ease-out will-change-transform hover:scale-[1.02] hover:translate-z-8"
              style={{ 
                objectPosition: 'center 25%',
                filter: 'brightness(0.8) contrast(1.1)'
              }}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent z-10"></div>
            {/* Add subtle edge lighting effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-10 rounded-[32px]"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 p-4 md:p-10 w-full md:max-w-[500px]">
            <Link to="/home" className="block mb-8 transform-gpu transition-all duration-200 ease-out hover:translate-z-4 hover:scale-[1.02]">
              {!imageError ? (
                <img 
                  src={logoImage}
                  alt="AnixPlay" 
                  className="h-14 md:h-16 w-auto drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
                  onError={handleImageError}
                />
              ) : (
                <h1 className="text-4xl font-bold drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">AnixPlay</h1>
              )}
            </Link>
            
            {/* Search Bar */}
            <div className="relative mb-6 transform-gpu transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group focus-within:scale-[1.02] focus-within:-translate-y-1 focus-within:shadow-xl focus-within:shadow-black/30 rounded-[20px]">
              <input
                type="text"
                placeholder="Search anime..."
                className="w-full bg-[#0f0f1a]/90 text-white rounded-[20px] py-3 px-6 focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg placeholder-gray-400 shadow-[0_8px_16px_rgba(0,0,0,0.3)] transition-colors duration-300 group-hover:bg-[#0f0f1a] group-focus-within:bg-[#0f0f1a]"
              />
              <button className="absolute right-5 top-1/2 -translate-y-1/2 transform-gpu transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-[55%] group-hover:text-white group-focus-within:scale-110 group-focus-within:-translate-y-[55%] group-focus-within:text-white">
                <svg className="w-6 h-6 text-gray-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Top Searches */}
            <div className="mb-6 overflow-x-auto md:overflow-visible">
              <div className="text-gray-400 text-sm mb-2">Top search:</div>
              <div className="flex flex-nowrap md:flex-wrap gap-1.5 pb-2 md:pb-0">
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Dandadan
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Solo Leveling
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  One Piece
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Blue Lock
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Dragon Ball Daima
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Tower of God S2
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Black Clover
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Bleach: TYBW
                </button>
                <button className="min-w-[120px] px-3 py-1 text-sm text-gray-300 hover:text-white bg-[#0f0f1a]/50 hover:bg-[#0f0f1a] border border-gray-700/50 hover:border-gray-600 rounded-full transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20">
                  Shangri-La Frontier
                </button>
              </div>
            </div>

            {/* Watch Anime Button */}
            <button
              onClick={handleWatchAnime}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transform-gpu transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/30"
            >
              <span className="relative inline-flex items-center gap-2">
                <span className="text-lg text-stroke">Watch Anime</span>
                <svg
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="col-span-1 md:col-span-2 space-y-8 md:space-y-12 max-w-3xl mx-auto">
            {/* Main Content */}
            <section className="space-y-12">
              {/* Hero Section - Primary SEO Focus */}
              <div className="text-left max-w-3xl">
                <h1 className="text-4xl font-bold mb-6">
                  <span className="text-pink-500">AnixPlay.xyz</span> - #1 Free Anime Streaming Website
                </h1>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Watch anime online free in HD quality with English subbed or dubbed. 
                  Join over <span className="text-violet-400 font-semibold">10 million anime fans</span> who 
                  choose AnixPlay as their primary anime streaming site.
                </p>
              </div>

              {/* Key Features - Secondary SEO Focus */}
              <div className="space-y-8">
                <div className="bg-gray-900/50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Watch Free Anime Online on <span className="text-pink-500">AnixPlay.xyz</span></h2>
                  <p className="text-gray-300 leading-relaxed">
                    Stream and download your favorite anime series and movies in 
                    <span className="text-blue-400"> 1080p HD quality</span>. We offer the 
                    <span className="text-green-400"> largest collection of free anime</span> with both 
                    English sub and dub options. No registration required, instant access to all episodes.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Best Free Anime Streaming Site - Safe & Legal</h2>
                  <p className="text-gray-300 leading-relaxed">
                    <span className="text-green-400 font-semibold">100% Safe and Secure</span> - AnixPlay provides 
                    a clean, ad-light experience with <span className="text-violet-400">HD quality anime streaming</span>. 
                    Watch the latest anime episodes immediately after they air in Japan.
                  </p>
                </div>
              </div>

              {/* Features Grid - Keyword Rich Content */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">Why AnixPlay is the <span className="text-pink-500">#1 Anime Website</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="feature-card">
                    <h3 className="text-xl text-pink-500 font-semibold mb-2">Massive Anime Collection</h3>
                    <p className="text-gray-300">
                      Access <span className="text-violet-400">100,000+ anime episodes</span> including:
                      <span className="text-blue-400"> latest seasonal anime, popular shounen, romance, action, 
                      isekai, fantasy, horror</span> and more. All free, all in HD.
                    </p>
                  </div>

                  <div className="feature-card">
                    <h3 className="text-xl text-pink-500 font-semibold mb-2">HD Quality Streaming</h3>
                    <p className="text-gray-300">
                      Watch anime in <span className="text-blue-400">premium quality</span> with options from 
                      <span className="text-green-400"> 1080p to 360p</span>. Fast loading speeds and no buffering.
                    </p>
                  </div>

                  <div className="feature-card">
                    <h3 className="text-xl text-pink-500 font-semibold mb-2">Latest Anime Updates</h3>
                    <p className="text-gray-300">
                      New episodes added <span className="text-violet-400">within hours of Japanese release</span>.
                      Watch simulcast anime series as they air. Regular updates of <span className="text-blue-400">trending 
                      and popular anime</span>.
                    </p>
                  </div>

                  <div className="feature-card">
                    <h3 className="text-xl text-pink-500 font-semibold mb-2">Multi-Device Streaming</h3>
                    <p className="text-gray-300">
                      Watch anime on any device - <span className="text-blue-400">mobile, tablet, desktop, smart TV</span>.
                      Perfect streaming experience with <span className="text-green-400">auto-quality adjustment</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action - User Intent Focus */}
              <div className="text-center bg-gray-900/50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-pink-500 mb-4">Start Watching Free Anime Now!</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Join millions of anime fans watching their favorite shows on <span className="text-pink-500">AnixPlay.xyz</span>. 
                  The best place to <span className="text-violet-400">watch free anime online</span> in HD quality.
                </p>
                <div className="mt-6 text-sm text-gray-400">
                  Keywords: watch anime online, free anime streaming, HD anime, anime download, English sub, English dub, 
                  latest anime episodes, no ads anime site, best anime website
                </div>
              </div>
            </section>
          </div>

          <style jsx>{`
            .feature-card {
              @apply bg-gray-900/50 p-6 rounded-lg transition-all duration-300;
            }
            .feature-card:hover {
              @apply transform -translate-y-1 shadow-lg shadow-pink-500/20;
            }
          `}</style>

          {/* Trending Posts */}
          <div className="col-span-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-6">Trending Posts</h2>
            <div className="space-y-6">
              {trendingPosts.map((post) => (
                <div key={post.id} className="bg-[#1a1a2e] p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{post.content}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">{post.author}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{post.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
              {/* Read More Button */}
              <button 
                onClick={() => navigate('/home')}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl
                         transform transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5
                         active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-pink-500/20
                         relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 
                               group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative flex items-center justify-center gap-2 font-medium">
                  Read More Posts
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-16 border-t border-gray-800">
          <div className="py-8">
            <div className="text-center text-gray-500 text-sm">
              &copy; AnixPlay.xyz. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Share Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={handleShare}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-8 rounded-full
                   transform transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-0.5
                   active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-pink-500/20
                   relative overflow-hidden group border border-white/10 hover:border-white/20
                   ring-2 ring-purple-500/20 hover:ring-pink-500/30"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 
                         group-hover:opacity-100 transition-opacity duration-300 ease-out rounded-full"></span>
          <span className="relative flex items-center justify-center gap-2 font-medium">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            Share AnixPlay
          </span>
        </button>
      </div>
    </div>
  );
};

export default Landing;