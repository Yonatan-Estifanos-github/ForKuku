'use client';

import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#', icon: HomeIcon },
  { label: 'Story', href: '#story', icon: BookIcon },
  { label: 'Venue', href: '#venue', icon: MapPinIcon },
  { label: 'RSVP', href: '#rsvp', icon: EnvelopeIcon },
];

export default function FloatingNav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2.5, ease: 'easeOut' }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 pb-[max(2rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-1 sm:gap-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 sm:px-5 py-2 transition-all">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => handleClick(e, href)}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full font-serif text-[10px] sm:text-sm text-white transition-colors duration-300 hover:text-[#D4A845]"
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{label}</span>
          </a>
        ))}
      </div>
    </motion.nav>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function EnvelopeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13 2 6" />
    </svg>
  );
}
