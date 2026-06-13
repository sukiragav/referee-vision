import { useState } from 'react';
import { Youtube, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import logoImage from '../../imports/Screenshot_2026-06-03_at_14.17.43.png';

const NAV_LINKS = ['ABOUT', 'REFEREES', 'BOOKS', 'VIDEOS', 'WEBINARS', 'COACHES', 'VAULT'];

export default function SiteHeader() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const location = useLocation();

  return (
    <>
      <header style={{ backgroundColor: 'var(--black)' }} className="h-[100px] px-8 flex items-center justify-between">
        {/* Logo Block */}
        <Link to="/" className="flex items-center gap-4">
          <img src={logoImage} alt="Basketball Logo" className="h-[65px] w-auto" />
          <div className="flex flex-col">
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '-0.5px' }}
              className="text-[36px] text-white uppercase leading-none">
              REFEREE VISION
            </h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
              className="text-[15px] text-[#AAAAAA]">
              One Stop to Rule Them All
            </p>
          </div>
        </Link>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <a href="https://www.youtube.com/@refereevision5209" target="_blank" rel="noopener noreferrer">
            <Youtube className="w-[22px] h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://www.facebook.com/people/Referee-Vision/61577189406633/" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-[22px] h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://www.instagram.com/refereevision/" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-[22px] h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://x.com/refereevision/" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-[22px] h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://whatsapp.com/channel/0029VbAWPOIKWEKtKbY7LR05" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-[22px] h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
        </div>
      </header>

      {/* NAVIGATION BAR */}
      <nav style={{ backgroundColor: 'var(--charcoal)' }} className="h-[52px] sticky top-0 z-50 relative">
        <div style={{ backgroundColor: 'var(--orange)' }} className="absolute left-0 top-0 w-[4px] h-full"></div>
        <div className="flex items-center h-full pl-8 gap-8">
          {NAV_LINKS.map((item) => {
            const isReferees = item === 'REFEREES';
            const isBooks = item === 'BOOKS';
            const isVideos = item === 'VIDEOS';
            
            let isActive = false;
            let toPath = `/#${item.toLowerCase()}`;
            
            if (isReferees) {
              isActive = location.pathname === '/referees';
              toPath = '/referees';
            } else if (isBooks) {
              isActive = location.pathname === '/books';
              toPath = '/books';
            } else if (isVideos) {
              isActive = location.pathname === '/videos';
              toPath = '/videos';
            } else {
              isActive = location.hash === `#${item.toLowerCase()}`;
            }
            
            return (
              <Link
                key={item}
                to={toPath}
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '2px' }}
                className={`text-[14px] uppercase relative pb-1 transition-colors ${
                  isActive || hoveredNav === item ? 'text-[var(--orange)]' : 'text-white'
                }`}
              >
                {item}
                {(isActive || hoveredNav === item) && (
                  <div style={{ backgroundColor: 'var(--orange)' }} className="absolute bottom-0 left-0 right-0 h-[3px]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
