import React from 'react';

interface LicensingSectionProps {
  onNavigateToCatalog: () => void;
}

const LicensingSection: React.FC<LicensingSectionProps> = ({ onNavigateToCatalog }) => {
  const steps = [
    {
      title: "1. Encuentra el Beat que Multiplica Tu Impacto",
      description: "Explora nuestro catálogo profesional y elige sonidos creados para emocionar, captar atención y dar valor a tus videos, lanzamientos o campañas."
    },
    {
      title: "2. Selecciona la Licencia que Potencia Tu Crecimiento",
      description: "Elige entre opciones claras y transparentes: Para creadores que están comenzando, hasta licencias ilimitadas para quienes buscan elevar sus ingresos y expandir su presencia en todas las plataformas. Sin restricciones. Sin reclamaciones. Sin bloqueos."
    },
    {
      title: "3. Crea, Publica y Monetiza Sin Barreras",
      description: "Descarga inmediata, calidad de estudio, derechos completos. Publica sin miedo en YouTube, Spotify, Instagram, Facebook, TikTok, y donde estés generando tus ingresos. Tu sonido, tus reglas, tus ganancias."
    }
  ];

  return (
    <section id="licensing" className="py-20 md:py-32 bg-[#121212] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Imagen (visible en escritorio, apilada en móvil) */}
          <div className="order-last lg:order-first mt-8 lg:mt-0">
            <img 
              src="https://i.postimg.cc/KzRQbKzm/Bloqueos-de-contenido-en-You-Tube-Facebook-Instagram-y-Tik-Tok.png" 
              alt="Evita bloqueos de contenido en YouTube, Facebook, Instagram y TikTok"
              className="rounded-lg shadow-2xl shadow-black/50 w-full object-contain transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Columna de Texto */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-anton mb-4">
              <span role="img" aria-label="money bags emoji">💸</span> Convierte Tu Creatividad en Ingresos – Licencias Que Impulsan Tus Ganancias
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Dale poder a tu contenido con beats diseñados para atrapar audiencia, generar retención y desbloquear nuevas fuentes de monetización. Con MIK MUSIC, tienes los derechos, la libertad y la calidad que necesitas para convertir tu talento en dinero real.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-4 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    {/* Hiding the number part of the title for a cleaner look with icons */}
                    <h3 className="font-bold text-lg text-white">{step.title.substring(step.title.indexOf(' ') + 1)}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="mt-10 bg-[#fefe79] p-6 rounded-lg shadow-lg animate-fade-in-up animation-delay-300">
                <p className="text-center font-bold uppercase tracking-widest bg-black text-[#fefe79] py-2 px-4 rounded-md inline-block mb-4">
                    <span role="img" aria-label="rocket emoji">🚀</span> CTA Poderoso
                </p>
                <h3 className="text-2xl font-bold text-center text-black mb-4">
                   Activa Tu Licencia Ahora
                </h3>
                <p className="text-center text-black/80 mb-6">Y empieza a monetizar tu contenido con MIK MUSIC sin límites.</p>
                <button 
                  onClick={onNavigateToCatalog}
                  className="w-full bg-black text-[#fefe79] font-bold uppercase tracking-widest py-4 px-10 rounded-md hover:bg-[#01973c] hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Ver Planes de Licencia
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LicensingSection;