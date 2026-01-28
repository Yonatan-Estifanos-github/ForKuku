'use client';

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  enableTopFade?: boolean;
  enableBottomFade?: boolean;
}

// Match the global dark background exactly for seamless blending
const DARK_BASE = '#0a0908';

export default function Section({
  children,
  className = "",
  id,
  enableTopFade = false,
  enableBottomFade = false
}: SectionProps) {
  return (
    <section id={id} className={`relative w-full ${className}`}>
      {/* Top Fade Gradient - blends seamlessly with global dark background */}
      {enableTopFade && (
        <div
          className="absolute top-0 left-0 right-0 h-40 z-30 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${DARK_BASE} 0%, transparent 100%)`
          }}
        />
      )}

      {children}

      {/* Bottom Fade Gradient - blends seamlessly with global dark background */}
      {enableBottomFade && (
        <div
          className="absolute bottom-0 left-0 right-0 h-40 z-30 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${DARK_BASE} 0%, transparent 100%)`
          }}
        />
      )}
    </section>
  );
}
