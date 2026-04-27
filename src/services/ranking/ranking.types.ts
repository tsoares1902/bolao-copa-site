export interface RankingUserMedia {
  avatarUrl?: string;
}

export interface RankingUser {
  id: string;
  name: string;
  alias?: string;
  media?: RankingUserMedia;
}

export interface RankingItem {
  position: number;
  user: RankingUser;
  totalPoints: number;
  exactScoreCount: number;
  correctResultCount: number;
  partialScoreCount: number;
  wrongCount: number;
  guessesCount: number;
}

export interface ListRankingResponse {
  items: RankingItem[];
}

export interface RankingStats {
  totalParticipants: number;
  leaderPoints: number;
  userPosition?: number;
  userPoints?: number;
}
