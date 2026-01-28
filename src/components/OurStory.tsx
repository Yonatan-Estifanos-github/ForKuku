'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

// ============================================================================
// DATA
// ============================================================================
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2018',
    title: 'The First Hello',
    description: 'A chance meeting that started it all. Coffee shops and shy smiles.',
  },
  {
    year: '2019',
    title: 'Building Bridges',
    description: 'Long walks and endless conversations. We realized we shared the same dreams.',
  },
  {
    year: '2020',
    title: 'Growing Together',
    description: 'Supporting each other through challenges and celebrating small wins.',
  },
  {
    year: '2021',
    title: 'The Adventure Begins',
    description: 'Our first road trip together. Discovering new places and new parts of ourselves.',
  },
  {
    year: '2022',
    title: 'A Promise Made',
    description: 'Understanding that this was forever. A quiet commitment in our hearts.',
  },
  {
    year: '2023',
    title: 'The Proposal',
    description: 'Under a canopy of stars, he asked. With joy in her heart, she said yes.',
  },
  {
    year: '2024',
    title: 'Planning Our Future',
    description: 'Dreaming of a home, a family, and a lifetime of serving God together.',
  },
  {
    year: '2026',
    title: 'The Wedding Day',
    description: 'Two hearts become one. The beginning of our greatest chapter yet.',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.95,
  }),
};

function PlaceholderImage() {
  return (
    <div className="relative w-full aspect-[4/5] bg-[#1B3B28] flex items-center justify-center overflow-hidden shadow-2xl border border-[#D4A845]/20">
      <div className="absolute inset-4 border border-[#D4A845]/30 opacity-50" />
      <span className="font-serif text-[#D4A845] text-xl tracking-widest italic opacity-80 z-10">
        Coming Soon
      </span>
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 p-2 group transition-transform active:scale-95 ${
        direction === 'left' ? 'left-4 md:left-8' : 'right-4 md:right-8'
      }`}
      aria-label={direction === 'left' ? 'Previous story' : 'Next story'}
    >
      {/* High Contrast Gold Button */}
      <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#D4A845] text-[#0a0908] shadow-lg shadow-[#D4A845]/20 transition-all duration-300 hover:scale-110 hover:shadow-xl">
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${
            direction === 'left' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function OurStory() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  
  // Prevent scroll momentum from triggering slide change on arrival
  useEffect(() => {
    const timer = setTimeout(() => setCanScroll(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Correct modulo math to handle negative numbers for infinite looping
  const imageIndex = ((page % TIMELINE_DATA.length) + TIMELINE_DATA.length) % TIMELINE_DATA.length;
  const currentItem = TIMELINE_DATA[imageIndex];

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPage([page + newDirection, newDirection]);
  };

  // Swipe Handler
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Mouse Wheel Handler (Debounced)
  const lastWheelTime = useRef(0);
  const handleWheel = (e: React.WheelEvent) => {
    if (!canScroll) return;

    const now = Date.now();
    if (now - lastWheelTime.current > 500) { // 500ms cooldown
      // Require distinct scroll intent
      if (Math.abs(e.deltaY) > 30 || Math.abs(e.deltaX) > 30) {
        if (e.deltaY > 0 || e.deltaX > 0) {
          paginate(1);
        } else {
          paginate(-1);
        }
        lastWheelTime.current = now;
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-12 z-20 px-4">
        <h2 className="font-serif text-4xl md:text-6xl text-[#D4A845] mb-4">Our Journey</h2>
        <p className="font-sans text-[#1B3B28]/60 uppercase tracking-widest text-xs">
          {imageIndex + 1} — {TIMELINE_DATA.length}
        </p>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full max-w-6xl flex items-center justify-center px-4 md:px-20 h-[600px]"
        onWheel={handleWheel}
      >
        {/* Navigation Buttons */}
        <NavButton direction="left" onClick={() => paginate(-1)} />
        <NavButton direction="right" onClick={() => paginate(1)} />

        {/* Slides */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              className="absolute w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-grab active:cursor-grabbing"
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 max-w-sm">
                <PlaceholderImage />
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="font-serif text-6xl md:text-8xl text-[#D4A845]/20 mb-4 select-none">
                    {currentItem.year}
                  </h3>
                  <h4 className="font-serif text-3xl md:text-4xl text-[#1B3B28] mb-4">
                    {currentItem.title}
                  </h4>
                  <p className="font-sans text-[#1B3B28]/80 leading-relaxed text-base md:text-lg max-w-md mx-auto md:mx-0">
                    {currentItem.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-[#D4A845]/20 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-[#D4A845]"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((imageIndex + 1) / TIMELINE_DATA.length) * 100}%` 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

    </section>
  );
}
