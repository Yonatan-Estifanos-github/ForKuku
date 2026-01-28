'use client';

import FadeIn from '@/components/ui/FadeIn';

// Deep Forest Green text for light botanical background
const TEXT_PRIMARY = '#1B3B28';      // Amharic verse
const TEXT_SECONDARY = '#1B3B28';    // Citations/headers (with opacity via Tailwind)
const TEXT_QUOTE = '#1B3B28';        // English quote

export default function ScriptureSection() {
  return (
    <section
      className="relative w-full min-h-[60vh] py-20 md:py-28 px-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/textures/ren1.jpeg)',
      }}
    >
      {/* Blur Overlay - Softens the botanical pattern */}
      <div
        className="absolute inset-0 z-0 bg-[#F9F7F2]/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Content Container - Sits above the blur */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Amharic Verse Block */}
        <FadeIn className="max-w-4xl">
          <p
            className="font-serif text-lg md:text-2xl lg:text-3xl leading-relaxed mb-3 md:mb-4 tracking-wide"
            style={{ color: TEXT_PRIMARY }}
          >
            እግዚአብሔር የሠራት ቀን ይህች ናት፤<br />
            በርሷ ሐሤት እናድርግ፤<br />
            ደስም ይበለን።
          </p>
          <p
            className="font-serif text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium opacity-60"
            style={{ color: TEXT_SECONDARY }}
          >
            መዝሙር 118:24 NASV
          </p>
        </FadeIn>

        {/* Breathing Room */}
        <div className="h-6 md:h-8" />

        {/* English Verse Block */}
        <FadeIn delay={0.2} className="max-w-2xl">
          <p
            className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60"
            style={{ color: TEXT_SECONDARY }}
          >
            Psalm 118:24 (NIV) says,
          </p>
          <p
            className="font-serif text-sm md:text-base lg:text-lg italic leading-relaxed font-light opacity-80"
            style={{ color: TEXT_QUOTE }}
          >
            &ldquo;This is the day that the Lord has made;<br />
            let us rejoice and be glad in it.&rdquo;
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
