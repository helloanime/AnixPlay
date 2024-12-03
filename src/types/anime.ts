// Base Response Types
export interface BaseResponse {
  pagination?: Pagination;
}

export interface AnimeResponse extends BaseResponse {
  data: Anime[];
}

export interface SingleAnimeResponse extends BaseResponse {
  data: Anime;
}

export interface EpisodeResponse extends BaseResponse {
  data: Episode[];
}

export interface CharacterResponse extends BaseResponse {
  data: Character[];
}

export interface RecommendationResponse extends BaseResponse {
  data: AnimeRecommendation[];
}

// Main Types
export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageFormat;
    webp: ImageFormat;
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: DateRange;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  genres: Genre[];
  studios: Studio[];
  demographics: Demographic[];
}

export interface Episode {
  mal_id: number;
  url: string;
  title: string;
  episode: string;
  aired: string;
  score: number;
  filler: boolean;
  recap: boolean;
  forum_url: string;
}

export interface Character {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageFormat;
    webp: ImageFormat;
  };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
  role: string;
}

export interface AnimeRecommendation {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: ImageFormat;
      webp: ImageFormat;
    };
    title: string;
  };
  url: string;
  votes: number;
}

// Supporting Types
export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface DateRange {
  from: string;
  to: string;
  prop: {
    from: DateProp;
    to: DateProp;
  };
  string: string;
}

interface DateProp {
  day: number;
  month: number;
  year: number;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Studio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

// Search Parameters
export interface AnimeSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: 'airing' | 'complete' | 'upcoming';
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  genres?: number[];
  order_by?: 'title' | 'type' | 'rating' | 'start_date' | 'end_date' | 'episodes' | 'score' | 'scored_by' | 'rank' | 'popularity' | 'members' | 'favorites';
  sort?: 'desc' | 'asc';
}
