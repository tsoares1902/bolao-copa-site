export type MatchGroup =
  | 'Grupo A'
  | 'Grupo B'
  | 'Grupo C'
  | 'Grupo D'
  | 'Grupo E'
  | 'Grupo F'
  | 'Grupo G'
  | 'Grupo H'
  | 'Grupo I'
  | 'Grupo J'
  | 'Grupo K'
  | 'Grupo L';

export type MatchPhase =
  | 'Fase de Grupos'
  | 'Segunda Fase'
  | 'Oitavas de Final'
  | 'Quartas de Final'
  | 'Semifinal'
  | 'Final';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type Match = {
  _id: string;
  homeTeamId: string;
  awayTeamId: string;
  stadiumId: string;
  matchDate: string;
  phase: MatchPhase;
  groupName?: MatchGroup;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  status: MatchStatus;
};
