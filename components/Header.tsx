
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onNavigateToHome: () => void;
    onNavigateToCatalog: () => void;
    onNavigateToServices: () => void;
    onNavigateToUniverse: () => void;
    onNavigateToMikaiMusic?: () => void;
    onNavigateToDashboard?: () => void;
}

const NavButton: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="text-gray-300 hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold text-sm bg-transparent border-none cursor-pointer p-0"
    >
        {children}
    </button>
);


const Header: React.FC<HeaderProps> = ({ 
    onNavigateToHome, 
    onNavigateToCatalog, 
    onNavigateToServices, 
    onNavigateToUniverse,
    onNavigateToMikaiMusic,
    onNavigateToDashboard
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
      onNavigateToHome();
      setTimeout(() => {
          document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <button onClick={onNavigateToHome} className="font-anton text-2xl tracking-wider text-white bg-transparent border-none cursor-pointer p-0">
          MIK <span className="text-mikai-lemon">MUSIC</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <NavButton onClick={onNavigateToHome}>Inicio</NavButton>
          <NavButton onClick={onNavigateToServices}>Servicios</NavButton>
          <NavButton onClick={onNavigateToCatalog}>Catálogo</NavButton>
          <NavButton onClick={onNavigateToUniverse}>Universo MIKAI</NavButton>
          {onNavigateToMikaiMusic && <NavButton onClick={onNavigateToMikaiMusic}>MIKAI Music</NavButton>}
          {onNavigateToDashboard && (
            <button 
              onClick={onNavigateToDashboard}
              className="flex items-center gap-1 text-primary hover:text-white transition-colors duration-300 uppercase tracking-widest font-bold text-sm bg-transparent border-none cursor-pointer p-0"
            >
              <span className="material-symbols-outlined text-sm">monitoring</span>
              Dashboard
            </button>
          )}
        </nav>
        
        <button
            onClick={() => scrollToSection('#contacto')}
            className="hidden md:inline-block bg-mikai-lemon text-black font-bold uppercase tracking-widest py-2 px-6 rounded-md hover:bg-yellow-200 transition-colors duration-300 text-sm"
        >
            Contacto
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white z-50"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col items-center gap-6 py-8">
            <NavButton onClick={() => { onNavigateToHome(); setIsMenuOpen(false); }}>Inicio</NavButton>
            <NavButton onClick={() => { onNavigateToServices(); setIsMenuOpen(false); }}>Servicios</NavButton>
            <NavButton onClick={() => { onNavigateToCatalog(); setIsMenuOpen(false); }}>Catálogo</NavButton>
            <NavButton onClick={() => { onNavigateToUniverse(); setIsMenuOpen(false); }}>Universo MIKAI</NavButton>
            {onNavigateToMikaiMusic && <NavButton onClick={() => { onNavigateToMikaiMusic(); setIsMenuOpen(false); }}>MIKAI Music</NavButton>}
            {onNavigateToDashboard && (
              <button 
                onClick={() => { onNavigateToDashboard(); setIsMenuOpen(false); }}
                className="text-primary hover:text-white transition-colors duration-300 uppercase tracking-widest font-bold text-sm bg-transparent border-none cursor-pointer p-0 flex items-center gap-2"
              >
                <span className="material-symbols-outlined">monitoring</span>
                Dashboard Admin
              </button>
            )}
            <button
                onClick={() => {
                    scrollToSection('#contacto');
                    setIsMenuOpen(false);
                }}
                className="mt-4 bg-mikai-lemon text-black font-bold uppercase tracking-widest py-3 px-8 rounded-md hover:bg-yellow-200 transition-colors duration-300"
            >
                Contacto
            </button>
          </nav>
      </div>
    </header>
  );
};

export default Header;
