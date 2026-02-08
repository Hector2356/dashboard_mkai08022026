
import React from 'react';

interface MikUniverseCtaSectionProps {
  onNavigateToUniverse: () => void;
}

const MikUniverseCtaSection: React.FC<MikUniverseCtaSectionProps> = ({ onNavigateToUniverse }) => {
  return (
    <section id="mik-universe-cta" className="relative py-24 md:py-40 bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.postimg.cc/x8sjpgnf/Copilot-20251101-233941.png"
          alt="MIKAI Universe background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h2 className="font-anton text-4xl md:text-6xl text-shadow-lg leading-tight">
          Entra al <br />
          <span className="text-mikai-red">Universo MIKAI</span>
        </h2>
        <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
          Descubre a la primera artista virtual de K-Pop urbano latino. Una fusión de tecnología, música y alma creada por MIK MUSIC.
        </p>
        <button
          onClick={onNavigateToUniverse}
          className="mt-10 bg-mikai-red text-white font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-white hover:text-mikai-red transition-all duration-300 transform hover:scale-105 neon-glow-mikai-red"
        >
          Explorar ahora
        </button>
      </div>
    </section>
  );
};

export default MikUniverseCtaSection;