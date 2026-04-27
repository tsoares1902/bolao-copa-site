import {
  ListRankingResponse,
  RankingStats,
} from './ranking.types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

function getAuthHeaders(): HeadersInit {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null;

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function listRanking(): Promise<ListRankingResponse> {
  const response = await fetch(`${API_BASE_URL}/ranking`, {
    method: 'GET',
    headers: getAuthHeaders(),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar ranking.');
  }

  const data = await response.json();

  return {
    items: Array.isArray(data?.items) ? data.items : [],
  };
}

export function getRankingStats(
  ranking: ListRankingResponse,
  currentUserId?: string,
): RankingStats {
  const items = Array.isArray(ranking?.items) ? ranking.items : [];

  const currentUserRanking = currentUserId
    ? items.find((item) => item.user.id === currentUserId)
    : undefined;

  return {
    totalParticipants: items.length,
    leaderPoints: items[0]?.totalPoints ?? 0,
    userPosition: currentUserRanking?.position,
    userPoints: currentUserRanking?.totalPoints,
  };
}
