import siteConfig from './siteConfig.json';
import { WeddingStory, Review, CollectionPackage } from '../types/wedding';
import { resolveImagePath } from '../utils/imageResolver';

// Primary JSON configuration file directly read from siteConfig.json:
export const SITE_CONFIG = siteConfig;

export { resolveImagePath };

export const IMAGES = {
  hero: resolveImagePath(siteConfig.hero.backgroundImage),
  amaraVeer: resolveImagePath('/src/assets/images/wedding_amara_jodhpur_1790871722386.jpg'),
  ishaArjun: resolveImagePath('/src/assets/images/wedding_isha_alibaug_1790871739251.jpg'),
  miraKabir: resolveImagePath('/src/assets/images/wedding_mira_udaipur_1790871754583.jpg'),
  nainaRishabh: resolveImagePath('/src/assets/images/wedding_naina_goa_1790871769912.jpg'),
  candidHands: resolveImagePath('/src/assets/images/wedding_detail_candid_1790871788234.jpg'),
  fineAlbum: resolveImagePath('/src/assets/images/wedding_fine_album_1790871804451.jpg'),
};

export const WEDDING_STORIES: WeddingStory[] = (siteConfig.work?.stories || []).map((story) => ({
  id: story.id,
  number: story.number,
  couple: story.couple,
  location: story.location,
  region: story.location,
  tagline: story.tagline,
  description: story.description,
  coverImage: resolveImagePath(story.coverImage),
  category: 'royal',
  guests: 'Gathering of close friends & family',
  duration: story.coverage,
  vibeKeywords: ['Honest Light', 'Timeless Heritage', 'Documentary Emotion'],
  quote: story.quote,
  galleryImages: (story.galleryImages || []).map((img) => ({
    url: resolveImagePath(img.url),
    caption: img.caption,
    aspect: 'landscape'
  }))
}));

export const REVIEWS: Review[] = (siteConfig.reviews?.list || []).map((r) => ({
  id: r.id,
  name: r.name,
  stars: 5,
  timeAgo: r.timeAgo,
  text: r.text
}));

export const COLLECTIONS: CollectionPackage[] = (siteConfig.collections?.packages || []).map((pkg) => ({
  id: pkg.name.toLowerCase().replace(/\s+/g, '-'),
  title: pkg.name,
  price: pkg.price,
  priceSub: 'onwards',
  description: pkg.name === 'The Signature'
    ? 'Comprehensive coverage for full celebration weekends where every narrative arc is documented.'
    : pkg.name === 'The Editorial'
    ? 'Perfect for couples hosting a concentrated single-day wedding with high artistic emphasis.'
    : 'Curated for boutique celebrations and intimate family gatherings.',
  features: pkg.items || [],
  popular: !!pkg.featured
}));

export const FAQS = siteConfig.faq?.questions || [];

export const STUDIO_INFO = {
  name: siteConfig.owner?.name || 'LUMÉ STUDIO',
  tagline: siteConfig.owner?.tagline || 'Wedding Photography & Films',
  philosophy: siteConfig.hero?.title || 'Love, in its most honest light.',
  introText: siteConfig.hero?.lead || '',
  locations: siteConfig.owner?.locations || '',
  email: siteConfig.owner?.email || '',
  phone: siteConfig.owner?.phone || '',
  whatsappUrl: `https://wa.me/${siteConfig.owner?.whatsappNumber || '918638683167'}?text=Hi%20${encodeURIComponent(siteConfig.owner?.name || 'Lumé Studio')}%2C%20I%20would%20love%20to%20inquire%20about%20wedding%20photography%20for%20our%20celebration.`,
  phoneUrl: `tel:${(siteConfig.owner?.phone || '').replace(/\s+/g, '')}`,
  instagram: siteConfig.owner?.instagram || '',
  pinterest: siteConfig.owner?.pinterest || '',
  vimeo: siteConfig.owner?.vimeo || '',
  googleReviewCount: siteConfig.reviews?.totalCount || 87,
  googleRating: siteConfig.reviews?.rating || '5.0'
};
