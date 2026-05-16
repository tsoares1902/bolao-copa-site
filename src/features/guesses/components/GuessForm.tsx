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
          variant={isClosed ? 'closed' : isSaved ? 'saved' : 'default'}
        />
        <span className="font-bold leading-none text-gray-100">x</span>
        <GuessScoreInput
          value={awayScore}
          onChange={setAwayScore}
          disabled={disabled}
          variant={isClosed ? 'closed' : isSaved ? 'saved' : 'default'}
        />
      </div>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-100 ${
            isClosed
              ? 'border border-red-800 bg-green-900 text-green-100'
              : isSaved
                ? 'border border-blue-100 bg-blue-900 text-blue-100 hover:bg-blue-800'
                : 'border border-white bg-green-900 text-green-100 hover:bg-green-800'
          }`}
        >
          <FaRegSave className="shrink-0 text-base" />
          <span>{guess ? 'Atualizar' : 'Salvar'}</span>
        </button>
      </div>
    </form>
  );
}
