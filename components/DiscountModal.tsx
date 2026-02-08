
import React, { useEffect, useState } from 'react';

interface DiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCtaClick: () => void;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ isOpen, onClose, onCtaClick }) => {
  const [isCtaClicked, setIsCtaClicked] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  useEffect(() => {
    if (isOpen) {
        setIsCtaClicked(false);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const handleConfirmClick = () => {
    if (isCtaClicked) return;
    setIsCtaClicked(true);
    // There is no color change in the new design, just navigate
    onCtaClick();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 transition-opacity duration-300 animate-fade-in-up"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-[#0F172A] rounded-2xl border border-white/20 w-full max-w-lg text-center shadow-2xl shadow-black/60 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors z-10"
          aria-label="Cerrar modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 md:p-12">
            <div className="mb-4">
                <span className="inline-block bg-white/10 text-gray-300 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                    Oferta Exclusiva
                </span>
            </div>
            <h2 className="text-2xl md:text-3xl text-white font-bold">
                ¿Eres Músico o Creador de Contenido?
            </h2>
            <p className="text-lg text-white font-semibold mt-2 mb-4">
                <span role="img" aria-label="fire emoji">🔥</span> ¡Esto es para ti! <span role="img" aria-label="fire emoji">🔥</span>
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
                ¡SOLO POR HOY! Obtén un increíble
            </p>
            
            <div className="my-4 inline-block p-2 bg-black/30 rounded-lg">
                <p 
                    className="font-anton text-8xl md:text-9xl text-white tracking-tighter"
                    style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
                >
                    50% OFF
                </p>
            </div>


            <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-md mx-auto">
                en <strong className="text-white">TODAS</strong> nuestras licencias de beats.
                ¡Monetiza tus videos sin límites y con sonido profesional!
            </p>

            <button
                onClick={handleConfirmClick}
                disabled={isCtaClicked}
                className="w-full font-bold uppercase tracking-widest py-4 px-10 rounded-lg transition-all duration-300 transform text-lg bg-gray-800 text-gray-200 border border-gray-600 hover:bg-[#fefe79] hover:text-black hover:border-[#fefe79] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                ¡Quiero Mi 50% Ahora!
            </button>
            <button
                onClick={onClose}
                className="mt-4 text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
                No, gracias. Dejaré pasar la oferta.
            </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;