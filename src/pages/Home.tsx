import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import ContentSection from '../components/ContentSection';
import SearchBar from '../components/SearchBar';
import UpperContent from '../components/UpperContent';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] to-[#1a1a2e] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-16">
        <UpperContent />
        
        <ContentSection 
          title="Trending" 
          subtitle="Home"
          items={[
            {
              title: "Blue Lock",
              subtitle: "Kimetsu no Yaiba",
              image: "https://media.kitsu.app/anime/47245/poster_image/fbeabe98d37b9a8305975a2ebfc874e6.png"
            },
            {
              title: "One Piece",
              subtitle: "Kimetsu no Rengoku",
              image: "https://img.bunnyccdn.co/_r/300x400/100/bc/d8/bcd84731a3eda4f4a306250769675065/bcd84731a3eda4f4a306250769675065.jpg"
            },
            {
              title: "Tower of God",
              subtitle: "Latest anime updates",
              image: "https://img.bunnyccdn.co/_r/300x400/100/ae/16/ae16a38c56edc0cc5a89f6454d7c8460/ae16a38c56edc0cc5a89f6454d7c8460.jpg"
            },
            {
              title: "As a Reincarnated Aristocrat, I'll Use My Appraisal Skill to Rise in the World",
              subtitle: "Top rated series",
              image: "https://img.bunnyccdn.co/_r/300x400/100/c3/67/c3670b66104179ccff9492aa8158fde3/c3670b66104179ccff9492aa8158fde3.jpg"
            },
          ]} 
        />

        <ContentSection 
          title="Recommended" 
          subtitle="See all"
          items={[
            {
              title: "MF Ghost",
              subtitle: "Kimetsu no Yaiba",
              image: "https://img.bunnyccdn.co/_r/300x400/100/27/52/27527aa58aac5c82f6d9061a716989fe/27527aa58aac5c82f6d9061a716989fe.jpg"
            },
            {
              title: "Classroom of the Elite",
              subtitle: "Latest anime updates",
              image: "https://img.bunnyccdn.co/_r/300x400/100/5d/b4/5db400c33e5c1cc77f9702e4f9a53a63/5db400c33e5c1cc77f9702e4f9a53a63.jpg"
            },
            {
              title: "Demon Slayer",
              subtitle: "Top rated series",
              image: "https://img.bunnyccdn.co/_r/300x400/100/8b/df/8bdf4cad7bc444c0f33f8544d42ad87e/8bdf4cad7bc444c0f33f8544d42ad87e.jpg"
            },
            {
              title: "Jujutsu Kaisen",
              subtitle: "Must watch anime",
              image: "https://img.bunnyccdn.co/_r/300x400/100/a0/18/a018e98812cad9b6f3a569f197b4c1c9/a018e98812cad9b6f3a569f197b4c1c9.jpg"
            },
          ]} 
        />
      </main>
    </div>
  );
};

export default Home;