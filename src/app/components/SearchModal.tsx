import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { Search, X, ArrowRight, Video, BookOpen, Users, Tv, Shield, Archive, Sparkles, CornerDownLeft } from 'lucide-react';
import { SEARCH_ITEMS, SearchItem } from '../data/searchData';
import { renderWithOrdinals } from '../utils/renderWithOrdinals';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilterCategory = 'ALL' | 'VIDEOS' | 'BOOKS' | 'REFEREES' | 'WEBINARS' | 'COACHES' | 'VAULT';

const FILTER_CATEGORIES: { label: string; value: FilterCategory }[] = [
  { label: 'ALL', value: 'ALL' },
  { label: 'VIDEOS', value: 'VIDEOS' },
  { label: 'REFEREES', value: 'REFEREES' },
  { label: 'BOOKS', value: 'BOOKS' },
  { label: 'WEBINARS', value: 'WEBINARS' },
  { label: 'COACHES', value: 'COACHES' },
  { label: 'VAULT', value: 'VAULT' },
];

const SUGGESTIONS = [
  'Presentations',
  '3PO ADVANCED',
  'Goaltending',
  'Shot Clock',
  '3 Seconds',
  '5 Seconds',
  '8 Seconds',
  'Unsportsmanlike Foul',
  'Cylinder Principle',
  'Travelling',
  '3PO Manual',
  'Mic\'d Up',
  'Signals',
];


// Map search-result IDs to the exact labels rendered in Books.tsx.
// Other results fall back to matching their visible titles.
const DOCUMENT_LABELS: Record<string, string> = {
  'book-rule-changes-2026': 'OFFICIAL BASKETBALL RULE CHANGES 2026',
  'book-interpretations-2026': 'OFFICIAL INTERPRETATIONS',
  'book-statisticians-manual': "FIBA STATISTICIANS' MANUAL 2024",
  'pres-goaltending': 'GOALTENDING AND INTERFERENCE',
  'pres-shot-clock': 'SHOT CLOCK',
  'pres-8-seconds': '8 SECONDS',
  'pres-contact-charge-block': 'CONTACT: CHARGE & BLOCK',
  'pres-contact-cylinder': 'CONTACT: CYLINDER & VERTICALITY',
  'pres-contact-screening': 'CONTACT: SCREENING',
  'pres-contact-lgp': 'CONTACT: LGP & GUARDING A PLAYER',
  'pres-paos': 'PLAYER IN THE ACT OF SHOOTING',
  'pres-throw-in': 'THROW-IN',
  'pres-ball-returned': 'BALL RETURNED TO BACKCOURT',
  'pres-dribbling': 'DRIBBLING',
  'pres-jumpball-apa': 'JUMP BALL AND ALTERNATING POSSESSION',
  'pres-correctable-errors': 'CORRECTABLE ERRORS',
  'pres-special-situations': 'SPECIAL SITUATIONS',
};

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, '');

let stopActiveHighlight: (() => void) | null = null;

function startSearchHighlight(item: SearchItem) {
  stopActiveHighlight?.();

  const expectedPath = new URL(item.path, window.location.origin).pathname;
  const explicitLabel = DOCUMENT_LABELS[item.id];
  const target = normalizeSearchText(explicitLabel || item.title);
  const simplifiedTitle = normalizeSearchText(
    item.title.replace(/\s*\([^)]*\)/g, '')
      .replace(/\s+(presentation|slides|pdf|document|fiba)$/gi, '')
  );

  let stopped = false;
  let observer: MutationObserver | null = null;
  let interval: number | undefined;
  let timeout: number | undefined;
  let highlightedRow: HTMLElement | null = null;
  let previousStyles: { background: string; outline: string; borderRadius: string; scrollMarginTop: string } | null = null;

  const cleanup = () => {
    stopped = true;
    observer?.disconnect();
    if (interval !== undefined) window.clearInterval(interval);
    if (timeout !== undefined) window.clearTimeout(timeout);
  };

  stopActiveHighlight = () => {
    cleanup();
    if (highlightedRow && previousStyles) {
      highlightedRow.style.background = previousStyles.background;
      highlightedRow.style.outline = previousStyles.outline;
      highlightedRow.style.borderRadius = previousStyles.borderRadius;
      highlightedRow.style.scrollMarginTop = previousStyles.scrollMarginTop;
    }
  };

  const tryHighlight = () => {
    if (stopped || window.location.pathname !== expectedPath) return;

    // The Books document title is a span inside a flex row. Restrict the
    // match to leaf text so section headings do not get highlighted.
    const candidates = document.querySelectorAll<HTMLElement>(
      'main span, main h2, main h3, main h4, span, h2, h3, h4'
    );

    for (const element of candidates) {
      if (element.closest('[role="dialog"]')) continue;
      if (element.children.length > 2) continue;

      const text = normalizeSearchText(element.textContent || '');
      if (!text || text.length < 4) continue;

      // Books labels can contain a version string after the document title.
      const matches = text === target ||
        (Boolean(explicitLabel) && text.startsWith(target)) ||
        (!explicitLabel && simplifiedTitle.length >= 6 &&
          (text === simplifiedTitle || text.startsWith(simplifiedTitle)));
      if (!matches) continue;

      // Prefer the document row (contains its download link) over the title span.
      let row: HTMLElement = element;
      for (let i = 0; i < 4 && row.parentElement; i++) {
        if (row.querySelector('a[href]')) break;
        row = row.parentElement;
      }
      if (!row.querySelector('a[href]')) row = element;

      highlightedRow = row;
      previousStyles = {
        background: row.style.background,
        outline: row.style.outline,
        borderRadius: row.style.borderRadius,
        scrollMarginTop: row.style.scrollMarginTop,
      };
      row.style.background = 'rgba(232, 101, 26, 0.20)';
      row.style.outline = '3px solid #E8651A';
      row.style.borderRadius = '8px';
      row.style.scrollMarginTop = '120px';
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cleanup();
      return;
    }
  };

  // React may render the new route/tab after navigate() returns.
  observer = new MutationObserver(tryHighlight);
  observer.observe(document.body, { childList: true, subtree: true });
  interval = window.setInterval(tryHighlight, 200);
  timeout = window.setTimeout(cleanup, 8000);
  window.setTimeout(tryHighlight, 50);
}


