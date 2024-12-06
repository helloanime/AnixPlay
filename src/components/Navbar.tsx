import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Menu, X, Bell, User, Heart, Bookmark, TrendingUp, Film, Home, Compass } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.95)']
  );

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: TrendingUp, label: 'Trending', path: '/trending' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Film, label: 'Movies', path: '/movies' },
  ];

  // Hover animation for nav items
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const springConfig = { mass: 1, tension: 400, friction: 30 };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // GSAP animation for menu items
  useEffect(() => {
    if (isMenuOpen && navRef.current) {
      gsap.from(navRef.current.querySelectorAll('.menu-item'), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [isMenuOpen]);

  const [{ scale }, api] = useSpring(() => ({
    scale: 1,
    config: springConfig,
  }));

  const handleMouseEnter = (item: string) => {
    setHoveredItem(item);
    api.start({ scale: 1.1 });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    api.start({ scale: 1 });
  };

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'backdrop-blur-lg' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  borderRadius: ["25%", "50%", "25%"],
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              />
              <div className="absolute inset-1 bg-black flex items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                  A
                </span>
              </div>
            </motion.div>
            <span className="text-white text-xl font-bold">AnixPlay</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <animated.div
                    style={{
                      scale: hoveredItem === item.label ? scale : 1,
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300
                      ${isActive ? 'text-pink-500' : 'text-gray-300 hover:text-white'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </animated.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <motion.div 
              animate={{ width: isSearchOpen ? '300px' : '40px' }}
              className="relative"
            >
              <motion.div
                animate={{ opacity: isSearchOpen ? 0 : 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
                >
                  <Search className="w-5 h-5 text-gray-300" />
                </button>
              </motion.div>
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anime..."
                      className="w-full px-4 py-2 bg-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      onBlur={() => !searchQuery && setIsSearchOpen(false)}
                    />
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-all duration-300"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-pink-500 rounded-full" />
              </motion.button>
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
                      <div className="space-y-4">
                        {/* Sample notifications */}
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 mt-2 bg-pink-500 rounded-full" />
                          <div>
                            <p className="text-sm text-white">New episode available: "Attack on Titan"</p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <User className="w-5 h-5 text-gray-300" />
              </motion.button>
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-lg"
                  >
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all duration-300"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/watchlist"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all duration-300"
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        Watchlist
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all duration-300"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Favorites
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={navRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`menu-item flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300
                        ${isActive ? 'bg-pink-500/20 text-pink-500' : 'text-gray-300 hover:bg-white/10'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;