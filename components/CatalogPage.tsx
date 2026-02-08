// @bloqueado: NO MODIFICAR ESTE ARCHIVO.
import React, { useState, useMemo, useEffect } from 'react';
import type { Album } from '../types';

interface CatalogPageProps {
  albums: Album[];
  onSelectAlbum: (albumId: string) => void;
  onBack: () => void;
}

const ITEMS_PER_PAGE = 5;

const AlbumListItem: React.FC<{ album: Album; onSelect: () => void }> = ({ album, onSelect }) => (
    <div 
        className={`group relative bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-500 ${album.colorTheme.borderClass} ${album.colorTheme.neonGlowClass}`}
    >
        <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 p-6">
            <div className="w-40 h-40 md:w-48 md:h-48 flex-shrink-0">
                <img src={album.coverArtUrl} alt={album.name} className="w-full h-full object-cover rounded-md shadow-lg shadow-black/50 transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                  {album.genre && <span className="text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-white/10 text-purple-300">{album.genre}</span>}
                  {album.subscriptionTypes?.map(type => (
                    <span key={type} className="text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-white/10 text-orange-300">{type}</span>
                  ))}
                  {album.volume && <span className="text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-white/10 text-yellow-300">{album.volume}</span>}
                  {album.emotion?.map(emo => (
                    <span key={emo} className="text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-white/10 text-green-300">{emo}</span>
                  ))}
                </div>
                <h3 className="font-anton text-2xl text-white mb-2">{album.name}</h3>
                <p className="text-gray-400 font-light mb-6 text-base leading-relaxed">{album.description}</p>
                 <button
                    onClick={onSelect}
                    className={`font-bold uppercase tracking-widest py-3 px-6 rounded-md transition-all duration-300 transform group-hover:scale-105 ${album.colorTheme.buttonClasses}`}
                >
                    Ver detalles
                </button>
            </div>
        </div>
    </div>
);


const CatalogPage: React.FC<CatalogPageProps> = ({ albums, onSelectAlbum, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState('all');
  const [selectedEmotion, setSelectedEmotion] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const uniqueGenres = useMemo(() => {
    const genres = new Set(albums.map(album => album.genre).filter(Boolean));
    return Array.from(genres);
  }, [albums]);

  const uniqueSubscriptionTypes = useMemo(() => {
    const types = new Set(albums.flatMap(album => album.subscriptionTypes || []));
    return Array.from(types);
  }, [albums]);
  
  const uniqueEmotions = useMemo(() => {
    const emotions = new Set(albums.flatMap(album => album.emotion || []));
    return Array.from(emotions);
  }, [albums]);

  const filteredAndSortedAlbums = useMemo(() => {
    let filtered = [...albums];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(album => 
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.volume?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(album => album.genre === selectedGenre);
    }
    
    // Subscription Type filter
    if (selectedSubscriptionType !== 'all') {
      filtered = filtered.filter(album => album.subscriptionTypes?.includes(selectedSubscriptionType));
    }
    
    // Emotion filter
    if (selectedEmotion !== 'all') {
        filtered = filtered.filter(album => album.emotion?.includes(selectedEmotion));
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.rawCreationDate).getTime() - new Date(a.rawCreationDate).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.rawCreationDate).getTime() - new Date(b.rawCreationDate).getTime());
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'tracks-desc':
        filtered.sort((a, b) => b.trackCount - a.trackCount);
        break;
    }

    return filtered;
  }, [albums, searchTerm, selectedGenre, selectedSubscriptionType, selectedEmotion, sortBy]);
  
  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [filteredAndSortedAlbums]);

  const albumsToShow = filteredAndSortedAlbums.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };


  const FilterSelect: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: string[], placeholder: string }> = ({ label, value, onChange, options, placeholder }) => (
    <div className="flex-1 min-w-[150px]">
      <label htmlFor={label} className="sr-only">{label}</label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white transition-all duration-300 appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
      >
        <option value="all" className="bg-gray-900 text-gray-400">{placeholder}</option>
        {options.map(option => <option key={option} value={option} className="bg-gray-900 text-white">{option}</option>)}
      </select>
    </div>
  );

  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen">
      <div className="absolute top-0 left-0 -translate-x-1/2 w-[150%] h-full bg-gradient-to-r from-purple-900/40 via-transparent to-transparent opacity-30 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 translate-x-1/2 w-[150%] h-full bg-gradient-to-l from-yellow-800/20 via-transparent to-transparent opacity-20 blur-3xl pointer-events-none z-0"></div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <button onClick={onBack} className="text-purple-400 uppercase tracking-widest hover:underline mb-12 inline-block">
          ← Volver al inicio
        </button>

        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-anton text-white text-shadow">
            Catálogo de Bibliotecas
          </h1>
          <p className="text-lg text-gray-400 font-light mt-2 max-w-2xl mx-auto">Explora nuestras colecciones de sonido para encontrar la banda sonora perfecta para tu próximo proyecto.</p>
        </header>

        {/* Filter Panel */}
        <div className="max-w-7xl mx-auto mb-12 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-5">
              <label htmlFor="search" className="sr-only">Buscar</label>
              <input
                id="search"
                type="text"
                placeholder="Buscar por nombre, volumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-500 transition-all duration-300"
              />
            </div>
            
            <FilterSelect label="Género" placeholder="Todos los géneros" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} options={uniqueGenres} />
            <FilterSelect label="Suscripción" placeholder="Cualquier suscripción" value={selectedSubscriptionType} onChange={(e) => setSelectedSubscriptionType(e.target.value)} options={uniqueSubscriptionTypes} />
            <FilterSelect label="Emocion" placeholder="Todas las emociones" value={selectedEmotion} onChange={(e) => setSelectedEmotion(e.target.value)} options={uniqueEmotions} />

            <div className="flex-1 min-w-[150px]">
              <label htmlFor="sort" className="sr-only">Ordenar por</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white transition-all duration-300 appearance-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="newest" className="bg-gray-900 text-white">Más recientes</option>
                <option value="oldest" className="bg-gray-900 text-white">Más antiguos</option>
                <option value="name-asc" className="bg-gray-900 text-white">Nombre (A-Z)</option>
                <option value="tracks-desc" className="bg-gray-900 text-white">Más pistas</option>
              </select>
            </div>
             <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('all');
                setSelectedSubscriptionType('all');
                setSelectedEmotion('all');
                setSortBy('newest');
              }}
              className="w-full px-4 py-3 rounded-md bg-violet-600/80 hover:bg-violet-600 text-white font-bold uppercase tracking-wider transition-all duration-300"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {albumsToShow.length > 0 ? (
              albumsToShow.map((album) => (
                <AlbumListItem key={album.id} album={album} onSelect={() => onSelectAlbum(album.id)} />
              ))
            ) : (
              <div className="text-center py-16 px-6 bg-black/20 rounded-xl border border-white/10">
                <h3 className="text-2xl font-anton text-mikai-lemon">Sin Resultados</h3>
                <p className="text-gray-400 mt-2">No se encontraron álbumes que coincidan con tus criterios de búsqueda. Intenta ajustar los filtros.</p>
              </div>
            )}
          </div>
          
          {visibleCount < filteredAndSortedAlbums.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="bg-green-600/80 hover:bg-green-600 text-white font-bold uppercase tracking-widest py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 neon-glow-green"
              >
                Ver más
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CatalogPage;