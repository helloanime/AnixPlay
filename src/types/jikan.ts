// Common Types
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

export interface BaseResponse {
  pagination?: Pagination;
}

export interface Image {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface Images {
  jpg: Image;
  webp: Image;
}

export interface Title {
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

// Anime Types
export interface AnimeResponse extends BaseResponse {
  data: Anime[];
}

export interface SingleAnimeResponse extends BaseResponse {
  data: Anime;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      image_url: string;
      small_image_url: string;
      medium_image_url: string;
      large_image_url: string;
      maximum_image_url: string;
    };
  };
  approved: boolean;
  titles: Title[];
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
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: Producer[];
  licensors: Producer[];
  studios: Studio[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
  relations: Relation[];
  theme: {
    openings: string[];
    endings: string[];
  };
  external: External[];
  streaming: External[];
}

// Manga Types
export interface MangaResponse extends BaseResponse {
  data: Manga[];
}

export interface SingleMangaResponse extends BaseResponse {
  data: Manga;
}

export interface Manga {
  mal_id: number;
  url: string;
  images: Images;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: DateRange;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  authors: Author[];
  serializations: Magazine[];
  genres: Genre[];
  explicit_genres: Genre[];
  themes: Genre[];
  demographics: Genre[];
  relations: Relation[];
  external: External[];
}

// Character Types
export interface CharacterResponse extends BaseResponse {
  data: Character[];
}

export interface SingleCharacterResponse extends BaseResponse {
  data: Character;
}

export interface Character {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
  anime: CharacterRole[];
  manga: CharacterRole[];
  voices: VoiceActor[];
}

export interface CharacterRole {
  role: string;
  anime?: Anime;
  manga?: Manga;
}

// People Types
export interface PeopleResponse extends BaseResponse {
  data: Person[];
}

export interface SinglePersonResponse extends BaseResponse {
  data: Person;
}

export interface Person {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: string;
  favorites: number;
  about: string;
  anime: StaffRole[];
  manga: PublishedManga[];
  voices: VoiceRole[];
}

// User Types
export interface UserResponse extends BaseResponse {
  data: User[];
}

export interface SingleUserResponse extends BaseResponse {
  data: User;
}

export interface User {
  url: string;
  username: string;
  images: Images;
  last_online: string;
  gender: string;
  birthday: string;
  location: string;
  joined: string;
  statistics: UserStatistics;
  favorites: UserFavorites;
  updates: UserUpdates;
}

// Producer/Studio Types
export interface ProducerResponse extends BaseResponse {
  data: Producer[];
}

export interface Producer {
  mal_id: number;
  url: string;
  titles: Title[];
  established: string;
  favorites: number;
  count: number;
}

export interface Studio extends Producer {}

// Magazine Types
export interface MagazineResponse extends BaseResponse {
  data: Magazine[];
}

export interface Magazine {
  mal_id: number;
  url: string;
  name: string;
  count: number;
}

// Review Types
export interface ReviewResponse extends BaseResponse {
  data: Review[];
}

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
}

// Club Types
export interface ClubResponse extends BaseResponse {
  data: Club[];
}

export interface Club {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
  members: number;
  category: string;
  created: string;
  access: string;
}

// Supporting Types
export interface VoiceActor {
  person: Person;
  language: string;
}

export interface StaffRole {
  position: string;
  anime: Anime;
}

export interface PublishedManga {
  position: string;
  manga: Manga;
}

export interface VoiceRole {
  role: string;
  anime: Anime;
  character: Character;
}

export interface Author {
  mal_id: number;
  url: string;
  name: string;
}

export interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Relation {
  relation: string;
  entry: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

export interface External {
  name: string;
  url: string;
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
  anime: FavoriteAnime[];
  manga: FavoriteManga[];
  characters: FavoriteCharacter[];
  people: FavoritePerson[];
}

export interface UserUpdates {
  anime: AnimeUpdate[];
  manga: MangaUpdate[];
}

interface FavoriteAnime {
  type: string;
  start_year: number;
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

interface FavoriteManga extends FavoriteAnime {}

interface FavoriteCharacter {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}

interface FavoritePerson extends FavoriteCharacter {}

interface AnimeUpdate {
  entry: {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
  };
  score: number;
  status: string;
  episodes_seen: number;
  episodes_total: number;
  date: string;
}

interface MangaUpdate {
  entry: {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
  };
  score: number;
  status: string;
  chapters_read: number;
  chapters_total: number;
  volumes_read: number;
  volumes_total: number;
  date: string;
}

// Search Parameters
export interface BaseSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: string;
  sort?: 'desc' | 'asc';
  letter?: string;
}

export interface AnimeSearchParams extends BaseSearchParams {
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: 'airing' | 'complete' | 'upcoming';
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  sfw?: boolean;
  genres?: number[];
  genres_exclude?: number[];
  producers?: number[];
  start_date?: string;
  end_date?: string;
}

export interface MangaSearchParams extends BaseSearchParams {
  type?: 'manga' | 'novel' | 'lightnovel' | 'oneshot' | 'doujin' | 'manhwa' | 'manhua';
  score?: number;
  min_score?: number;
  max_score?: number;
  status?: 'publishing' | 'complete' | 'hiatus' | 'discontinued' | 'upcoming';
  sfw?: boolean;
  genres?: number[];
  genres_exclude?: number[];
  magazines?: number[];
  start_date?: string;
  end_date?: string;
}

export interface CharacterSearchParams extends BaseSearchParams {}
export interface PersonSearchParams extends BaseSearchParams {}
export interface ClubSearchParams extends BaseSearchParams {}
