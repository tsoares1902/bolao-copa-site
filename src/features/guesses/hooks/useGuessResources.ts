'use client';

import { useEffect, useMemo, useState } from 'react';

import { listMyGuesses } from '@/services/guess/guess.api';
import { Guess } from '@/services/guess/guess.types';
import { useMatchResources } from '@/features/matches/hooks/useMatchResources';

export function useGuessResources() {
  const matchResources = useMatchResources();

  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [isLoadingGuesses, setIsLoadingGuesses] = useState(true);

  async function loadGuesses() {
    try {
      const data = await listMyGuesses();
      setGuesses(data);
    } finally {
      setIsLoadingGuesses(false);
    }
  }

  useEffect(() => {
    loadGuesses();
  }, []);

  const guessesByMatchId = useMemo(() => {
    return guesses.reduce<Record<string, Guess>>((acc, guess) => {
      acc[guess.matchId] = guess;
      return acc;
    }, {});
  }, [guesses]);

  return {
    ...matchResources,
    guesses,
    guessesByMatchId,
    reloadGuesses: loadGuesses,
    isLoading: matchResources.isLoading || isLoadingGuesses,
  };
}
