'use client';

import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/services/auth/auth.api';
import { clearTokens, getRefreshToken } from '@/services/http/token-storage';

export function AppHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  async function handleSignOut() {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await signOut({
          refreshToken,
        });
      }
    } finally {
      clearTokens();
      setIsMobileMenuOpen(false);
      router.push('/sign-in');
    }
  }

  return (
    <header className="border-b border-gray-800 bg-black px-4 py-4 md:px-6">
      <div className="flex items-center gap-4">
        <strong className="shrink-0 text-gray-300">BOLÃO COPA 2026</strong>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-300 md:flex">
          <Link href="/matches" className="transition-colors hover:text-white">
            Partidas
          </Link>
          <Link href="/regulamento" className="transition-colors hover:text-white">
            Regulamento
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded border border-gray-700 text-gray-300 md:hidden"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>

        <button
          type="button"
          onClick={handleSignOut}
          className="ml-auto hidden items-center justify-center gap-2 rounded bg-red-700 px-3 py-1 text-red-100 hover:bg-red-500 md:flex"
        >
          <IoMdExit className="text-base" />
          Sair
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 space-y-3 border-t border-gray-800 pt-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium text-gray-300">
            <Link
              href="/matches"
              className="transition-colors hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partidas
            </Link>
            <Link
              href="/regulamento"
              className="transition-colors hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Regulamento
            </Link>
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center justify-center gap-2 rounded bg-red-700 px-3 py-2 text-red-100 hover:bg-red-500"
          >
            <IoMdExit className="text-base" />
            Sair
          </button>
        </div>
      )}
    </header>
  );
}
