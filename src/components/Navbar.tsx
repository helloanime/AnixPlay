import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          AnixPlay
        </a>
        
        <div className="flex items-center gap-8">
          <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
          <a href="/access" className="hover:text-purple-400 transition-colors">Access</a> {/* Maybe change to Top Charts or add? */}
          <a href="/resources" className="hover:text-purple-400 transition-colors">Resources</a> {/* Not sure what else this should be */}
          <button className="px-4 py-1.5 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;