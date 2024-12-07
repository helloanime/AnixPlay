import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import ScrollToTop from '../components/ScrollToTop';
import LoadingScreen from '../components/LoadingScreen';
import { fetchTrendingAnime, type AnimeData } from '../services/anilistService';
import ParticlesContainer from '../components/ParticlesContainer';
import AnimatedLogo from '../components/AnimatedLogo';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [trendingAnime, setTrendingAnime] = useState<AnimeData[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide scroll indicator when user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax effect for hero section
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse move effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      setMousePosition({ x: moveX / 50, y: moveY / 50 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading animation
  useEffect(() => {
    // Simulate loading time and preload assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Debug log for render
  console.log('Current loading state:', isLoading);

  // Navigation variants for animation
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Enhanced hero content variants
  const heroContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  // Text reveal animation variant
  const textRevealVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Button hover animation variant
  const buttonVariant = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load:', e.currentTarget.src);
    setImageError(true);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTrendingAnime();
        setTrendingAnime(data);
      } catch (error) {
        console.error('Error loading trending anime:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#0a0a0f] text-white relative"
        >
          <ScrollToTop />
          
          {/* Particles Background */}
          <div className="fixed inset-0 pointer-events-none">
            <ParticlesContainer />
          </div>

          {/* Hero Section */}
          <div className="relative min-h-screen flex flex-col justify-center items-center">
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
              {/* Animated Logo */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedLogo />
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                  Your Gateway to Anime
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-300 hover:text-gray-200 mb-8 max-w-2xl mx-auto transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Discover, stream, and immerse yourself in the world of anime. 
                High-quality content, ad-free experience, and a community that shares your passion.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full font-semibold text-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow"
                  onClick={() => navigate('/home')}
                >
                  Start Watching
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Browse Library
                </motion.button>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: showScrollIndicator ? 1 : 0,
                  y: showScrollIndicator ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 backdrop-blur-sm"
                >
                  <motion.div className="w-1 h-1 rounded-full bg-white/60" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-pink-500 origin-left z-50"
            style={{ scaleX }}
            initial={{ scaleX: 0 }}
          />

          {/* Content Sections with Scroll Animations */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            {/* Features Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {/* Feature Card 1 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors duration-300">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    HD Streaming
                  </h3>
                  <p className="text-gray-400 hover:text-gray-300">
                    Experience crystal clear video quality with our HD streaming service. Watch your favorite anime in stunning detail.
                  </p>
                </div>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } }
                }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors duration-300">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Ad-Free Experience
                  </h3>
                  <p className="text-gray-400 hover:text-gray-300">
                    Enjoy uninterrupted viewing with our ad-free platform. No more annoying pop-ups or commercial breaks.
                  </p>
                </div>
              </motion.div>

              {/* Feature Card 3 */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } }
                }}
                className="relative group"
              >
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-colors duration-300">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Simulcast Releases
                  </h3>
                  <p className="text-gray-400 hover:text-gray-300">
                    Stay up to date with the latest episodes. Watch new releases as they air in Japan.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-7xl mx-auto px-4 py-16 bg-white/5 backdrop-blur-sm rounded-2xl mt-24"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Why Choose AnixPlay?
                  </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Join millions of anime fans who trust AnixPlay for their daily dose of entertainment
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { number: "10K+", label: "Anime Titles" },
                  { number: "1M+", label: "Active Users" },
                  { number: "HD", label: "Quality" },
                  { number: "0", label: "Ads" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.1 }
                      }
                    }}
                    className="text-center"
                  >
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="mb-2"
                    >
                      <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        {stat.number}
                      </span>
                    </motion.div>
                    <p className="text-gray-400 font-medium">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  {
                    icon: "🎯",
                    title: "Ad-Free Experience",
                    description: "Enjoy uninterrupted streaming without any advertisements"
                  },
                  {
                    icon: "⚡",
                    title: "Fast Streaming",
                    description: "Lightning-fast servers for smooth playback experience"
                  },
                  {
                    icon: "🌟",
                    title: "HD Quality",
                    description: "Crystal clear video quality for the best viewing experience"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.2 + index * 0.1 }
                      }
                    }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-transparent hover:border-pink-500/50 transition-all duration-300"
                  >
                    {/* Feature Icon */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>

                    {/* Feature Content */}
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 hover:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      whileHover={{ scale: 1.02 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Showcase Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-7xl mx-auto px-4 py-24"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Experience Anime Like Never Before
                  </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Discover a world of features designed to enhance your anime watching experience
                </p>
              </motion.div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: "🎬",
                    title: "Multi-Quality Streaming",
                    description: "Choose your preferred quality, from 480p to 4K. Adaptive streaming ensures smooth playback on any device.",
                    color: "from-pink-500 to-rose-500"
                  },
                  {
                    icon: "🌙",
                    title: "Dark Mode Optimized",
                    description: "Easy on the eyes with our carefully crafted dark theme. Perfect for those late-night anime sessions.",
                    color: "from-violet-500 to-purple-500"
                  },
                  {
                    icon: "📱",
                    title: "Cross-Platform Sync",
                    description: "Start watching on your phone, continue on your laptop. Your progress syncs automatically.",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: "🎯",
                    title: "Smart Recommendations",
                    description: "Get personalized anime suggestions based on your watching history and preferences.",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: "💬",
                    title: "Community Features",
                    description: "Join discussions, rate episodes, and share your thoughts with fellow anime enthusiasts.",
                    color: "from-yellow-500 to-orange-500"
                  },
                  {
                    icon: "🔔",
                    title: "Release Notifications",
                    description: "Never miss a new episode. Get notified when your favorite shows are updated.",
                    color: "from-red-500 to-pink-500"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 }
                      }
                    }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-transparent hover:border-pink-500/50 transition-all duration-300"
                  >
                    {/* Feature Icon */}
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>

                    {/* Feature Content */}
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 hover:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      whileHover={{ scale: 1.02 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center mt-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                >
                  Explore All Features
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Trending Anime Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mt-32"
            >
              {/* Section Header */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                    Trending Now
                  </span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Discover what's hot in the anime world. Stay up to date with the most popular series and latest releases.
                </p>
              </motion.div>

              {/* Anime Cards Grid */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
              >
                {trendingAnime.map((anime, index) => (
                  <motion.div
                    key={anime.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    whileHover={{ y: -10 }}
                    className="group relative rounded-xl overflow-hidden cursor-pointer"
                  >
                    <div className="aspect-w-2 aspect-h-3 relative">
                      <img
                        src={anime.coverImage.large}
                        alt={anime.title.english || anime.title.romaji}
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Hover Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {anime.title.english || anime.title.romaji}
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" />
                            </svg>
                            {(anime.averageScore / 10).toFixed(1)}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-pink-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                            {anime.episodes || '?'} Episodes
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 bg-pink-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>

              {/* View All Button */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center mt-12 mb-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors inline-flex items-center gap-2"
                >
                  View All Trending
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="col-span-1 md:col-span-2 space-y-12">
                {/* Main Content */}
                <motion.section 
                  className="space-y-12"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* Hero Section - Primary SEO Focus */}
                  <motion.div 
                    className="text-left max-w-3xl"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-4xl font-bold mb-6">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">AnixPlay.xyz</span> - #1 Free Anime Streaming Website
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Watch anime online free in HD quality with English subbed or dubbed. 
                      Join over <span className="text-violet-400 font-semibold">10 million anime fans</span> who 
                      choose AnixPlay as their primary anime streaming site.
                    </p>
                  </motion.div>

                  {/* Features Grid with Hover Effects */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                  >
                    <motion.div
                      className="feature-card group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0f] p-6 shadow-xl border border-transparent hover:border-pink-500/50 transition-all duration-300">
                        <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-semibold mb-3">
                          Massive Anime Collection
                        </h3>
                        <p className="text-gray-300">
                          Access <span className="text-violet-400">100,000+ anime episodes</span> including
                          <span className="text-blue-400"> latest seasonal anime, popular shounen, romance, action</span> and more.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="feature-card group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0f] p-6 shadow-xl border border-transparent hover:border-violet-500/50 transition-all duration-300">
                        <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-semibold mb-3">
                          HD Quality Streaming
                        </h3>
                        <p className="text-gray-300">
                          Watch anime in <span className="text-blue-400">premium quality</span> with 
                          options from <span className="text-violet-500">1080p</span> to 360p. Fast loading 
                          speeds and no buffering.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="feature-card group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0f] p-6 shadow-xl border border-transparent hover:border-pink-500/50 transition-all duration-300">
                        <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-semibold mb-3">
                          Latest Updates
                        </h3>
                        <p className="text-gray-300">
                          New episodes added <span className="text-violet-400">within hours of Japanese release</span>.
                          Watch simulcast anime series as they air.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="feature-card group"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0f] p-6 shadow-xl border border-transparent hover:border-violet-500/50 transition-all duration-300">
                        <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 font-semibold mb-3">
                          Multi-Device Streaming
                        </h3>
                        <p className="text-gray-300">
                          Watch anime on any device - <span className="text-blue-400">mobile</span>, 
                          <span className="text-violet-500">tablet</span>, desktop, smart TV. Perfect streaming 
                          experience.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.div
                    className="text-center relative overflow-hidden rounded-3xl bg-[#0a0a0f] p-8 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-30"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, #ff49db 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, #ff49db 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, #ff49db 0%, transparent 50%)'
                        ]
                      }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                    <div className="relative z-10">
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
                        Start Your Anime Journey Today!
                      </h2>
                      <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        Join millions of anime fans watching their favorite shows on AnixPlay. 
                        The ultimate destination for anime streaming.
                      </p>
                      <motion.button
                        onClick={() => navigate('/home')}
                        className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-4 px-8 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Now
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.section>
              </div>

              {/* Right Sidebar */}
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                  Top Searches
                </h2>
                <div className="space-y-3">
                  {['Solo Leveling', 'One Piece', 'Blue Lock', 'Dandadan'].map((anime, index) => (
                    <motion.div
                      key={anime}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="bg-[#1a1a2e] p-4 rounded-xl group-hover:bg-gradient-to-r from-pink-500/10 to-violet-500/10 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                            {anime}
                          </span>
                          <motion.svg
                            className="w-5 h-5 text-gray-500 group-hover:text-pink-500"
                            whileHover={{ scale: 1.2 }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3" />
                          </motion.svg>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer Section */}
          <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-32 border-t border-white/10 pt-16 pb-8"
          >
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Brand Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  className="col-span-1 md:col-span-2"
                >
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                      AnixPlay
                    </span>
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Your ultimate destination for streaming anime. Watch your favorite shows in HD quality with no interruptions.
                  </p>
                  <div className="flex space-x-4">
                    {['twitter', 'discord', 'github'].map((social) => (
                      <motion.a
                        key={social}
                        href={`#${social}`}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        <img
                          src={`/icons/${social}.svg`}
                          alt={social}
                          className="w-5 h-5"
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Links */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } }
                  }}
                >
                  <h4 className="font-semibold mb-4">Quick Links</h4>
                  <ul className="space-y-2">
                    {['Home', 'Trending', 'Schedule', 'Movies'].map((link) => (
                      <li key={link}>
                        <a
                          href={`#${link.toLowerCase()}`}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Newsletter */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }
                  }}
                >
                  <h4 className="font-semibold mb-4">Stay Updated</h4>
                  <p className="text-gray-400 mb-4">
                    Subscribe to our newsletter for updates and new releases.
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-white/10 rounded-l-full px-4 py-2 outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-500 to-violet-500 text-white px-6 py-2 rounded-r-full font-medium"
                    >
                      Join
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Bar */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { delay: 0.3 } }
                }}
                className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
              >
                <p> 2024 AnixPlay. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
                  <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
                </div>
              </motion.div>
            </div>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Landing;