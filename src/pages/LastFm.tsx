import { useState, useEffect } from 'react';

interface Track {
  name: string;
  artist: string;
  playcount: number;
  url: string;
  image: string;
}

interface Artist {
  name: string;
  playcount: number;
  url: string;
  image: string;
}

const LastFm = () => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
  const LASTFM_USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

  useEffect(() => {
    const fetchLastFmData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch top tracks
        const tracksResponse = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=1month&limit=10`
        );
        const tracksData = await tracksResponse.json();
        
        // Fetch top artists
        const artistsResponse = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&period=1month&limit=10`
        );
        const artistsData = await artistsResponse.json();

        setTopTracks(
          tracksData.toptracks.track.map((track: any) => ({
            name: track.name,
            artist: track.artist.name,
            playcount: parseInt(track.playcount),
            url: track.url,
            image: track.image[2]['#text'] // medium size image
          }))
        );

        setTopArtists(
          artistsData.topartists.artist.map((artist: any) => ({
            name: artist.name,
            playcount: parseInt(artist.playcount),
            url: artist.url,
            image: artist.image[2]['#text'] // medium size image
          }))
        );

        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch Last.fm data');
        setIsLoading(false);
        console.error('Error fetching Last.fm data:', err);
      }
    };

    fetchLastFmData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Last.fm Stats</h1>
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Top Tracks */}
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-12rem)] overflow-auto">
          <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white">Top Tracks (Last Month)</h2>
          <div className="space-y-3">
            {topTracks.map((track, index) => (
              <a
                key={index}
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span className="text-base font-medium text-gray-400 w-5">
                  {index + 1}
                </span>
                {track.image && (
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{track.name}</div>
                  <div className="text-sm text-gray-500 truncate">{track.artist}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {track.playcount} plays
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Top Artists */}
        <div className="bg-white rounded-lg shadow-lg p-4 h-[calc(100vh-12rem)] overflow-auto">
          <h2 className="text-xl font-semibold mb-4 sticky top-0 bg-white">Top Artists (Last Month)</h2>
          <div className="space-y-3">
            {topArtists.map((artist, index) => (
              <a
                key={index}
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span className="text-base font-medium text-gray-400 w-5">
                  {index + 1}
                </span>
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{artist.name}</div>
                </div>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                  {artist.playcount} plays
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastFm;
