'use client';

import { useEffect, useState } from 'react';
import { CiTimer } from 'react-icons/ci';
import { Match } from '@/services/match/match.types';
import { MdBlock } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';
import { Guess } from '@/services/guess/guess.types';
import { GuessForm } from './GuessForm';

type GuessCardVisualState = 'needs_guess' | 'has_guess' | 'locked_without_guess';

const GUESS_CARD_VISUALS: Record<
  GuessCardVisualState,
  {
    articleClassName: string;
    formVariant: 'default' | 'saved' | 'closed';
    isFormDisabled: boolean;
  }
> = {
  needs_guess: {
    articleClassName: 'matchInfo rounded-lg border border-white bg-gray-900 p-4',
    formVariant: 'default',
    isFormDisabled: false,
  },
  has_guess: {
    articleClassName: 'matchInfo rounded-lg border border-gray-800 bg-gray-900 p-4',
    formVariant: 'saved',
    isFormDisabled: false,
  },
  locked_without_guess: {
    articleClassName: 'matchInfo rounded-lg border border-red-800 bg-gray-900 p-4',
    formVariant: 'closed',
    isFormDisabled: true,
  },
};

type GuessCardProps = {
  match: Match;
  guess?: Guess;
  homeTeam?: Team;
  awayTeam?: Team;
  stadium?: Stadium;
  onSaved: () => void;
};

export function GuessCard({
  match,
  guess,
  homeTeam,
  awayTeam,
  stadium,
  onSaved,
}: GuessCardProps) {
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [savedMessage, setSavedMessage] = useState('Palpite salva com sucesso!');
  const isLocked = match.status === 'Live' || match.status === 'Finalizado';
  const matchDate = new Date(match.matchDate);
  const bettingDeadline = new Date(matchDate.getTime() - 60 * 60 * 1000);
  const bettingDeadlineDate = bettingDeadline.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });
  const bettingDeadlineTime = bettingDeadline.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const statusConfig =
    match.status === 'Agendado'
      ? {
          className: 'border-green-300 bg-green-100 text-green-900',
          icon: CiTimer,
          message: `Ativo até ${bettingDeadlineDate} as ${bettingDeadlineTime}`,
        }
      : match.status === 'Live'
        ? {
            className: 'border-green-300 bg-gray-300 text-gray-900',
            icon: MdBlock,
            message: 'Encerrado - A partida está em andamento',
          }
        : {
            className: 'border-red-300 bg-red-100 text-red-900',
            icon: SlClose,
            message: 'Encerrado - A partida foi finalizada',
        };

  const visualState: GuessCardVisualState = guess
    ? 'has_guess'
    : isLocked
      ? 'locked_without_guess'
      : 'needs_guess';
  const visualConfig = GUESS_CARD_VISUALS[visualState];
  const StatusIcon = statusConfig.icon;
  const articleStyle = stadium?.midia.photoUrl
    ? {
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.76), rgba(10, 10, 10, 0.82)), url(${stadium.midia.photoUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : undefined;

  useEffect(() => {
    if (!showSavedMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowSavedMessage(false);
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [showSavedMessage]);

  function handleSaved(mode: 'created' | 'updated') {
    const currentTime = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setSavedMessage(
      mode === 'updated'
        ? `Atualizado as ${currentTime}`
        : `Salva as ${currentTime}`,
    );
    setShowSavedMessage(true);
    onSaved();
  }

  return (
    <article className={visualConfig.articleClassName} style={articleStyle}>
      <div className="relative">
        <div
          className={`matchStatus flex w-full items-start gap-2 rounded border px-3 py-2 ${statusConfig.className}`}
        >
          <StatusIcon className="mt-0.5 shrink-0 text-base" />
          <div className="text-sm">
            <span className="status font-bold uppercase">{statusConfig.message}</span>
          </div>
        </div>
        {showSavedMessage && (
          <div className="absolute inset-0 flex w-full items-start gap-2 rounded border border-green-300 bg-green-100 px-3 py-2 text-green-900">
            <CiTimer className="mt-0.5 shrink-0 text-base" />
            <div className="text-sm">
              <span className="status font-bold uppercase">{savedMessage}</span>
            </div>
          </div>
        )}
      </div>
      <div className="text-center text-sm text-gray-500">
        <div className="location mt-3 text-center text-sm text-gray-100">
          <strong>{stadium?.name}</strong> - <strong>{stadium?.city}</strong>
        </div>
        <div className="date mt-3 text-center text-sm text-gray-100">
          <strong>{matchDate.toLocaleDateString('pt-BR')}</strong> - <strong>{matchDate.toLocaleTimeString('pt-BR')}</strong>
        </div>
      </div>

      <div className="infoScrore mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
        <div className="homeTeamInfo">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <strong className="homeTeamName text-right text-sm leading-none text-gray-100">
              {homeTeam?.name ?? match.homeTeamId}
            </strong>
            <span className="homeTeamFlag text-right text-2xl leading-none">
              {homeTeam?.flagEmoji}
            </span>
          </div>
        </div>

        <span className="font-bold leading-none text-gray-100">x</span>

        <div className="awayTeamInfo">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
            <span className="awayTeamFlag text-left text-2xl leading-none">
              {awayTeam?.flagEmoji}
            </span>
            <strong className="awayTeamName text-left text-sm leading-none text-gray-100">
              {awayTeam?.name ?? match.awayTeamId}
            </strong>
          </div>
        </div>
      </div>

      <GuessForm
        matchId={match._id}
        guess={guess}
        disabled={visualConfig.isFormDisabled}
        variant={visualConfig.formVariant}
        onSaved={handleSaved}
      />
    </article>
  );
}
