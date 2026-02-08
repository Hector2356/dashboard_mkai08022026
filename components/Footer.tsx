
import React from 'react';
import { SpotifyIcon, YoutubeIcon, InstagramIcon, FacebookIcon, TwitterIcon, DiscordIcon, TikTokIcon } from './icons/SocialIcons';

interface FooterProps {
  onNavigateToDashboard?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateToDashboard }) => {
    const socialLinks = [
        { href: "https://www.instagram.com/mikmusic_official/", icon: InstagramIcon, label: "Instagram" },
        { href: "https://www.youtube.com/@mikmusic2356", icon: YoutubeIcon, label: "YouTube" },
        { href: "https://open.spotify.com/artist/6K3cVYlcdu420FHW8PS8bH", icon: SpotifyIcon, label: "Spotify" },
        { href: "#", icon: FacebookIcon, label: "Facebook" },
        { href: "#", icon: TwitterIcon, label: "Twitter" },
        { href: "#", icon: DiscordIcon, label: "Discord" },
        { href: "#", icon: TikTokIcon, label: "TikTok" },
    ];
    
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div>
            <h3 className="font-anton text-3xl tracking-wider text-white">
              MIK <span className="text-mikai-lemon">MUSIC</span>
            </h3>
            <p className="text-gray-400 mt-2">La Fábrica de Estrellas Musicales</p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
             {socialLinks.map(social => (
                <a 
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit MIK MUSIC on ${social.label}`}
                    className="text-gray-400 hover:text-mikai-lemon transition-colors duration-300"
                >
                    <social.icon className="w-7 h-7" />
                </a>
             ))}
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} MIK MUSIC. Todos los derechos reservados.</p>
            <p className="mt-1">Diseñado y desarrollado con pasión en Colombia.</p>
          </div>
          
          {onNavigateToDashboard && (
            <button 
              onClick={onNavigateToDashboard}
              className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              Admin Dashboard
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
