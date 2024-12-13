export const lastfmConfig = {
  username: import.meta.env.VITE_LASTFM_USERNAME || 'YOUR_LASTFM_USERNAME',
  apiKey: import.meta.env.VITE_LASTFM_API_KEY || 'YOUR_LASTFM_API_KEY',
  baseUrl: 'https://ws.audioscrobbler.com/2.0',
};
