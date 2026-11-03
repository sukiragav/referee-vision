import { Youtube, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import logoImage from '../../imports/referee_vision_circle_logo.png';
import basketballImage from '../../imports/basketball.jpg';
import IndiaFlagBadge from './IndiaFlagBadge';

export default function SiteFooter() {
  const links = [
    { label: 'About', to: '/#about' },
    { label: 'Referees', to: '/referees' },
    { label: 'Books', to: '/books' },
    { label: 'Videos', to: '/videos' },
    { label: 'Webinars', to: '/webinars' },
    { label: 'Coaches', to: '/coaches' },
    { label: 'Vault', to: '/vault' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--black)' }} className="relative w-full mt-auto">
      <div style={{ backgroundColor: 'var(--orange)' }} className="h-[3px] w-full"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Basketball Logo"
                className="h-[52px] w-[52px] shrink-0"
              />
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                className="text-white text-[22px] uppercase flex items-center">
                <span>REFEREE VISI<img src={basketballImage} alt="O" className="bb" />N</span>
                <IndiaFlagBadge className="ml-2" width={18} height={12} />
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.youtube.com/@refereevision5209" target="_blank" rel="noopener noreferrer" title="YouTube">
                <Youtube className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://www.facebook.com/people/Referee-Vision/61577189406633/" target="_blank" rel="noopener noreferrer" title="Facebook">
                <Facebook className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://www.instagram.com/refereevision/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://x.com/refereevision/" target="_blank" rel="noopener noreferrer" title="X">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-[18px] h-[18px] fill-current text-white cursor-pointer hover:text-[var(--orange)] transition-colors"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://whatsapp.com/channel/0029VbAWPOIKWEKtKbY7LR05" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-5 h-5 fill-current text-white cursor-pointer hover:text-[var(--orange)] transition-colors"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '3px', color: 'var(--orange)' }}
              className="text-[13px] uppercase mb-4">
              QUICK LINKS
            </h4>
            <div className="space-y-2.5">
              {links.map(link => (
                <Link
                  key={link.label}
                  to={link.to}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  className="block text-[14px] text-[#AAAAAA] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Get The App */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '3px', color: 'var(--orange)' }}
              className="text-[13px] uppercase mb-4">
              GET THE APP
            </h4>
            <a
              href="https://play.google.com/store/apps/details?id=com.mycompany.refereevision&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black border border-white/20 rounded-lg px-4 py-3 w-[180px] mb-3 hover:border-[var(--orange)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="white">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[9px] text-white/80">Get it on</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }} className="text-[13px] text-white">Google Play</div>
                </div>
              </div>
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[13px] text-[#777777]">
              Access all referee resources on the go
            </p>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ backgroundColor: '#0A0A0A' }} className="h-12 flex items-center justify-center">
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-[13px] text-[#666666]">
          Copyrights © 2026 | All Rights Reserved by Referee Vision
        </p>
      </div>
    </footer>
  );
}
