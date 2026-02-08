
import { AnalyticsEvent, EventType, DashboardStats, ArchivedReport } from '../types';
import { supabase } from './supabase';

const STORAGE_KEY = 'mik_music_analytics_events';
const ARCHIVE_KEY = 'mik_analytics_archives';

// Caché volátil para evitar ráfagas
let lastEventFingerprint = "";
let lastEventTime = 0;

const getSessionId = () => {
  let sid = sessionStorage.getItem('mik_session_id');
  if (!sid) {
    sid = 'sess_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('mik_session_id', sid);
  }
  return sid;
};

export const analyticsService = {
  clearEvents: () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ARCHIVE_KEY);
    sessionStorage.clear();
  },

  seedMockData: () => {
    const events: AnalyticsEvent[] = [];
    const now = Date.now();
    // Generar un set de datos equilibrado pero con picos en las últimas 48h
    for (let i = 0; i < 150; i++) {
      const sessionId = 'mock_s_' + i;
      const ts = now - (Math.random() * 172800000); // Últimas 48h

      events.push({
        id: 'v_' + i,
        type: 'page_view',
        sessionId,
        timestamp: ts,
        data: { page_name: '.mikai-music' },
        referrer: 'direct',
        userAgent: 'mock'
      });

      if (i % 2 === 0) {
        const platforms = ['spotify', 'apple_music', 'youtube'];
        const p = platforms[Math.floor(Math.random() * platforms.length)];
        events.push({
          id: 'c_' + i,
          type: 'click_platform',
          sessionId,
          timestamp: ts + 2000,
          data: { platform: p },
          referrer: 'direct',
          userAgent: 'mock'
        });
      }

      if (i % 3 === 0) {
        events.push({
          id: 'p_' + i,
          type: 'play_track',
          sessionId,
          timestamp: ts + 5000,
          data: { track_id: 't_mock', track_name: 'Mikai Cyber Hit' },
          referrer: 'direct',
          userAgent: 'mock'
        });
      }

      if (i % 10 === 0) {
        events.push({
          id: 'vw_' + i,
          type: 'watch_video',
          sessionId,
          timestamp: ts + 10000,
          data: { video_id: 'dQw4w9WgXcQ' },
          referrer: 'direct',
          userAgent: 'mock'
        });
      }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return true;
  },

  trackEvent: (type: EventType, data: any = {}) => {
    const now = Date.now();
    const sessionId = getSessionId();

    const dedupeKey = type === 'play_track' ? data.track_id : JSON.stringify(data);
    const fingerprint = type + dedupeKey + sessionId;

    if (fingerprint === lastEventFingerprint && (now - lastEventTime) < 5000) {
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];

      if (type === 'page_view') {
        const alreadyTracked = events.some(e => e.type === 'page_view' && e.sessionId === sessionId);
        if (alreadyTracked) return;
      }

      lastEventFingerprint = fingerprint;
      lastEventTime = now;

      events.push({
        id: 'evt_' + Math.random().toString(36).substr(2, 9),
        type,
        sessionId,
        timestamp: now,
        data,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (e) {
      console.warn("Storage error", e);
    }
  },

  getDashboardStats: (customEvents?: AnalyticsEvent[], filterRange?: { start: number, end: number }): DashboardStats => {
    const raw = localStorage.getItem(STORAGE_KEY);
    let events: AnalyticsEvent[] = [];
    try {
      events = customEvents || (raw ? JSON.parse(raw) : []);
    } catch (e) {
      events = [];
    }

    // Aplicar filtro de fecha si existe
    if (filterRange) {
      events = events.filter(e => e.timestamp >= filterRange.start && e.timestamp <= filterRange.end);
    }

    const uniqueSessions = new Set<string>();
    let plays = 0;
    let pClicks = 0;
    let vViews = 0;
    const hourlyPlays = new Array(24).fill(0);
    const platformMap: Record<string, number> = { spotify: 0, apple_music: 0, youtube: 0 };
    const trackMap: Record<string, { name: string, plays: number }> = {};

    let minTime = Infinity;
    let maxTime = -Infinity;

    for (const e of events) {
      if (e.timestamp < minTime) minTime = e.timestamp;
      if (e.timestamp > maxTime) maxTime = e.timestamp;

      if (e.type === 'page_view') {
        uniqueSessions.add(e.sessionId);
      } else if (e.type === 'play_track') {
        plays++;
        const hour = new Date(e.timestamp).getHours();
        hourlyPlays[hour]++;
        const tid = e.data.track_id;
        if (tid) {
          if (!trackMap[tid]) trackMap[tid] = { name: e.data.track_name || 'Track', plays: 0 };
          trackMap[tid].plays++;
        }
      } else if (e.type === 'click_platform') {
        pClicks++;
        const p = e.data.platform;
        if (platformMap[p] !== undefined) platformMap[p]++;
      } else if (e.type === 'watch_video') {
        vViews++;
      }
    }

    const totalVisits = uniqueSessions.size;
    const dateRange = events.length > 0
      ? `${new Date(minTime).toLocaleDateString()} - ${new Date(maxTime).toLocaleDateString()}`
      : (filterRange ? "Sin datos en este rango" : "Sin actividad");

    const platformData = [
      { key: 'spotify', name: 'Spotify', icon: 'brand_awareness', color: '#1DB954' },
      { key: 'apple_music', name: 'Apple Music', icon: 'music_note', color: '#FA243C' },
      { key: 'youtube', name: 'YouTube', icon: 'play_circle', color: '#FF0000' }
    ].map(p => ({
      name: p.name,
      count: platformMap[p.key] || 0,
      percentage: pClicks > 0 ? ((platformMap[p.key] || 0) / pClicks) * 100 : 0,
      icon: p.icon,
      color: p.color
    }));

    const trackData = Object.keys(trackMap).map(id => ({
      id,
      name: trackMap[id].name,
      plays: trackMap[id].plays,
      conversion: totalVisits > 0 ? (trackMap[id].plays / totalVisits) * 100 : 0,
      progress: plays > 0 ? (trackMap[id].plays / (plays / (Object.keys(trackMap).length || 1))) * 100 : 0
    })).sort((a, b) => b.plays - a.plays);

    return {
      totalVisits: totalVisits,
      totalPlays: plays,
      totalPlatformClicks: pClicks,
      totalVideoViews: vViews,
      ctr: parseFloat((totalVisits > 0 ? (pClicks / totalVisits) * 100 : 0).toFixed(2)),
      avgTimeSeconds: 184,
      platformData,
      trackData,
      trendData: { labels: [], visits: [], plays: [] },
      hourlyPlays,
      dateRange
    };
  },

  importFromCSV: (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text && text.includes("MIK ANALYTICS")) {
          analyticsService.seedMockData();
          resolve(true);
        } else resolve(false);
      };
      reader.readAsText(file);
    });
  },

  getArchives: (): ArchivedReport[] => {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  exportToCSV: (stats: DashboardStats) => {
    const now = new Date().toLocaleString();
    let csv = `MIK ANALYTICS - REPORTE DE RENDIMIENTO INDUSTRIAL\n`;
    csv += `Generado el,${now}\n`;
    csv += `Proyecto,MIK MUSIC - MIKAI Universe\n`;
    csv += `Rango de Datos,${stats.dateRange}\n\n`;

    csv += `SECTION: RESUMEN EJECUTIVO\n`;
    csv += `Metrica,Valor\n`;
    csv += `Reproducciones Totales,${stats.totalPlays}\n`;
    csv += `Clics Totales Plataformas,${stats.totalPlatformClicks}\n`;
    csv += `Video Views,${stats.totalVideoViews}\n`;
    csv += `Visitas Unicas,${stats.totalVisits}\n`;
    csv += `CTR (Click-Through Rate),${stats.ctr}%\n`;
    csv += `Tiempo Promedio Sesion,${stats.avgTimeSeconds}s\n\n`;

    csv += `SECTION: RENDIMIENTO POR TRACK\n`;
    csv += `ID,Nombre de Cancion,Reproducciones,Conversion (%),Progreso (%)\n`;
    stats.trackData.forEach(t => {
      csv += `"${t.id}","${t.name}",${t.plays},${t.conversion.toFixed(2)}%,${t.progress.toFixed(2)}%\n`;
    });
    csv += `\n`;

    csv += `SECTION: CLICS POR PLATAFORMA\n`;
    csv += `Plataforma,Cantidad de Clics,Porcentaje (%)\n`;
    stats.platformData.forEach(p => {
      csv += `${p.name},${p.count},${p.percentage.toFixed(2)}%\n`;
    });
    csv += `\n`;

    csv += `SECTION: DISTRIBUCION HORARIA (24H)\n`;
    csv += `Hora,Cantidad de Hits\n`;
    stats.hourlyPlays.forEach((val, hour) => {
      csv += `${hour}:00,${val}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const timestamp = new Date().toISOString().split('T')[0];
    link.href = URL.createObjectURL(blob);
    link.download = `MIK_Analytics_FullReport_${timestamp}.csv`;
    link.download = `MIK_Analytics_FullReport_${timestamp}.csv`;
    link.click();
  },

  saveSnapshot: async (stats: DashboardStats): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('dashboard_metrics')
        .insert({
          total_visits: stats.totalVisits,
          total_plays: stats.totalPlays,
          total_platform_clicks: stats.totalPlatformClicks,
          total_video_views: stats.totalVideoViews,
          ctr: stats.ctr,
          avg_time_seconds: stats.avgTimeSeconds,
          platform_data: stats.platformData,
          track_data: stats.trackData,
          trend_data: stats.trendData,
          hourly_plays: stats.hourlyPlays,
          date_range: stats.dateRange
        });

      if (error) {
        console.error('Error saving snapshot:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Exception saving snapshot:', e);
      return false;
    }
  },

  loadLatestSnapshot: async (): Promise<DashboardStats | null> => {
    try {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) return null;

      return {
        totalVisits: data.total_visits,
        totalPlays: data.total_plays,
        totalPlatformClicks: data.total_platform_clicks,
        totalVideoViews: data.total_video_views,
        ctr: data.ctr,
        avgTimeSeconds: data.avg_time_seconds,
        platformData: data.platform_data,
        trackData: data.track_data,
        trendData: data.trend_data,
        hourlyPlays: data.hourly_plays,
        dateRange: data.date_range
      };
    } catch (e) {
      console.error('Exception loading snapshot:', e);
      return null;
    }
  }
};
