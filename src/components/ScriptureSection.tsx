'use client';

import FadeIn from '@/components/ui/FadeIn';

export default function ScriptureSection() {
  return (
    <section
      className="relative w-full min-h-[60vh] py-20 md:py-28 px-6 bg-stone-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-stone-950 to-stone-950"
    >
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Amharic Verse Block */}
        <FadeIn className="max-w-4xl">
          <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-3 md:mb-4 tracking-wide text-stone-200">
            እግዚአብሔር የሠራት ቀን ይህች ናት፤<br />
            በርሷ ሐሤት እናድርግ፤<br />
            ደስም ይበለን።
          </p>
          <p className="text-amber-500 text-sm tracking-widest uppercase font-medium">
            መዝሙር 118:24 NASV
          </p>
        </FadeIn>

        {/* Breathing Room */}
        <div className="h-6 md:h-8" />

        {/* English Verse Block */}
        <FadeIn delay={0.2} className="max-w-2xl">
          <p className="text-amber-500 text-sm tracking-widest uppercase mb-2">
            Psalm 118:24 (NIV) says,
          </p>
          <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-stone-300">
            &ldquo;This is the day that the Lord has made;<br />
            let us rejoice and be glad in it.&rdquo;
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
