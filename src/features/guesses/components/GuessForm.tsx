'use client';

import { FormEvent, useState } from 'react';
import { FaRegSave } from 'react-icons/fa';

import {
  createGuess,
  updateGuess,
} from '@/services/guess/guess.api';
import { Guess } from '@/services/guess/guess.types';
import { GuessScoreInput } from './GuessScoreInput';

type GuessFormProps = {
  matchId: string;
  guess?: Guess;
  disabled?: boolean;
  variant?: 'default' | 'saved' | 'closed';
  onSaved: (mode: 'created' | 'updated') => void;
};

export function GuessForm({
  matchId,
  guess,
  disabled = false,
  variant = 'default',
  onSaved,
}: GuessFormProps) {
  const [homeScore, setHomeScore] = useState(guess?.guessedHomeScore ?? 0);
  const [awayScore, setAwayScore] = useState(guess?.guessedAwayScore ?? 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isClosed = variant === 'closed';
  const isSaved = variant === 'saved';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (disabled || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (guess) {
        await updateGuess(guess._id, {
          guessedHomeScore: homeScore,
          guessedAwayScore: awayScore,
        });
        onSaved('updated');
      } else {
        await createGuess({
          matchId,
          guessedHomeScore: homeScore,
          guessedAwayScore: awayScore,
        });
        onSaved('created');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="flex items-center justify-center gap-3">
        <GuessScoreInput
          value={homeScore}
          onChange={setHomeScore}
          disabled={disabled}
          variant={isClosed ? 'closed' : 'default'}
        />
        <span className="font-bold leading-none text-gray-100">x</span>
        <GuessScoreInput
          value={awayScore}
          onChange={setAwayScore}
          disabled={disabled}
          variant={isClosed ? 'closed' : 'default'}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className={`flex items-center justify-center gap-2 rounded px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-100 ${
            isClosed
              ? 'border border-gray-100 bg-red-900 text-gray-100'
              : isSaved
                ? 'border border-green-300 bg-green-100 text-green-900 hover:bg-green-200'
                : 'border border-green-100 bg-green-800 text-green-100 hover:bg-green-600'
          }`}
        >
          <FaRegSave className="shrink-0 text-base" />
          <span>{guess ? 'Atualizar' : 'Salvar'}</span>
        </button>
      </div>
    </form>
  );
}
