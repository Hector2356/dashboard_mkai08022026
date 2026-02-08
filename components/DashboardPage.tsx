
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { analyticsService } from '../services/analyticsService';
import type { DashboardStats, ArchivedReport } from '../types';

interface DashboardPageProps {
  onBack: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBack }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [archives, setArchives] = useState<ArchivedReport[]>([]);
  const [isLive, setIsLive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para el rango de fechas
  const [dateStart, setDateStart] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dateEnd, setDateEnd] = useState<string>(new Date().toISOString().split('T')[0]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadData = useCallback(() => {
    // Definir el rango en milisegundos si no estamos en modo Live puro (que lee todo)
    const range = {
      start: new Date(`${dateStart}T00:00:00`).getTime(),
      end: new Date(`${dateEnd}T23:59:59`).getTime()
    };

    const currentStats = analyticsService.getDashboardStats(undefined, range);
    setStats(currentStats);
    setArchives(analyticsService.getArchives());
  }, [dateStart, dateEnd]);

  useEffect(() => {
    loadData();
    let interval: number | undefined;
    if (isLive) {
      interval = window.setInterval(loadData, 5000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isLive, loadData]);

  const handleDateChange = (type: 'start' | 'end', val: string) => {
    if (type === 'start') setDateStart(val);
    else setDateEnd(val);
    const today = new Date().toISOString().split('T')[0];
    if (val !== today) {
      setIsLive(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setTimeout(async () => {
        const success = await analyticsService.importFromCSV(file);
        if (success) {
          alert("✓ Datos importados. Resultados cargados en el monitor.");
          loadData();
          setIsLoading(false);
        } else {
          alert("✕ El archivo CSV no tiene el formato de MIK Analytics.");
          setIsLoading(false);
        }
      }, 1000);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleGoRealTime = () => {
    if (confirm("¿PASAR A TIEMPO REAL?\n\nSe eliminarán todas las métricas de tráfico generado o importado para mostrar únicamente la actividad actual de los usuarios.")) {
      analyticsService.clearEvents();
      const today = new Date().toISOString().split('T')[0];
      setDateStart(today);
      setDateEnd(today);
      setIsLive(true);
      loadData();
      alert("Monitor configurado en Tiempo Real (Hoy).");
    }
  };

  const handleSeedData = () => {
    if (confirm("¿INYECTAR TRÁFICO MASIVO?\n\nEsta acción generará un pico simulado de hits para probar la capacidad de procesamiento. Los datos actuales serán reemplazados.")) {
      setIsLoading(true);
      setTimeout(() => {
        const success = analyticsService.seedMockData();
        if (success) {
          loadData();
          alert("✓ Inyección Exitosa: Nodos de datos saturados para la prueba.");
        }
        setIsLoading(false);
      }, 800);
    }
  };

  const handleSaveToCloud = async () => {
    if (!stats) return;
    setIsLoading(true);
    const success = await analyticsService.saveSnapshot(stats);
    setIsLoading(false);
    if (success) alert("✓ Métricas guardadas en la base de datos.");
    else alert("✕ Error al guardar en la nube.");
  };

  const handleLoadFromCloud = async () => {
    setIsLoading(true);
    const cloudStats = await analyticsService.loadLatestSnapshot();
    setIsLoading(false);
    if (cloudStats) {
      setStats(cloudStats);
      setIsLive(false); // Cloud data is static snapshot
      alert("✓ Datos cargados desde la nube.");
    } else {
      alert("No hay datos guardados en la nube.");
    }
  };

  if (isLoading) return (
    <div className="bg-[#080808] min-h-screen flex flex-col items-center justify-center text-white font-display">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
      <p className="text-sm font-black uppercase tracking-[0.5em] animate-pulse">Sincronizando Base de Datos...</p>
    </div>
  );

  if (!stats) return null;

  const actualPeak = Math.max(...stats.hourlyPlays);
  const chartScaleMax = Math.max(actualPeak * 1.15, 100);

  const formatLargeNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="bg-[#080808] text-white antialiased min-h-screen font-display flex overflow-hidden">

      {/* Sidebar de Control */}
      <aside className="w-80 flex-shrink-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-8 flex items-center gap-3 border-b border-white/5">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-2xl">monitoring</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase leading-none">MIK ANALYTICS</h1>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">Soporte Big Data</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-10 overflow-y-auto text-left">
          <div className="space-y-3">
            <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Streaming</p>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold transition-all border ${isLive ? 'bg-primary/10 border-primary text-white' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined">{isLive ? 'sensors' : 'sensors_off'}</span>
                <span className="text-xs uppercase tracking-widest">{isLive ? 'Streaming On' : 'Streaming Off'}</span>
              </div>
              {isLive && <span className="size-2 bg-primary rounded-full animate-pulse"></span>}
            </button>
          </div>

          <div className="space-y-4">
            <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Gestión de Monitor</p>
            <div className="px-2 space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
              />
              <button onClick={handleImportClick} className="w-full flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined">upload_file</span> Importar CSV
              </button>
              <button onClick={() => analyticsService.exportToCSV(stats)} className="w-full flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 hover:bg-emerald-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined">download</span> Exportar CSV
              </button>
              <button onClick={handleGoRealTime} className="w-full flex items-center gap-3 p-4 bg-violet-500/10 border border-violet-500/20 rounded-2xl text-violet-400 hover:bg-violet-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined">today</span> Ver Hoy (Reset)
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">Base de Datos</p>
            <div className="px-2 space-y-2">
              <button onClick={handleSaveToCloud} className="w-full flex items-center gap-3 p-4 bg-primary/10 border border-primary/30 rounded-2xl text-primary hover:bg-primary/20 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined">cloud_upload</span> Guardar
              </button>
              <button onClick={handleLoadFromCloud} className="w-full flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined">cloud_download</span> Cargar Último
              </button>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 px-4 text-center">
            <button
              onClick={handleSeedData}
              className="w-full py-5 bg-gradient-to-r from-primary to-orange-500 text-white rounded-2xl text-[11px] uppercase tracking-widest font-black shadow-xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all border border-white/20"
            >
              Generar Prueba Carga
            </button>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5">
          <button onClick={onBack} className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined">arrow_back</span> Salir del Panel
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#080808]">
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl z-20">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold tracking-tight uppercase tracking-[0.2em] italic">Monitor Central</h2>

            {/* SELECTOR DE CALENDARIO / RANGO */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Desde</span>
                <input
                  type="date"
                  value={dateStart}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase text-primary outline-none focus:ring-0 p-0 cursor-pointer"
                />
              </div>
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Hasta</span>
                <input
                  type="date"
                  value={dateEnd}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase text-primary outline-none focus:ring-0 p-0 cursor-pointer"
                />
              </div>
              <span className="material-symbols-outlined text-slate-500 text-sm ml-2">calendar_today</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black uppercase tracking-widest">Administrador MIK</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">{isLive ? 'LIVE STREAMING ACTIVO' : 'MODO HISTÓRICO'}</p>
            </div>
            <img src="https://i.postimg.cc/N0sfNGH0/perfilcuadradamikmusic-Mesadetrabajo11.png" className="size-12 rounded-2xl border-2 border-white/10 object-cover shadow-xl" alt="Admin" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10 pb-32">

          {/* Tarjetas de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
            {[
              { label: 'Reproducciones', val: formatLargeNumber(stats.totalPlays), sub: 'Hits detectados', icon: 'play_circle', color: 'text-primary' },
              { label: 'Clics Plataformas', val: formatLargeNumber(stats.totalPlatformClicks), sub: 'Conversión bruta', icon: 'ads_click', color: 'text-blue-400' },
              { label: 'Video Views', val: formatLargeNumber(stats.totalVideoViews), sub: 'Impacto visual', icon: 'smart_display', color: 'text-violet-400' },
              { label: 'Ratio CTR', val: `${stats.ctr}%`, sub: '(Clics / Visitas)', icon: 'insights', color: 'text-emerald-400' },
              { label: 'Visitas Únicas', val: formatLargeNumber(stats.totalVisits), sub: 'Usuarios únicos', icon: 'public', color: 'text-amber-400' }
            ].map((card, i) => (
              <div key={i} className="bg-[#111111] p-6 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:bg-white/10 transition-colors"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`material-symbols-outlined text-2xl ${card.color}`}>{card.icon}</span>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">{card.label}</span>
                  </div>
                </div>
                <h3 className="text-4xl font-black tracking-tighter italic">{card.val}</h3>
                <p className="text-[8px] text-slate-700 uppercase tracking-widest mt-1">{card.sub}</p>
              </div>
            ))}
          </div>

          {/* NODOS DE CONVERSIÓN POR PLATAFORMA */}
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-4 px-2">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 italic">Nodos de Conversión por Plataforma</h3>
              <div className="flex-1 h-px bg-white/5"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.platformData.map((plat, idx) => (
                <div key={idx} className="bg-[#111111] p-8 rounded-[2rem] border border-white/5 flex flex-col gap-6 relative overflow-hidden group text-left">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform"></div>

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-2xl" style={{ color: plat.color }}>{plat.icon}</span>
                      <span className="text-xs font-black uppercase tracking-widest">{plat.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sincronizado</span>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-black tracking-tighter italic">{plat.count.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">hits</span>
                    </div>
                    <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${plat.percentage}%`, backgroundColor: plat.color }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Cuota de Red</span>
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: plat.color }}>{plat.percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMPACTO VIRAL 24H */}
          <div className="bg-[#111111] rounded-[3rem] border border-white/5 p-12 relative shadow-2xl overflow-hidden group text-left">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] pointer-events-none group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex justify-between items-end mb-16 relative z-10">
              <div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Impacto Viral 24h</h3>
                <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">Distribución horaria en el rango seleccionado</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Pico Máximo</p>
                <p className="text-6xl font-black text-primary tracking-tighter italic drop-shadow-[0_0_15px_rgba(242,13,70,0.5)]">
                  {actualPeak.toLocaleString()}
                  <span className="text-sm font-bold opacity-30 uppercase tracking-widest ml-3">hits/h</span>
                </p>
              </div>
            </div>

            <div className="h-96 flex items-end justify-between gap-2 md:gap-4 border-b border-white/10 pb-10 relative z-10">
              {stats.hourlyPlays.map((v, i) => {
                const isPeak = v > 0 && v === actualPeak;
                const barPercentage = (v / chartScaleMax) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-5 group relative h-full justify-end">
                    <div className="absolute -top-16 bg-white text-black px-4 py-2 rounded-2xl text-[11px] font-black opacity-0 group-hover:opacity-100 transition-all shadow-2xl z-30 pointer-events-none whitespace-nowrap">
                      {v.toLocaleString()} HITS @ {i}:00
                    </div>

                    <div className="w-full bg-white/[0.03] rounded-full h-full relative overflow-hidden border border-white/5">
                      <div
                        className={`absolute bottom-0 w-full rounded-full transition-all duration-1000 ease-out z-10 ${isPeak ? 'bg-gradient-to-t from-primary to-[#fefe79] shadow-[0_0_40px_rgba(242,13,70,0.8)]' : 'bg-primary'}`}
                        style={{ height: v > 0 ? `${Math.max(3, barPercentage)}%` : '0%' }}
                      ></div>
                    </div>

                    <span className={`text-[10px] font-black tracking-tighter ${v > 0 ? (isPeak ? 'text-primary' : 'text-slate-400') : 'text-slate-800'} ${i % 3 === 0 ? 'opacity-100' : 'opacity-40'}`}>
                      {i}H
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ranking de Canciones */}
          <div className="bg-[#111111] rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl text-left">
            <div className="p-10 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ranking de Activos</h3>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Éxito por pieza individual en el periodo</p>
              </div>
              <span className="text-[10px] bg-white/5 px-4 py-2 rounded-full text-slate-400 uppercase font-black tracking-widest border border-white/5">{stats.trackData.length} Canciones</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="px-12 py-8 text-left">Track</th>
                    <th className="px-12 py-8 text-center">Hits</th>
                    <th className="px-12 py-8 text-center">Éxito</th>
                    <th className="px-12 py-8 text-right pr-24">Impacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {stats.trackData.map((track, idx) => (
                    <tr key={track.id} className="hover:bg-white/[0.03] transition-all group">
                      <td className="px-12 py-8">
                        <div className="flex flex-col">
                          <span className="font-black text-lg text-slate-200 tracking-tight">{track.name}</span>
                          <span className="text-[9px] text-slate-600 font-mono mt-1 uppercase tracking-widest">Telemetría Activa</span>
                        </div>
                      </td>
                      <td className="px-12 py-8 text-center">
                        <span className="font-black text-primary text-3xl italic tracking-tighter">{track.plays.toLocaleString()}</span>
                      </td>
                      <td className="px-12 py-8 text-center">
                        <span className="text-emerald-500 font-mono font-black text-base">{track.conversion.toFixed(2)}%</span>
                      </td>
                      <td className="px-12 py-8 text-right pr-24">
                        <div className="flex items-center justify-end gap-6">
                          <div className="w-40 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-primary to-emerald-500" style={{ width: `${track.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-black text-slate-400 w-10">{Math.round(track.progress)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
