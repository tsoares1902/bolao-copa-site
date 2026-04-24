import { Match } from '@/services/match/match.types';

export function groupMatchesByGroup(matches: Match[]) {
  return matches.reduce<Record<string, Match[]>>((acc, match) => {
    const groupName = match.groupName ?? 'Sem grupo';

    if (!acc[groupName]) {
      acc[groupName] = [];
    }

    acc[groupName].push(match);

    return acc;
  }, {});
}
