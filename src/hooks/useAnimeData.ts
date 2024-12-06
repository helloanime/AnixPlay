import { useQuery } from '@tanstack/react-query';
import { jikanApi } from '../lib/jikanApi';

export const useAnimeData = (type: 'trending' | 'latest' | 'topRated', page = 1) => {
  return useQuery({
    queryKey: ['anime', type, page],
    queryFn: async () => {
      switch (type) {
        case 'trending':
          return jikanApi.getTopAnime({ page, filter: 'airing' });
        case 'latest':
          return jikanApi.getSeasonNow({ page });
        case 'topRated':
          return jikanApi.getTopAnime({ page, filter: 'favorite' });
        default:
          throw new Error('Invalid anime data type');
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useAnimeSchedule = (weekday?: string) => {
  return useQuery({
    queryKey: ['schedule', weekday],
    queryFn: () => jikanApi.getSchedule({ filter: weekday }),
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  });
};

export const useAnimeGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => jikanApi.getGenres(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchOnWindowFocus: false,
  });
};

export const useRandomAnime = () => {
  return useQuery({
    queryKey: ['random'],
    queryFn: () => jikanApi.getRandomAnime(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
