'use client';

import { useMemo } from 'react';
import { useMatchResources } from '@/features/matches/hooks/useMatchResources';
import { groupMatchesByGroup } from '@/features/matches/utils/group-matches-by-group';
import { MatchGroupSection } from '@/features/matches/components/MatchGroupSection';

type MatchTableProps = {
  search?: string;
};

export function MatchTable({ search = '' }: MatchTableProps) {
  const {
    matches,
    teamsById,
    stadiumsById,
    isLoading,
  } = useMatchResources();

  const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

  const filteredMatches = useMemo(() => {
    if (!normalizedSearch) {
      return matches;
    }

    return matches.filter((match) => {
      const homeTeamName = teamsById[match.homeTeamId]?.name ?? '';
      const awayTeamName = teamsById[match.awayTeamId]?.name ?? '';
      const stadiumName = stadiumsById[match.stadiumId]?.name ?? '';
      const stadiumCity = stadiumsById[match.stadiumId]?.city ?? '';

      return [homeTeamName, awayTeamName, stadiumName, stadiumCity].some(
        (value) => value.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
      );
    });
  }, [matches, normalizedSearch, stadiumsById, teamsById]);

  const matchesByGroup = useMemo(() => {
    return groupMatchesByGroup(filteredMatches);
  }, [filteredMatches]);

  const visibleGroups = useMemo(() => {
    return Object.entries(matchesByGroup)
      .filter(([, groupMatches]) => groupMatches.length > 0)
      .sort(([groupA], [groupB]) => groupA.localeCompare(groupB, 'pt-BR'));
  }, [matchesByGroup]);

  if (isLoading) {
    return <p>Carregando jogos...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-4 pb-6 md:grid-cols-2 md:px-6 lg:grid-cols-3">
      {visibleGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-gray-500 md:col-span-2 lg:col-span-3">
          Nenhum jogo encontrado.
        </p>
      ) : (
        visibleGroups.map(([groupName, groupMatches]) => (
          <MatchGroupSection
            key={groupName}
            groupName={groupName}
            matches={groupMatches}
            teamsById={teamsById}
            stadiumsById={stadiumsById}
          />
        ))
      )}
    </div>
  );
}
