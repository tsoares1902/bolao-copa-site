import { api } from '@/services/http/api';
import { getCache, setCache } from '@/services/cache/cache-storage';
import { Match } from './match.types';

const MATCHES_CACHE_KEY = 'bolao-copa:matches';
const MATCHES_CACHE_TTL = 1000 * 60 * 30; // 30 minutos

export async function listMatches(): Promise<Match[]> {
  const cachedMatches = getCache<Match[]>(MATCHES_CACHE_KEY);

  if (cachedMatches) {
    return cachedMatches;
  }

  const matches = await api.get<Match[]>('/match');

  setCache(MATCHES_CACHE_KEY, matches, MATCHES_CACHE_TTL);

  return matches;
}
