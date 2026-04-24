import { Match } from '@/services/match/match.types';
import { MatchRound } from '@/shared/constants/rounds';

export function getMatchRound(match: Match): MatchRound {
  const date = new Date(match.matchDate);
  const day = date.getUTCDate();

  if (day <= 17) {
    return 'Rodada 1';
  }

  if (day <= 23) {
    return 'Rodada 2';
  }

  return 'Rodada 3';
}
