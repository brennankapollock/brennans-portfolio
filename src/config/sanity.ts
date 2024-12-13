import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'ck4wnbas',
  dataset: 'production',
  useCdn: false, // Set to false during development
  apiVersion: '2024-12-12',
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};
