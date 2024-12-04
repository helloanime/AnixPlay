export interface MangaSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: string;
  rating?: string;
  genres?: string;
  order_by?: string;
  sort?: 'desc' | 'asc';
}

export interface Manga {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: {
    from: string;
    to: string;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
  };
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
  genres: Array<{
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }>;
}
