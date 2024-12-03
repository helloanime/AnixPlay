import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  AnimeResponse,
  SingleAnimeResponse,
  EpisodeResponse,
  CharacterResponse,
  RecommendationResponse,
  AnimeSearchParams
} from '../types/anime';

// Anime Queries
export const useTopAnime = (page = 1, limit = 25) => {
  return useQuery<AnimeResponse>({
    queryKey: ['topAnime', page, limit],
    queryFn: () => api.getTopAnime(page, limit),
  });
};

export const useInfiniteTopAnime = (limit = 25) => {
  return useInfiniteQuery<AnimeResponse>({
    queryKey: ['infiniteTopAnime', limit],
    queryFn: ({ pageParam = 1 }) => api.getTopAnime(pageParam, limit),
    getNextPageParam: (lastPage) => 
      lastPage.pagination?.has_next_page 
        ? lastPage.pagination.current_page + 1 
        : undefined,
  });
};

export const useAnimeSearch = (params: AnimeSearchParams) => {
  return useQuery<AnimeResponse>({
    queryKey: ['animeSearch', params],
    queryFn: () => api.searchAnime(params),
    enabled: !!params.q, // Only run query if search term exists
  });
};

export const useInfiniteAnimeSearch = (params: AnimeSearchParams) => {
  return useInfiniteQuery<AnimeResponse>({
    queryKey: ['infiniteAnimeSearch', params],
    queryFn: ({ pageParam = 1 }) => 
      api.searchAnime({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!params.q,
  });
};

export const useAnimeById = (id: number) => {
  return useQuery<SingleAnimeResponse>({
    queryKey: ['anime', id],
    queryFn: () => api.getAnimeById(id),
    enabled: !!id,
  });
};

export const useAnimeEpisodes = (id: number, page = 1) => {
  return useQuery<EpisodeResponse>({
    queryKey: ['animeEpisodes', id, page],
    queryFn: () => api.getAnimeEpisodes(id, page),
    enabled: !!id,
  });
};

export const useInfiniteAnimeEpisodes = (id: number) => {
  return useInfiniteQuery<EpisodeResponse>({
    queryKey: ['infiniteAnimeEpisodes', id],
    queryFn: ({ pageParam = 1 }) => api.getAnimeEpisodes(id, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!id,
  });
};

export const useAnimeCharacters = (id: number) => {
  return useQuery<CharacterResponse>({
    queryKey: ['animeCharacters', id],
    queryFn: () => api.getAnimeCharacters(id),
    enabled: !!id,
  });
};

export const useAnimeStaff = (id: number) => {
  return useQuery({
    queryKey: ['animeStaff', id],
    queryFn: () => api.getAnimeStaff(id),
    enabled: !!id,
  });
};

export const useAnimeRecommendations = (id: number) => {
  return useQuery<RecommendationResponse>({
    queryKey: ['animeRecommendations', id],
    queryFn: () => api.getAnimeRecommendations(id),
    enabled: !!id,
  });
};

// Season Queries
export const useSeasonalAnime = (year: number, season: string, page = 1) => {
  return useQuery<AnimeResponse>({
    queryKey: ['seasonalAnime', year, season, page],
    queryFn: () => api.getSeasonAnime(year, season, page),
    enabled: !!year && !!season,
  });
};

export const useInfiniteSeasonalAnime = (year: number, season: string) => {
  return useInfiniteQuery<AnimeResponse>({
    queryKey: ['infiniteSeasonalAnime', year, season],
    queryFn: ({ pageParam = 1 }) => api.getSeasonAnime(year, season, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!year && !!season,
  });
};

export const useCurrentSeasonAnime = (page = 1) => {
  return useQuery<AnimeResponse>({
    queryKey: ['currentSeasonAnime', page],
    queryFn: () => api.getCurrentSeasonAnime(page),
  });
};

export const useInfiniteCurrentSeasonAnime = () => {
  return useInfiniteQuery<AnimeResponse>({
    queryKey: ['infiniteCurrentSeasonAnime'],
    queryFn: ({ pageParam = 1 }) => api.getCurrentSeasonAnime(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
};

// Utility Queries
export const useAnimeGenres = () => {
  return useQuery({
    queryKey: ['animeGenres'],
    queryFn: () => api.getAnimeGenres(),
  });
};

export const useSchedule = (day?: string) => {
  return useQuery({
    queryKey: ['schedule', day],
    queryFn: () => api.getSchedule(day),
  });
};

export const useRandomAnime = () => {
  return useQuery<SingleAnimeResponse>({
    queryKey: ['randomAnime'],
    queryFn: () => api.getRandomAnime(),
  });
};
