'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-[#D4A845]/20">
        <h1 className="font-serif text-3xl text-[#1B3B28] text-center mb-8">Admin Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[#1B3B28]/70 text-xs uppercase tracking-wider font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#F9F7F2] border border-[#D4A845]/30 rounded outline-none focus:border-[#D4A845] transition-colors text-[#1B3B28]"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-[#1B3B28]/70 text-xs uppercase tracking-wider font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#F9F7F2] border border-[#D4A845]/30 rounded outline-none focus:border-[#D4A845] transition-colors text-[#1B3B28]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1B3B28] text-white font-serif tracking-widest uppercase hover:bg-[#D4A845] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
