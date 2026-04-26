'use client';

import { useState } from 'react';

import { MatchTable } from '@/features/matches/components/MatchTable';
import { CiSearch } from 'react-icons/ci';


export default function MatchesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="bg-black">
      <div className="px-4 pt-6 md:px-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-300">
          TABELA DE JOGOS
        </h1>
        <form className="space-y-6">
          <div className="flex overflow-hidden rounded-xs border border-gray-200 bg-white focus-within:border-blue-900">
            <span className="flex items-center border-r border-gray-200 bg-gray-50 px-4 py-3 text-body-color">
              <CiSearch className="text-xl" />
            </span>
            <input
              id="jobs-search-title"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full px-4 py-3 text-sm text-black outline-none transition-colors placeholder:text-gray-400 placeholder:uppercase"
              placeholder="Brasil, Met Life, Nova York..."
            />
          </div>

          <div className="border-body-color/15 border-t" />
        </form>
      </div>
      <MatchTable search={search} />
    </div>
  );
}

