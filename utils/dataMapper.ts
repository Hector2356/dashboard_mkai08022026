
import type { Entry, Asset } from 'contentful';
import type { Album, Service, SubscriptionPlan, Track, FAQItem, Release, Testimonial, MikUniverseService, MikaiRelease, MikaiLandingData } from '../types';
import { THEME_MAP, SERVICE_THEME_MAP } from './colorThemes';
import { getSafeField, getSafeAssetUrl, richTextToString } from './contentfulUtils';
import { FALLBACK_AVATARS } from '../constants';

const getFallbackAvatar = (id: string): string => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % FALLBACK_AVATARS.length;
  return FALLBACK_AVATARS[index];
};

/**
 * Detecta plataforma y extrae ID de video (YouTube o Vimeo).
 */
const extractVideoInfo = (input: string): { type: 'youtube' | 'vimeo', id: string } => {
  if (!input || typeof input !== 'string') return { type: 'youtube', id: 'dQw4w9WgXcQ' };
  
  let cleanInput = input.trim();
  
  // Extraer src si es un iframe
  if (cleanInput.includes('<iframe')) {
    const srcMatch = cleanInput.match(/src=["']([^"']+)["']/);
    if (srcMatch && srcMatch[1]) {
      cleanInput = srcMatch[1];
    }
  }

  // Lógica para VIMEO
  if (cleanInput.includes('vimeo.com')) {
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/;
    const vMatch = cleanInput.match(vimeoRegex);
    if (vMatch && vMatch[1]) {
      return { type: 'vimeo', id: vMatch[1] };
    }
  }

  // Lógica para YOUTUBE
  const ytRegExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const ytMatch = cleanInput.match(ytRegExp);
  
  if (ytMatch && ytMatch[1]) {
    return { type: 'youtube', id: ytMatch[1] };
  }
  
  // Fallback para rutas de embed directas
  if (cleanInput.includes('/embed/')) {
    const parts = cleanInput.split('/embed/')[1];
    const id = parts.split(/[?&]/)[0];
    if (id && id.length === 11) return { type: 'youtube', id };
  }

  return { type: 'youtube', id: 'dQw4w9WgXcQ' };
};

const mapTrackEntry = (track: any): Track => {
  let rawName = track?.fields?.title ?? track?.title;
  const url = track?.fields?.spotifyTrackUrl ?? track?.spotifyTrackUrl ?? '';
  
  if (!rawName || rawName.toLowerCase().includes('desconocida') || rawName.toLowerCase().includes('id:')) {
    rawName = "Mikai Official Track";
  }

  return {
    name: rawName,
    duration: track?.fields?.duration ?? track?.duration ?? '3:30',
    spotifyTrackUrl: url || null,
  };
};

export const mapContentfulEntryToAlbum = (entry: Entry<any>): Album => {
    const { fields, sys } = entry;
    const rawDate = getSafeField<string>(fields, 'fechaDeCreacion', sys.createdAt);
    const creationDate = new Date(rawDate).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const themeKey = getSafeField<string>(fields, 'colorDeAcento', 'default').toLowerCase();
    const faqsField = getSafeField<any[]>(fields, 'preguntasFrecuentes', []);
    const preguntasFrecuentes = (Array.isArray(faqsField) ? faqsField : [])
        .filter(faq => faq && faq.pregunta)
        .map((faq: any): FAQItem => ({
            pregunta: faq.pregunta,
            respuesta: faq.respuesta ?? 'Respuesta no disponible',
        }));
    const plansField = getSafeField<any>(fields, 'planesDeSuscripcin', { plans: [] });
    const plansArray = (plansField && Array.isArray(plansField.plans)) ? plansField.plans : [];
    const plans = plansArray.map((plan: any): SubscriptionPlan => ({
        plan: plan?.type ?? 'Plan Desconocido',
        price: plan?.price ? `${plan.price} USD` : 'Consultar',
        duration: plan?.period ?? 'N/A',
        popular: plan?.bestValue ?? false,
        paymentUrl: plan?.paymentUrl ?? null,
    }));
    const tracksField = getSafeField<any[]>(fields, 'listaDeCanciones', []);
    const tracks = (Array.isArray(tracksField) ? tracksField : []).map(mapTrackEntry);
    const subscriptionTypes = plans.map(p => p.plan).filter(Boolean);
    const name = getSafeField<string>(fields, 'ttuloDelAlbum', 'Sin Título');
    let coverArtUrl = getSafeAssetUrl(fields.portada as Asset | undefined);
    if (name.includes('Dark Realms') && !fields.portada) {
         coverArtUrl = 'https://i.imgur.com/z4g7xmf.png';
    }
    return {
        id: sys.id,
        name: name,
        description: getSafeField<string>(fields, 'descripcionOferta', 'Sin Descripción'),
        coverArtUrl: coverArtUrl,
        spotifyUrl: getSafeField<string | null>(fields, 'linkDeSpotify', null),
        label: getSafeField<string>(fields, 'sello', 'MIK MUSIC'),
        genre: getSafeField<string | null>(fields, 'generoMusical', null),
        volume: getSafeField<string | null>(fields, 'formato', null),
        subscriptionTypes: subscriptionTypes,
        emotion: getSafeField<string[] | null>(fields, 'emocion', []),
        trackCount: getSafeField<number>(fields, 'numeroDePistas', 0),
        creationDate: creationDate,
        rawCreationDate: rawDate,
        tracks: tracks,
        plans: plans,
        benefits: getSafeField<string[]>(fields, 'beneficios', []),
        preguntasFrecuentes: preguntasFrecuentes,
        cta: getSafeField<string | null>(fields, 'ctaLlamadoALaAccin', null),
        colorTheme: THEME_MAP[themeKey] || THEME_MAP.default,
    };
};

