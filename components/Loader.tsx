import React from 'react';

const Loader: React.FC = () => (
  <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-700 border-t-violet-500 rounded-full animate-spin"></div>
    <p className="text-violet-400 mt-4 font-anton tracking-widest text-lg">CARGANDO...</p>
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;