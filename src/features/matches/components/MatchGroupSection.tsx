import { Match } from '@/services/match/match.types';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';
import { MatchRound } from '@/shared/constants/rounds';
import { MatchCard } from './MatchCard';
import { MatchRoundTabs } from './MatchRoundTabs';

type MatchGroupSectionProps = {
  groupName: string;
  matches: Match[];
  teamsById: Record<string, Team>;
  stadiumsById: Record<string, Stadium>;
  selectedRound: MatchRound;
  onChangeRound: (round: MatchRound) => void;
};

export function MatchGroupSection({
  groupName,
  matches,
  teamsById,
  stadiumsById,
  selectedRound,
  onChangeRound,
}: MatchGroupSectionProps) {
  return (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="text-xl font-semibold uppercase text-center">{groupName}</h2>
      <div className="matchRound mt-4">
        <MatchRoundTabs
          selectedRound={selectedRound}
          onChangeRound={onChangeRound}
        />
      </div>
      <div className="mt-4 grid gap-3">
        {matches.map((match) => (
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
