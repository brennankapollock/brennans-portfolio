import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ck4wnbas',
  dataset: 'production',
  useCdn: true, // Changed to true for production
  apiVersion: '2024-12-12',
  token: import.meta.env.VITE_SANITY_TOKEN,
  withCredentials: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
