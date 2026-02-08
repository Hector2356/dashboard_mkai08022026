import React, { useState, useMemo } from 'react';
import type { Testimonial, AlbumColorTheme } from '../types';
import TestimonialCard from './TestimonialCard';
import { MOCK_TESTIMONIALS } from '../constants';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  theme: AlbumColorTheme;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use fetched testimonials if available, otherwise use mock data as a fallback.
  const finalTestimonials = (testimonials && testimonials.length > 0) ? testimonials : MOCK_TESTIMONIALS;

  const itemsPerView = useMemo(() => {
    if (typeof window === 'undefined') return 1;
    return window.innerWidth >= 768 ? 2 : 1;
  }, []);

  const totalPages = Math.ceil(finalTestimonials.length / itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              {finalTestimonials.slice(pageIndex * itemsPerView, (pageIndex + 1) * itemsPerView).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} theme={theme} />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={goToPrevious}
            aria-label="Previous testimonial"
            className={`p-3 rounded-full transition-colors duration-300 bg-gray-800/50 hover:bg-gray-700/80 ${theme.accentTextClass}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
              {Array.from({length: totalPages}).map((_, idx) => (
                  <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentIndex === idx ? theme.buttonClasses.split(' ')[0] : 'bg-gray-700'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                  ></button>
              ))}
          </div>
          <button
            onClick={goToNext}
            aria-label="Next testimonial"
            className={`p-3 rounded-full transition-colors duration-300 bg-gray-800/50 hover:bg-gray-700/80 ${theme.accentTextClass}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;