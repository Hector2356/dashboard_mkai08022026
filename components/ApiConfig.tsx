import React, { useState } from 'react';

interface ApiConfigProps {
  onConfigured: (spaceId: string, accessToken: string) => void;
}

const ApiConfig: React.FC<ApiConfigProps> = ({ onConfigured }) => {
  const [spaceId, setSpaceId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (spaceId.trim() && accessToken.trim()) {
      onConfigured(spaceId.trim(), accessToken.trim());
    }
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-gray-900/50 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-violet-500/30 shadow-2xl shadow-violet-500/20">
        <div className="text-center mb-8">
          <h1 className="font-anton text-3xl text-violet-400">Configuración de Contentful</h1>
          <p className="text-gray-400 mt-2">
            Para cargar el catálogo de álbumes, por favor introduce tus claves de API de Contentful.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="spaceId" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
              Space ID
            </label>
            <input
              id="spaceId"
              type="text"
              value={spaceId}
              onChange={(e) => setSpaceId(e.target.value)}
              placeholder="Tu Space ID de Contentful"
              aria-label="Space ID"
              required
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-500 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="accessToken" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
              Content Delivery API - Access Token
            </label>
            <input
              id="accessToken"
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Tu token de acceso"
              aria-label="Access Token"
              required
              className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-500 transition-all duration-300"
            />
            <p className="text-xs text-gray-500 mt-2">Puedes encontrar estas claves en tu panel de Contentful, en 'Settings' &gt; 'API keys'.</p>
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 text-white font-bold uppercase tracking-widest py-4 px-6 rounded-md hover:bg-violet-500 transition-all duration-300 transform hover:scale-105 neon-glow-violet mt-4"
          >
            Guardar y Conectar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApiConfig;