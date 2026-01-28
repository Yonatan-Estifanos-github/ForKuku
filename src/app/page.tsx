import Hero from '@/components/Hero';
import OurStory from '@/components/OurStory';
import ScriptureSection from '@/components/ScriptureSection';
import Rsvp from '@/components/Rsvp';
import GoogleEarthVideo from '@/components/GoogleEarthVideo';
import Section from '@/components/ui/Section';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Section id="home">
        <Hero />
      </Section>

      <Section id="story">
        <OurStory />
      </Section>

      <Section id="venue">
        <GoogleEarthVideo />
      </Section>

      <Section id="rsvp">
        <Rsvp />
      </Section>

      <Section id="scripture">
        <ScriptureSection />
      </Section>

      <Footer />
    </main>
  );
}
