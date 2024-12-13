import { PortableText } from '@portabletext/react';
import { useState, useEffect, memo, Suspense } from 'react';
import { client } from '../config/sanity';
import { Song } from '../types/content';
import { urlFor } from '../config/sanity';

const SongContent = memo(({ song }: { song: Song }) => (
  <div className="max-w-2xl mx-auto animate-fade-in flex flex-col items-center text-center">
    <div className="flex flex-col items-center gap-6 mb-6">
      {song.coverArt && (
        <img 
          src={urlFor(song.coverArt).width(200).height(200).url()} 
          alt={song.title} 
          className="w-48 h-48 rounded-lg shadow-lg object-cover"
        />
      )}
      <div>
        <h1 className="text-3xl font-bold">{song.title}</h1>
        <p className="text-gray-600 mt-1">{song.artist}</p>
        <p className="text-gray-500 text-sm">{song.album}</p>
      </div>
    </div>

    {(song.spotifyUrl || song.soundcloudUrl) && (
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {song.spotifyUrl && (
          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#1DB954] text-white px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
          >
            Listen on Spotify
          </a>
        )}
        {song.soundcloudUrl && (
          <a
            href={song.soundcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FF5500] text-white px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
          >
            Listen on SoundCloud
          </a>
        )}
      </div>
    )}

    {song.lyrics && (
      <div className="prose prose-lg w-full">
        <h2 className="text-xl font-bold mb-4">Lyrics</h2>
        <div className="text-left">
          <PortableText value={song.lyrics} />
        </div>
      </div>
    )}

    {song.publishedAt && (
      <p className="mt-8 text-gray-500 text-sm">
        Published on {new Date(song.publishedAt).toLocaleDateString()}
      </p>
    )}
  </div>
));

const Songs = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const query = `*[_type == "song"] | order(publishedAt desc) {
          _id,
          title,
          artist,
          album,
          publishedAt,
          lyrics,
          spotifyUrl,
          soundcloudUrl,
          coverArt
        }`;
        
        const result = await client.fetch(query);
        setSongs(result);
        if (result.length > 0) setSelectedSong(result[0]);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
      {/* Mobile song selector button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-4 right-4 z-20 bg-black text-white px-4 py-2 rounded-full shadow-lg"
      >
        Select Song
      </button>

      {/* Sidebar with song list */}
      <div
        className={`${
          isSidebarOpen ? 'fixed inset-0 z-10 md:relative md:z-0' : 'hidden md:block'
        } w-full md:w-64 bg-white md:border-r border-gray-200 overflow-y-auto p-4`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Songs</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500"
          >
            Close
          </button>
        </div>
        <div className="space-y-2">
          {songs.map((song) => (
            <button
              key={song._id}
              onClick={() => {
                setSelectedSong(song);
                setIsSidebarOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
                selectedSong?._id === song._id
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div>{song.title}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {song.artist}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto flex items-center justify-center">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          {isLoading ? (
            <div className="text-center">
              <div className="animate-pulse h-48 w-48 bg-gray-200 rounded-lg mb-4 mx-auto"></div>
              <div className="animate-pulse h-6 w-48 bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="animate-pulse h-4 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
              <div className="animate-pulse h-4 w-full max-w-2xl bg-gray-200 rounded mb-2 mx-auto"></div>
              <div className="animate-pulse h-4 w-full max-w-2xl bg-gray-200 rounded mb-2 mx-auto"></div>
            </div>
          ) : selectedSong ? (
            <SongContent song={selectedSong} />
          ) : (
            <div className="text-center text-gray-500">Select a song to view</div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Songs;