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
      <header style={{ backgroundColor: 'var(--black)', zIndex: 9999 }} className="md:sticky md:top-0 md:z-[9999] md:h-[100px] py-4 md:py-0 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo Block */}
        <Link to="/" className="flex items-center gap-3 md:gap-4">
          <img src={logoImage} alt="Basketball Logo" className="h-[45px] md:h-[65px] w-auto" />
          <div className="flex flex-col text-left">
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '-0.5px' }}
              className="text-[26px] md:text-[36px] text-white uppercase leading-none">
              REFEREE VISION
            </h1>
            <p style={{ fontFamily: "'North Wave', sans-serif" }}
              className="text-[13px] md:text-[15px] text-[#AAAAAA]">
              One Stop to Rule Them All
            </p>
          </div>
        </Link>

        {/* Social Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          <a href="https://www.youtube.com/@refereevision5209" target="_blank" rel="noopener noreferrer">
            <Youtube className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://www.facebook.com/people/Referee-Vision/61577189406633/" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://www.instagram.com/refereevision/" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://x.com/refereevision/" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
          <a href="https://whatsapp.com/channel/0029VbAWPOIKWEKtKbY7LR05" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
          </a>
        </div>
      </header>

      {/* NAVIGATION BAR */}
      <nav style={{ backgroundColor: 'var(--charcoal)', position: 'sticky', zIndex: 9998 }} className="h-auto md:h-[52px] sticky top-0 md:top-[100px] z-[9998] w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div style={{ backgroundColor: 'var(--orange)' }} className="absolute left-0 top-0 w-[4px] h-full hidden md:block"></div>
        <div className="flex items-center h-[52px] md:h-full px-4 md:pl-8 gap-6 md:gap-8 min-w-max">
          {NAV_LINKS.map((item) => {
            const isReferees = item === 'REFEREES';
            const isBooks = item === 'BOOKS';
            const isVideos = item === 'VIDEOS';
            const isWebinars = item === 'WEBINARS';
            const isCoaches = item === 'COACHES';
            
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
            } else if (isWebinars) {
              isActive = location.pathname === '/webinars';
              toPath = '/webinars';
            } else if (isCoaches) {
              isActive = location.pathname === '/coaches';
              toPath = '/coaches';
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
                className={`text-[14px] uppercase relative pb-1 transition-colors whitespace-nowrap ${
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