export const mapContentfulEntryToService = (entry: Entry<any>): Service => {
    const { fields, sys } = entry;
    const themeKey = getSafeField<string>(fields, 'colorDelTema', 'default').toLowerCase();
    return {
        id: sys.id,
        title: getSafeField<string>(fields, 'ttuloDelServicio', 'Servicio sin título'),
        tagline: getSafeField<string>(fields, 'taglineLema', ''),
        price: getSafeField<string>(fields, 'precio', 'Consultar'),
        features: getSafeField<string[]>(fields, 'caracteristicas', []),
        popular: getSafeField<boolean>(fields, 'esPopular', false),
        colorClass: SERVICE_THEME_MAP[themeKey] || SERVICE_THEME_MAP.default,
        imageUrl: getSafeAssetUrl(fields.imagen as Asset | undefined),
        purchaseUrl: getSafeField<string | undefined>(fields, 'linkDeCompra', undefined),
    };
};

export const mapContentfulEntryToRelease = (entry: Entry<any>): Release => {
    const { fields } = entry;
    return {
        artworkUrl: getSafeAssetUrl(fields.artwork as Asset | undefined),
        title: getSafeField<string>(fields, 'title', 'Sin Título'),
        artist: getSafeField<string>(fields, 'artist', 'Artista Desconocido'),
        spotifyUrl: getSafeField<string>(fields, 'spotifyUrl', '#'),
        youtubeUrl: getSafeField<string>(fields, 'youTubeUrl', '#'),
        instagramUrl: getSafeField<string>(fields, 'instagramUrl', '#'),
    };
};

export const mapContentfulEntryToMikaiRelease = (entry: Entry<any>): MikaiRelease => {
    const { fields } = entry;
    return {
        title: getSafeField<string>(fields, 'titulo', ''),
        spotifyUrl: getSafeField<string>(fields, 'spotifyUrl', ''),
        artworkUrl: getSafeAssetUrl(fields.artwork as Asset | undefined),
        description: getSafeField<string>(fields, 'descripcion', ''),
    };
};

export const mapContentfulEntryToMikaiLanding = (entry: Entry<any>): MikaiLandingData => {
  const { fields } = entry;
  
  const tracksField = getSafeField<any[]>(fields, 'tracks', []);
  const mappedTracks = (Array.isArray(tracksField) ? tracksField : []).map((t: any) => {
    if (typeof t === 'string') {
      return { 
        name: "Mikai Official Track", 
        duration: '3:30', 
        spotifyTrackUrl: t 
      };
    }
    return mapTrackEntry(t);
  });

  const platforms = getSafeField<string[]>(fields, 'platforms', []);
  const rawVideoUrl = getSafeField<string>(fields, 'youtubeVideoUrl', '');

  return {
    artistName: getSafeField<string>(fields, 'artistName', 'MIKAI'),
    description: getSafeField<string>(fields, 'description', 'Virtual AI Artist • Future K-Pop Experience'),
    heroImageUrl: getSafeAssetUrl(fields.heroImage as Asset | undefined),
    mainSpotifyUrl: getSafeField<string>(fields, 'mainSpotifyUrl', '#'),
    musicSectionTitle: getSafeField<string>(fields, 'musicSectionTitle', 'More from MIKAI Universe'),
    tracks: mappedTracks,
    platforms: Array.isArray(platforms) ? platforms : [],
    videoInfo: extractVideoInfo(rawVideoUrl)
  };
};

export const mapContentfulEntryToTestimonial = (entry: Entry<any>): Testimonial => {
    const { fields, sys } = entry;
    let avatarUrl = getSafeAssetUrl(fields.avatarUrl as Asset | undefined);
    if (avatarUrl.includes('placehold.co')) {
        avatarUrl = getFallbackAvatar(sys.id);
    }
    return {
        id: sys.id,
        name: getSafeField<string>(fields, 'name', 'Anónimo'),
        avatarUrl: avatarUrl,
        rating: getSafeField<number>(fields, 'rating', 5),
        comment_es: richTextToString(getSafeField<any>(fields, 'commentEs', null)),
        comment_en: richTextToString(getSafeField<any>(fields, 'commentEn', null)),
    };
};

export const mapContentfulEntryToMikUniverseService = (entry: Entry<any>): MikUniverseService => {
    const { fields, sys } = entry;
    return {
        id: sys.id,
        title: getSafeField<string>(fields, 'titulo', 'Exclusive Service'),
        description: getSafeField<string>(fields, 'descripcion', ''),
        price: getSafeField<number>(fields, 'precio', 0),
        backgroundImageUrl: getSafeAssetUrl(fields.imagenDeFondo as Asset | undefined),
        ctaText: getSafeField<string>(fields, 'ctaTexto', 'Purchase'),
        ctaLink: getSafeField<string>(fields, 'ctaLink', '#'),
        currency: getSafeField<string>(fields, 'divisa', 'USD'),
    };
};
