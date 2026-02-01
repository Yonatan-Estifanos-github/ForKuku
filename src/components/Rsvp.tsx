'use client';

import { useState } from 'react';

// ============================================================================
// TYPES
// ============================================================================
interface Guest {
  id: number;
  name: string;
  is_attending: boolean;
  is_plus_one: boolean;
}

interface Party {
  id: number;
  party_name: string;
  status: string;
  guests: Guest[];
}

// ============================================================================
// SHARED STYLES
// ============================================================================
const inputStyles = {
  base: `w-full bg-transparent border-b border-stone-700 py-3 text-lg font-serif tracking-wide
         transition-colors duration-300 outline-none text-stone-200
         focus:border-amber-500 placeholder:text-stone-500 placeholder:italic`,
  label: 'text-xs tracking-[0.2em] uppercase font-medium text-stone-400',
};

// ============================================================================
// SEARCH SCREEN
// ============================================================================
function SearchScreen({ onFound }: { onFound: (party: Party) => void }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!query.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/rsvp/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Search failed');
      }

      onFound(data);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "We couldn't find your invitation. Please try a different spelling or contact the couple.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg text-center">
      <p className="font-serif text-base md:text-lg mb-10 leading-relaxed px-4 text-stone-300">
        Please enter the first and last name of one member of your party below.
        If you&apos;re responding for you and a guest (or your family), you&apos;ll
        be able to RSVP for your entire group on the next page.
      </p>

      <form onSubmit={handleSearch} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-left">
          <label
            htmlFor="search"
            className={inputStyles.label}
          >
            First and Last Name
          </label>
          <input
            type="text"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className={`${inputStyles.base} disabled:opacity-50`}
            placeholder="Ex. Sarah Fortune"
            autoFocus
          />
        </div>

        {error && (
          <p className="text-sm font-serif italic text-left text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="px-10 py-4 font-serif text-lg tracking-[0.15em] uppercase transition-all duration-300 bg-amber-600 hover:bg-amber-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Find My Invitation'}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// RSVP FORM SCREEN
// ============================================================================
function FormScreen({
  party,
  onSubmit,
  onBack,
}: {
  party: Party;
  onSubmit: () => void;
  onBack: () => void;
}) {
  const [guests, setGuests] = useState<Guest[]>(
    party.guests.map((g) => ({ ...g }))
  );
  const [contact, setContact] = useState({ email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleGuest = (index: number, attending: boolean) => {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, is_attending: attending } : g))
    );
  };

  const handleNameChange = (index: number, newName: string) => {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, name: newName } : g))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/rsvp/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          party_id: party.id,
          email: contact.email,
          phone: contact.phone,
          message: contact.message,
          guests
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      onSubmit();
    } catch (err: unknown) {
      console.error('RSVP Submit Error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to submit RSVP. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 font-serif text-sm tracking-wide flex items-center gap-2 text-stone-400 opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Search Again
      </button>

      {/* Welcome Header */}
      <div className="text-center mb-10">
        <p className="font-serif text-sm tracking-[0.3em] uppercase mb-2 text-stone-400">
          You&apos;re Invited
        </p>
        <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-stone-200">
          Welcome, {party.party_name}!
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Guest List */}
        <div className="mb-10">
          <p className={`${inputStyles.label} mb-6`}>
            Please respond for each guest
          </p>

          <div className="flex flex-col gap-4">
            {guests.map((guest, idx) => (
              <div
                key={guest.id}
                className="flex flex-col gap-3 py-4 border-b border-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg tracking-wide text-stone-200">
                    {guest.is_plus_one && !guest.name ? `Guest ${idx + 1}` : guest.name}
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleGuest(idx, true)}
                      className={`px-4 py-2 text-sm font-serif tracking-wide border rounded-full transition-all duration-300 ${
                        guest.is_attending
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-transparent border-stone-700 text-stone-300 hover:border-amber-500'
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleGuest(idx, false)}
                      className={`px-4 py-2 text-sm font-serif tracking-wide border rounded-full transition-all duration-300 ${
                        !guest.is_attending
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-transparent border-stone-700 text-stone-300 hover:border-amber-500'
                      }`}
                    >
                      Decline
                    </button>
                  </div>
                </div>

                {/* Edit Plus One Name */}
                {guest.is_plus_one && (
                  <input
                    type="text"
                    placeholder="Guest Full Name"
                    value={guest.name || ''}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    className="w-full bg-transparent border-b border-dashed border-amber-600 text-sm font-serif py-1 outline-none text-stone-200 opacity-80 focus:opacity-100 transition-opacity placeholder:italic placeholder:text-stone-500"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className={inputStyles.label}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={contact.email}
              onChange={(e) =>
                setContact((p) => ({ ...p, email: e.target.value }))
              }
              required
              className={inputStyles.base}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="phone"
              className={inputStyles.label}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={contact.phone}
              onChange={(e) =>
                setContact((p) => ({ ...p, phone: e.target.value }))
              }
              required
              className={inputStyles.base}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 mb-10">
          <label
            htmlFor="message"
            className={inputStyles.label}
          >
            Note to the Couple (Optional)
          </label>
          <textarea
            id="message"
            value={contact.message}
            onChange={(e) =>
              setContact((p) => ({ ...p, message: e.target.value }))
            }
            rows={3}
            className={`${inputStyles.base} resize-none`}
            placeholder="Share a message or well-wishes..."
          />
        </div>

        {/* Error Message */}
        {submitError && (
          <p className="text-sm font-serif italic text-center mb-6 text-red-500">
            {submitError}
          </p>
        )}

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-12 py-4 font-serif text-lg tracking-[0.15em] uppercase transition-all duration-300 bg-amber-600 hover:bg-amber-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Submit RSVP'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================================
// SUCCESS SCREEN
// ============================================================================
function SuccessScreen({ partyName }: { partyName: string }) {
  return (
    <div className="text-center max-w-md">
      <div className="w-20 h-20 rounded-full border-2 border-amber-600 flex items-center justify-center mx-auto mb-8">
        <svg
          className="w-10 h-10 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 className="font-serif text-3xl md:text-4xl mb-4 text-stone-200">
        Thank You!
      </h3>
      <p className="font-serif text-lg italic leading-relaxed text-stone-400">
        {partyName}, your response has been recorded.
        <br />
        We look forward to celebrating with you!
      </p>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
type View = 'search' | 'form' | 'success';

export default function Rsvp() {
  const [view, setView] = useState<View>('search');
  const [party, setParty] = useState<Party | null>(null);

  return (
    <section className="relative min-h-screen w-full bg-stone-950">
      <div className="relative z-10 flex flex-col items-center pt-60 md:pt-64 pb-20 px-6 min-h-screen">
        {/* Card container */}
        <div className="max-w-xl w-full mx-auto bg-stone-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col items-center">
          {/* Header */}
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl tracking-wide mb-4 text-stone-200">
            RSVP
          </h2>
          <p className="font-serif italic text-base md:text-lg tracking-wide mb-12 text-stone-400">
            Kindly reply by March 1st
          </p>

          {/* View Router */}
          {view === 'search' && (
            <SearchScreen
              onFound={(p) => {
                setParty(p);
                setView('form');
              }}
            />
          )}

          {view === 'form' && party && (
            <FormScreen
              party={party}
              onSubmit={() => setView('success')}
              onBack={() => {
                setView('search');
                setParty(null);
              }}
            />
          )}

          {view === 'success' && party && (
            <SuccessScreen partyName={party.party_name} />
          )}
        </div>
      </div>
    </section>
  );
}
