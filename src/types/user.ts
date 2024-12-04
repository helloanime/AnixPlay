export interface UserProfile {
  mal_id: number;
  username: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
    webp: {
      image_url: string;
    };
  };
  joined: string;
  last_online: string;
  gender: string;
  birthday: string;
  location: string;
  statistics: UserStatistics;
}

export interface UserStatistics {
  anime: {
    days_watched: number;
    mean_score: number;
    watching: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_watch: number;
    total_entries: number;
    rewatched: number;
    episodes_watched: number;
  };
  manga: {
    days_read: number;
    mean_score: number;
    reading: number;
    completed: number;
    on_hold: number;
    dropped: number;
    plan_to_read: number;
    total_entries: number;
    reread: number;
    chapters_read: number;
    volumes_read: number;
  };
}

export interface UserFavorites {
  anime: Array<{
    mal_id: number;
    title: string;
    url: string;
    type: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
  manga: Array<{
    mal_id: number;
    title: string;
    url: string;
    type: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
  characters: Array<{
    mal_id: number;
    name: string;
    url: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }>;
}
