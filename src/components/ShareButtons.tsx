import React from 'react';
import { Share2, Printer, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  shares: number;
}

const ShareButtons = ({ shares }: ShareButtonsProps) => {
  const formattedShares = new Intl.NumberFormat().format(shares);

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
      <span className="text-gray-400 text-sm">{formattedShares} Share</span>
      
      <div className="flex flex-wrap gap-2">
        <button className="bg-blue-600 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Share2 size={14} />
          <span className="hidden md:inline">Share</span>
        </button>
        
        <button className="bg-green-600 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Share2 size={14} />
          <span className="hidden md:inline">Share</span>
        </button>
        
        <button className="bg-orange-600 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Share2 size={14} />
          <span className="hidden md:inline">Share</span>
        </button>
        
        <button className="bg-blue-400 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Twitter size={14} />
          <span className="hidden md:inline">Tweet</span>
        </button>
        
        <button className="bg-gray-600 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Printer size={14} />
          <span className="hidden md:inline">Print</span>
        </button>
        
        <button className="bg-green-500 text-white px-3 md:px-4 py-1 rounded text-sm flex items-center gap-1 md:gap-2">
          <Share2 size={14} />
          <span className="hidden md:inline">Share</span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;