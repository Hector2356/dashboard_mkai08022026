

import React from 'react';
import type { Release } from '../types';
import { SpotifyIcon, YoutubeIcon, InstagramIcon } from './icons/SocialIcons';

interface ArtistSectionProps {
  release: Release;
}

const ArtistSection: React.FC<ArtistSectionProps> = ({ release }) => {
  return (
    <section id="artista" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
             <div className="absolute inset-0 bg-gradient-to-br from-mikai-lemon to-violet-500 rounded-lg transform -rotate-3 transition-transform duration-500 hover:rotate-0"></div>
             <img 
                src={release.artworkUrl} 
                alt={`Artwork for ${release.title}`} 
                className="relative w-full h-full object-cover rounded-lg shadow-2xl shadow-black/50"
              />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-mikai-lemon uppercase tracking-widest mb-2">Último Lanzamiento</p>
            <h2 className="text-4xl md:text-6xl font-anton tracking-wide text-white">{release.title}</h2>
            <h3 className="text-2xl md:text-3xl font-anton text-gray-400 mt-2">{release.artist}</h3>
            <div className="w-24 h-1 bg-mikai-lemon my-8 mx-auto md:mx-0 neon-glow-yellow"></div>
            <p className="text-gray-300 text-lg mb-8">
                Escucha el último hit de nuestro artista principal y síguelo en sus redes para no perderte ninguna novedad.
            </p>
            <div className="flex justify-center md:justify-start items-center gap-6">
                <a href={release.spotifyUrl} id="artist-spotify-link" target="_blank" rel="noopener noreferrer" className="bg-[#1DB954] text-white flex items-center gap-3 font-bold uppercase tracking-widest py-3 px-6 rounded-md hover:bg-[#1ed760] transition-colors duration-300 transform hover:scale-105">
                    <SpotifyIcon className="w-6 h-6" />
                    <span>Spotify</span>
                </a>
                 <a href={release.youtubeUrl} id="artist-youtube-link" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><YoutubeIcon className="w-10 h-10" /></a>
                 <a href={release.instagramUrl} id="artist-instagram-link" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><InstagramIcon className="w-10 h-10" /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistSection;