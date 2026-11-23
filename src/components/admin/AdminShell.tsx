'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FileText, Images, LayoutDashboard, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const MENU = [
  { label: 'Ringkasan', href: '/admin', icon: LayoutDashboard },
  { label: 'Galeri', href: '/admin/gallery', icon: Images },
  { label: 'Konten situs', href: '/admin/site-content', icon: FileText },
];

/**
 * Pembungkus dashboard: memeriksa sesi login lalu menampilkan sidebar.
 * Pengecekan di sini hanya mengatur tampilan. Keamanan data yang sebenarnya
 * dijaga oleh RLS di Supabase.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace('/admin/login');
        return;
      }
      setChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace('/admin/login');
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-abyss text-mist">
        Memeriksa sesi login…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-abyss md:grid md:grid-cols-[240px_1fr]">
      <aside className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-midwater p-4 md:sticky md:top-0 md:h-screen md:flex-col md:items-stretch md:justify-start md:gap-8 md:border-b-0 md:border-r md:p-6">
        <div>
          <p className="font-display text-3xl font-extrabold italic leading-none text-foam">
            Sagara
          </p>
          <p className="mt-1 text-xs text-mist">Dashboard admin</p>
        </div>

        <nav aria-label="Menu admin" className="flex gap-1 md:flex-col">
          {MENU.map((item) => {
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-shallows text-foam' : 'text-mist hover:text-foam'
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex gap-3 text-sm md:mt-auto md:flex-col md:gap-2">
          <Link href="/" className="text-mist transition-colors hover:text-foam">
            Lihat situs
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-2 text-mist transition-colors hover:text-foam"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Keluar
          </button>
        </div>
      </aside>

      <main className="p-5 sm:p-10">{children}</main>
    </div>
  );
}
