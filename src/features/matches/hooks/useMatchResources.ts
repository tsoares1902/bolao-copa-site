'use client';

import { useEffect, useMemo, useState } from 'react';
import { listMatches } from '@/services/match/match.api';
import { Match } from '@/services/match/match.types';
import { listTeams } from '@/services/team/team.api';
import { Team } from '@/services/team/team.types';
import { listStadiums } from '@/services/stadium/stadium.api';
import { Stadium } from '@/services/stadium/stadium.types';

export function useMatchResources() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [stadiums, setStadiums] = useState<Stadium[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const [matchesData, teamsData, stadiumsData] = await Promise.all([
          listMatches(),
          listTeams(),
          listStadiums(),
        ]);

        setMatches(matchesData);
        setTeams(teamsData);
        setStadiums(stadiumsData);
      } finally {
        setIsLoading(false);
      }
    }

    loadResources();
  }, []);

  const teamsById = useMemo(() => {
    return teams.reduce<Record<string, Team>>((acc, team) => {
      acc[team._id] = team;
      return acc;
    }, {});
  }, [teams]);

  const stadiumsById = useMemo(() => {
    return stadiums.reduce<Record<string, Stadium>>((acc, stadium) => {
      acc[stadium._id] = stadium;
      return acc;
    }, {});
  }, [stadiums]);

  return {
    matches,
    teams,
    stadiums,
    teamsById,
    stadiumsById,
    isLoading,
  };
}
