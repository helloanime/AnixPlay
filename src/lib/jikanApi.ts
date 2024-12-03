import type {
  AnimeSearchParams,
  MangaSearchParams,
  CharacterSearchParams,
  PersonSearchParams,
  ClubSearchParams,
} from '../types/jikan';

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting configuration
const RATE_LIMIT = 60; // requests per minute
const RATE_LIMIT_INTERVAL = 60000; // 1 minute in milliseconds
const RATE_LIMIT_BUFFER = 100; // ms buffer between requests
let requestCount = 0;
let lastRequestTime = Date.now();

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

// Rate limiting handler
const handleRateLimit = async () => {
  const now = Date.now();
  if (now - lastRequestTime >= RATE_LIMIT_INTERVAL) {
    requestCount = 0;
    lastRequestTime = now;
  }

  if (requestCount >= RATE_LIMIT) {
    const waitTime = RATE_LIMIT_INTERVAL - (now - lastRequestTime) + RATE_LIMIT_BUFFER;
    await new Promise(resolve => setTimeout(resolve, waitTime));
    requestCount = 0;
    lastRequestTime = Date.now();
  }

  // Add small buffer between requests
  if (requestCount > 0) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_BUFFER));
  }

  requestCount++;
};

// Generic fetch handler with rate limiting and error handling
const fetchWithRateLimit = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
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

