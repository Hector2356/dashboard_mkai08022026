import React from 'react';
import type { Testimonial } from './types';

// A collection of high-quality, trustworthy avatars to be used as fallbacks.
export const FALLBACK_AVATARS: string[] = [
  'https://i.postimg.cc/QCsnjQtP/premium-photo-1689539137236-b68e436248de-ixlib-rb-4-1.jpg',
  'https://i.postimg.cc/HLX2jrfc/1542310899-180484-1542474106-sumario-normal.jpg',
  'https://i.postimg.cc/mrCwhPK0/1723819204347-output.jpg',
  'https://i.postimg.cc/HxmtMpg2/dsc-0872.jpg',
  'https://i.postimg.cc/Jn8QX1Lp/premium-photo-1682175064657-d2c4fd9f095a-ixlib-rb-4-1.jpg',
  'https://i.postimg.cc/L8rDHtQ3/pexels-photo-14375833.jpg',
];


export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'DJ Cobra',
    avatarUrl: 'https://i.postimg.cc/QCsnjQtP/premium-photo-1689539137236-b68e436248de-ixlib-rb-4-1.jpg',
    rating: 5,
    comment_es: '¡Increíble calidad y un sonido único! Los beats de MIK MUSIC llevaron mi producción al siguiente nivel. Totalmente recomendado.',
    comment_en: 'Incredible quality and a unique sound! MIK MUSIC beats took my production to the next level. Totally recommended.',
  },
  {
    id: 'test2',
    name: 'Valeria G.',
    avatarUrl: 'https://i.postimg.cc/HLX2jrfc/1542310899-180484-1542474106-sumario-normal.jpg',
    rating: 5,
    comment_es: 'El proceso fue súper fácil y el resultado final superó mis expectativas. El plan de suscripción tiene un valor inmenso.',
    comment_en: 'The process was super easy and the final result exceeded my expectations. The subscription plan has immense value.',
  },
  {
    id: 'test3',
    name: 'Code B',
    avatarUrl: 'https://i.postimg.cc/mrCwhPK0/1723819204347-output.jpg',
    rating: 4,
    comment_es: 'Una gran variedad de géneros y emociones para elegir. Encontré exactamente lo que necesitaba para mi álbum.',
    comment_en: 'A great variety of genres and emotions to choose from. I found exactly what I needed for my album.',
  },
  {
    id: 'test4',
    name: 'Luna Star',
    avatarUrl: 'https://i.postimg.cc/HxmtMpg2/dsc-0872.jpg',
    rating: 5,
    comment_es: 'El soporte es fantástico y la calidad del sonido es profesional. ¡Una verdadera fábrica de estrellas!',
    comment_en: 'The support is fantastic and the sound quality is professional. A true star factory!',
  },
];

// Fallback gallery images for the New Artist section, as provided by the user.
export const MOCK_GALLERY_IMAGES: string[] = [
  'https://i.postimg.cc/QCsnjQtP/premium-photo-1689539137236-b68e436248de-ixlib-rb-4-1.jpg',
  'https://i.postimg.cc/HLX2jrfc/1542310899-180484-1542474106-sumario-normal.jpg',
  'https://i.postimg.cc/mrCwhPK0/1723819204347-output.jpg',
  'https://i.postimg.cc/HxmtMpg2/dsc-0872.jpg',
  'https://i.postimg.cc/Jn8QX1Lp/premium-photo-1682175064657-d2c4fd9f095a-ixlib-rb-4-1.jpg',
  'https://i.postimg.cc/L8rDHtQ3/pexels-photo-14375833.jpg',
  'https://i.imgur.com/8x8jY9c.jpg', // Added a 7th image to fit the grid layout
];