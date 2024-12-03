import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { jikanApi } from '../lib/jikanApi';
import type {
  AnimeSearchParams,
  MangaSearchParams,
  CharacterSearchParams,
  PersonSearchParams,
  ClubSearchParams,
} from '../types/jikan';

// Anime Hooks
export const useAnimeSearch = (params: AnimeSearchParams) => {
  return useQuery({
    queryKey: ['animeSearch', params],
    queryFn: () => jikanApi.anime.search(params),
    enabled: !!params.q,
  });
};

export const useInfiniteAnimeSearch = (params: AnimeSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['infiniteAnimeSearch', params],
    queryFn: ({ pageParam = 1 }) => 
      jikanApi.anime.search({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!params.q,
  });
};

export const useAnimeById = (id: number) => {
  return useQuery({
    queryKey: ['anime', id],
    queryFn: () => jikanApi.anime.getById(id),
    enabled: !!id,
  });
};

export const useAnimeCharacters = (id: number) => {
  return useQuery({
    queryKey: ['animeCharacters', id],
    queryFn: () => jikanApi.anime.getCharacters(id),
    enabled: !!id,
  });
};

export const useAnimeStaff = (id: number) => {
  return useQuery({
    queryKey: ['animeStaff', id],
    queryFn: () => jikanApi.anime.getStaff(id),
    enabled: !!id,
  });
};

export const useAnimeEpisodes = (id: number, page = 1) => {
  return useQuery({
    queryKey: ['animeEpisodes', id, page],
    queryFn: () => jikanApi.anime.getEpisodes(id, page),
    enabled: !!id,
  });
};

export const useInfiniteAnimeEpisodes = (id: number) => {
  return useInfiniteQuery({
    queryKey: ['infiniteAnimeEpisodes', id],
    queryFn: ({ pageParam = 1 }) => jikanApi.anime.getEpisodes(id, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!id,
  });
};

// Manga Hooks
export const useMangaSearch = (params: MangaSearchParams) => {
  return useQuery({
    queryKey: ['mangaSearch', params],
    queryFn: () => jikanApi.manga.search(params),
    enabled: !!params.q,
  });
};

export const useInfiniteMangaSearch = (params: MangaSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMangaSearch', params],
    queryFn: ({ pageParam = 1 }) => 
      jikanApi.manga.search({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!params.q,
  });
};

export const useMangaById = (id: number) => {
  return useQuery({
    queryKey: ['manga', id],
    queryFn: () => jikanApi.manga.getById(id),
    enabled: !!id,
  });
};

// Character Hooks
export const useCharacterSearch = (params: CharacterSearchParams) => {
  return useQuery({
    queryKey: ['characterSearch', params],
    queryFn: () => jikanApi.characters.search(params),
    enabled: !!params.q,
  });
};

export const useInfiniteCharacterSearch = (params: CharacterSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['infiniteCharacterSearch', params],
    queryFn: ({ pageParam = 1 }) => 
      jikanApi.characters.search({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!params.q,
  });
};

export const useCharacterById = (id: number) => {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => jikanApi.characters.getById(id),
    enabled: !!id,
  });
};

// People Hooks
export const usePeopleSearch = (params: PersonSearchParams) => {
  return useQuery({
    queryKey: ['peopleSearch', params],
    queryFn: () => jikanApi.people.search(params),
    enabled: !!params.q,
  });
};

