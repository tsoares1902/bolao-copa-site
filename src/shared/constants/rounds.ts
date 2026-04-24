export const MATCH_ROUNDS = ['Rodada 1', 'Rodada 2', 'Rodada 3'] as const;

export type MatchRound = (typeof MATCH_ROUNDS)[number];
