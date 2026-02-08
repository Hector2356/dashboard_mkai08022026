import React, { useState } from 'react';
import type { Testimonial, AlbumColorTheme } from '../types';
import { StarIcon } from './icons/StarIcon';

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme: AlbumColorTheme;
}

const StarRating: React.FC<{ rating: number; color: string }> = ({ rating, color }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className="w-5 h-5"
        style={{ color: index < rating ? color : 'rgb(75 85 99)' }} // theme.hex or gray-500
      />
    ))}
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, theme }) => {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 flex flex-col h-full shadow-lg hover:border-gray-600/80 transition-colors duration-300">
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-600" />
          <div>
            <p className="font-bold text-white text-lg">{testimonial.name}</p>
            <StarRating rating={testimonial.rating} color={theme.hex} />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
            <button 
                onClick={() => setLang('es')} 
                className={`px-2 py-0.5 rounded-md transition-colors ${lang === 'es' ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
                ES
            </button>
             <button 
                onClick={() => setLang('en')} 
                className={`px-2 py-0.5 rounded-md transition-colors ${lang === 'en' ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10'}`}
            >
                EN
            </button>
        </div>
      </header>
      
      <div className="flex-grow">
        <p className="text-gray-300 leading-relaxed font-light">
          "{lang === 'es' ? testimonial.comment_es : testimonial.comment_en}"
        </p>
      </div>

      <footer className="mt-4 pt-4 border-t border-gray-700/50">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-400">
           Comprador Verificado
        </p>
      </footer>
    </div>
  );
};

export default TestimonialCard;