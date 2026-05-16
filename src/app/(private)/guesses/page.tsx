'use client';

import { useState } from 'react';

import { SearchBar } from '@/components/form/SearchBar';
import { GuessTable } from '@/features/guesses/components/GuessTable';

export default function GuessesPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-black">
      <div className="px-4 pt-6 md:px-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-300">
          PALPITES
        </h1>
        <form className="space-y-6">
          <SearchBar
            id="guesses-search-title"
            value={search}
            onChange={setSearch}
            placeholder="Brasil, Met Life, Nova York..."
          />

          <div className="border-t border-gray-700" />
        </form>
        <GuessTable search={search} />
      </div>
    </div>
  );
}
