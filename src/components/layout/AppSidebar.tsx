'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getAccessToken } from '@/services/http/token-storage';

export function AppSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Boolean(getAccessToken()));
  }, []);

  return (
    <aside className="w-64 border-r p-6">
      <nav className="flex flex-col gap-4">
        <Link href="/matches">Tabela de Jogos</Link>
        {isLoggedIn && <Link href="/guesses">Meus Palpites</Link>}
        <Link href="/ranking">Ranking</Link>
        <Link href="/profile">Meu Perfil</Link>
      </nav>
    </aside>
  );
}
