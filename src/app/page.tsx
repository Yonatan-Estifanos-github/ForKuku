import Hero from '@/components/Hero';
import ScriptureSection from '@/components/ScriptureSection';
import Rsvp from '@/components/Rsvp';
import GoogleEarthVideo from '@/components/GoogleEarthVideo';
import JourneyGallery from '@/components/journey/JourneyGallery';
import Section from '@/components/ui/Section';
import Footer from '@/components/Footer';
import FadeIn from '@/components/ui/FadeIn';
import Link from 'next/link';
import ScrollToRegistry from '@/components/ScrollToRegistry';

export default function Home() {
  return (
    <main>
      <ScrollToRegistry />
      <Section id="home">
        <Hero />
      </Section>

      <JourneyGallery />

      <Section id="venue">
        <GoogleEarthVideo />
      </Section>

      <Section id="rsvp">
        <Rsvp />
      </Section>

      <Section id="registry" className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-5">
              Registry
            </h2>
            <p className="font-serif text-white/70 leading-relaxed">
              Your presence is the greatest gift. However, if you wish to honor us with a gift, we
              have curated a selection of items for our home.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              href="/registry"
              className="mt-8 inline-flex items-center justify-center px-7 py-3 rounded-full border border-wedding-gold text-wedding-gold text-xs tracking-[0.3em] uppercase font-semibold transition-colors hover:bg-wedding-gold/10"
            >
              Visit Registry
            </Link>
          </FadeIn>
        </div>
      </Section>

      <Section id="scripture">
        <ScriptureSection />
      </Section>

      <Footer />
    </main>
  );
}
