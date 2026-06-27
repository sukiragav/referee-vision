import { Youtube, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import logoImage from '../../imports/Screenshot_2026-06-03_at_14.17.43.png';

export default function SiteFooter() {
  const links = [
    { label: 'About', to: '/#about' },
    { label: 'Referees', to: '/referees' },
    { label: 'Books', to: '/books' },
    { label: 'Videos', to: '/videos' },
    { label: 'Webinars', to: '/webinars' },
    { label: 'Coaches', to: '/coaches' },
    { label: 'Vault', to: '/#vault' },
  ];

  return (
    <footer style={{ backgroundColor: 'var(--black)' }} className="relative w-full mt-auto">
      <div style={{ backgroundColor: 'var(--orange)' }} className="h-[3px] w-full"></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="Basketball Logo" className="h-[50px] w-auto" />
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                className="text-white text-[22px] uppercase">
                REFEREE VISION
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.youtube.com/@refereevision5209" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://www.facebook.com/people/Referee-Vision/61577189406633/" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://www.instagram.com/refereevision/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://x.com/refereevision/" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbAWPOIKWEKtKbY7LR05" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 text-white cursor-pointer hover:text-[var(--orange)] transition-colors" />
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
