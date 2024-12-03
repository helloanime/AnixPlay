import { AnimeSearchParams } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting configuration
const RATE_LIMIT = 60; // requests per minute
const RATE_LIMIT_INTERVAL = 60000; // 1 minute in milliseconds
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
    const waitTime = RATE_LIMIT_INTERVAL - (now - lastRequestTime);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    requestCount = 0;
    lastRequestTime = Date.now();
  }

  requestCount++;
};

// Generic fetch handler with rate limiting and error handling
const fetchWithRateLimit = async (endpoint: string, options: RequestInit = {}) => {
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

export const api = {
  // Anime Endpoints
  getTopAnime: (page = 1, limit = 25) =>
    fetchWithRateLimit(`/top/anime${buildQueryString({ page, limit })}`),

  searchAnime: (params: AnimeSearchParams) =>
    fetchWithRateLimit(`/anime${buildQueryString(params)}`),

  getAnimeById: (id: number) =>
    fetchWithRateLimit(`/anime/${id}`),

  getAnimeEpisodes: (id: number, page = 1) =>
    fetchWithRateLimit(`/anime/${id}/episodes${buildQueryString({ page })}`),

  getAnimeCharacters: (id: number) =>
    fetchWithRateLimit(`/anime/${id}/characters`),

  getAnimeStaff: (id: number) =>
    fetchWithRateLimit(`/anime/${id}/staff`),

  getAnimeRecommendations: (id: number) =>
    fetchWithRateLimit(`/anime/${id}/recommendations`),

  // Season Endpoints
  getCurrentSeasonAnime: (page = 1) =>
    fetchWithRateLimit(`/seasons/now${buildQueryString({ page })}`),

  getSeasonAnime: (year: number, season: string, page = 1) =>
    fetchWithRateLimit(`/seasons/${year}/${season}${buildQueryString({ page })}`),

  getSeasonsList: () =>
    fetchWithRateLimit('/seasons'),

  // Genre Endpoints
  getAnimeGenres: () =>
    fetchWithRateLimit('/genres/anime'),

  // Schedule Endpoints
  getSchedule: (day?: string) =>
    fetchWithRateLimit(`/schedules${day ? `/${day}` : ''}`),

  // Random Anime
  getRandomAnime: () =>
    fetchWithRateLimit('/random/anime'),

  // Watch Episodes (Note: This is a placeholder as Jikan doesn't provide streaming links)
  getStreamingLinks: (id: number, episode: number) => {
    // This is where you would implement your own streaming service integration
    throw new Error('Streaming links functionality needs to be implemented');
  },
};
