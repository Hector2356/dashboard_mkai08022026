
// types.ts - Core interfaces and types for the MIK MUSIC application

export interface Track {
  name: string;
  duration: string;
  spotifyTrackUrl: string | null;
}

export interface SubscriptionPlan {
  plan: string;
  price: string;
  duration: string;
  popular: boolean;
  paymentUrl: string | null;
}

export interface FAQItem {
  pregunta: string;
  respuesta: string;
}

export interface AlbumColorTheme {
  hex: string;
  neonGlowClass: string;
  borderClass: string;
  buttonClasses: string;
  accentTextClass: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  coverArtUrl: string;
  spotifyUrl: string | null;
  label: string;
  genre: string | null;
  volume: string | null;
  subscriptionTypes: string[];
  emotion: string[] | null;
  trackCount: number;
  creationDate: string;
  rawCreationDate: string;
  tracks: Track[];
  plans: SubscriptionPlan[];
  benefits: string[];
  preguntasFrecuentes: FAQItem[];
  cta: string | null;
  colorTheme: AlbumColorTheme;
}

export interface ServiceTheme {
  button: string;
  buttonText: string;
  shadow: string;
  bgColor: string;
  checkColor: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  price: string;
  features: string[];
  popular: boolean;
  colorClass: ServiceTheme;
  imageUrl: string;
  purchaseUrl?: string;
}

export interface Release {
  artworkUrl: string;
  title: string;
  artist: string;
  spotifyUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  rating: number;
  comment_es: string;
  comment_en: string;
}

export interface MikUniverseService {
  id: string;
  title: string;
  description: string;
  price: number;
  backgroundImageUrl: string;
  ctaText: string;
  ctaLink: string;
  currency: string;
}

export interface MikaiRelease {
  title: string;
  spotifyUrl: string;
  artworkUrl: string;
  description: string;
}

export interface MikaiLandingData {
  artistName: string;
  description: string;
  heroImageUrl: string;
  mainSpotifyUrl: string;
  heroTrackName?: string;
  musicSectionTitle: string;
  tracks: Track[];
  platforms: string[];
  videoInfo?: {
    type: 'youtube' | 'vimeo';
    id: string;
  };
}

export type EventType = 'page_view' | 'play_track' | 'click_platform' | 'watch_video';

export interface AnalyticsEvent {
  id: string;
  type: EventType;
  sessionId: string;
  timestamp: number;
  data: any;
  referrer: string;
  userAgent: string;
}

export interface DashboardStats {
  totalVisits: number;
  totalPlays: number;
  totalPlatformClicks: number;
  totalVideoViews: number;
  ctr: number;
  avgTimeSeconds: number;
  platformData: { name: string; percentage: number; icon: string; color: string; count: number }[];
  trackData: { id: string; name: string; plays: number; conversion: number; progress: number }[];
  trendData: { labels: string[]; visits: number[]; plays: number[] };
  hourlyPlays: number[];
  dateRange: string;
}

export interface ArchivedReport {
  id: string;
  timestamp: number;
  stats: DashboardStats;
  label: string;
}

export type View = 'home' | 'catalog' | 'albumDetail' | 'services' | 'universe' | 'mikai-music' | 'dashboard';
