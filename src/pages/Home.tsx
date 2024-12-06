import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ContentSection from '../components/ContentSection';
import Schedule from '../components/Schedule';
import GenreList from '../components/GenreList';

const Home = () => {
  // Sample data - we'll replace with API data later
  const featuredAnime = {
    title: "Why Does Nobody Remember Me in This World?",
    description: "In a time when the great war between five rival races for supremacy on Earth ended with humanity's victory led by the hero Sid, the world suddenly gets 'overwritten' right before the eyes of a boy named Kai. In this rewritten world, Kai witnesses humanity's defeat in the war as a result of Sid's absence—where...",
    coverImage: "https://img.bunnyccdn.co/_r/300x400/100/27/52/27527aa58aac5c82f6d9061a716989fe/27527aa58aac5c82f6d9061a716989fe.jpg",
    spotlightNumber: 4,
    duration: "24m",
    releaseDate: "Jul 13, 2024",
    type: "TV" as const,
    rating: {
      hd: true,
      age: "12",
      quality: "12"
    }
  };

  const scheduleData = {
    "Monday": [
      {
        title: "Solo Leveling",
        episode: 5,
        time: "22:00",
        image: "https://img.bunnyccdn.co/_r/300x400/100/27/52/27527aa58aac5c82f6d9061a716989fe/27527aa58aac5c82f6d9061a716989fe.jpg"
      }
    ],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
  };

  const genres = [
    { name: "Action", count: 2500 },
    { name: "Adventure", count: 1800 },
    { name: "Comedy", count: 3200 },
    { name: "Drama", count: 2100 },
    { name: "Fantasy", count: 1500 },
    { name: "Horror", count: 800 },
    { name: "Mystery", count: 1200 },
    { name: "Romance", count: 1900 }
  ];

  const trendingAnime = [
    {
      title: "Blue Lock",
      subtitle: "Episode 5",
      image: "https://img.bunnyccdn.co/_r/300x400/100/8b/df/8bdf4cad7bc444c0f33f8544d42ad87e/8bdf4cad7bc444c0f33f8544d42ad87e.jpg"
    },
    {
      title: "One Piece",
      subtitle: "Episode 1052",
      image: "https://img.bunnyccdn.co/_r/300x400/100/bc/d8/bcd84731a3eda4f4a306250769675065/bcd84731a3eda4f4a306250769675065.jpg"
    },
    {
      title: "Tower of God",
      subtitle: "Episode 3",
      image: "https://img.bunnyccdn.co/_r/300x400/100/ae/16/ae16a38c56edc0cc5a89f6454d7c8460/ae16a38c56edc0cc5a89f6454d7c8460.jpg"
    },
    {
      title: "Jujutsu Kaisen",
      subtitle: "Episode 23",
      image: "https://img.bunnyccdn.co/_r/300x400/100/a0/18/a018e98812cad9b6f3a569f197b4c1c9/a018e98812cad9b6f3a569f197b4c1c9.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <Navbar />
      <Hero {...featuredAnime} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow space-y-12">
            <ContentSection 
              title="Trending Now" 
              subtitle="Most watched this week"
              items={trendingAnime}
            />
            
            <ContentSection 
              title="Latest Episodes" 
              subtitle="Recently updated"
              items={trendingAnime}
            />
            
            <ContentSection 
              title="Top Rated" 
              subtitle="Highest rated anime"
              items={trendingAnime}
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-8">
            <Schedule scheduleData={scheduleData} />
            <GenreList genres={genres} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;