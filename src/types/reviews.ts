export interface Review {
  mal_id: number;
  url: string;
  type: string;
  reactions: {
    overall: number;
    nice: number;
    love_it: number;
    funny: number;
    confusing: number;
    informative: number;
    well_written: number;
    creative: number;
  };
  date: string;
  review: string;
  score: number;
  tags: string[];
  is_spoiler: boolean;
  is_preliminary: boolean;
  episodes_watched?: number;
  chapters_read?: number;
  user: {
    url: string;
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  };
}

export interface ReviewResponse {
  data: Review[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}
