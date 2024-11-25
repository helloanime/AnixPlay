import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from './components/Navbar';
import ContentSection from './components/ContentSection';
import SearchBar from './components/SearchBar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] to-[#1a1a2e] text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-16">
        <HeroSection />
        
        <ContentSection 
          title="Trending" 
          subtitle="Home"
          items={[
            {
              title: "Demon Slayer",
              subtitle: "Kimetsu no Yaiba",
              image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=280&fit=crop"
            },
            {
              title: "Demon Slayer",
              subtitle: "Kimetsu no Rengoku",
              image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=280&fit=crop"
            },
            {
              title: "New Releases",
              subtitle: "Latest anime updates",
              image: "https://images.unsplash.com/photo-1578632749230-c7416d50c9b5?w=500&h=280&fit=crop"
            },
            {
              title: "A List",
              subtitle: "Top rated series",
              image: "https://images.unsplash.com/photo-1578632767374-6e4485629b13?w=500&h=280&fit=crop"
            }
          ]} 
        />

        <ContentSection 
          title="Gemerius" 
          subtitle="See all"
          items={[
            {
              title: "Demon Slayer",
              subtitle: "Kimetsu no Yaiba",
              image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=500&h=280&fit=crop"
            },
            {
              title: "Trending",
              subtitle: "Home & comedy mix",
              image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&h=280&fit=crop"
            },
            {
              title: "A-Z X List",
              subtitle: "Archive collection",
              image: "https://images.unsplash.com/photo-1578632749230-c7416d50c9b5?w=500&h=280&fit=crop"
            },
            {
              title: "New Releases",
              subtitle: "Latest updates",
              image: "https://images.unsplash.com/photo-1578632767374-6e4485629b13?w=500&h=280&fit=crop"
            }
          ]} 
        />

        <div className="flex justify-center gap-4 my-12">
          <button className="px-6 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
            Reach
          </button>
          <button className="px-6 py-2 bg-purple-600/20 rounded-full hover:bg-purple-600/30 transition-colors">
            Drop value
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;