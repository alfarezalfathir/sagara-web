'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg('Login gagal. Cek kembali email dan password admin.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#06131F] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-[#0B2239]/80 backdrop-blur-md p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <span className="inline-block rounded-full bg-[#FF5A1F]/15 px-3 py-1 text-xs font-semibold tracking-wider text-[#FF5A1F] border border-[#FF5A1F]/30 mb-3">
            SAGARA ITENAS • ADMIN PORTAL
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Sign In</h1>
          <p className="text-sm text-slate-300 mt-1">
            Kelola foto galeri, wahana ROV, dan konten website secara dinamis.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 rounded-lg bg-red-500/15 border border-red-500/40 px-4 py-2.5 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sagaraitenas.com"
                className="w-full rounded-xl bg-[#06131F] border border-slate-700 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5A1F]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[#06131F] border border-slate-700 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF5A1F]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-xl bg-[#FF5A1F] hover:bg-[#e44b14] disabled:opacity-60 text-white font-semibold py-2.5 text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Memproses...
              </>
            ) : (
              'Masuk ke Dashboard'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}