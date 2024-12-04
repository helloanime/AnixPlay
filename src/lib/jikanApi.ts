import { AnimeSearchParams } from '../types/anime';
import { MangaSearchParams } from '../types/manga';
import { CommonResponse } from '../types/common';

const BASE_URL = 'https://api.jikan.moe/v4';
const RATE_LIMIT = 60;
const RATE_LIMIT_INTERVAL = 60000;
let requestCount = 0;
let lastRequestTime = Date.now();

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

const handleRateLimit = async () => {
  const now = Date.now();
  if (now - lastRequestTime >= RATE_LIMIT_INTERVAL) {
    requestCount = 0;
    lastRequestTime = now;
  }

  if (requestCount >= RATE_LIMIT) {
    const waitTime = RATE_LIMIT_INTERVAL - (now - lastRequestTime);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    requestCount = 0;
    lastRequestTime = Date.now();
  }
  requestCount++;
};

const fetchWithRateLimit = async <T>(endpoint: string, options: RequestInit = {}): Promise<CommonResponse<T>> => {
  await handleRateLimit();
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new APIError(response.status, `API Error: ${response.statusText}`);
  }

  return response.json();
};

const buildQueryString = (params: Record<string, any>) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
      }
      return `${key}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return query ? `?${query}` : '';
};

export const jikanApi = {
  // Anime Endpoints
  anime: {
    getTop: (page = 1, limit = 25, filter?: string) =>
      fetchWithRateLimit(`/top/anime${buildQueryString({ page, limit, filter })}`),
    search: (params: AnimeSearchParams) =>
      fetchWithRateLimit(`/anime${buildQueryString(params)}`),
    getById: (id: number, fields?: string[]) =>
      fetchWithRateLimit(`/anime/${id}${fields ? buildQueryString({ fields: fields.join(',') }) : ''}`),
    getEpisodes: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/episodes${buildQueryString({ page })}`),
    getEpisodeById: (id: number, episode: number) =>
      fetchWithRateLimit(`/anime/${id}/episodes/${episode}`),
    getCharacters: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/characters`),
    getStaff: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/staff`),
    getRecommendations: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/recommendations`),
    getPictures: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/pictures`),
    getStatistics: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/statistics`),
    getThemes: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/themes`),
    getRelations: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/relations`),
    getNews: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/news${buildQueryString({ page })}`),
    getForum: (id: number, filter?: string) =>
      fetchWithRateLimit(`/anime/${id}/forum${filter ? buildQueryString({ filter }) : ''}`),
    getVideos: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/videos`),
    getVideoEpisodes: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/videos/episodes${buildQueryString({ page })}`),
    getVideoPromos: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/videos/promo`),
    getMusicVideos: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/videos/music-videos`),
    getRandom: (nsfw?: boolean) =>
      fetchWithRateLimit(`/random/anime${nsfw ? buildQueryString({ nsfw }) : ''}`),
    getExternal: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/external`),
    getStreamingLinks: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/streaming`),
    getUserUpdates: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/userupdates${buildQueryString({ page })}`),
    getReviews: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/reviews${buildQueryString({ page })}`),
  },

  // Manga Endpoints
  manga: {
    getTop: (page = 1, limit = 25, filter?: string) =>
      fetchWithRateLimit(`/top/manga${buildQueryString({ page, limit, filter })}`),
    search: (params: MangaSearchParams) =>
      fetchWithRateLimit(`/manga${buildQueryString(params)}`),
    getById: (id: number) =>
      fetchWithRateLimit(`/manga/${id}`),
    getCharacters: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/characters`),
    getNews: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/news${buildQueryString({ page })}`),
    getReviews: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/reviews${buildQueryString({ page })}`),
    getRecommendations: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/recommendations`),
    getPictures: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/pictures`),
    getStatistics: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/statistics`),
    getMoreInfo: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/moreinfo`),
    getRandom: (nsfw?: boolean) =>
      fetchWithRateLimit(`/random/manga${nsfw ? buildQueryString({ nsfw }) : ''}`),
    getExternal: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/external`),
    getUserUpdates: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/userupdates${buildQueryString({ page })}`),
  },

  // Characters
  characters: {
    getById: (id: number) =>
      fetchWithRateLimit(`/characters/${id}`),
    getPictures: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/pictures`),
    getAnime: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/anime`),
    getManga: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/manga`),
    getVoiceActors: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/voices`),
    getRandom: () =>
      fetchWithRateLimit('/random/characters'),
  },

  // People
  people: {
    getById: (id: number) =>
      fetchWithRateLimit(`/people/${id}`),
    getAnime: (id: number) =>
      fetchWithRateLimit(`/people/${id}/anime`),
    getManga: (id: number) =>
      fetchWithRateLimit(`/people/${id}/manga`),
    getPictures: (id: number) =>
      fetchWithRateLimit(`/people/${id}/pictures`),
    getVoices: (id: number) =>
      fetchWithRateLimit(`/people/${id}/voices`),
    getRandom: () =>
      fetchWithRateLimit('/random/people'),
  },

  // Seasonal
  seasons: {
    getCurrent: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/seasons/now${buildQueryString({ page, filter })}`),
    get: (year: number, season: string, page = 1, filter?: string) =>
      fetchWithRateLimit(`/seasons/${year}/${season}${buildQueryString({ page, filter })}`),
    getList: () =>
      fetchWithRateLimit('/seasons'),
    getUpcoming: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/seasons/upcoming${buildQueryString({ page, filter })}`),
  },

  // Watch Lists
  watch: {
    getRecentEpisodes: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/watch/episodes${buildQueryString({ page, filter })}`),
    getPopularEpisodes: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/watch/episodes/popular${buildQueryString({ page, filter })}`),
    getRecentPromos: (page = 1) =>
      fetchWithRateLimit(`/watch/promos${buildQueryString({ page })}`),
    getPopularPromos: (page = 1) =>
      fetchWithRateLimit(`/watch/promos/popular${buildQueryString({ page })}`),
  },

  // Reviews
  reviews: {
    getRecentAnime: (page = 1) =>
      fetchWithRateLimit(`/reviews/anime${buildQueryString({ page })}`),
    getRecentManga: (page = 1) =>
      fetchWithRateLimit(`/reviews/manga${buildQueryString({ page })}`),
  },

  // Recommendations
  recommendations: {
    getRecentAnime: (page = 1) =>
      fetchWithRateLimit(`/recommendations/anime${buildQueryString({ page })}`),
    getRecentManga: (page = 1) =>
      fetchWithRateLimit(`/recommendations/manga${buildQueryString({ page })}`),
  },

  // Users
  users: {
    getById: (username: string) =>
      fetchWithRateLimit(`/users/${username}`),
    getProfile: (username: string) =>
      fetchWithRateLimit(`/users/${username}/profile`),
    getStatistics: (username: string) =>
      fetchWithRateLimit(`/users/${username}/statistics`),
    getFavorites: (username: string) =>
      fetchWithRateLimit(`/users/${username}/favorites`),
    getHistory: (username: string, type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/users/${username}/history${type ? `/${type}` : ''}`),
    getFriends: (username: string, page = 1) =>
      fetchWithRateLimit(`/users/${username}/friends${buildQueryString({ page })}`),
    getReviews: (username: string, page = 1) =>
      fetchWithRateLimit(`/users/${username}/reviews${buildQueryString({ page })}`),
    getRecommendations: (username: string, page = 1) =>
      fetchWithRateLimit(`/users/${username}/recommendations${buildQueryString({ page })}`),
    getClubs: (username: string, page = 1) =>
      fetchWithRateLimit(`/users/${username}/clubs${buildQueryString({ page })}`),
    getExternal: (username: string) =>
      fetchWithRateLimit(`/users/${username}/external`),
  },

  // Clubs
  clubs: {
    getById: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}`),
    getMembers: (id: number, page = 1) =>
      fetchWithRateLimit(`/clubs/${id}/members${buildQueryString({ page })}`),
    getStaff: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}/staff`),
    getRelations: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}/relations`),
  },

  // Genres
  genres: {
    getAnime: () =>
      fetchWithRateLimit('/genres/anime'),
    getManga: () =>
      fetchWithRateLimit('/genres/manga'),
    getExplicitAnime: () =>
      fetchWithRateLimit('/genres/explicit'),
    getThemes: () =>
      fetchWithRateLimit('/genres/themes'),
    getDemographics: () =>
      fetchWithRateLimit('/genres/demographics'),
  },

  // Producers
  producers: {
    getAll: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/producers${buildQueryString({ page, filter })}`),
    getById: (id: number, filter?: string) =>
      fetchWithRateLimit(`/producers/${id}${filter ? buildQueryString({ filter }) : ''}`),
    getExternal: (id: number) =>
      fetchWithRateLimit(`/producers/${id}/external`),
    getFull: (id: number) =>
      fetchWithRateLimit(`/producers/${id}/full`),
  },

  // Magazines
  magazines: {
    getAll: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/magazines${buildQueryString({ page, filter })}`),
    getById: (id: number, filter?: string) =>
      fetchWithRateLimit(`/magazines/${id}${filter ? buildQueryString({ filter }) : ''}`),
  },

  // Schedule
  schedule: {
    get: (day?: string, page = 1, filter?: string) =>
      fetchWithRateLimit(`/schedules${day ? `/${day}` : ''}${buildQueryString({ page, filter })}`),
  },

  // Top
  top: {
    getAnime: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/top/anime${buildQueryString({ page, filter })}`),
    getManga: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/top/manga${buildQueryString({ page, filter })}`),
    getPeople: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/top/people${buildQueryString({ page, filter })}`),
    getCharacters: (page = 1, filter?: string) =>
      fetchWithRateLimit(`/top/characters${buildQueryString({ page, filter })}`),
    getReviews: (page = 1, type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/top/reviews${type ? `/${type}` : ''}${buildQueryString({ page })}`),
  },
};
