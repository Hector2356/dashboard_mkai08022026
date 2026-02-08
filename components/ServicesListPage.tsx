import React from 'react';
import type { Service } from '../types';
import { PaymentIcons } from './icons/PaymentIcons';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
    const { title, tagline, price, features, popular, colorClass, imageUrl, purchaseUrl } = service;
    
    const isComboRocket = title.includes('Combo Rocket');

    const mailtoEmail = 'mikmusic2356@gmail.com';
    const subject = encodeURIComponent(`Interés en Servicio: ${title}`);
    const body = encodeURIComponent(`Hola,\n\nEstoy interesado/a en el servicio "${title}".\n\nPor favor, indíquenme los siguientes pasos.\n\nGracias.`);
    const finalPurchaseUrl = purchaseUrl || `mailto:${mailtoEmail}?subject=${subject}&body=${body}`;

    if (isComboRocket) {
        return (
            <div className="relative group flex flex-col bg-gray-900/50 rounded-2xl p-0.5 bg-gradient-to-br from-cyan-400 via-violet-500 to-red-500 transition-all duration-300 hover:scale-105">
                <div className="bg-gray-900 rounded-[14px] flex flex-col flex-grow h-full overflow-hidden">
                    {popular && (
                         <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-10">
                            <div className="absolute top-8 right-[-34px] w-full transform rotate-45 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-center font-bold uppercase tracking-wider py-1.5 text-sm shadow-lg">
                                Más Popular
                            </div>
                        </div>
                    )}
                    
                    {imageUrl && (
                        <img src={imageUrl} alt={title} className="w-full h-56 object-cover" />
                    )}

                    <div className="p-8 flex flex-col flex-grow">
                        <h3 className="font-anton text-3xl text-white">{title}</h3>
                        <p className="text-gray-400 mt-2 mb-6">{tagline}</p>
                        <p className="font-anton text-5xl my-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">{price}</p>
                        
                        <ul className="space-y-3 mb-8 text-gray-300">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <svg className="w-6 h-6 mr-3 text-cyan-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <a
                            href={finalPurchaseUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto block text-center w-full font-bold uppercase tracking-widest py-4 px-6 rounded-md transition-all duration-300 text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-violet-500/30"
                        >
                            Consíguelo ahora
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // Default card styling
    return (
        <div className={`relative flex flex-col bg-gray-900/50 rounded-2xl border border-gray-800 transition-all duration-300 hover:scale-105`}>
             {popular && (
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden z-10">
                    <div className="absolute top-8 right-[-34px] w-full transform rotate-45 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-center font-bold uppercase tracking-wider py-1.5 text-sm shadow-lg">
                        Más Popular
                    </div>
                </div>
            )}
            
            {imageUrl && (
                <img src={imageUrl} alt={title} className="w-full h-56 object-cover rounded-t-2xl" />
            )}

            <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-anton text-3xl text-white">{title}</h3>
                <p className="text-gray-400 mt-2 mb-6">{tagline}</p>
                <p className="font-anton text-5xl my-4 text-white">{price}</p>
                
                <ul className="space-y-3 mb-8 text-gray-300">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <svg className={`w-6 h-6 mr-3 ${colorClass.checkColor} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <a
                    href={finalPurchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto block text-center w-full font-bold uppercase tracking-widest py-4 px-6 rounded-md transition-all duration-300 ${colorClass.button} ${colorClass.buttonText} ${colorClass.shadow}`}
                >
                    Contratar
                </a>
            </div>
        </div>
    );
};

const StudioSection = () => {
    const mailtoEmail = 'mikmusic2356@gmail.com';
    const subject = encodeURIComponent('Consulta sobre el Estudio de Grabación');
    const body = encodeURIComponent('Hola,\n\nEstoy interesado/a en saber más sobre el estudio y cómo podemos trabajar juntos.\n\nGracias.');
    const contactLink = `mailto:${mailtoEmail}?subject=${subject}&body=${body}`;
    
    return (
     <section id="studio-welcome" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-lg overflow-hidden shadow-lg shadow-black/50">
                    <img src="https://i.postimg.cc/Wpf6Gmn9/Whats-App-Image-2025-03-31-at-19-03-34.jpg" alt="MIK MUSIC Studio 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                    <img src="https://i.postimg.cc/YCfCfLjn/estudio.jpg" alt="MIK MUSIC Studio 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                </div>
                 <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                    <img src="https://i.postimg.cc/R0d9yZsy/Whats-App-Image-2025-11-09-at-23-34-45.jpg" alt="MIK MUSIC Studio 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"/>
                </div>
            </div>

            {/* Info */}
            <div className="text-left">
                <h3 className="font-anton text-4xl md:text-5xl">Bienvenido al Lugar Donde Nace Tu Estrella</h3>
                 <div className="w-24 h-1.5 bg-gradient-to-r from-violet-500 to-mikai-red my-6"></div>
                <p className="text-gray-300 leading-relaxed mb-8">
                    Aquí no vienes a un estudio… aquí entras a tu inicio. A ese espacio donde tus ideas se transforman en algo real, grande y con identidad propia. Llevo años creando, mezclando, puliendo y entendiendo lo que hace que una canción se sienta viva, que conecte y que suene “wow”. Y quiero poner todo ese conocimiento a tu servicio.
                    <br/><br/>
                    Entra, vibra, suelta tu sonido… y juntos construimos el camino que te va a llevar a lo más alto. 🚀🔥
                </p>
                {/* CTA Card */}
                 <div className="bg-[#fefe79] border border-black/20 p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-center text-black mb-4">
                       👉 ¿Listo para empezar a sonar como un artista de verdad?
                    </h4>
                    <a 
                      href={contactLink}
                      className="w-full block text-center bg-black text-[#fefe79] font-bold uppercase tracking-widest py-3 px-8 rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                      Hablemos
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
)};

const ServicesListPage: React.FC<{ services: Service[], onBack: () => void }> = ({ services, onBack }) => {
  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen">
      <div className="absolute top-0 right-0 -translate-y-1/2 w-[150%] h-full bg-gradient-to-l from-green-900/30 via-transparent to-transparent opacity-30 blur-3xl pointer-events-none z-0"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <button onClick={onBack} className="text-green-400 uppercase tracking-widest hover:underline mb-12 inline-block">
          ← Volver al inicio
        </button>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-anton text-white text-shadow">
            Servicios de Producción Musical
          </h1>
          <p className="text-lg text-gray-400 font-light mt-2 max-w-3xl mx-auto">
            Soluciones completas para artistas, productores y creadores de contenido. Calidad profesional para llevar tu música al siguiente nivel de la industria.
          </p>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
                <ServiceCard key={service.id} service={service} />
            ))}
        </div>
        
        <StudioSection />

        <section className="mt-24 text-center">
            <h2 className="text-2xl font-anton text-gray-400 tracking-wider mb-6">Métodos de Pago Aceptados</h2>
            <div className="flex justify-center items-center gap-4 flex-wrap">
                <PaymentIcons />
            </div>
            <p className="text-gray-500 mt-6 text-sm">
                Aceptamos transferencias y pagos a través de las principales plataformas.
            </p>
        </section>

      </div>
    </div>
  );
};

export default ServicesListPage;