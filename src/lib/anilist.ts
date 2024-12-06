const ANILIST_API = 'https://graphql.anilist.co';

// Rate limiting configuration
const RATE_LIMIT = 90; // requests per minute
const RATE_LIMIT_INTERVAL = 60000; // 1 minute in milliseconds
let requestCount = 0;
let lastRequestTime = Date.now();

const searchAnimeQuery = `
  query ($id: Int, $search: String) {
    Media (id: $id, search: $search, type: ANIME) {
      id
      idMal
      title {
        romaji
        english
        native
      }
      bannerImage
      coverImage {
        extraLarge
        large
      }
      startDate {
        year
        month
        day
      }
      format
      status
      episodes
      popularity
      averageScore
      season
      seasonYear
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
      duration
    }
  }
`;

const trendingAnimeQuery = `
  query {
    Page(page: 1, perPage: 20) {
      media(sort: TRENDING_DESC, type: ANIME, status: RELEASING, isAdult: false) {
        id
        idMal
        title {
          romaji
          english
          native
        }
        description
        bannerImage
        coverImage {
          extraLarge
          large
          color
        }
        episodes
        duration
        status
        season
        seasonYear
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
        startDate {
          year
          month
          day
        }
        averageScore
        popularity
        format
      }
    }
  }
`;

