import React from 'react';

interface HeroSectionProps {
  onNavigateToCatalog: () => void;
  onNavigateToUniverse: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToCatalog, onNavigateToUniverse }) => {
  return (
    <section id="inicio" className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-black">
      {/* Background images removed for a solid black background */}

      <div className="relative z-10 container mx-auto px-6 animate-fade-in-up">
        {/* MIK MUSIC Logo */}
        <div className="mb-4 md:mb-6">
            <h2 
                className="font-anton text-7xl md:text-9xl text-mikai-lemon uppercase"
                // Applying inline styles for complex text-shadow to replicate the 3D effect
                style={{
                    textShadow: '3px 3px 0 #A0A0A0, 6px 6px 0 #707070'
                }}
            >
                MIK MUSIC
            </h2>
        </div>
        
        {/* Slogan with glow effect */}
        <h1 className="text-4xl md:text-5xl font-anton uppercase tracking-wider text-white text-shadow-lg">
          LA FÁBRICA DE HACER ESTRELLAS
        </h1>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onNavigateToCatalog}
            className="w-full sm:w-auto bg-[#fefe79] text-black font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-yellow-200 active:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg neon-glow-yellow text-lg"
          >
            Explorar Catálogo de Beats
          </button>
          <button
            onClick={onNavigateToUniverse}
            className="w-full sm:w-auto bg-[#908ac5] text-white font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-[#a19bc9] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-violet-500/30 text-lg"
          >
            Universo MIKAI
          </button>
        </div>
      </div>
      
      {/* Scroll Down Hint */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;