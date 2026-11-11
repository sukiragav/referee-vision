
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

interface SearchHighlightProps {
  itemId: string;
  children: React.ReactNode;
}

export default function SearchHighlight({
  itemId,
  children,
}: SearchHighlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const activeId = params.get('highlight');

  const isMatch = activeId === itemId;

  useEffect(() => {
    if (!isMatch) return;

    const timer = window.setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [isMatch, location.search]);

  return (
    <div
      ref={ref}
      id={`search-${itemId}`}
      className={isMatch ? 'search-highlight' : ''}
    >
      {children}
    </div>
  );
}
