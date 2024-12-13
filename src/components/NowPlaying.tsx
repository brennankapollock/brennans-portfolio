import { Music } from 'lucide-react';
import { useEffect, useState } from 'react';
import { lastfmConfig } from '../config/lastfm';
import { getRecentTrack } from '../services/lastfm';
import type { LastFmTrack } from '../types/LastFm';

export default function NowPlaying() {
  const [track, setTrack] = useState<LastFmTrack | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      const result = await getRecentTrack();
      if (result) {
        setTrack(result);
        setError(false);
      } else {
        setError(true);
      }
    };

    // Only start fetching if we have valid credentials
    if (
      lastfmConfig.username !== 'YOUR_LASTFM_USERNAME' &&
      lastfmConfig.apiKey !== 'YOUR_LASTFM_API_KEY'
    ) {
      fetchNowPlaying();
      const interval = setInterval(fetchNowPlaying, 30000);
      return () => clearInterval(interval);
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="bg-black text-white p-3 md:p-4 font-mono text-xs md:text-sm flex items-center gap-2 md:gap-3 rounded-lg">
        <Music className="w-4 h-4 flex-shrink-0" />
        <div>Last.fm integration not configured</div>
      </div>
    );
  }

  if (!track) return null;

  return (
    <div className="bg-black text-white p-4 font-mono text-xs md:text-sm flex justify-center items-center gap-2 md:gap-3 rounded-lg w-full max-w-md">
      <Music className="w-4 h-4 flex-shrink-0" />
      <div className="truncate">
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline truncate"
          title={`${track.name} - ${track.artist}`}
        >
          {track.name} - {track.artist}
        </a>
      </div>
    </div>
  );
}