export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('ALL');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Global ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter & Search logic with token-based matching and relevance ranking
  const filteredItems = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    const matches = SEARCH_ITEMS.filter((item) => {
      // Category filter check
      if (selectedFilter !== 'ALL' && item.category !== selectedFilter) {
        return false;
      }

      if (!cleanQuery) return true;

      const titleLower = item.title.toLowerCase();
      const descLower = (item.description || '').toLowerCase();
      const sectionLower = (item.section || '').toLowerCase();
      const keywordsLower = item.keywords.map((k) => k.toLowerCase()).join(' ');
      const allText = `${titleLower} ${descLower} ${sectionLower} ${keywordsLower}`;

      // 1. Direct full match (exact phrase match)
      if (allText.includes(cleanQuery)) return true;

      // 2. Token match: all space-separated words must be present
      const tokens = cleanQuery.split(/\s+/).filter(Boolean);
      if (tokens.length > 1) {
        return tokens.every((token) => allText.includes(token));
      }

      return false;
    });

    if (!cleanQuery) return matches;

    // Rank results: exact phrase in title > token match in title > keyword match
    return matches.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();

      // Exact title match gets highest priority
      const aExact = aTitle === cleanQuery;
      const bExact = bTitle === cleanQuery;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;

      // Starts with query in title
      const aStarts = aTitle.startsWith(cleanQuery);
      const bStarts = bTitle.startsWith(cleanQuery);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Includes query in title
      const aTitleIncludes = aTitle.includes(cleanQuery);
      const bTitleIncludes = bTitle.includes(cleanQuery);
      if (aTitleIncludes && !bTitleIncludes) return -1;
      if (!aTitleIncludes && bTitleIncludes) return 1;

      return 0;
    });
  }, [query, selectedFilter]);

  // Reset selected index when query or filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedFilter]);

  // Keep active item in view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Navigate to the existing tab, then highlight its document without
  // requiring any change to Books.tsx.
  const handleSelect = (item: SearchItem) => {
    onClose();
    startSearchHighlight(item);
    navigate(item.path);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : Math.max(0, filteredItems.length - 1)));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    }
  };

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'VIDEOS':
        return <Video className="w-4 h-4 text-[#E8651A]" />;
      case 'BOOKS':
        return <BookOpen className="w-4 h-4 text-[#3B82F6]" />;
      case 'REFEREES':
        return <Shield className="w-4 h-4 text-[#10B981]" />;
      case 'WEBINARS':
        return <Tv className="w-4 h-4 text-[#8B5CF6]" />;
      case 'COACHES':
        return <Users className="w-4 h-4 text-[#EC4899]" />;
      case 'VAULT':
        return <Archive className="w-4 h-4 text-[#F59E0B]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#E8651A]" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'VIDEOS':
        return 'text-[#E8651A] bg-[#E8651A]/10 border-[#E8651A]/30';
      case 'BOOKS':
        return 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30';
      case 'REFEREES':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30';
      case 'WEBINARS':
        return 'text-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6]/30';
      case 'COACHES':
        return 'text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/30';
      case 'VAULT':
        return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      default:
        return 'text-[#AAAAAA] bg-[#AAAAAA]/10 border-[#AAAAAA]/30';
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] flex items-start justify-center pt-8 md:pt-20 px-3 md:px-4 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      style={{ animation: 'fadeInModal 0.18s ease-out' }}
    >
      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#141414] rounded-lg border border-[#E8651A] shadow-[0_0_60px_rgba(232,101,26,0.35)] flex flex-col overflow-hidden max-h-[85vh] animate-in"
      >
        {/* Search Input Bar */}
        <div className="p-4 md:p-5 border-b border-[#2A2A2A] bg-[#181818] flex items-center gap-3">
          <Search className="w-5 h-5 md:w-6 md:h-6 text-[#E8651A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search anything: Goaltending, Shot Clock, 3 Seconds, 5 Seconds, 8 Seconds, Manuals..."
            className="w-full bg-transparent text-white text-base md:text-lg focus:outline-none placeholder:text-[#666666] font-sans"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 hover:bg-[#2A2A2A] rounded text-[#888888] hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="hidden md:flex items-center justify-center px-2 py-1 bg-[#222222] border border-[#333333] hover:border-[#E8651A] rounded text-xs text-[#AAAAAA] hover:text-[#E8651A] transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 bg-[#121212] border-b border-[#242424] flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {FILTER_CATEGORIES.map((cat) => {
            const active = selectedFilter === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedFilter(cat.value)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: '1px',
                }}
                className={`px-3 py-1 rounded text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#E8651A] text-white shadow-sm'
                    : 'bg-[#1C1C1C] text-[#888888] hover:text-white hover:bg-[#2A2A2A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results Area */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 md:p-3 divide-y divide-[#1F1F1F] scroll-smooth"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 md:p-3.5 rounded transition-colors cursor-pointer flex items-center justify-between gap-3 group ${
                    isSelected ? 'bg-[#E8651A]/15 border-l-4 border-l-[#E8651A]' : 'hover:bg-[#1A1A1A]'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded bg-[#1C1C1C] border border-[#2A2A2A] shrink-0 mt-0.5">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                          className={`text-base md:text-lg transition-colors truncate ${
                            isSelected ? 'text-[#E8651A]' : 'text-white group-hover:text-[#E8651A]'
                          }`}
                        >
                          {renderWithOrdinals(item.title)}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border shrink-0 ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.badge || item.category}
                        </span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-[#888888] line-clamp-1 mt-0.5 font-sans">
                          {renderWithOrdinals(item.description)}
                        </p>
                      )}
                      {item.section && (
                        <span className="text-[11px] text-[#555555] mt-0.5 font-sans">
                          in <span className="text-[#888888]">{item.section}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      className={`text-xs font-bold uppercase transition-opacity flex items-center gap-1 ${
                        isSelected ? 'opacity-100 text-[#E8651A]' : 'opacity-0 group-hover:opacity-100 text-[#888888]'
                      }`}
                    >
                      <span className="hidden sm:inline">Go</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center flex flex-col items-center">
              <Search className="w-12 h-12 text-[#333333] mb-3 stroke-1" />
              <p className="text-white font-bold text-base mb-1">No results found for "{query}"</p>
              <p className="text-xs text-[#666666] max-w-sm mb-6">
                Try searching for specific rules, violations (3, 5, 8, 24 seconds, goaltending), signals, or manuals.
              </p>

              {/* Suggestions */}
              <div className="w-full max-w-lg">
                <span className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-2">
                  Popular Searches
                </span>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {SUGGESTIONS.map((sug) => (
                    <button
                      key={sug}
                      onClick={() => setQuery(sug)}
                      className="px-2.5 py-1 rounded bg-[#1C1C1C] hover:bg-[#E8651A] hover:text-white text-xs text-[#AAAAAA] transition-colors cursor-pointer border border-[#2A2A2A]"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions footer when query is empty */}
        {!query && (
          <div className="p-3 bg-[#111111] border-t border-[#222222]">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              <span className="text-[11px] uppercase tracking-wider text-[#666666] font-bold shrink-0 mr-1">
                Suggestions:
              </span>
              {SUGGESTIONS.slice(0, 7).map((sug) => (
                <button
                  key={sug}
                  onClick={() => setQuery(sug)}
                  className="px-2 py-0.5 rounded bg-[#1C1C1C] hover:bg-[#2A2A2A] hover:text-[#E8651A] text-[11px] text-[#888888] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard Hints Bar */}
        <div className="px-4 py-2.5 bg-[#0C0C0C] border-t border-[#1C1C1C] flex items-center justify-between text-[11px] text-[#666666]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#AAAAAA] border border-[#2A2A2A] text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#AAAAAA] border border-[#2A2A2A] text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#AAAAAA] border border-[#2A2A2A] text-[10px]">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-[#1C1C1C] text-[#AAAAAA] border border-[#2A2A2A] text-[10px]">ESC</kbd>
              Close
            </span>
          </div>
          <span className="hidden sm:inline text-[#444444]">
            {filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
