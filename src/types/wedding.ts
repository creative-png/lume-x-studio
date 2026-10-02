export interface WeddingStory {
  id: string;
  number: string;
  couple: string;
  location: string;
  region: string;
  tagline: string;
  description: string;
  coverImage: string;
  category: 'royal' | 'coastal' | 'lakeside' | 'beach';
  guests: string;
  duration: string;
  galleryImages: {
    url: string;
    caption: string;
    aspect?: 'landscape' | 'portrait';
  }[];
  quote: {
    text: string;
    author: string;
  };
  filmTeaserUrl?: string;
  vibeKeywords: string[];
}

export interface Review {
  id: string;
  name: string;
  stars: number;
  timeAgo: string;
  text: string;
  location?: string;
  weddingStoryId?: string;
}

export interface CollectionPackage {
  id: string;
  title: string;
  price: string;
  priceSub: string;
  description: string;
  features: string[];
  popular?: boolean;
}
