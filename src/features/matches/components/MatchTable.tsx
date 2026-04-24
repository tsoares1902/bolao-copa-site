'use client';

import { useMemo, useState } from 'react';
import { MatchRound } from '@/shared/constants/rounds';
import { useMatchResources } from '@/features/matches/hooks/useMatchResources';
import { groupMatchesByGroup } from '@/features/matches/utils/group-matches-by-group';
import { groupMatchesByRound } from '@/features/matches/utils/group-matches-by-round';
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

  const [selectedRound, setSelectedRound] = useState<MatchRound>('Rodada 1');

  const matchesByRound = useMemo(() => {
    return groupMatchesByRound(matches);
  }, [matches]);

  const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

  const filteredMatches = useMemo(() => {
    if (!normalizedSearch) {
      return matchesByRound[selectedRound];
    }

    return matchesByRound[selectedRound].filter((match) => {
      const homeTeamName = teamsById[match.homeTeamId]?.name ?? '';
      const awayTeamName = teamsById[match.awayTeamId]?.name ?? '';
      const stadiumName = stadiumsById[match.stadiumId]?.name ?? '';
      const stadiumCity = stadiumsById[match.stadiumId]?.city ?? '';

      return [homeTeamName, awayTeamName, stadiumName, stadiumCity].some(
        (value) => value.toLocaleLowerCase('pt-BR').includes(normalizedSearch),
      );
    });
  }, [matchesByRound, normalizedSearch, selectedRound, stadiumsById, teamsById]);

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
    <div className="space-y-6">
      {visibleGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-gray-500">
          Nenhum jogo encontrado para {selectedRound}.
        </p>
      ) : (
        visibleGroups.map(([groupName, groupMatches]) => (
          <MatchGroupSection
            key={groupName}
            groupName={groupName}
            matches={groupMatches}
            teamsById={teamsById}
            stadiumsById={stadiumsById}
            selectedRound={selectedRound}
            onChangeRound={setSelectedRound}
          />
        ))
      )}
    </div>
  );
}
