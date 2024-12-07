const ANILIST_API_URL = 'https://graphql.anilist.co';

export interface AnimeData {
  id: number;
  title: {
    english: string;
    romaji: string;
  };
  coverImage: {
    large: string;
  };
  averageScore: number;
  episodes: number;
  status: string;
}

export const fetchTrendingAnime = async (): Promise<AnimeData[]> => {
  const query = `
    query {
      Page(page: 1, perPage: 4) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
          averageScore
          episodes
          status
        }
      }
    }
  `;

  try {
    const response = await fetch(ANILIST_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    return [];
  }
};
