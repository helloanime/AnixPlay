export interface Character {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
    };
  };
  name: string;
  name_kanji: string;
  nicknames: string[];
  favorites: number;
  about: string;
}

export interface CharacterRole {
  role: string;
  character: Character;
  voice_actors: Array<{
    person: {
      mal_id: number;
      url: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
      name: string;
    };
    language: string;
  }>;
}

export interface CharacterResponse {
  data: Character;
}

export interface CharacterRoleResponse {
  data: CharacterRole[];
}