// Helper function to build query string
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
    search: (params: AnimeSearchParams) =>
      fetchWithRateLimit(`/anime${buildQueryString(params)}`),

    getById: (id: number) =>
      fetchWithRateLimit(`/anime/${id}`),

    getCharacters: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/characters`),

    getStaff: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/staff`),

    getEpisodes: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/episodes${buildQueryString({ page })}`),

    getNews: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/news${buildQueryString({ page })}`),

    getForum: (id: number, filter?: string) =>
      fetchWithRateLimit(`/anime/${id}/forum${filter ? buildQueryString({ filter }) : ''}`),

    getPictures: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/pictures`),

    getVideos: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/videos`),

    getStatistics: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/statistics`),

    getMoreInfo: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/moreinfo`),

    getRecommendations: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/recommendations`),

    getUserUpdates: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/userupdates${buildQueryString({ page })}`),

    getReviews: (id: number, page = 1) =>
      fetchWithRateLimit(`/anime/${id}/reviews${buildQueryString({ page })}`),

    getRelations: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/relations`),

    getThemes: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/themes`),

    getExternal: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/external`),

    getStreamingLinks: (id: number) =>
      fetchWithRateLimit(`/anime/${id}/streaming`),
  },

  // Manga Endpoints
  manga: {
    search: (params: MangaSearchParams) =>
      fetchWithRateLimit(`/manga${buildQueryString(params)}`),

    getById: (id: number) =>
      fetchWithRateLimit(`/manga/${id}`),

    getCharacters: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/characters`),

    getNews: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/news${buildQueryString({ page })}`),

    getForum: (id: number, filter?: string) =>
      fetchWithRateLimit(`/manga/${id}/forum${filter ? buildQueryString({ filter }) : ''}`),

    getPictures: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/pictures`),

    getStatistics: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/statistics`),

    getMoreInfo: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/moreinfo`),

    getRecommendations: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/recommendations`),

    getUserUpdates: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/userupdates${buildQueryString({ page })}`),

    getReviews: (id: number, page = 1) =>
      fetchWithRateLimit(`/manga/${id}/reviews${buildQueryString({ page })}`),

    getRelations: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/relations`),

    getExternal: (id: number) =>
      fetchWithRateLimit(`/manga/${id}/external`),
  },

  // Character Endpoints
  characters: {
    search: (params: CharacterSearchParams) =>
      fetchWithRateLimit(`/characters${buildQueryString(params)}`),

    getById: (id: number) =>
      fetchWithRateLimit(`/characters/${id}`),

    getAnime: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/anime`),

    getManga: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/manga`),

    getVoiceActors: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/voices`),

    getPictures: (id: number) =>
      fetchWithRateLimit(`/characters/${id}/pictures`),
  },

  // People Endpoints
  people: {
    search: (params: PersonSearchParams) =>
      fetchWithRateLimit(`/people${buildQueryString(params)}`),

    getById: (id: number) =>
      fetchWithRateLimit(`/people/${id}`),

    getAnime: (id: number) =>
      fetchWithRateLimit(`/people/${id}/anime`),

    getManga: (id: number) =>
      fetchWithRateLimit(`/people/${id}/manga`),

    getVoices: (id: number) =>
      fetchWithRateLimit(`/people/${id}/voices`),

    getPictures: (id: number) =>
      fetchWithRateLimit(`/people/${id}/pictures`),
  },

  // Season Endpoints
  seasons: {
    list: () =>
      fetchWithRateLimit('/seasons'),

    getCurrent: (page = 1) =>
      fetchWithRateLimit(`/seasons/now${buildQueryString({ page })}`),

    getUpcoming: (page = 1) =>
      fetchWithRateLimit(`/seasons/upcoming${buildQueryString({ page })}`),

    getSeason: (year: number, season: string, page = 1) =>
      fetchWithRateLimit(`/seasons/${year}/${season}${buildQueryString({ page })}`),
  },

  // Schedule Endpoints
  schedules: {
    get: (filter?: string, page = 1) =>
      fetchWithRateLimit(`/schedules${filter ? `/${filter}` : ''}${buildQueryString({ page })}`),
  },

  // Top Endpoints
  top: {
    getAnime: (filter?: string, page = 1) =>
      fetchWithRateLimit(`/top/anime${filter ? `/${filter}` : ''}${buildQueryString({ page })}`),

    getManga: (filter?: string, page = 1) =>
      fetchWithRateLimit(`/top/manga${filter ? `/${filter}` : ''}${buildQueryString({ page })}`),

    getPeople: (page = 1) =>
      fetchWithRateLimit(`/top/people${buildQueryString({ page })}`),

    getCharacters: (page = 1) =>
      fetchWithRateLimit(`/top/characters${buildQueryString({ page })}`),

    getReviews: (page = 1, type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/top/reviews${type ? `/${type}` : ''}${buildQueryString({ page })}`),
  },

  // Genre Endpoints
  genres: {
    getAnime: () =>
      fetchWithRateLimit('/genres/anime'),

    getManga: () =>
      fetchWithRateLimit('/genres/manga'),
  },

  // Producer Endpoints
  producers: {
    getAll: (page = 1) =>
      fetchWithRateLimit(`/producers${buildQueryString({ page })}`),

    getById: (id: number, page = 1) =>
      fetchWithRateLimit(`/producers/${id}/external${buildQueryString({ page })}`),
  },

  // Magazine Endpoints
  magazines: {
    getAll: (page = 1) =>
      fetchWithRateLimit(`/magazines${buildQueryString({ page })}`),
  },

  // Club Endpoints
  clubs: {
    search: (params: ClubSearchParams) =>
      fetchWithRateLimit(`/clubs${buildQueryString(params)}`),

    getById: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}`),

    getMembers: (id: number, page = 1) =>
      fetchWithRateLimit(`/clubs/${id}/members${buildQueryString({ page })}`),

    getStaff: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}/staff`),

    getRelations: (id: number) =>
      fetchWithRateLimit(`/clubs/${id}/relations`),
  },

  // Reviews Endpoints
  reviews: {
    getRecent: (page = 1, type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/reviews${type ? `/${type}` : ''}${buildQueryString({ page })}`),
  },

  // Recommendations Endpoints
  recommendations: {
    getRecent: (page = 1, type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/recommendations${type ? `/${type}` : ''}${buildQueryString({ page })}`),
  },

  // Random Endpoints
  random: {
    getAnime: () =>
      fetchWithRateLimit('/random/anime'),

    getManga: () =>
      fetchWithRateLimit('/random/manga'),

    getCharacter: () =>
      fetchWithRateLimit('/random/characters'),

    getPerson: () =>
      fetchWithRateLimit('/random/people'),

    getUserReview: (type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/random/reviews${type ? `/${type}` : ''}`),

    getRecommendation: (type?: 'anime' | 'manga') =>
      fetchWithRateLimit(`/random/recommendations${type ? `/${type}` : ''}`),
  },

  // Watch Endpoints
  watch: {
    getRecent: (page = 1) =>
      fetchWithRateLimit(`/watch/episodes${buildQueryString({ page })}`),

    getPopular: (page = 1) =>
      fetchWithRateLimit(`/watch/episodes/popular${buildQueryString({ page })}`),

    getPromos: (page = 1) =>
      fetchWithRateLimit(`/watch/promos${buildQueryString({ page })}`),
  },
};
