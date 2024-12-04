import { Entry, Pagination } from './common';

export interface ApiResponse<T> {
  data: T;
  pagination?: Pagination;
}

export interface SeasonalResponse {
  data: {
    seasons: Array<{
      year: number;
      seasons: string[];
    }>;
  };
}

export interface GenreResponse {
  data: Array<{
    mal_id: number;
    name: string;
    url: string;
    count: number;
  }>;
}

export interface ProducerResponse {
  data: Array<{
    mal_id: number;
    name: string;
    url: string;
    titles: string[];
    established: string;
    count: number;
  }>;
}

export interface MagazineResponse {
  data: Array<{
    mal_id: number;
    name: string;
    url: string;
    count: number;
  }>;
}

export interface ClubResponse {
  data: {
    mal_id: number;
    name: string;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    members: number;
    category: string;
    created: string;
    access: string;
  };
}

export interface WatchEpisodeResponse {
  data: Array<{
    entry: Entry;
    episodes: Array<{
      mal_id: number;
      url: string;
      title: string;
      premium: boolean;
    }>;
    region_locked: boolean;
  }>;
}

export interface PromoResponse {
  data: Array<{
    title: string;
    trailer: {
      youtube_id: string;
      url: string;
      embed_url: string;
    };
  }>;
}
