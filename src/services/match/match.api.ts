import { api } from '@/services/http/api';
import { Match } from './match.types';

export async function listMatches(): Promise<Match[]> {
  return api.get<Match[]>('/match');
}