// Rate limiting handler with exponential backoff
const handleRateLimit = async () => {
  const now = Date.now();
  if (now - lastRequestTime >= RATE_LIMIT_INTERVAL) {
    requestCount = 0;
    lastRequestTime = now;
  }

  if (requestCount >= RATE_LIMIT) {
    const baseWaitTime = RATE_LIMIT_INTERVAL - (now - lastRequestTime);
    const backoffFactor = Math.floor(requestCount / RATE_LIMIT);
    const waitTime = baseWaitTime * Math.pow(2, backoffFactor);
    
    console.log(`Rate limit reached, waiting for: ${waitTime}ms (backoff factor: ${backoffFactor})`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    requestCount = 0;
    lastRequestTime = Date.now();
  }

  requestCount++;
};

export const anilist = {
  async getTrendingAnime(): Promise<any[]> {
    try {
      await handleRateLimit();

      const response = await fetch(ANILIST_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: trendingAnimeQuery
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AniList API error:', response.status, errorText);
        throw new Error(`AniList API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        console.error('AniList API returned errors:', data.errors);
        throw new Error(data.errors[0]?.message || 'Unknown AniList API error');
      }

      const trendingAnime = data.data?.Page?.media || [];
      console.log('Fetched trending anime:', trendingAnime.length);

      // Process each anime with validation
      const processedAnime = trendingAnime.map((anime: any) => {
        if (!anime) return null;

        try {
          // Validate required fields
          if (!anime.title || (!anime.bannerImage && !anime.coverImage)) {
            console.warn('Skipping anime due to missing required fields:', anime.id);
            return null;
          }

          // Use banner image if it exists and seems valid
          let bannerImage = null;
          if (anime.bannerImage && anime.bannerImage.startsWith('http')) {
            bannerImage = anime.bannerImage;
          }

          // Always ensure we have a cover image as fallback
          const coverImage = anime.coverImage?.extraLarge || anime.coverImage?.large;
          if (!coverImage) {
            console.warn('Skipping anime due to missing cover image:', anime.id);
            return null;
          }

          return {
            mal_id: anime.idMal,
            title: anime.title.english || anime.title.romaji,
            synopsis: anime.description?.replace(/<[^>]*>/g, ''),
            score: anime.averageScore ? anime.averageScore / 10 : null,
            members: anime.popularity || 0,
            type: anime.format || 'Unknown',
            duration: anime.duration || 'Unknown',
            episodes: anime.episodes || null,
            rating: 'PG-13',
            aired: {
              from: anime.startDate ? 
                new Date(
                  anime.startDate.year,
                  (anime.startDate.month || 1) - 1,
                  anime.startDate.day || 1
                ).toISOString() : 
                new Date().toISOString()
            },
            nextAiring: anime.nextAiringEpisode ? {
              episode: anime.nextAiringEpisode.episode,
              airingAt: new Date(anime.nextAiringEpisode.airingAt * 1000).toISOString(),
              timeUntilAiring: anime.nextAiringEpisode.timeUntilAiring
            } : null,
            bannerImage,
            images: {
              jpg: {
                large_image_url: coverImage,
                image_url: anime.coverImage.large || coverImage,
                dominant_color: anime.coverImage.color || '#0f0f1a'
              }
            }
          };
        } catch (error) {
          console.error('Error processing anime:', anime.id, error);
          return null;
        }
      });

      // Filter out any invalid entries and nulls
      const validAnime = processedAnime.filter(anime => anime !== null).slice(0, 10);

      console.log(`Found ${validAnime.length} valid anime entries`);
      return validAnime;

    } catch (error) {
      console.error('Error fetching trending anime:', error);
      throw error; // Re-throw to let component handle the error
    }
  },

  async getBannerImage(title: string, malId?: number): Promise<string | null> {
    try {
      // Add retry mechanism
      const maxRetries = 3;
      let retryCount = 0;
      let lastError = null;

      while (retryCount < maxRetries) {
        try {
          // Handle rate limiting
          await handleRateLimit();

          // Clean up the title for better matching
          const cleanTitle = title
            .toLowerCase()
            .replace(/season \d+/gi, '')
            .replace(/part \d+/gi, '')
            .replace(/\([^)]*\)/g, '')
            .replace(/[:\-～]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          console.log('Searching AniList for:', { cleanTitle, malId });
          
          const variables: any = {};
          if (malId) {
            // If we have MAL ID, try to find by ID first
            const response = await fetch('https://graphql.anilist.co/v2/mal-id-to-anilist', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ malId })
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.id) {
                variables.id = data.id;
              }
            }
          }

          if (!variables.id) {
            variables.search = cleanTitle;
          }

          const response = await fetch(ANILIST_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: searchAnimeQuery,
              variables
            })
          });

          if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get('Retry-After') || '60');
            console.log('Rate limit hit, waiting for:', retryAfter, 'seconds');
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            retryCount++;
            continue;
          }

          if (!response.ok) {
            throw new Error(`AniList API error: ${response.status}`);
          }

          const data = await response.json();
          
          if (data.errors) {
            console.warn('AniList API returned errors:', data.errors);
            throw new Error(data.errors[0]?.message || 'Unknown AniList API error');
          }

          const media = data.data?.Media;
          if (!media) {
            console.warn('No media found for:', cleanTitle);
            return null;
          }

          // Log found media for debugging
          console.log('Found AniList match:', {
            searchTitle: cleanTitle,
            malId,
            foundTitle: {
              romaji: media.title.romaji,
              english: media.title.english,
              native: media.title.native
            },
            bannerImage: media.bannerImage,
            coverImage: media.coverImage
          });

          // Verify if it's a good match when searching by title
          if (!variables.id) {
            const foundTitles = [
              media.title.romaji?.toLowerCase(),
              media.title.english?.toLowerCase(),
              media.title.native?.toLowerCase()
            ].filter(Boolean);

            const isGoodMatch = foundTitles.some(t => 
              t.includes(cleanTitle) || cleanTitle.includes(t)
            );

            if (!isGoodMatch) {
              console.warn('Title match not close enough:', {
                search: cleanTitle,
                found: foundTitles
              });
              return null;
            }
          }

          // Use banner image if it exists and seems valid
          let bannerImage = null;
          if (media.bannerImage && media.bannerImage.startsWith('http')) {
            bannerImage = media.bannerImage;
          }

          // Always ensure we have a cover image as fallback
          const coverImage = media.coverImage.extraLarge || media.coverImage.large;

          // Return verified banner image or null if not valid
          return bannerImage || null;

        } catch (error) {
          lastError = error;
          console.warn(`Attempt ${retryCount + 1} failed:`, error);
          retryCount++;
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
          }
        }
      }

      if (lastError) {
        console.error('All retry attempts failed:', lastError);
        return null;
      }

      return null;
    } catch (error) {
      console.error('Error in getBannerImage:', error);
      return null;
    }
  }
};
