import { Match } from '@/services/match/match.types';
import { MatchRound } from '@/shared/constants/rounds';

export function groupGroupMatchesByRound(matches: Match[]) {
  const sortedMatches = [...matches].sort(
    (matchA, matchB) =>
      new Date(matchA.matchDate).getTime() - new Date(matchB.matchDate).getTime(),
  );

  return sortedMatches.reduce<Record<MatchRound, Match[]>>(
    (acc, match, index) => {
      if (index < 2) {
        acc['Rodada 1'].push(match);
      } else if (index < 4) {
        acc['Rodada 2'].push(match);
      } else {
        acc['Rodada 3'].push(match);
      }

      return acc;
    },
    {
      'Rodada 1': [],
      'Rodada 2': [],
      'Rodada 3': [],
    },
  );
}
