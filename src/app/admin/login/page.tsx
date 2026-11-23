'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Field, inputClass } from '@/components/admin/Field';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Kalau sudah login, langsung ke dashboard.
  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) router.replace('/admin');
    });
    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError('Email atau password salah. Periksa lagi, lalu coba masuk kembali.');
      setLoading(false);
      return;
    }

    router.replace('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-abyss px-5">
      <div className="w-full max-w-sm">
        <p className="font-display text-5xl font-extrabold italic leading-none text-foam">
          Sagara
        </p>
        <h1 className="mt-6 text-xl font-semibold text-foam">Masuk ke dashboard admin</h1>
        <p className="mt-2 text-sm text-mist">
          Kelola foto galeri dan konten situs.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Field label="Email" htmlFor="login-email">
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password" htmlFor="login-password">
            <input
              id="login-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </Field>

          {error && (
            <p role="alert" className="text-sm text-flare">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Memproses…' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  );
}
