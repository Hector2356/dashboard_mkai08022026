import React from 'react';

interface ServicesSectionProps {
  onNavigateToServices: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigateToServices }) => {
  return (
    <section id="servicios" className="py-20 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto y CTA */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-anton">Servicios de Producción Musical</h2>
            <p className="text-lg text-gray-400 mt-4 max-w-xl mx-auto lg:mx-0">
              Soluciones profesionales para artistas que buscan un sonido de alta calidad y un impacto global. Desde la producción completa hasta el beatmaking exclusivo.
            </p>
            <button
              onClick={onNavigateToServices}
              className="mt-10 bg-[#f2e8a2] text-black font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-[#01973c] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#f2e8a2]/30 hover:shadow-[#01973c]/40 text-lg"
            >
              Lleva Tu Música al Nivel de la Industria
            </button>
          </div>

          {/* Columna de Imagen */}
          <div className="flex items-center justify-center">
             <img 
                src="https://i.postimg.cc/0QNTMdk2/Bloqueos-de-contenido-en-You-Tube-Facebook-Instagram-y-Tik-Tok-2.png" 
                alt="MIK MUSIC Production Services" 
                className="rounded-lg shadow-2xl shadow-black/50 w-full max-w-lg object-contain transition-transform duration-500 hover:scale-105"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;