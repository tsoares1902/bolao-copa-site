'use client';

import { useMemo } from 'react';

import { groupMatchesByGroup } from '@/features/matches/utils/group-matches-by-group';

import { useGuessResources } from '../hooks/useGuessResources';
import { GuessGroupSection } from './GuessGroupSection';

export function GuessTable() {
  const {
    matches,
    teamsById,
    stadiumsById,
    guessesByMatchId,
    reloadGuesses,
    isLoading,
  } = useGuessResources();

  const matchesByGroup = useMemo(() => {
    return groupMatchesByGroup(matches);
  }, [matches]);

  const visibleGroups = useMemo(() => {
    return Object.entries(matchesByGroup)
      .filter(([, groupMatches]) => groupMatches.length > 0)
      .sort(([groupA], [groupB]) => groupA.localeCompare(groupB, 'pt-BR'));
  }, [matchesByGroup]);

  if (isLoading) {
    return <p>Carregando palpites...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-4 pb-6 md:grid-cols-2 md:px-6 lg:grid-cols-3">
      {visibleGroups.length === 0 ? (
        <p className="rounded-lg border border-dashed p-4 text-sm text-gray-500 md:col-span-2 lg:col-span-3">
          Nenhum palpite encontrado.
        </p>
      ) : (
        visibleGroups.map(([groupName, groupMatches]) => (
          <GuessGroupSection
            key={groupName}
            groupName={groupName}
            matches={groupMatches}
            guessesByMatchId={guessesByMatchId}
            teamsById={teamsById}
            stadiumsById={stadiumsById}
            onSaved={reloadGuesses}
          />
        ))
      )}
    </div>
  );
}
