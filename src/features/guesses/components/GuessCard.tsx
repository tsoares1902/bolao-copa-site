import { CiTimer } from 'react-icons/ci';
import { Match } from '@/services/match/match.types';
import { MdBlock } from 'react-icons/md';
import { SlClose } from 'react-icons/sl';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';
import { Guess } from '@/services/guess/guess.types';
import { GuessForm } from './GuessForm';

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
    <article className="matchInfo rounded-lg border border-gray-500 bg-black p-4">
      <div
        className={`matchStatus flex w-full items-start gap-2 rounded border px-3 py-2 ${statusConfig.className}`}
      >
        <StatusIcon className="mt-0.5 shrink-0 text-base" />
        <div className="text-sm">
          <span className="status font-bold uppercase">{statusConfig.message}</span>
        </div>
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

      <GuessForm matchId={match._id} guess={guess} onSaved={onSaved} />
    </article>
  );
}
