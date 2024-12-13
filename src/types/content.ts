export interface Poem {
  _id: string;
  title: string;
  content: any[]; // This will be the Portable Text content
  publishedAt: string;
}

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album?: string;
  publishedAt: string;
  lyrics?: any[]; // Portable Text content
  spotifyUrl?: string;
  soundcloudUrl?: string;
  coverArt?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

export interface Project {
  _id: string;
  title: string;
  description: any[]; // Portable Text content
  publishedAt: string;
  githubUrl?: string;
  liveUrl?: string;
  thumbnail?: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  technologies: string[];
  featured: boolean;
}
