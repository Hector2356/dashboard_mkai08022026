import React from 'react';

interface BeatsSectionProps {
  onNavigateToCatalog: () => void;
}

const BeatsSection: React.FC<BeatsSectionProps> = ({ onNavigateToCatalog }) => {
  const benefits = [
    "Música 100% libre de copyright, lista para monetizar sin riesgos.",
    "Beats profesionales diseñados para creadores que buscan impacto real.",
    "Sonido cinematográfico premium que transforma cada video.",
    "Licencias ilimitadas para creadores serios, sin restricciones ni reclamos.",
    "Calidad de estudio ultra-profesional para tus proyectos audiovisuales.",
    "Composiciones emocionales que cuentan historias y conectan con tu audiencia.",
    "Monetiza tus videos sin miedo a bloqueos o desmonetización.",
    "Catálogo exclusivo de MIK MUSIC: beats únicos hechos para destacar.",
    "Descarga inmediata y uso en todas tus plataformas."
  ];

  return (
    <section id="beats-cta" className="py-20 md:py-32 bg-[#121212] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto y CTA */}
          <div className="text-left">
            <h2 className="text-5xl md:text-6xl font-anton uppercase tracking-wider mb-2">
              Convierte tu Creatividad en Dinero <span role="img" aria-label="fire emoji">🔥</span>
            </h2>
            <p className="text-lg text-[#fefe79] font-semibold mb-8">
              ¡Empieza a generar ingresos con tus videos ahora!
            </p>
            
            <ul className="space-y-3 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Caja de Llamado a la Acción */}
            <div className="bg-[#fefe79] p-6 rounded-lg border-2 border-black/20 shadow-lg shadow-black/30 animate-fade-in-up animation-delay-300">
                 <p className="text-center font-bold uppercase tracking-widest bg-black text-[#fefe79] py-2 px-4 rounded-md inline-block mb-4">
                    <span role="img" aria-label="fire emoji">🔥</span> BLACK FRIDAY: 50% OFF
                </p>
                <p className="text-center text-black mb-4">En todo el catálogo. ¡Oferta limitada!</p>
                <h3 className="text-2xl font-bold text-center text-black mb-6">
                   Obtén tu licencia ahora y monetiza sin límites
                </h3>
                <button 
                    onClick={onNavigateToCatalog}
                    className="w-full bg-black text-[#fefe79] font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-[#01973c] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                    Explora el catálogo de beats aquí
                </button>
            </div>
          </div>

          {/* Columna de Imagen */}
          <div className="flex items-center justify-center">
             <img 
                src="https://i.postimg.cc/QNP6mqtG/Generated-Image-November-09-2025-9-40PM.png" 
                alt="Promotional image for MIK MUSIC beats catalog" 
                className="rounded-lg shadow-2xl shadow-black/50 w-full max-w-2xl object-contain transition-transform duration-500 hover:scale-105"
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeatsSection;