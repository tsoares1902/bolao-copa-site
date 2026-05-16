import { Guess } from '@/services/guess/guess.types';
import { Match } from '@/services/match/match.types';
import { Stadium } from '@/services/stadium/stadium.types';
import { Team } from '@/services/team/team.types';
import { MATCH_ROUNDS } from '@/shared/constants/rounds';
import { groupMatchesByRound } from '@/features/matches/utils/group-matches-by-round';
import { GuessCard } from './GuessCard';

type GuessGroupSectionProps = {
  groupName: string;
  matches: Match[];
  guessesByMatchId: Record<string, Guess>;
  teamsById: Record<string, Team>;
  stadiumsById: Record<string, Stadium>;
  onSaved: () => void;
};

export function GuessGroupSection({
  groupName,
  matches,
  guessesByMatchId,
  teamsById,
  stadiumsById,
  onSaved,
}: GuessGroupSectionProps) {
  const matchesByRound = groupMatchesByRound(matches);

  return (
    <section className="rounded-lg border border-gray-500 bg-black p-4">
      <h2 className="text-xl font-semibold uppercase text-center text-gray-300">{groupName}</h2>
      <div className="mt-4 space-y-6">
        {MATCH_ROUNDS.map((round) => {
          const roundMatches = matchesByRound[round];

          if (roundMatches.length === 0) {
            return null;
          }

          return (
            <div key={round} className="space-y-3">
              <div className="grid gap-3">
                {roundMatches.map((match) => (
                  <GuessCard
                    key={match._id}
                    match={match}
                    guess={guessesByMatchId[match._id]}
                    homeTeam={teamsById[match.homeTeamId]}
                    awayTeam={teamsById[match.awayTeamId]}
                    stadium={stadiumsById[match.stadiumId]}
                    onSaved={onSaved}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
