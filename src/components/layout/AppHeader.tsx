'use client';

import { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import { RiUserFill } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { signOut } from '@/services/auth/auth.api';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
} from '@/services/http/token-storage';

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(getAccessToken()));
  }, [pathname]);

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
      setIsLoggedIn(false);
      setIsMobileMenuOpen(false);
      router.push('/account/sign-in');
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
          {isLoggedIn && (
            <Link href="/guesses" className="transition-colors hover:text-white">
              Palpites
            </Link>
          )}
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

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {isLoggedIn ? (
            <>
              <Link
                href="/account/profile"
                className="flex items-center justify-center gap-2 rounded border border-gray-500 bg-black px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
              >
                <FaRegUser className="text-base" />
                Perfil
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center justify-center gap-2 rounded bg-red-700 px-3 py-2 text-sm font-medium text-red-100 hover:bg-red-500"
              >
                <IoMdExit className="text-base" />
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/account/sign-up"
                className="flex items-center justify-center gap-2 rounded border border-blue-100 bg-blue-800 px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-600"
              >
                <RiUserFill className="text-base" />
                Cadastro
              </Link>

              <Link
                href="/account/sign-in"
                className="flex items-center justify-center gap-2 rounded border border-green-100 bg-green-800 px-3 py-2 text-sm font-medium text-green-100 hover:bg-green-600"
              >
                <IoMdExit className="text-base" />
                Login
              </Link>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 space-y-3 border-t border-gray-800 pt-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <Link
              href="/matches"
              className="flex w-full items-center justify-center rounded border border-gray-700 bg-black px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partidas
            </Link>
            {isLoggedIn && (
              <Link
                href="/guesses"
                className="flex w-full items-center justify-center rounded border border-gray-700 bg-black px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Palpites
              </Link>
            )}
            <Link
              href="/regulamento"
              className="flex w-full items-center justify-center rounded border border-gray-700 bg-black px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Regulamento
            </Link>
          </nav>

          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  href="/account/profile"
                  className="flex w-full items-center justify-center gap-2 rounded border border-gray-500 bg-black px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaRegUser className="text-base" />
                  Perfil
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded bg-red-700 px-3 py-2 text-sm font-medium text-red-100 hover:bg-red-500"
                >
                  <IoMdExit className="text-base" />
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/account/sign-up"
                  className="flex w-full items-center justify-center gap-2 rounded border border-blue-100 bg-blue-800 px-3 py-2 text-sm font-medium text-blue-100 hover:bg-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <RiUserFill className="text-base" />
                  Cadastro
                </Link>

                <Link
                  href="/account/sign-in"
                  className="flex w-full items-center justify-center gap-2 rounded border border-green-100 bg-green-800 px-3 py-2 text-sm font-medium text-green-100 hover:bg-green-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoMdExit className="text-base" />
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
