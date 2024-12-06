import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Play, Info, Star, Calendar, Clock, Users } from 'lucide-react';
import { anilist } from '../lib/anilist';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useSpring as useReactSpring, animated } from '@react-spring/web';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, useTexture } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import ParticleBackground from './ParticleBackground';

gsap.registerPlugin(ScrollTrigger);

interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  score: number;
  rank: number;
  members: number;
  type: string;
  duration: string;
  rating: string;
  aired: {
    from: string;
  };
  bannerImage?: string;
  images: {
    jpg: {
      large_image_url: string;
      image_url: string;
      dominant_color?: string;
    };
  };
  episodes?: number;
}

const Hero: React.FC = () => {
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const bannerRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Mouse parallax effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePosition({ x: x - 0.5, y: y - 0.5 });
  }, []);

  // Enhanced 3D animation for poster card
  const [{ rotateX, rotateY, scale }, api] = useReactSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: {
      mass: 5,
      tension: 350,
      friction: 40,
    },
  }));

  // Smooth scroll progress
  const scrollYProgress = useMotionValue(0);
  const scrollYSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax values
  const bannerY = useTransform(scrollYSpring, [0, 1], ['0%', '50%']);
  const opacityProgress = useTransform(scrollYSpring, [0, 0.5], [1, 0]);
  const scaleProgress = useTransform(scrollYSpring, [0, 1], [1, 1.2]);

  const handlePosterMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    api.start({
      rotateX: y * -20,
      rotateY: x * 20,
      scale: 1.1,
    });
  }, [api]);

  const handlePosterMouseLeave = useCallback(() => {
    api.start({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  }, [api]);

  // Fetch anime data
  const fetchTrendingAnime = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await anilist.getTrendingAnime();
      setTrendingAnime(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending anime');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingAnime();
  }, [fetchTrendingAnime]);

  // Auto-slide animation
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % trendingAnime.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trendingAnime.length, isPaused]);

  // GSAP animations
  useEffect(() => {
    if (contentRef.current && inView) {
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top center+=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [currentIndex, inView]);

  // Particle system configuration
  const particleConfig = {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-[800px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden relative">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <ParticleBackground
            options={{
              particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true, animation: { enable: true, speed: 1, minimumValue: 0.1 } },
                size: { value: 3, random: true },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  random: true,
                  straight: false,
                  outMode: "out",
                  bounce: false,
                }
              }
            }}
          />
        </div>

        {/* Main loading content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Animated logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="w-32 h-32 relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  borderRadius: ["25%", "50%", "25%"],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-2 bg-gray-900 flex items-center justify-center"
                style={{ 
                  transform: `rotate(45deg)`,
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  A
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Loading Your Anime Adventure
            </h2>
            
            {/* Animated dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-8, 0, -8],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-3 h-3 bg-pink-500 rounded-full"
                />
              ))}
            </div>

            {/* Loading progress bar */}
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{
                  x: ["-100%", "0%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full bg-gradient-to-r from-pink-500 to-purple-500"
              />
            </div>

            {/* Random anime quotes */}
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-8 text-gray-300 text-lg italic"
            >
              "The world of anime awaits..."
            </motion.p>
          </motion.div>
        </div>

        {/* Decorative corner elements */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className={`absolute w-16 h-16 border-2 border-pink-500/30
              ${i === 0 ? 'top-8 left-8' : 
                i === 1 ? 'top-8 right-8' : 
                i === 2 ? 'bottom-8 left-8' : 
                'bottom-8 right-8'}`}
            style={{ 
              transform: `rotate(${i * 90}deg)`,
              borderRadius: '25% 0',
            }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[800px] bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xl bg-red-500/10 px-6 py-4 rounded-lg"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  const currentAnime = trendingAnime[currentIndex];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[800px] overflow-hidden"
    >
      <ParticleBackground options={particleConfig} />
      
      <AnimatePresence mode="wait">
        {currentAnime && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative h-full"
            ref={bannerRef}
          >
            {/* Dynamic Background with Parallax */}
            <motion.div
              className="absolute inset-0"
              style={{ y: bannerY, scale: scaleProgress }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={currentAnime.bannerImage || currentAnime.images.jpg.large_image_url}
                  alt=""
                  className="w-full h-full object-cover object-center scale-110"
                  style={{
                    filter: "blur(8px)",
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                  }}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Advanced gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
              </div>
            </motion.div>

            {/* Main Content Container */}
            <div className="relative h-full container mx-auto px-6 flex items-center justify-between gap-20">
              {/* Left Content Section */}
              <motion.div
                ref={contentRef}
                className="max-w-2xl space-y-6 flex-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="px-4 py-1 bg-pink-500 text-white text-sm font-medium rounded-full">
                    #{currentIndex + 1} Trending
                  </span>
                  <span className="px-4 py-1 bg-white/10 text-white text-sm font-medium rounded-full">
                    {currentAnime.type}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentAnime.title}
                </motion.h1>

                <motion.div
                  className="flex items-center gap-6 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-lg">{currentAnime.score}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-lg">
                      {new Date(currentAnime.aired.from).getFullYear()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="text-lg">{currentAnime.episodes} Episodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-500" />
                    <span className="text-lg">{(currentAnime.members / 1000000).toFixed(1)}M</span>
                  </div>
                </motion.div>

                <motion.p
                  className="text-gray-300 text-lg leading-relaxed line-clamp-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {currentAnime.synopsis}
                </motion.p>

                <motion.div
                  className="flex items-center gap-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300"
                  >
                    <Play className="w-5 h-5" fill="currentColor" />
                    <span className="text-lg">Watch Now</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium flex items-center gap-2 backdrop-blur-sm transition-all duration-300"
                  >
                    <Info className="w-5 h-5" />
                    <span className="text-lg">More Info</span>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Right Poster Card with Advanced 3D Effect */}
              <animated.div
                ref={posterRef}
                style={{
                  transform: 'perspective(1000px)',
                  rotateX,
                  rotateY,
                  scale,
                }}
                onMouseMove={handlePosterMouseMove}
                onMouseLeave={handlePosterMouseLeave}
                className="flex-shrink-0 relative z-10"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-[350px] rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="relative">
                    <img
                      src={currentAnime.images.jpg.large_image_url}
                      alt={currentAnime.title}
                      className="w-full h-auto"
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Hover Info Overlay */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300"
                      initial={{ y: 100 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="backdrop-blur-md bg-black/50 rounded-xl p-4">
                        <div className="text-white">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-bold text-xl">Score: {currentAnime.score}</div>
                            <div className="px-3 py-1 bg-pink-500 rounded-full text-sm">
                              Rank #{currentAnime.rank}
                            </div>
                          </div>
                          <div className="text-sm opacity-80">
                            {currentAnime.rating}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </animated.div>
            </div>

            {/* Enhanced Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-3">
              <div className="flex items-center gap-2 mr-4">
                {trendingAnime.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'bg-pink-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex((prev) => (prev - 1 + trendingAnime.length) % trendingAnime.length)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex((prev) => (prev + 1) % trendingAnime.length)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
