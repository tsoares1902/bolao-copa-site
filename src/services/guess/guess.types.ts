export type Guess = {
  _id: string;
  userId: string;
  matchId: string;
  guessedHomeScore: number;
  guessedAwayScore: number;
  pointsEarned: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateGuessRequest = {
  matchId: string;
  guessedHomeScore: number;
  guessedAwayScore: number;
};

export type UpdateGuessRequest = {
  guessedHomeScore?: number;
  guessedAwayScore?: number;
};
