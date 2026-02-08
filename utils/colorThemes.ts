import type { AlbumColorTheme } from '../types';

export const VIOLET_THEME: AlbumColorTheme = {
  hex: '#8B5CF6', // Violet-500
  neonGlowClass: 'neon-glow-violet',
  borderClass: 'border border-violet-500/80 shadow-lg shadow-violet-500/20',
  buttonClasses: 'bg-violet-600 text-white hover:bg-violet-500',
  accentTextClass: 'text-violet-400',
};

export const YELLOW_THEME: AlbumColorTheme = {
  hex: '#fefe79', // mikai-lemon
  neonGlowClass: 'neon-glow-yellow',
  borderClass: 'border border-mikai-lemon/80 shadow-lg shadow-mikai-lemon/20',
  buttonClasses: 'bg-mikai-lemon text-black hover:bg-yellow-200',
  accentTextClass: 'text-mikai-lemon',
};

export const CYAN_THEME: AlbumColorTheme = {
  hex: '#00ffff', // Cyan
  neonGlowClass: 'neon-glow-cyan',
  borderClass: 'border border-cyan-400/80 shadow-lg shadow-cyan-400/20',
  buttonClasses: 'bg-cyan-500 text-black hover:bg-cyan-400',
  accentTextClass: 'text-cyan-400',
};

export const RED_THEME: AlbumColorTheme = {
  hex: '#ef4444', // Red-500
  neonGlowClass: 'neon-glow-red',
  borderClass: 'border border-red-500/80 shadow-lg shadow-red-500/20',
  buttonClasses: 'bg-red-600 text-white hover:bg-red-500',
  accentTextClass: 'text-red-400',
};

export const GREEN_THEME: AlbumColorTheme = {
  hex: '#22c55e', // Green-500
  neonGlowClass: 'neon-glow-green',
  borderClass: 'border border-green-500/80 shadow-lg shadow-green-500/20',
  buttonClasses: 'bg-green-600 text-white hover:bg-green-500',
  accentTextClass: 'text-green-400',
};

export const BLUE_THEME: AlbumColorTheme = {
  hex: '#3b82f6', // Blue-500
  neonGlowClass: 'neon-glow-blue',
  borderClass: 'border border-blue-500/80 shadow-lg shadow-blue-500/20',
  buttonClasses: 'bg-blue-600 text-white hover:bg-blue-500',
  accentTextClass: 'text-blue-400',
};

export const ORANGE_THEME: AlbumColorTheme = {
  hex: '#f97316', // Orange-500
  neonGlowClass: 'neon-glow-orange',
  borderClass: 'border border-orange-500/80 shadow-lg shadow-orange-500/20',
  buttonClasses: 'bg-orange-600 text-white hover:bg-orange-500',
  accentTextClass: 'text-orange-400',
};


export const THEME_MAP: { [key: string]: AlbumColorTheme } = {
  default: VIOLET_THEME,
  // Violet/Purple
  violeta: VIOLET_THEME,
  violet: VIOLET_THEME,
  purple: VIOLET_THEME,
  morado: VIOLET_THEME,
  // Yellow/Gold
  dorado: YELLOW_THEME,
  amarillo: YELLOW_THEME,
  yellow: YELLOW_THEME,
  gold: YELLOW_THEME,
  // Cyan
  cyan: CYAN_THEME,
  // Red
  red: RED_THEME,
  rojo: RED_THEME,
  // Green
  green: GREEN_THEME,
  verde: GREEN_THEME,
  // Blue
  blue: BLUE_THEME,
  azul: BLUE_THEME,
  // Orange
  orange: ORANGE_THEME,
  naranja: ORANGE_THEME,
};

// --- Service Themes ---
const PURPLE_SERVICE_THEME = {
    button: 'bg-purple-600 hover:bg-purple-500',
    buttonText: 'text-white',
    shadow: 'shadow-purple-500/30',
    bgColor: 'bg-[#ddcaf8]',
    checkColor: 'text-purple-500'
};

const BLACK_SERVICE_THEME = { // Based on the popular "Rocket Market" service
    button: 'bg-black hover:bg-gray-800',
    buttonText: 'text-white',
    shadow: 'shadow-mikai-lemon/30',
    bgColor: 'bg-[#f3ea9c]',
    checkColor: 'text-yellow-500'
};

const RED_SERVICE_THEME = { // Based on "Rocket V.I.P", good for default/fallback
    button: 'bg-red-600 hover:bg-red-500',
    buttonText: 'text-white',
    shadow: 'shadow-red-500/30',
    bgColor: 'bg-[#ffb0a2]',
    checkColor: 'text-red-500'
};

const YELLOW_SERVICE_THEME = {
    button: 'bg-mikai-lemon hover:bg-yellow-200',
    buttonText: 'text-black',
    shadow: 'shadow-mikai-lemon/30',
    bgColor: 'bg-yellow-100',
    checkColor: 'text-yellow-600'
};

export const SERVICE_THEME_MAP = {
    purple: PURPLE_SERVICE_THEME,
    black: BLACK_SERVICE_THEME,
    yellow: YELLOW_SERVICE_THEME,
    default: RED_SERVICE_THEME,
};