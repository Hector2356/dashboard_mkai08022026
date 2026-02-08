// @bloqueado: NO MODIFICAR ESTE ARCHIVO.
import React, { useEffect, useRef, useState } from 'react';
import type { Release } from '../types';
import { DiscordIcon, TikTokIcon, InstagramIcon, YoutubeIcon, SpotifyIcon } from './icons/SocialIcons';

interface MikUniversePageProps {
  artistRelease: Release | null;
  onBack: () => void;
}

const Section: React.ForwardRefRenderFunction<HTMLElement, { children: React.ReactNode, className?: string }> = ({ children, className }, ref) => {
  return (
    <section ref={ref} className={`transition-all duration-1000 ease-out opacity-0 transform translate-y-8 ${className}`}>
      {children}
    </section>
  );
};
const FadedSection = React.forwardRef(Section);


const MikUniversePage: React.FC<MikUniversePageProps> = ({ artistRelease, onBack }) => {
    const sectionsRef = useRef<Array<HTMLElement | null>>([]);
    const cursorFollowerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorFollowerRef.current) {
                cursorFollowerRef.current.style.left = `${e.clientX}px`;
                cursorFollowerRef.current.style.top = `${e.clientY}px`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('opacity-0', 'translate-y-8');
                        entry.target.classList.add('opacity-100', 'translate-y-0');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionsRef.current.forEach((section) => {
            if (section) {
                observer.observe(section);
            }
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    const addToRefs = (el: HTMLElement | null) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <div id="cursor-follower" ref={cursorFollowerRef}></div>
      <button onClick={onBack} className="fixed top-8 left-8 z-50 text-mikai-red uppercase tracking-widest hover:underline transition-all duration-300 font-bold">
          ← Volver al inicio
      </button>

      {/* Hero Section */}
      <FadedSection ref={addToRefs} className="h-screen flex flex-col items-center justify-center text-center relative p-6">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-mikai-dark-gray/50 to-black opacity-50"></div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
             <img src="https://i.postimg.cc/wTz57pvt/12.png" alt="MIKAI Portrait" className="absolute z-10 w-auto h-full max-h-[80vh] object-contain" />
             <div className="absolute w-[450px] h-[450px] bg-mikai-red rounded-full blur-3xl opacity-40 animate-pulse-glow"></div>
        </div>

        <div className="relative z-20">
            <h1 className="font-anton text-6xl md:text-9xl uppercase tracking-tighter text-shadow-violet">MIKAI</h1>
            <p className="md:text-xl uppercase tracking-[0.3em] font-light text-gray-300 mt-2">The Future of K-Pop Has a New Voice.</p>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Creada en Colombia por MIK MUSIC. Inspirada por el fuego del código y el alma del ritmo.</p>
            <a href={artistRelease?.spotifyUrl || '#'} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-mikai-red text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-white hover:text-mikai-red transition-all duration-300 transform hover:scale-105 neon-glow-mikai-red">
                Escúchala en Spotify
            </a>
        </div>
      </FadedSection>

      {/* Stats Section */}
      <FadedSection ref={addToRefs} className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-anton mb-12 text-mikai-red tracking-wider">El Universo MIKAI en Números</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-mikai-dark-gray p-8 rounded-2xl">
                      <p className="text-6xl font-anton text-mikai-red">1M+</p>
                      <p className="text-gray-400 mt-2 uppercase tracking-widest">Streams Globales</p>
                  </div>
                  <div className="bg-mikai-dark-gray p-8 rounded-2xl">
                      <p className="text-6xl font-anton text-mikai-red">250K+</p>
                      <p className="text-gray-400 mt-2 uppercase tracking-widest">Fans en la Comunidad</p>
                  </div>
                   <div className="bg-mikai-dark-gray p-8 rounded-2xl">
                      <p className="text-6xl font-anton text-mikai-red">48+</p>
                      <p className="text-gray-400 mt-2 uppercase tracking-widest">Países Alcanzados</p>
                  </div>
              </div>
          </div>
      </FadedSection>
      
       {/* Quién es MIKAI Section */}
      <FadedSection ref={addToRefs} className="py-20 md:py-32 bg-mikai-dark-gray">
        <div className="container mx-auto px-6 grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
                <img src="https://i.postimg.cc/NGm7sMgF/4.png" alt="MIKAI decorative 1" className="rounded-lg aspect-square object-cover animate-glitch" />
                <img src="https://i.postimg.cc/FF3grR9K/7.png" alt="MIKAI decorative 2" className="rounded-lg aspect-square object-cover mt-8 animate-glitch animation-delay-300" />
                <img src="https://i.postimg.cc/HWX4Yxps/6.png" alt="MIKAI decorative 3" className="rounded-lg aspect-square object-cover animate-glitch animation-delay-500" />
                <img src="https://i.postimg.cc/P5xwwrk4/8.png" alt="MIKAI decorative 4" className="rounded-lg aspect-square object-cover mt-8 animate-glitch animation-delay-700" />
            </div>
            <div className="md:col-span-3">
                 <h2 className="font-anton text-4xl md:text-5xl uppercase tracking-wider mb-6 text-shadow-red" style={{textShadow: '0 0 15px #ff0033'}}>
                  <span className="text-mikai-red mr-4">🔥</span>QUIÉN ES MIKAI
                </h2>
                <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
                    <p>MIKAI no es solo una artista. Es una visión del futuro nacida entre códigos, melodías y emociones reales. Creada por MIK MUSIC en Colombia, MIKAI es la primera cantante virtual de K-Pop urbano latino, un puente entre la tecnología y el alma humana.</p>
                    <p>En su universo, la inteligencia artificial no reemplaza al artista — lo amplifica. Cada nota, cada palabra y cada gesto están diseñados para conectar con la energía de una nueva generación.</p>
                    <p>Musicalmente, suena como si Seúl y Bogotá se encontraran en un mismo beat — un sonido que funde el pop coreano, el ritmo urbano y el alma digital.</p>
                </div>
                 <blockquote className="mt-8 border-l-4 border-mikai-red pl-6 py-2">
                    <p className="font-anton text-2xl text-white tracking-wide">“MIKAI no nació de la fama. Nació del fuego que se enciende cuando la música y la IA se fusionan.”</p>
                </blockquote>
            </div>
        </div>
      </FadedSection>

      {/* Exclusive Content Section */}
      <FadedSection ref={addToRefs} className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-anton mb-4 text-mikai-red tracking-wider">El Universo Expandido</h2>
              <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Contenido exclusivo, merchandising y experiencias únicas solo para la comunidad.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-mikai-dark-gray p-8 rounded-2xl border border-mikai-red/20"><h3 className="text-2xl font-anton text-white">Canciones Personalizadas</h3></div>
                  <div className="bg-mikai-dark-gray p-8 rounded-2xl border border-mikai-red/20"><h3 className="text-2xl font-anton text-white">Merch Exclusivo</h3></div>
                  <div className="bg-mikai-dark-gray p-8 rounded-2xl border border-mikai-red/20"><h3 className="text-2xl font-anton text-white">Experiencias VIP</h3></div>
              </div>
          </div>
      </FadedSection>
      
      {/* Final CTA */}
      <FadedSection ref={addToRefs} className="py-20 text-center bg-black">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-anton text-white">MIKAI no pertenece al futuro.<br/><span className="text-mikai-red">Ella es el futuro.</span></h2>
            <p className="text-gray-400 mt-4 mb-8">Únete a la comunidad y sé parte de la revolución.</p>
            <div className="flex justify-center items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><DiscordIcon className="w-10 h-10" /></a>
                <a href={artistRelease?.instagramUrl || '#'} className="text-gray-400 hover:text-mikai-red transition-colors"><InstagramIcon className="w-10 h-10" /></a>
                <a href={artistRelease?.youtubeUrl || '#'} className="text-gray-400 hover:text-mikai-red transition-colors"><YoutubeIcon className="w-10 h-10" /></a>
                <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><TikTokIcon className="w-10 h-10" /></a>
            </div>
        </div>
      </FadedSection>

      <footer className="bg-mikai-dark-gray py-8 text-center text-gray-500">
          <p>&copy;{new Date().getFullYear()} MIK MUSIC — Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MikUniversePage;