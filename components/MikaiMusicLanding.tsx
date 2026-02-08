
import React, { useEffect, useState, useRef } from 'react';
import type { MikaiLandingData } from '../types';
import { analyticsService } from '../services/analyticsService';

interface MikaiMusicLandingProps {
  data: MikaiLandingData | null;
  onBackToHome?: () => void;
}

const TrackPlayer: React.FC<{ 
  trackId: string; 
  trackName: string; 
  url: string; 
  position: string;
  onTrack: (id: string, name: string, pos: string) => void;
}> = ({ trackId, trackName, url, position, onTrack }) => {
  const [isActive, setIsActive] = useState(false);

  const handleActivate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isActive) {
      onTrack(trackId, trackName, position);
      setIsActive(true);
    }
  };

  const getSpotifyEmbedUrl = (url: string) => {
    if (!url) return '';
    const trackMatch = url.match(/track\/([a-zA-Z0-9]+)/);
    const trackId = trackMatch ? trackMatch[1] : '';
    return trackId ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0` : url;
  };

  return (
    <div className="relative w-full h-[152px] min-h-[152px] rounded-2xl overflow-hidden bg-black border border-primary/30 hover:border-primary transition-all duration-500 group shadow-[0_0_25px_rgba(242,13,70,0.15)]">
      
      {/* 1. Iframe Layer */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`}>
        <iframe 
          title={trackName} 
          src={getSpotifyEmbedUrl(url)} 
          width="100%" 
          height="152" 
          frameBorder="0"
          style={{ border: 0, display: 'block', height: '152px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>

      {/* 2. Transparent Neon Activation Layer */}
      {!isActive && (
        <div 
          onClick={handleActivate}
          className="absolute inset-0 z-20 cursor-pointer flex flex-col items-center justify-center transition-all duration-500 bg-black/10 backdrop-blur-[1px] hover:backdrop-blur-0"
        >
          <div className="absolute inset-0 border-2 border-primary/40 group-hover:border-primary shadow-[inset_0_0_30px_rgba(242,13,70,0.2)] group-hover:shadow-[inset_0_0_50px_rgba(242,13,70,0.4)] transition-all"></div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/80 shadow-[0_0_20px_#f20d46] animate-pulse"></div>

          <div className="flex flex-col items-center justify-center gap-1 transform group-hover:scale-110 transition-all duration-500 relative z-30 px-4 text-center">
            <div className="flex items-center gap-2 mb-3">
                <span className="size-1.5 bg-primary rounded-full animate-ping"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90 drop-shadow-[0_0_8px_#f20d46]">
                  Initialize Audio Feed
                </span>
            </div>
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 group-hover:bg-primary/40 transition-colors"></div>
                <span className="material-symbols-outlined text-7xl md:text-8xl text-white drop-shadow-[0_0_30px_#f20d46] group-hover:drop-shadow-[0_0_50px_#f20d46] transition-all">
                    play_circle
                </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MikaiMusicLanding: React.FC<MikaiMusicLandingProps> = ({ data, onBackToHome }) => {
  const hasTrackedPageView = useRef(false);
  const [isVideoActive, setIsVideoActive] = useState(false);
  
  const defaultData: MikaiLandingData = {
    artistName: "MIKAI",
    description: "Virtual AI Artist • Future K-Pop Experience",
    heroImageUrl: "https://i.postimg.cc/wTz57pvt/12.png",
    mainSpotifyUrl: "https://open.spotify.com/track/4cOdzh0m68M996O7v9S69L",
    heroTrackName: "Cyber K-Pop Mix",
    musicSectionTitle: "More from MIKAI Universe",
    videoInfo: { type: 'youtube', id: 'dQw4w9WgXcQ' },
    tracks: [
      { name: "Cyber K-Pop Mix", duration: "3:45", spotifyTrackUrl: "https://open.spotify.com/track/4cOdzh0m68M996O7v9S69L" },
      { name: "Neon Nights", duration: "3:12", spotifyTrackUrl: "https://open.spotify.com/track/0VjIjS43vR3SHI960O68hs" },
      { name: "Future Latino", duration: "2:58", spotifyTrackUrl: "https://open.spotify.com/track/46L9z7M6r4D864f7m8D69A" }
    ],
    platforms: [
      "https://open.spotify.com/artist/6K3cVYlcdu420FHW8PS8bH",
      "https://music.apple.com/artist/mikai",
      "https://youtube.com/@mikai"
    ]
  };

  const currentData = data || defaultData;

  useEffect(() => {
    if (!hasTrackedPageView.current) {
      analyticsService.trackEvent('page_view', { 
        page_name: '.mikai-music',
        artist: currentData.artistName 
      });
      hasTrackedPageView.current = true;
    }
  }, [currentData.artistName]);

  const handleTrackAction = (trackId: string, trackName: string, position: string) => {
    analyticsService.trackEvent('play_track', {
      track_id: trackId,
      track_name: trackName,
      track_position: position
    });
  };

  const handlePlatformClick = (platformKey: string, url: string) => {
    analyticsService.trackEvent('click_platform', {
      platform: platformKey,
      url,
      track_origin: '.mikai-music'
    });
  };

  const handleVideoActivation = () => {
    if (!isVideoActive) {
      analyticsService.trackEvent('watch_video', {
        video_id: currentData.videoInfo?.id || 'none',
        origin: '.mikai-music'
      });
      setIsVideoActive(true);
    }
  };

  const getPlatformInfo = (url: string) => {
    const lUrl = url.toLowerCase();
    if (lUrl.includes('spotify')) return { key: 'spotify', name: 'Spotify', icon: 'brand_awareness', color: '#1DB954' };
    if (lUrl.includes('apple')) return { key: 'apple_music', name: 'Apple Music', icon: 'music_note', color: '#FA243C' };
    if (lUrl.includes('youtube')) return { key: 'youtube', name: 'YouTube Music', icon: 'play_circle', color: '#FF0000' };
    return { key: 'other', name: 'Platform', icon: 'link', color: '#ffffff' };
  };

  const renderVideoIframe = () => {
    if (!currentData.videoInfo) return null;
    
    if (currentData.videoInfo.type === 'vimeo') {
        return (
            <iframe 
                src={`https://player.vimeo.com/video/${currentData.videoInfo.id}?autoplay=1&muted=0&badge=0&autopause=0&player_id=0&app_id=58479`} 
                className="w-full h-full"
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write" 
                title="Mikai Visual Experience (Vimeo)"
            ></iframe>
        );
    }

    return (
        <iframe 
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentData.videoInfo.id}?autoplay=1&rel=0&showinfo=0&iv_load_policy=3&controls=1&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
            title="Mikai Visual Experience (YouTube)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
  };

  return (
    <div className="font-display text-white overflow-x-hidden min-h-screen bg-[#080808]">
      <div className="relative flex flex-col min-h-screen w-full">
        
        {/* Header Superior */}
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 bg-black/60 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-3">
            <button onClick={onBackToHome} className="size-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(242,13,70,0.5)] hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-base">bolt</span>
            </button>
            <h2 className="text-2xl font-bold tracking-tighter italic uppercase">MIKAI<span className="text-primary ml-1 not-italic">MUSIC</span></h2>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <button onClick={onBackToHome} className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-[0.3em] transition-colors">Home</button>
            <a className="text-white/50 hover:text-primary text-xs font-bold uppercase tracking-[0.3em] transition-colors" href="#">Universe</a>
          </nav>
        </header>

        <main className="flex-1 w-full max-w-[1400px] mx-auto pt-24 px-6 md:px-10">
          
          {/* HERO SECTION */}
          <section className="relative flex flex-col lg:flex-row-reverse items-center justify-between gap-12 py-12 lg:py-20">
            <div className="w-full lg:w-1/2 relative group">
                <div className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-[4rem] border border-white/10 shadow-2xl shadow-primary/20 bg-black">
                    <img src={currentData.heroImageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mikai Hero" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <div className="absolute top-10 right-10 z-20 p-4 bg-primary/20 backdrop-blur-2xl border border-white/10 rounded-2xl animate-pulse">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">IDOL_SYSTEM_V.2</p>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <span className="h-px w-8 bg-primary"></span>
                  <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px]">Neural Transmission</span>
                </div>
                <h1 className="text-8xl md:text-[11rem] font-black italic uppercase leading-none tracking-tighter animate-neon-flicker">
                  {currentData.artistName}
                </h1>
                <p className="text-lg text-white/40 max-w-xl leading-relaxed italic">{currentData.description}</p>
              </div>

              <div className="w-full max-w-md bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-md">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4 flex items-center gap-2">
                    <span className="size-1 bg-primary rounded-full"></span>
                    Priority Audio Stream
                  </p>
                  <TrackPlayer 
                    trackId="hero_main"
                    trackName={currentData.heroTrackName || "Main Theme"}
                    url={currentData.mainSpotifyUrl}
                    position="hero"
                    onTrack={handleTrackAction}
                  />
              </div>
            </div>
          </section>

          {/* Discografía: Más del universo MIKAI */}
          <section className="py-24 border-t border-white/5">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="text-left space-y-2">
                    <p className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Encrypted Audio Library</p>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">{currentData.musicSectionTitle}</h2>
                </div>
                <div className="h-px flex-1 bg-white/5 hidden md:block mx-10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentData.tracks.map((track, index) => {
                const tid = track.spotifyTrackUrl?.split('/').pop()?.split('?')[0] || `grid_${index}`;
                return (
                  <div key={index} className="transform hover:-translate-y-2 transition-transform duration-500">
                    <TrackPlayer 
                        trackId={tid}
                        trackName={track.name}
                        url={track.spotifyTrackUrl || ""}
                        position={`grid_${index + 1}`}
                        onTrack={handleTrackAction}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECCIÓN DE VIDEO UNIVERSAL (YOUTUBE / VIMEO) - AHORA EN 9:16 */}
          <section className="py-24 border-t border-white/5 px-6 md:px-10">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center">
                    <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">Visual Transmission Active</span>
                    <h2 className="text-5xl font-black italic uppercase tracking-tighter">Mikai Experience Video</h2>
                    <p className="text-white/30 text-xs mt-2 font-bold uppercase tracking-[0.2em]">
                        {currentData.videoInfo?.type === 'vimeo' ? 'High Fidelity Vertical Signal via Vimeo' : 'Portrait Network Synchronization via YouTube'}
                    </p>
                </div>

                {/* Contenedor del video ajustado a 9:16 y centrado con ancho controlado */}
                <div className="relative mx-auto w-full max-w-md md:max-w-lg aspect-[9/16] rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_80px_rgba(242,13,70,0.15)] group">
                    <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                    
                    <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${isVideoActive ? 'opacity-100' : 'opacity-0'}`}>
                        {isVideoActive && renderVideoIframe()}
                    </div>

                    {!isVideoActive && (
                        <div 
                            onClick={handleVideoActivation}
                            className="absolute inset-0 z-20 cursor-pointer group flex items-center justify-center bg-black/40 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                                <div className="absolute top-0 left-0 w-full h-[400%] bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-[scroll_4s_linear_infinite]"></div>
                            </div>
                            <div className="relative flex flex-col items-center gap-6 transform group-hover:scale-110 transition-all duration-500">
                                <div className="size-24 md:size-32 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10 shadow-[0_0_30px_rgba(242,13,70,0.4)] group-hover:bg-primary/20 group-hover:shadow-[0_0_60px_rgba(242,13,70,0.6)] transition-all">
                                    <span className="material-symbols-outlined text-6xl md:text-7xl text-white drop-shadow-[0_0_15px_#f20d46]">smart_display</span>
                                </div>
                                <div className="space-y-1 text-center bg-black/60 px-6 py-2 rounded-full backdrop-blur-xl border border-white/10">
                                    <p className="text-xs font-black uppercase tracking-[0.6em] text-white">Decrypt Visual Signal</p>
                                </div>
                            </div>
                            <div className="absolute top-8 left-8 size-8 border-t-2 border-l-2 border-primary/60 group-hover:size-12 transition-all"></div>
                            <div className="absolute bottom-8 right-8 size-8 border-b-2 border-r-2 border-primary/60 group-hover:size-12 transition-all"></div>
                        </div>
                    )}
                </div>
            </div>
          </section>

          {/* Platforms */}
          <section className="py-32 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h3 className="text-3xl font-black italic uppercase tracking-widest">Connect with the Network</h3>
                    <div className="flex items-center justify-center gap-2">
                        <span className="h-px w-10 bg-white/10"></span>
                        <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Global Transmission Nodes</p>
                        <span className="h-px w-10 bg-white/10"></span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {currentData.platforms.map((url, index) => {
                    const info = getPlatformInfo(url);
                    return (
                        <a key={index} href={url} target="_blank" rel="noopener noreferrer" onClick={() => handlePlatformClick(info.key, url)}
                          className="group relative flex flex-col items-center p-12 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <span className="material-symbols-outlined text-6xl mb-6 transition-transform group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ color: info.color }}>{info.icon}</span>
                          <p className="font-black uppercase tracking-widest text-sm relative z-10">{info.name}</p>
                          <span className="text-[10px] text-white/20 mt-2 uppercase font-bold tracking-[0.2em] relative z-10">Sync Request</span>
                        </a>
                    );
                  })}
                </div>
            </div>
          </section>
        </main>

        <footer className="py-20 px-10 border-t border-white/5 text-center bg-black/40">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="size-1.5 bg-primary rounded-full animate-ping"></span>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em]">
                        © {new Date().getFullYear()} MIK MUSIC • SYSTEM V.2.5 • AI ARTIST INTERFACE
                    </p>
                </div>
                <p className="text-[8px] text-white/10 uppercase tracking-widest font-black">All sensory data encrypted via MIK Protocol</p>
            </div>
        </footer>
      </div>
      <style>{`
        @keyframes scroll {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(0%); }
        }
      `}</style>
    </div>
  );
};

export default MikaiMusicLanding;
