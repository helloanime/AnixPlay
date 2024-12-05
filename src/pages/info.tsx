import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import animeHero from '../assets/anime-hero.jpg';
import logoImage from '../assets/logo.png';

const Info = () => {
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch anime details
    const fetchAnime = async () => {
      try {
        const response = await fetch(`https://api.example.com/anime/${id}`);
        const data = await response.json();
        setAnime(data);
      } catch (error) {
        console.error('Error fetching anime details:', error);
      }
    };

    // Fetch anime characters
    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://api.example.com/anime/${id}/characters`);
        const data = await response.json();
        setCharacters(data);
      } catch (error) {
        console.error('Error fetching anime characters:', error);
      }
    };

    fetchAnime();
    fetchCharacters();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <nav className="py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/home" className="flex items-center">
              <img src={logoImage} alt="AnixPlay" className="h-14 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to="/home" className="text-white font-medium hover:text-pink-400">Home</Link>
              <Link to="/movies" className="text-gray-300 hover:text-white">Movies</Link>
              <Link to="/tv-series" className="text-gray-300 hover:text-white">TV Series</Link>
              <Link to="/most-popular" className="text-gray-300 hover:text-white">Most Popular</Link>
              <Link to="/top-airing" className="text-gray-300 hover:text-white">Top Airing</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-[#1a1a2e] rounded-[32px] relative overflow-hidden min-h-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden">
            <img 
              src={animeHero}
              alt="Anime Heroes" 
              className="object-cover w-full h-full"
              style={{ 
                objectPosition: 'center 25%',
                filter: 'brightness(0.8) contrast(1.1)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/40 to-transparent z-10"></div>
          </div>

          <div className="relative z-20 p-4 md:p-10 w-full md:max-w-[500px]">
            <h1 className="text-4xl font-bold mb-6">{anime.title}</h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">{anime.description}</p>
            <h2 className="text-2xl font-semibold mb-4">Characters</h2>
            <ul className="space-y-4">
              {characters.map((character) => (
                <li key={character.id} className="flex items-center space-x-4">
                  <img src={character.image_url} alt={character.name} className="w-16 h-16 rounded-full" />
                  <span className="text-lg">{character.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;