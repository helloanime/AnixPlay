import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import animeHero from '../assets/anime-hero.jpg';
import logoImage from '../assets/logo.png';

const Info = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleStart = () => {
    if (name) {
      navigate('/quiz', { state: { name } });
    }
  };

  return (
    
    );
}