import { useState, useEffect } from 'react';
import { Youtube, Facebook, Instagram, MessageCircle, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import logoImage from '../../imports/referee_vision_circle_logo.png';
import basketballImage from '../../imports/basketball.jpg';
import SearchModal from './SearchModal';
import IndiaFlagBadge from './IndiaFlagBadge';

const NAV_ROW_1 = ['ABOUT', 'REFEREES', 'BOOKS', 'VIDEOS'];
const NAV_ROW_2 = ['WEBINARS', 'COACHES', 'VAULT'];
const ALL_NAV_LINKS = [...NAV_ROW_1, ...NAV_ROW_2];

export default function SiteHeader() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isLinkActive = (item: string) => {
    if (item === 'REFEREES') return location.pathname === '/referees';
    if (item === 'BOOKS') return location.pathname === '/books';
    if (item === 'VIDEOS') return location.pathname === '/videos';
    if (item === 'WEBINARS') return location.pathname === '/webinars';
    if (item === 'COACHES') return location.pathname === '/coaches';
    if (item === 'VAULT') return location.pathname === '/vault';
    if (item === 'ABOUT') return location.pathname === '/' || location.hash === '#about';
    return false;
  };

  const getLinkPath = (item: string) => {
    if (item === 'REFEREES') return '/referees';
    if (item === 'BOOKS') return '/books';
    if (item === 'VIDEOS') return '/videos';
    if (item === 'WEBINARS') return '/webinars';
    if (item === 'COACHES') return '/coaches';
    if (item === 'VAULT') return '/vault';
    return '/#about';
  };

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* TOP HEADER - Desktop: Left logo, Right socials/search (matches reference image). Mobile: Centered column */}
      <header
        style={{ backgroundColor: 'var(--black)' }}
        className="w-full px-5 md:px-12 py-4 md:py-0 md:h-[90px] flex flex-col md:flex-row justify-center md:justify-between items-center overflow-x-hidden"
      >
        {/* LEFT ZONE: Logo + REFEREE VISION + Cursive Subtitle */}
        <Link to="/" className="flex items-center justify-center md:justify-start gap-3.5 md:gap-4 group shrink-0">
          <img
            src={logoImage}
            alt="Referee Vision Logo"
            className="h-[56px] w-[56px] md:h-[72px] md:w-[72px] shrink-0 drop-shadow-sm"
          />
          <div className="flex items-center">
            <div className="flex flex-col text-left">
              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                }}
                className="text-[28px] md:text-[38px] text-white uppercase leading-none font-black flex items-center"
              >
                <span className="relative inline-block">
                  REFEREE VISI<img src={basketballImage} alt="O" className="bb" />N
                  <span
                    style={{
                      fontFamily: "'North Wave', cursive, sans-serif",
                      color: 'var(--orange)',
                      paddingRight: '6px',
                      marginRight: '-4px',
                    }}
                    className="absolute right-0 top-full mt-1 text-[15px] md:text-[18px] tracking-wide whitespace-nowrap leading-none block normal-case"
                  >
                    One stop to "rule" them all
                  </span>
                </span>
                <IndiaFlagBadge className="ml-2 md:ml-2.5 shrink-0 relative translate-y-[2px] md:translate-y-[5px]" />
              </h1>
              {/* Spacer matching subtitle height to maintain header layout */}
              <div className="h-[18px] md:h-[22px] pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </Link>

        {/* RIGHT ZONE: [ 🔍 SEARCH ] + Divider + Social Icons */}
        <div className="flex items-center justify-center md:justify-end gap-4 md:gap-5 mt-4 md:mt-0 shrink-0">
          {/* SEARCH Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 md:px-4 py-1.5 md:py-2 rounded-[8px] border-2 border-[var(--orange)] bg-transparent hover:bg-[var(--orange)] text-[var(--orange)] hover:text-white transition-all duration-200 cursor-pointer shadow-sm group"
            title="Search site (Cmd+K)"
            aria-label="Search site"
          >
            <Search
              className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0 text-[var(--orange)] group-hover:text-white"
              strokeWidth={2.5}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                letterSpacing: '1px',
              }}
              className="text-[13px] md:text-[14px] uppercase leading-none text-[var(--orange)] group-hover:text-white"
            >
              SEARCH
            </span>
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-[#333333] shrink-0" />

          {/* Social Media Icons */}
          <div className="flex items-center gap-3.5 md:gap-5 shrink-0">
            <a
              href="https://www.youtube.com/@refereevision5209"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="text-white hover:text-[var(--orange)] transition-colors flex items-center justify-center p-0.5"
            >
              <Youtube className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
            </a>
            <a
              href="https://www.facebook.com/people/Referee-Vision/61577189406633/"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="text-white hover:text-[var(--orange)] transition-colors flex items-center justify-center p-0.5"
            >
              <Facebook className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
            </a>
            <a
              href="https://www.instagram.com/refereevision/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="text-white hover:text-[var(--orange)] transition-colors flex items-center justify-center p-0.5"
            >
              <Instagram className="w-[20px] h-[20px] md:w-[22px] md:h-[22px]" />
            </a>
            <a
              href="https://x.com/refereevision/"
              target="_blank"
              rel="noopener noreferrer"
              title="X"
              className="text-white hover:text-[var(--orange)] transition-colors flex items-center justify-center p-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://whatsapp.com/channel/0029VbAWPOIKWEKtKbY7LR05"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="text-white hover:text-[var(--orange)] transition-colors flex items-center justify-center p-0.5"
            >
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
      </header>

      {/* NAVIGATION BAR */}
      <nav
        style={{ backgroundColor: 'var(--charcoal)', zIndex: 50 }}
        className="sticky top-0 z-50 w-full border-t border-b border-[#2A2A2A] shadow-md"
      >
        {/* Mobile View: 2 equal rows fitting 100% mobile screen width (total 68px height) */}
        <div className="md:hidden w-full flex flex-col h-[68px]">
          {/* Row 1: ABOUT, REFEREES, BOOKS, VIDEOS */}
          <div className="grid grid-cols-4 w-full border-b border-[#2A2A2A] h-[34px]">
            {NAV_ROW_1.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item}
                  to={getLinkPath(item)}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                  className={`h-full px-1 text-center flex items-center justify-center text-[13px] uppercase relative transition-colors ${active
                    ? 'text-[var(--orange)] bg-[#252525]'
                    : 'text-white/85 hover:text-white hover:bg-[#222222]'
                    }`}
                >
                  <span className="truncate">{item}</span>
                  {active && (
                    <div
                      style={{ backgroundColor: 'var(--orange)' }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Row 2: WEBINARS, COACHES, VAULT */}
          <div className="grid grid-cols-3 w-full h-[34px]">
            {NAV_ROW_2.map((item) => {
              const active = isLinkActive(item);
              return (
                <Link
                  key={item}
                  to={getLinkPath(item)}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                  className={`h-full px-1 text-center flex items-center justify-center text-[13px] uppercase relative transition-colors ${active
                    ? 'text-[var(--orange)] bg-[#252525]'
                    : 'text-white/85 hover:text-white hover:bg-[#222222]'
                    }`}
                >
                  <span className="truncate">{item}</span>
                  {active && (
                    <div
                      style={{ backgroundColor: 'var(--orange)' }}
                      className="absolute bottom-0 left-0 right-0 h-[2.5px]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop View: Single horizontal row centered */}
        <div className="hidden md:flex items-center justify-center h-[56px] px-8 md:px-12 gap-9 lg:gap-11">
          {ALL_NAV_LINKS.map((item) => {
            const active = isLinkActive(item);
            return (
              <Link
                key={item}
                to={getLinkPath(item)}
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '100%',
                  padding: '0 4px',
                  color: active || hoveredNav === item ? 'var(--orange)' : '#FFFFFF',
                  transition: 'color 0.15s',
                }}
                className="text-[17px] uppercase relative pb-1 transition-colors whitespace-nowrap"
              >
                {item}
                {(active || hoveredNav === item) && (
                  <div
                    style={{ backgroundColor: 'var(--orange)' }}
                    className="absolute bottom-0 left-0 right-0 h-[3px]"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
