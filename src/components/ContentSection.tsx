import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentItem {
  title: string;
  subtitle: string;
  image: string;
}

interface ContentSectionProps {
  title: string;
  subtitle: string;
  items: ContentItem[];
}

const ContentSection = ({ title, subtitle, items }: ContentSectionProps) => {
  return (
    <section className="mb-8 md:mb-12 px-4"> {/* Want to keep the blur? */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <p className="text-xs md:text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-xs md:text-sm text-gray-400">See all</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl cursor-pointer"
          >
            <div className="aspect-[/9] overflow-hidden"> {/* This a good size? Just is original for picture */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-base md:text-lg font-bold">{item.title}</h3>
                <p className="text-xs md:text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6 md:mt-8">
        <button className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default ContentSection;