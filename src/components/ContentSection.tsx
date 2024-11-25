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
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <div className="text-sm text-gray-400">See all</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl cursor-pointer"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
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