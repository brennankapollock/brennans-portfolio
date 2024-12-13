import { lastfmConfig } from '../config/lastfm';
import type { LastFmTrack } from '../types/LastFm';

export async function getRecentTrack(): Promise<LastFmTrack | null> {
  try {
    const response = await fetch(
      `${lastfmConfig.baseUrl}/?method=user.getrecenttracks&user=${lastfmConfig.username}&api_key=${lastfmConfig.apiKey}&format=json&limit=1`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.recenttracks?.track?.[0]) {
      return null;
    }

    const recentTrack = data.recenttracks.track[0];
    
    return {
      name: recentTrack.name,
      artist: recentTrack.artist['#text'],
      url: recentTrack.url,
      image: recentTrack.image[2]['#text'],
      isNowPlaying: !!recentTrack['@attr']?.nowplaying
    };
  } catch (error) {
    console.error('Error fetching Last.fm data:', error);
    return null;
  }
}