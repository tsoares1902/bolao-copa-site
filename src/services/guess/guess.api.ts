import { api } from '@/services/http/api';
import { CreateGuessRequest, Guess, UpdateGuessRequest } from './guess.types';

export async function createGuess(input: CreateGuessRequest): Promise<Guess> {
  return api.post<Guess, CreateGuessRequest>('/guess', input);
}

export async function listMyGuesses(): Promise<Guess[]> {
  return api.get<Guess[]>('/guess/me');
}

export async function updateGuess(
  guessId: string,
  input: UpdateGuessRequest,
): Promise<Guess> {
  return api.patch<Guess, UpdateGuessRequest>(`/guess/${guessId}`, input);
}

export async function deleteGuess(guessId: string): Promise<void> {
  return api.delete<void>(`/guess/${guessId}`);
}
