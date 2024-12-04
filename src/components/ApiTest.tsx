import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { jikanApi } from '../lib/jikanApi';

const ApiTest = () => {
  // Test multiple API endpoints
  const { data: topAnime, isLoading: topLoading, error: topError } = useQuery({
    queryKey: ['topAnime'],
    queryFn: () => jikanApi.anime.getTop(1, 5)
  });

  const { data: seasonal, isLoading: seasonalLoading, error: seasonalError } = useQuery({
    queryKey: ['seasonal'],
    queryFn: () => jikanApi.seasons.getCurrent()
  });

  const { data: random, isLoading: randomLoading, error: randomError } = useQuery({
    queryKey: ['random'],
    queryFn: () => jikanApi.anime.getRandom()
  });

  if (topLoading || seasonalLoading || randomLoading) {
    return <div className="text-white p-4">Loading API data...</div>;
  }

  if (topError || seasonalError || randomError) {
    return (
      <div className="text-red-500 p-4">
        Error loading API data:
        <pre>{JSON.stringify(topError || seasonalError || randomError, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold mb-4">API Test Results</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Top 5 Anime:</h3>
        <div className="bg-gray-800 p-4 rounded">
          {topAnime?.data.map((anime: any) => (
            <div key={anime.mal_id} className="mb-2">
              {anime.title} - Score: {anime.score}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Current Season First Anime:</h3>
        <div className="bg-gray-800 p-4 rounded">
          {seasonal?.data[0] && (
            <div>
              Title: {seasonal.data[0].title}
              <br />
              Episodes: {seasonal.data[0].episodes}
              <br />
              Status: {seasonal.data[0].status}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Random Anime:</h3>
        <div className="bg-gray-800 p-4 rounded">
          {random?.data && (
            <div>
              Title: {random.data.title}
              <br />
              Rating: {random.data.rating}
              <br />
              Year: {random.data.year}
            </div>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-4">
        * This is a temporary component for API testing purposes
      </div>
    </div>
  );
};

export default ApiTest;
