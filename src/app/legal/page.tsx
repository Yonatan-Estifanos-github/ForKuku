import Link from 'next/link';

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] text-[#E6D2B5] font-serif selection:bg-[#D4A845]/30 p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-16 py-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A845]" />
            <span className="text-[#D4A845] text-xs tracking-[0.3em] uppercase">Compliance</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4A845]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">Legal & Privacy</h1>
          <p className="text-[#E6D2B5]/40 font-sans text-sm tracking-widest uppercase">Last Updated: February 2026</p>
        </header>

        {/* Section 1: Privacy Policy */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl border-b border-[#D4A845]/20 pb-4 text-[#D4A845]">Privacy Policy</h2>
          <div className="space-y-6 font-sans text-[#E6D2B5]/80 leading-relaxed tracking-wide">
            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Data Collection</h3>
              <p>
                We collect your phone number only when you voluntarily provide it during the RSVP process on this website.
              </p>
            </div>
            
            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Use of Information</h3>
              <p>
                We use your number to send transactional wedding updates (such as RSVP reminders or schedule changes) and occasional future family-related announcements, including thank you notes, holiday greetings, or milestone celebrations.
              </p>
            </div>

            <div className="bg-[#1a1815] p-6 border border-[#D4A845]/10 rounded-sm">
              <h3 className="text-[#D4A845] font-serif text-lg mb-2">Mobile Privacy & Consent</h3>
              <p className="font-medium text-[#E6D2B5]">
                We do not share, sell, or rent your mobile information or consent data to any third parties or affiliates for marketing or promotional purposes. All text messaging originator opt-in data and consent is excluded from any information sharing.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: SMS Terms */}
        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl border-b border-[#D4A845]/20 pb-4 text-[#D4A845]">SMS Terms & Conditions</h2>
          <div className="space-y-6 font-sans text-[#E6D2B5]/80 leading-relaxed tracking-wide">
            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Consent</h3>
              <p>
                By providing your phone number during the RSVP process, you consent to receive updates regarding the Yonatan & Saron wedding and future family news.
              </p>
            </div>
            
            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Frequency & Disclosures</h3>
              <p>
                Message frequency varies based on event updates and announcements.
              </p>
              <p className="mt-4 font-medium">
                Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance.
              </p>
            </div>

            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Carrier Liability</h3>
              <p>
                Carriers are not liable for delayed or undelivered messages.
              </p>
            </div>

            <div>
              <h3 className="text-[#E6D2B5] font-serif text-lg mb-2 italic">Contact Us</h3>
              <p>
                If you have any questions regarding privacy or these terms, please contact us at: <span className="text-[#D4A845]">theestifanos@gmail.com</span>
              </p>
            </div>
          </div>
        </section>

        {/* Footer Link */}
        <footer className="pt-12 text-center">
          <Link 
            href="/"
            className="text-xs uppercase tracking-widest text-[#D4A845]/60 hover:text-[#D4A845] transition-colors duration-300"
          >
            ← Back to Invitation
          </Link>
        </footer>
      </div>
    </div>
  );
}
