import YAML from 'yaml';
import pageYamlRaw from '../../page.yml?raw';
import siteConfigFallback from './siteConfig.json';
import { WeddingStory, Review, CollectionPackage } from '../types/wedding';

let activeConfig = siteConfigFallback;
try {
  if (pageYamlRaw) {
    const parsed = YAML.parse(pageYamlRaw);
    if (parsed && typeof parsed === 'object') {
      activeConfig = { ...siteConfigFallback, ...parsed };
    }
  }
} catch (err) {
  console.warn('Failed to parse page.yml, using fallback config:', err);
}

export const SITE_CONFIG = activeConfig;

export const IMAGES = {
  hero: activeConfig.hero.backgroundImage,
  amaraVeer: '/src/assets/images/wedding_amara_jodhpur_1790871722386.jpg',
  ishaArjun: '/src/assets/images/wedding_isha_alibaug_1790871739251.jpg',
  miraKabir: '/src/assets/images/wedding_mira_udaipur_1790871754583.jpg',
  nainaRishabh: '/src/assets/images/wedding_naina_goa_1790871769912.jpg',
  candidHands: '/src/assets/images/wedding_detail_candid_1790871788234.jpg',
  fineAlbum: '/src/assets/images/wedding_fine_album_1790871804451.jpg',
};

export const WEDDING_STORIES: WeddingStory[] = activeConfig.work.stories.map((story) => ({
  id: story.id,
  number: story.number,
  couple: story.couple,
  location: story.location,
  region: story.location,
  tagline: story.tagline,
  description: story.description,
  coverImage: story.coverImage,
  category: 'royal',
  guests: 'Gathering of close friends & family',
  duration: story.coverage,
  vibeKeywords: ['Honest Light', 'Timeless Heritage', 'Documentary Emotion'],
  quote: story.quote,
  galleryImages: story.galleryImages.map((img) => ({
    url: img.url,
    caption: img.caption,
    aspect: 'landscape'
  }))
}));

export const REVIEWS: Review[] = activeConfig.reviews.list.map((r) => ({
  id: r.id,
  name: r.name,
  stars: 5,
  timeAgo: r.timeAgo,
  text: r.text
}));

export const COLLECTIONS: CollectionPackage[] = activeConfig.collections.packages.map((pkg) => ({
  id: pkg.name.toLowerCase().replace(/\s+/g, '-'),
  title: pkg.name,
  price: pkg.price,
  priceSub: 'onwards',
  description: pkg.name === 'The Signature'
    ? 'Comprehensive coverage for full celebration weekends where every narrative arc is documented.'
    : pkg.name === 'The Editorial'
    ? 'Perfect for couples hosting a concentrated single-day wedding with high artistic emphasis.'
    : 'Curated for boutique celebrations and intimate family gatherings.',
  features: pkg.items,
  popular: pkg.featured
}));

export const FAQS = activeConfig.faq.questions;

export const STUDIO_INFO = {
  name: activeConfig.owner.name,
  tagline: activeConfig.owner.tagline,
  philosophy: activeConfig.hero.title,
  introText: activeConfig.hero.lead,
  locations: activeConfig.owner.locations,
  email: activeConfig.owner.email,
  phone: activeConfig.owner.phone,
  whatsappUrl: `https://wa.me/${activeConfig.owner.whatsappNumber}?text=Hi%20Lum%C3%A9%20Studio%2C%20I%20would%20love%20to%20inquire%20about%20wedding%20photography%20for%20our%20celebration.`,
  phoneUrl: `tel:${activeConfig.owner.phone.replace(/\s+/g, '')}`,
  instagram: activeConfig.owner.instagram,
  pinterest: activeConfig.owner.pinterest,
  vimeo: activeConfig.owner.vimeo,
  googleReviewCount: activeConfig.reviews.totalCount,
  googleRating: activeConfig.reviews.rating
};
