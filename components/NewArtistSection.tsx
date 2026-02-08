import React from 'react';
import type { Release } from '../types';
import { SpotifyIcon, YoutubeIcon, InstagramIcon } from './icons/SocialIcons';

interface NewArtistSectionProps {
  release: Release | null;
}

const NewArtistSection: React.FC<NewArtistSectionProps> = ({ release }) => {
  // Use the new, specific images for MIKAI's gallery
  const galleryImages = [
    'https://i.postimg.cc/02CYSBMX/portada-spotify.png',
    'https://i.postimg.cc/htjddPqz/2.png',
    'https://i.postimg.cc/wTz57pvt/12.png',
    'https://i.postimg.cc/N0sfNGH0/perfilcuadradamikmusic-Mesadetrabajo11.png',
    'https://i.postimg.cc/HWX4Yxps/6.png',
  ]; 

  return (
    <section id="presenting-mikai" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-anton uppercase tracking-wider">
            Presentando a Nuestro Nuevo Talento
          </h2>
          <p className="text-lg text-gray-400 mt-2">
            La nueva estrella de <strong className="font-semibold text-white">MIK MUSIC</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Gallery */}
          <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[500px] animate-fade-in-up animation-delay-300">
              <div className="col-span-2 row-span-2 rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <img src={galleryImages[0]} alt="MIKAI Gallery Image 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <img src={galleryImages[1]} alt="MIKAI Gallery Image 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <img src={galleryImages[2]} alt="MIKAI Gallery Image 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <img src={galleryImages[3]} alt="MIKAI Gallery Image 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
              </div>
              <div className="col-span-2 rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <img src={galleryImages[4]} alt="MIKAI Gallery Image 5" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
              </div>
          </div>

          {/* Artist Info */}
          <div className="text-left animate-fade-in-up animation-delay-500">
            <h3 className="font-anton text-8xl md:text-9xl tracking-tighter">MIKAI</h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-violet-500 to-mikai-red my-6"></div>
            <p className="text-gray-300 leading-relaxed mb-8">
              Directamente desde el corazón de la innovación musical, MIKAI emerge como la nueva sensación del K-pop en MIK MUSIC. Con una fusión de ritmos electrónicos y melodías cautivadoras, MIKAI está destinada a redefinir el género y a conectar con una audiencia global. Su energía en el escenario es electrizante y su voz, inolvidable.
            </p>
            <div className="flex items-center gap-6 mb-8">
              <span className="font-semibold uppercase tracking-wider text-gray-400">Síguelo:</span>
              <div className="flex items-center gap-4">
                  <a href={release?.spotifyUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><SpotifyIcon className="w-8 h-8" /></a>
                  <a href={release?.youtubeUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><YoutubeIcon className="w-8 h-8" /></a>
                  <a href={release?.instagramUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300"><InstagramIcon className="w-8 h-8" /></a>
              </div>
            </div>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Primer lanzamiento próximamente...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArtistSection;