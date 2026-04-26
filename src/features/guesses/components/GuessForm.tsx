'use client';

import { FormEvent, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';
import { FaRankingStar } from 'react-icons/fa6';

import {
  createGuess,
  updateGuess,
} from '@/services/guess/guess.api';
import { Guess } from '@/services/guess/guess.types';
import { GuessScoreInput } from './GuessScoreInput';

type GuessFormProps = {
  matchId: string;
  guess?: Guess;
  onSaved: () => void;
};

export function GuessForm({ matchId, guess, onSaved }: GuessFormProps) {
  const [homeScore, setHomeScore] = useState(guess?.guessedHomeScore ?? 0);
  const [awayScore, setAwayScore] = useState(guess?.guessedAwayScore ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      if (guess) {
        await updateGuess(guess._id, {
          guessedHomeScore: homeScore,
          guessedAwayScore: awayScore,
        });
      } else {
        await createGuess({
          matchId,
          guessedHomeScore: homeScore,
          guessedAwayScore: awayScore,
        });
      }

      onSaved();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <GuessScoreInput value={homeScore} onChange={setHomeScore} />
        <span className="font-bold leading-none text-gray-100">x</span>
        <GuessScoreInput value={awayScore} onChange={setAwayScore} />
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded border border-green-100 bg-green-800 px-3 py-2 text-sm font-bold text-green-100 hover:bg-green-600 disabled:opacity-60"
        >
          <FaRegSave className="shrink-0 text-base" />
          <span>{guess ? 'Atualizar' : 'Salvar'}</span>
        </button>

        <button
          type="button"
          disabled
          className="flex items-center justify-center gap-2 rounded border border-blue-100 bg-blue-800 px-3 py-2 text-sm font-bold text-blue-100 hover:bg-blue-600 disabled:opacity-100"
        >
          <FaRankingStar className="shrink-0 text-base" />
          <span>Pontos</span>
        </button>
      </div>
    </form>
  );
}
