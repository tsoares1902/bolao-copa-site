import { useMemo, useState } from 'react';
import { Match } from '@/services/match/match.types';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';
import { MatchRound } from '@/shared/constants/rounds';
import { groupGroupMatchesByRound } from '@/features/matches/utils/group-group-matches-by-round';
import { MatchCard } from './MatchCard';
import { MatchRoundTabs } from './MatchRoundTabs';

type MatchGroupSectionProps = {
  groupName: string;
  matches: Match[];
  teamsById: Record<string, Team>;
  stadiumsById: Record<string, Stadium>;
};

export function MatchGroupSection({
  groupName,
  matches,
  teamsById,
  stadiumsById,
}: MatchGroupSectionProps) {
  const [selectedRound, setSelectedRound] = useState<MatchRound>('Rodada 1');

  const matchesByRound = useMemo(() => {
    return groupGroupMatchesByRound(matches);
  }, [matches]);

  return (
    <section className="rounded-lg border border-gray-700 bg-black p-4">
      <h2 className="text-xl font-semibold uppercase text-center text-gray-300">{groupName}</h2>
      <div className="matchRound mt-4">
        <MatchRoundTabs
          selectedRound={selectedRound}
          onChangeRound={setSelectedRound}
        />
      </div>
      <div className="mt-4 grid gap-3">
        {matchesByRound[selectedRound].map((match) => (
          <MatchCard
            key={match._id}
            match={match}
            homeTeam={teamsById[match.homeTeamId]}
            awayTeam={teamsById[match.awayTeamId]}
            stadium={stadiumsById[match.stadiumId]}
          />
        ))}
      </div>
    </section>
  );
}
