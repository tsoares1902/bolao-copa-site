'use client';

import { useState } from 'react';
import { MatchTable } from '@/features/matches/components/MatchTable';

export default function MatchesPage() {
  const [search, setSearch] = useState('');

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-center">TABELA DE JOGOS COPA 2026</h1>
      <form>
        <input
          className="search mb-4 w-full rounded border border-gray-300 p-2"
          type="text"
          placeholder="Brasil, Met Life, Nova York..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
      <MatchTable search={search} />
    </div>
  );
}
