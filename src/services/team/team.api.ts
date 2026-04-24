import { api } from '@/services/http/api';
import { getCache, setCache } from '@/services/cache/cache-storage';
import { Team } from './team.types';

const TEAMS_CACHE_KEY = 'bolao-copa:teams';

export async function listTeams(): Promise<Team[]> {
  const cachedTeams = getCache<Team[]>(TEAMS_CACHE_KEY);

  if (cachedTeams) {
    return cachedTeams;
  }

  let teams: Team[];

  try {
    teams = await api.get<Team[]>('/team');
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('status 404')) {
      throw error;
    }

    teams = await api.get<Team[]>('/team');
  }

  setCache(TEAMS_CACHE_KEY, teams);

  return teams;
}
