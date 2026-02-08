// components/MikUniversePage.version1mikai.tsx

// @bloqueado: NO MODIFICAR ESTE ARCHIVO.
import React, { useState, useEffect, useRef } from 'react';
import type { Release } from '../types';
import { SpotifyIcon, YoutubeIcon, InstagramIcon, DiscordIcon, TikTokIcon } from './icons/SocialIcons';

interface MikUniversePageProps {
  artistRelease: Release | null;
  onBack: () => void;
}

const StatCounter: React.FC<{ end: number; label: string; delay?: number }> = ({ end, label, delay = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, 16);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [end]);

    return (
        <div ref={ref} className="text-center">
            <p className="font-anton text-6xl md:text-8xl text-mikai-red tracking-tighter">{count.toLocaleString('en-US')}+</p>
            <p className="text-gray-400 uppercase tracking-widest mt-2">{label}</p>
        </div>
    );
};

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <section
            ref={ref}
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
        >
            {children}
        </section>
    );
};

const MikUniversePage: React.FC<MikUniversePageProps> = ({ artistRelease, onBack }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const mikaiImages = [
        "https://i.postimg.cc/NGm7sMgF/4.png",
        "https://i.postimg.cc/wTz57pvt/12.png",
        "https://i.postimg.cc/FF3grR9K/7.png",
        "https://i.postimg.cc/HWX4Yxps/6.png",
        "https://i.postimg.cc/P5xwwrk4/8.png",
        "https://i.postimg.cc/YCV1vzc3/Generated-Image-October-26-2025-7-07PM.png",
        "https://i.postimg.cc/x8sjpgnf/Copilot-20251101-233941.png"
    ];

    return (
        <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
            <div id="cursor-follower" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
            
            <button onClick={onBack} className="fixed top-6 left-6 z-50 text-gray-400 uppercase tracking-widest hover:text-white transition-colors text-sm">
                ← Volver
            </button>

            {/* Hero Section */}
            <header className="h-screen flex flex-col items-center justify-center text-center relative p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 animate-pulse-glow" style={{ background: 'radial-gradient(ellipse at center, rgba(255,0,51,0.2) 0%, rgba(255,0,51,0) 70%)' }}></div>
                
                <div className="relative z-10 max-w-lg mx-auto">
                    <img src={mikaiImages[1]} alt="MIKAI Portrait" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover mx-auto mb-8 border-4 border-mikai-red shadow-2xl shadow-mikai-red/50" />
                    <h1 className="font-anton text-5xl md:text-7xl uppercase text-shadow-lg">Bienvenido al Universo MIKAI</h1>
                    <p className="text-lg text-gray-300 tracking-wider mt-4">La nueva voz del K-Pop tiene un nuevo futuro.</p>
                </div>
            </header>
            
            <main className="relative z-10 container mx-auto px-6 pb-24 md:pb-32 space-y-24 md:space-y-32">
                {/* Stats Section */}
                <Section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <StatCounter end={100000} label="Streams Globales" />
                    <StatCounter end={50000} label="Fans Conectados" />
                    <StatCounter end={25} label="Países Alcanzados" />
                </Section>
                
                {/* Quien es MIKAI Section */}
                <Section>
                    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[400px] md:h-[500px]">
                            <img src={mikaiImages[0]} alt="MIKAI mosaic 1" className="col-span-2 row-span-2 object-cover w-full h-full rounded-lg shadow-lg" />
                            <img src={mikaiImages[2]} alt="MIKAI mosaic 2" className="object-cover w-full h-full rounded-lg shadow-lg" />
                            <img src={mikaiImages[3]} alt="MIKAI mosaic 3" className="object-cover w-full h-full rounded-lg shadow-lg" />
                            <img src={mikaiImages[4]} alt="MIKAI mosaic 4" className="col-span-3 object-cover w-full h-full rounded-lg shadow-lg" />
                        </div>
                        <div className="text-left">
                            <h2 className="font-anton text-4xl md:text-5xl mb-6"><span className="text-mikai-red">🔥</span> Quién es MIKAI</h2>
                            <div className="space-y-4 text-gray-300 leading-relaxed">
                                <p>MIKAI no es solo una artista. Es una visión del futuro nacida entre códigos, melodías y emociones reales. Creada por MIK MUSIC en Colombia, MIKAI es la primera cantante virtual de K-Pop urbano latino, un puente entre la tecnología y el alma humana.</p>
                                <p>En su universo, la inteligencia artificial no reemplaza al artista — lo amplifica. Cada nota, cada palabra y cada gesto están diseñados para conectar con la energía de una nueva generación.</p>
                                <blockquote className="border-l-4 border-mikai-red pl-4 italic my-6 text-gray-200">
                                    “MIKAI no nació de la fama. Nació del fuego que se enciende cuando la música y la IA se fusionan.”
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </Section>
                
                {/* Exclusive Content Section */}
                <Section className="text-center">
                    <h2 className="font-anton text-4xl md:text-5xl mb-4">El Universo Expandido</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-12">Contenido exclusivo, merchandising de edición limitada y experiencias únicas. Solo aquí.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-mikai-dark-gray p-6 rounded-lg border border-mikai-red/30 transition-transform duration-300 hover:scale-105">
                            <h3 className="font-anton text-2xl mb-2 text-mikai-red">Merch Oficial</h3>
                            <p className="text-gray-400">Colecciones de ropa y accesorios inspirados en el Cyber Seoul.</p>
                        </div>
                         <div className="bg-mikai-dark-gray p-6 rounded-lg border border-mikai-red/30 transition-transform duration-300 hover:scale-105">
                            <h3 className="font-anton text-2xl mb-2 text-mikai-red">Canciones Personalizadas</h3>
                            <p className="text-gray-400">Solicita un beat o una canción completa creada solo para ti.</p>
                        </div>
                         <div className="bg-mikai-dark-gray p-6 rounded-lg border border-mikai-red/30 transition-transform duration-300 hover:scale-105">
                            <h3 className="font-anton text-2xl mb-2 text-mikai-red">Contenido Inédito</h3>
                            <p className="text-gray-400">Accede a demos, visuales y material exclusivo para fans.</p>
                        </div>
                    </div>
                </Section>

                {/* Spotify Embed Section */}
                 <Section>
                    <div className="bg-mikai-dark-gray p-8 md:p-12 rounded-2xl border border-mikai-red/20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="font-anton text-4xl md:text-5xl mb-4">La Revolución Sonora</h2>
                                <p className="text-gray-300 mb-8 leading-relaxed">Descubre su debut. Vive el universo sonoro de MIKAI y únete a la rebelión del pop digital.</p>
                                <a href="https://open.spotify.com/artist/6K3cVYlcdu420FHW8PS8bH" target="_blank" rel="noopener noreferrer" className="inline-block bg-mikai-red text-white font-bold uppercase tracking-widest py-3 px-8 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                                    Escuchar en Spotify
                                </a>
                            </div>
                            <iframe
                                title="Spotify Artist Profile for MIKAI"
                                src="https://open.spotify.com/embed/artist/6K3cVYlcdu420FHW8PS8bH?utm_source=generator&theme=0"
                                width="100%"
                                height="380"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="rounded-xl shadow-2xl shadow-black/50"
                            ></iframe>
                        </div>
                    </div>
                </Section>
                
                {/* Final CTA Section */}
                <Section className="text-center">
                    <h2 className="font-anton text-4xl md:text-6xl mb-4">Únete a la Rebelión</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">MIKAI es más que una artista. Es una comunidad. Conecta, crea y redefine el futuro con nosotros.</p>
                    <div className="flex justify-center items-center gap-6">
                        <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><DiscordIcon className="w-8 h-8" /></a>
                        <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><TikTokIcon className="w-8 h-8" /></a>
                        <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><InstagramIcon className="w-8 h-8" /></a>
                        <a href="#" className="text-gray-400 hover:text-mikai-red transition-colors"><YoutubeIcon className="w-8 h-8" /></a>
                    </div>
                </Section>
            </main>
            
            <footer className="text-center text-gray-600 text-sm py-8 border-t border-mikai-dark-gray">
                <p>©{new Date().getFullYear()} MIK MUSIC — Creado en el Fuego Digital.</p>
            </footer>
        </div>
    );
};

export default MikUniversePage;