export const useInfinitePeopleSearch = (params: PersonSearchParams) => {
  return useInfiniteQuery({
    queryKey: ['infinitePeopleSearch', params],
    queryFn: ({ pageParam = 1 }) => 
      jikanApi.people.search({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
    enabled: !!params.q,
  });
};

export const usePersonById = (id: number) => {
  return useQuery({
    queryKey: ['person', id],
    queryFn: () => jikanApi.people.getById(id),
    enabled: !!id,
  });
};

// Season Hooks
export const useSeasonsList = () => {
  return useQuery({
    queryKey: ['seasons'],
    queryFn: () => jikanApi.seasons.list(),
  });
};

export const useCurrentSeason = (page = 1) => {
  return useQuery({
    queryKey: ['currentSeason', page],
    queryFn: () => jikanApi.seasons.getCurrent(page),
  });
};

export const useInfiniteCurrentSeason = () => {
  return useInfiniteQuery({
    queryKey: ['infiniteCurrentSeason'],
    queryFn: ({ pageParam = 1 }) => jikanApi.seasons.getCurrent(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
};

export const useUpcomingSeason = (page = 1) => {
  return useQuery({
    queryKey: ['upcomingSeason', page],
    queryFn: () => jikanApi.seasons.getUpcoming(page),
  });
};

export const useSeason = (year: number, season: string, page = 1) => {
  return useQuery({
    queryKey: ['season', year, season, page],
    queryFn: () => jikanApi.seasons.getSeason(year, season, page),
    enabled: !!year && !!season,
  });
};

// Schedule Hooks
export const useSchedule = (filter?: string, page = 1) => {
  return useQuery({
    queryKey: ['schedule', filter, page],
    queryFn: () => jikanApi.schedules.get(filter, page),
  });
};

// Top Hooks
export const useTopAnime = (filter?: string, page = 1) => {
  return useQuery({
    queryKey: ['topAnime', filter, page],
    queryFn: () => jikanApi.top.getAnime(filter, page),
  });
};

export const useInfiniteTopAnime = (filter?: string) => {
  return useInfiniteQuery({
    queryKey: ['infiniteTopAnime', filter],
    queryFn: ({ pageParam = 1 }) => jikanApi.top.getAnime(filter, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.has_next_page
        ? lastPage.pagination.current_page + 1
        : undefined,
  });
};

export const useTopManga = (filter?: string, page = 1) => {
  return useQuery({
    queryKey: ['topManga', filter, page],
    queryFn: () => jikanApi.top.getManga(filter, page),
  });
};

// Genre Hooks
export const useAnimeGenres = () => {
  return useQuery({
    queryKey: ['animeGenres'],
    queryFn: () => jikanApi.genres.getAnime(),
  });
};

export const useMangaGenres = () => {
  return useQuery({
    queryKey: ['mangaGenres'],
    queryFn: () => jikanApi.genres.getManga(),
  });
};

// Producer Hooks
export const useProducers = (page = 1) => {
  return useQuery({
    queryKey: ['producers', page],
    queryFn: () => jikanApi.producers.getAll(page),
  });
};

// Magazine Hooks
export const useMagazines = (page = 1) => {
  return useQuery({
    queryKey: ['magazines', page],
    queryFn: () => jikanApi.magazines.getAll(page),
  });
};

// Club Hooks
export const useClubSearch = (params: ClubSearchParams) => {
  return useQuery({
    queryKey: ['clubSearch', params],
    queryFn: () => jikanApi.clubs.search(params),
    enabled: !!params.q,
  });
};

export const useClubById = (id: number) => {
  return useQuery({
    queryKey: ['club', id],
    queryFn: () => jikanApi.clubs.getById(id),
    enabled: !!id,
  });
};

// Reviews Hooks
export const useRecentReviews = (page = 1, type?: 'anime' | 'manga') => {
  return useQuery({
    queryKey: ['recentReviews', type, page],
    queryFn: () => jikanApi.reviews.getRecent(page, type),
  });
};

// Random Hooks
export const useRandomAnime = () => {
  return useQuery({
    queryKey: ['randomAnime'],
    queryFn: () => jikanApi.random.getAnime(),
  });
};

export const useRandomManga = () => {
  return useQuery({
    queryKey: ['randomManga'],
    queryFn: () => jikanApi.random.getManga(),
  });
};

// Watch Hooks
export const useRecentEpisodes = (page = 1) => {
  return useQuery({
    queryKey: ['recentEpisodes', page],
    queryFn: () => jikanApi.watch.getRecent(page),
  });
};

export const usePopularEpisodes = (page = 1) => {
  return useQuery({
    queryKey: ['popularEpisodes', page],
    queryFn: () => jikanApi.watch.getPopular(page),
  });
};

export const usePromos = (page = 1) => {
  return useQuery({
    queryKey: ['promos', page],
    queryFn: () => jikanApi.watch.getPromos(page),
  });
};
