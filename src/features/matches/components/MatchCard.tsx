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

  return (
    <article className="matchInfo rounded-lg border border-gray-500 bg-black p-4">
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
            <strong className="homeTeamName text-right text-gray-100 text-sm leading-none">
              {homeTeam?.name ?? match.homeTeamId}
            </strong>
            <span className="homeTeamFlag text-right text-2xl leading-none">
              <a href="" title={homeTeam?.name}>{homeTeam?.flagEmoji}</a>
            </span>
          </div>
        </div>

        <div className="scores flex items-center justify-center gap-2">
          <span className="font-bold leading-none text-gray-100">x</span>
        </div>

        <div className="awayTeamInfo">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
            <span className="awayTeamFlag text-left text-2xl leading-none">
              <a href="" title={awayTeam?.name}>{awayTeam?.flagEmoji}</a>
            </span>
            <strong className="awayTeamName text-left text-gray-100 text-sm leading-none">
              {awayTeam?.name ?? match.awayTeamId}
            </strong>
          </div>
        </div>
      </div>
    </article>
  );
}
