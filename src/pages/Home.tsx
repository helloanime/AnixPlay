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
        /> {/* Need to make it so that the arrows at the bottom work*/}

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
              title: "Shangri-La Frontier",
              subtitle: "Home & comedy mix",
              image: "https://img.bunnyccdn.co/_r/300x400/100/0f/c6/0fc66f9879a3a4a15408c325e1677e17/0fc66f9879a3a4a15408c325e1677e17.jpg"
            },
            {
              title: "Love LIVE! Superstar!!",
              subtitle: "Archive collection",
              image: "https://img.bunnyccdn.co/_r/300x400/100/63/b1/63b1d4a89b20d9b1a1c5a11e068ce44e/63b1d4a89b20d9b1a1c5a11e068ce44e.jpg"
            },
            {
              title: "Psuedo Harem",
              subtitle: "Latest updates",
              image: "https://img.bunnyccdn.co/_r/300x400/100/c4/19/c419bb45d8063ba9f18915a74fb449ae/c419bb45d8063ba9f18915a74fb449ae.jpg"
            }
          ]} 
        />

        <ContentSection 
          title="Recent Updates" 
          subtitle="See all"
          items={[
            {
              title: "Bleach",
              subtitle: "Kimetsu no Yaiba",
              image: "https://img.bunnyccdn.co/_r/300x400/100/bd/5a/bd5ae1d387a59c5abcf5e1a6a616728c/bd5ae1d387a59c5abcf5e1a6a616728c.jpg"
            },
            {
              title: "Mission: Yozakura Family", 
              subtitle: "Home & comedy mix",
              image: "https://img.bunnyccdn.co/_r/300x400/100/25/9c/259ca4ad41fd80081677b04a880c7d4b/259ca4ad41fd80081677b04a880c7d4b.jpg"
            },
            {
              title: "The Do-Over Damsel Conquers the Dragon Emperor",
              subtitle: "Archive collection",
              image: "https://img.bunnyccdn.co/_r/300x400/100/75/c3/75c35bc0256474202d917ca320fa99e4/75c35bc0256474202d917ca320fa99e4.jpg"
            },
            {
              title: "Beyblade X",
              subtitle: "Latest updates",
              image: "https://img.bunnyccdn.co/_r/300x400/100/ea/d4/ead47129d7080b87764abe4117d0c92e/ead47129d7080b87764abe4117d0c92e.png"
            }
          ]} 
        /> {/* Need to fix the weird line for Mission: Yozakura Family and The Do-Over Damsel Conquers the Dragon Emperor */} {/* Might need to find better images */}
      </main>
    </div>
  );
}

export default Home;