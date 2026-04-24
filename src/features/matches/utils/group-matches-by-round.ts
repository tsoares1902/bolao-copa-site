import { Match } from '@/services/match/match.types';
import { MatchRound } from '@/shared/constants/rounds';
import { getMatchRound } from './get-match-round';

export function groupMatchesByRound(matches: Match[]) {
  return matches.reduce<Record<MatchRound, Match[]>>(
    (acc, match) => {
      const round = getMatchRound(match);

      acc[round].push(match);

      return acc;
    },
    {
      'Rodada 1': [],
      'Rodada 2': [],
      'Rodada 3': [],
    },
  );
}
