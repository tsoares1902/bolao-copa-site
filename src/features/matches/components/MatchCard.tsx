import { CiTimer } from 'react-icons/ci';
import { GiCoinflip } from 'react-icons/gi';
import { Match } from '@/services/match/match.types';
import { MdBlock } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';
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
          message: `Ativo - Aposte ate dia ${bettingDeadlineDate} as ${bettingDeadlineTime}.`,
        }
      : match.status === 'Live'
        ? {
            className: 'border-green-300 bg-gray-300 text-gray-900',
            icon: MdBlock,
            message: 'Live - A partida esta em andamento',
          }
        : {
            className: 'border-red-300 bg-red-100 text-red-900',
            icon: SlClose,
            message: 'Finalizado - As apostas para este jogo se encerraram.',
          };

  const StatusIcon = statusConfig.icon;

  return (
    <article className="matchInfo rounded-lg bg-gray-100 p-4">
      <div
        className={`matchStatus flex w-full items-start gap-2 rounded border px-3 py-2 ${statusConfig.className}`}
      >
        <StatusIcon className="mt-0.5 shrink-0 text-base" />
        <div className="text-sm">
          <span className="status font-bold uppercase">{statusConfig.message}</span>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500">
        <div className="location mt-3 text-center text-sm text-gray-500">
          <strong>{stadium?.name}</strong> - <strong>{stadium?.city}</strong>
        </div>
        <div className="date mt-3 text-center text-sm text-gray-500">
          <strong>{matchDate.toLocaleDateString('pt-BR')}</strong> - <strong>{matchDate.toLocaleTimeString('pt-BR')}</strong>
        </div>
      </div>

      <div className="infoScrore mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
        <div className="homeTeamInfo">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
            <strong className="homeTeamName text-left text-sm leading-none">
              {homeTeam?.name ?? match.homeTeamId}
            </strong>
            <span className="homeTeamFlag text-right text-2xl leading-none">
              {homeTeam?.flagEmoji}
            </span>
          </div>
        </div>

        <div className="scores flex items-center justify-center gap-2">
          <input
              type="text"
              className="resultHomeTeam h-10 w-10 rounded border border-gray-300 text-center text-sm leading-none"
              placeholder="0"
              disabled
            />
          <span className="font-bold leading-none">x</span>
          <input
              type="text"
              className="resultAwayTeam h-10 w-10 rounded border border-gray-300 text-center text-sm leading-none"
              placeholder="0"
              disabled
            />
        </div>

        <div className="awayTeamInfo">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
            <span className="awayTeamFlag text-left text-2xl leading-none">
              {awayTeam?.flagEmoji}
            </span>
            <strong className="awayTeamName text-right text-sm leading-none">
              {awayTeam?.name ?? match.awayTeamId}
            </strong>
          </div>
        </div>
      </div>

      <button className="guessButton mt-4 flex w-full items-center justify-start gap-2 rounded border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 hover:bg-gray-200">
        <GiCoinflip className="shrink-0 text-base" />
        <span>
          Apostar {homeTeam?.name ?? match.homeTeamId} x {awayTeam?.name ?? match.awayTeamId}
        </span>
      </button>
    </article>
  );
}
