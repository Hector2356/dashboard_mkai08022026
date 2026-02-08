
import React, { useState, useEffect } from 'react';

// Components
import Loader from './components/Loader';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import BeatsSection from './components/BeatsSection';
import ArtistSection from './components/ArtistSection';
import LicensingSection from './components/LicensingSection';
import NewArtistSection from './components/NewArtistSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CatalogPage from './components/CatalogPage';
import AlbumDetailPage from './components/AlbumDetailPage';
import ServicesListPage from './components/ServicesListPage';
import MikUniversePage from './components/MikUniversePage';
import MikaiMusicLanding from './components/MikaiMusicLanding';
import DashboardPage from './components/DashboardPage';
import DiscountModal from './components/DiscountModal';
import Auth from './components/Auth';
import { supabase } from './services/supabase';

// Services and Types
import { initClient, fetchAllData } from './services/contentfulService';
import type { Album, Service, Release, Testimonial, MikUniverseService, MikaiRelease, View, MikaiLandingData } from './types';

// --- Contentful API Keys ---
// --- Contentful API Keys ---
const CONTENTFUL_SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

// Define a type for all the data fetched from the CMS
interface AppData {
    albums: Album[];
    services: Service[];
    latestRelease: Release | null;
    testimonials: Testimonial[];
    mikUniverseServices: MikUniverseService[];
    mikaiRelease: MikaiRelease | null;
    mikaiLandingData: MikaiLandingData | null;
}

const HomePage: React.FC<{
    appData: AppData;
    onNavigateToCatalog: () => void;
    onNavigateToServices: () => void;
    onNavigateToUniverse: () => void;
}> = ({ appData, onNavigateToCatalog, onNavigateToServices, onNavigateToUniverse }) => (
    <>
        <HeroSection onNavigateToCatalog={onNavigateToCatalog} onNavigateToUniverse={onNavigateToUniverse} />
        <ServicesSection onNavigateToServices={onNavigateToServices} />
        <BeatsSection onNavigateToCatalog={onNavigateToCatalog} />
        {appData.latestRelease && <ArtistSection release={appData.latestRelease} />}
        <LicensingSection onNavigateToCatalog={onNavigateToCatalog} />
        <NewArtistSection release={appData.latestRelease} />
        <ContactSection />
    </>
);

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [appData, setAppData] = useState<AppData | null>(null);
    const [currentView, setCurrentView] = useState<View>('home');
    const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        // Initialize the Contentful client
        initClient(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN);

        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAllData();
                if (data.albums.length === 0 && data.services.length === 0 && !data.latestRelease) {
                    setError('Connection successful, but no content was found.');
                } else {
                    setAppData(data as AppData);
                }
            } catch (err) {
                console.error(err);
                setError('A critical error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        loadData();

        const timer = setTimeout(() => {
            if (currentView === 'home') {
                setIsModalOpen(true);
            }
        }, 500);

        return () => clearTimeout(timer);

    }, [currentView]);

    // Navigation handlers
    const navigateTo = (view: View) => {
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    const handleSelectAlbum = (albumId: string) => {
        setSelectedAlbumId(albumId);
        navigateTo('albumDetail');
    };

    const handleBackToCatalog = () => navigateTo('catalog');
    const handleBackToHome = () => navigateTo('home');

    // Modal handlers
    const closeModal = () => setIsModalOpen(false);
    const handleModalCtaClick = () => {
        closeModal();
        navigateTo('catalog');
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Connection Notice</h1>
                <p
                    className="text-gray-300 max-w-2xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: error.replace(/\*\*(.*?)\*\*/g, '<strong class="text-yellow-400">$1</strong>') }}
                />
            </div>
        );
    }

    if (!appData) {
        return <div className="bg-black text-white min-h-screen flex items-center justify-center">No data was loaded.</div>;
    }

    const selectedAlbum = appData.albums.find(album => album.id === selectedAlbumId);

    // Sidebar/immersive layouts shouldn't have the global header or footer
    const isSpecialLayout = currentView === 'mikai-music' || currentView === 'dashboard';

    return (
        <div className="bg-black text-white font-sans">
            {/* Ocultamos el Header global solo en special layouts */}
            {!isSpecialLayout && (
                <Header
                    onNavigateToHome={() => navigateTo('home')}
                    onNavigateToCatalog={() => navigateTo('catalog')}
                    onNavigateToServices={() => navigateTo('services')}
                    onNavigateToUniverse={() => navigateTo('universe')}
                    onNavigateToMikaiMusic={() => navigateTo('mikai-music')}
                    onNavigateToDashboard={() => navigateTo('dashboard')}
                />
            )}
            <main>
                {currentView === 'home' && (
                    <HomePage
                        appData={appData}
                        onNavigateToCatalog={() => navigateTo('catalog')}
                        onNavigateToServices={() => navigateTo('services')}
                        onNavigateToUniverse={() => navigateTo('universe')}
                    />
                )}
                {currentView === 'catalog' && (
                    <CatalogPage
                        albums={appData.albums}
                        onSelectAlbum={handleSelectAlbum}
                        onBack={handleBackToHome}
                    />
                )}
                {currentView === 'albumDetail' && selectedAlbum && (
                    <AlbumDetailPage
                        album={selectedAlbum}
                        testimonials={appData.testimonials}
                        onBack={handleBackToCatalog}
                    />
                )}
                {currentView === 'services' && (
                    <ServicesListPage
                        services={appData.services}
                        onBack={handleBackToHome}
                    />
                )}
                {currentView === 'universe' && (
                    <MikUniversePage
                        mikaiRelease={appData.mikaiRelease}
                        mikUniverseServices={appData.mikUniverseServices}
                        onBack={handleBackToHome}
                    />
                )}
                {currentView === 'mikai-music' && (
                    <MikaiMusicLanding
                        data={appData.mikaiLandingData}
                        onBackToHome={() => navigateTo('home')}
                    />
                )}
                {currentView === 'dashboard' && (
                    !session ? (
                        <div className="fixed inset-0 z-50 bg-black">
                            <Auth onLogin={() => { }} />
                            <button
                                onClick={() => navigateTo('home')}
                                className="absolute top-8 right-8 text-slate-500 hover:text-white uppercase text-xs font-black tracking-widest transition-colors"
                            >
                                Cancelar / Volver
                            </button>
                        </div>
                    ) : (
                        <DashboardPage
                            onBack={() => navigateTo('home')}
                        />
                    )
                )}
            </main>
            {!isSpecialLayout && (currentView === 'home' || currentView === 'catalog') && <Footer onNavigateToDashboard={() => navigateTo('dashboard')} />}

            {currentView === 'home' && (
                <DiscountModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCtaClick={handleModalCtaClick}
                />
            )}
        </div>
    );
};

export default App;
