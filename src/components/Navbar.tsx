import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Aninux
          </a>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="/access" className="hover:text-purple-400 transition-colors">Access</a>
            <a href="/resources" className="hover:text-purple-400 transition-colors">Resources</a>
            <button className="px-4 py-1.5 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
              Login
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/20 backdrop-blur-md rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="/access" className="hover:text-purple-400 transition-colors">Access</a>
              <a href="/resources" className="hover:text-purple-400 transition-colors">Resources</a>
              <button className="px-4 py-1.5 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;