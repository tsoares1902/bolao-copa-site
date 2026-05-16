'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdOutlineStadium } from 'react-icons/md';
import { GuessScoreInput } from '@/features/guesses/components/GuessScoreInput';
import { Match } from '@/services/match/match.types';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';

type MatchCardProps = {
  match: Match;
  homeTeam?: Team;
  awayTeam?: Team;
  stadium?: Stadium;
};

export function MatchCard({
  match,
  homeTeam,
  awayTeam,
  stadium,
}: MatchCardProps) {
  const [isStadiumModalOpen, setIsStadiumModalOpen] = useState(false);
  const [homeScore, setHomeScore] = useState(match.homeTeamScore ?? 0);
  const [awayScore, setAwayScore] = useState(match.awayTeamScore ?? 0);
  const matchDate = new Date(match.matchDate);
  const articleStyle = stadium?.midia.photoUrl
    ? {
        backgroundImage: `linear-gradient(rgba(10, 10, 10, 0.76), rgba(10, 10, 10, 0.82)), url(${stadium.midia.photoUrl})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : undefined;

  return (
    <article
      className="matchInfo rounded-lg border border-gray-500 bg-black p-4"
      style={articleStyle}
    >
      <div className="w-full text-center text-sm text-gray-500">
        <div className="location mt-3 w-full text-center text-sm text-gray-100">
          <strong>{stadium?.name}</strong> - <strong>{stadium?.city}</strong>
        </div>
        <div className="date mt-3 w-full text-center text-sm text-gray-100">
          <strong>{matchDate.toLocaleDateString('pt-BR')}</strong> - <strong>{matchDate.toLocaleTimeString('pt-BR')}</strong>
        </div>
      </div>

      <div className="infoScrore mt-4 space-y-3">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-2">
          <strong className="homeTeamName w-full text-right text-sm leading-snug text-gray-100">
            {homeTeam?.name ?? match.homeTeamId}
          </strong>
          <span className="text-center text-sm font-bold leading-snug text-gray-100">
            x
          </span>
          <strong className="awayTeamName w-full text-left text-sm leading-snug text-gray-100">
            {awayTeam?.name ?? match.awayTeamId}
          </strong>
        </div>

        <div className="grid grid-cols-[auto_auto_auto_auto_auto] items-center justify-center gap-2">
          <span className="homeTeamFlag mr-2 text-left text-2xl leading-none">
            {homeTeam?.flagEmoji}
          </span>
          <div className="flex justify-end">
            <GuessScoreInput
              value={homeScore}
              onChange={setHomeScore}
              disabled
              hideControls
            />
          </div>
          <span className="text-center text-lg font-bold leading-none text-gray-100">
            -
          </span>
          <div className="flex justify-start">
            <GuessScoreInput
              value={awayScore}
              onChange={setAwayScore}
              disabled
              hideControls
            />
          </div>
          <span className="awayTeamFlag ml-2 text-right text-2xl leading-none">
            {awayTeam?.flagEmoji}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIsStadiumModalOpen(true)}
          disabled={!stadium}
          className="flex cursor-pointer items-center justify-start gap-2 rounded border border-white/70 bg-black/60 px-3 py-2 text-sm font-bold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <MdOutlineStadium className="shrink-0 text-lg" />
          <span>{stadium ? 'Estadio' : 'Indisponivel'}</span>
        </button>

        <Link
          href="/guesses"
          className="flex cursor-pointer items-center justify-start gap-2 rounded border border-white/70 bg-black/60 px-3 py-2 text-sm font-bold text-white transition hover:bg-gray-700"
        >
          <FaCoins className="shrink-0 text-base" />
          <span>Palpites</span>
        </Link>
      </div>

      {isStadiumModalOpen && stadium && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-gray-700 bg-black">
            <div className="flex items-start justify-between gap-4 p-4 text-white">
              <h3 className="text-3xl font-black tracking-wide">{stadium.name}</h3>
              <button
                type="button"
                onClick={() => setIsStadiumModalOpen(false)}
                className="shrink-0 text-white transition hover:text-gray-300"
                aria-label="Fechar modal do estadio"
              >
                <IoMdClose className="text-3xl" />
              </button>
            </div>
            <div
              className="h-72 w-full bg-cover bg-center md:h-96"
              style={{ backgroundImage: `url(${stadium.midia.photoUrl})` }}
            />
            <div className="space-y-3 p-4 text-white">
              <p className="text-xl font-semibold text-white">{stadium.city}</p>
              <p className="text-sm text-gray-300">
                Capacidade: {stadium.capacity?.toLocaleString('pt-BR') ?? 'Nao informada'}
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsStadiumModalOpen(false)}
                  className="flex items-center justify-start gap-2 rounded border border-white px-3 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-black"
                >
                  <IoMdClose className="text-lg" />
                  <span>Fechar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
