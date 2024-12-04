export interface Person {
  mal_id: number;
  url: string;
  website_url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  name: string;
  given_name: string;
  family_name: string;
  alternate_names: string[];
  birthday: string;
  favorites: number;
  about: string;
}

export interface VoiceActor extends Person {
  language: string;
}

export interface PersonResponse {
  data: Person;
}

export interface VoiceActorResponse {
  data: VoiceActor[];
}
