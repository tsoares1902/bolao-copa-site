import { api } from '@/services/http/api';
import { getCache, setCache } from '@/services/cache/cache-storage';
import { Stadium } from './stadium.types';

const STADIUMS_CACHE_KEY = 'bolao-copa:stadiums';

export async function listStadiums(): Promise<Stadium[]> {
  const cachedStadiums = getCache<Stadium[]>(STADIUMS_CACHE_KEY);

  if (cachedStadiums) {
    return cachedStadiums;
  }

  let stadiums: Stadium[];

  try {
    stadiums = await api.get<Stadium[]>('/stadium');
  } catch (error) {
    if (!(error instanceof Error) || !error.message.includes('status 404')) {
      throw error;
    }

    stadiums = await api.get<Stadium[]>('/stadium');
  }

  setCache(STADIUMS_CACHE_KEY, stadiums);

  return stadiums;
}
