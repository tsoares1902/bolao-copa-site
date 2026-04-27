'use client';

import { useEffect, useMemo, useState } from 'react';
import { listRanking, getRankingStats } from '@/services/ranking/ranking.api';
import { ListRankingResponse } from '@/services/ranking/ranking.types';
import { RankingStatsCard } from './RankingStatsCard';
import { RankingTable } from './RankingTable';

export function RankingPageContent() {
  const [ranking, setRanking] = useState<ListRankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function loadRanking() {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const data = await listRanking();

      setRanking(data);
    } catch {
      setErrorMessage('Não foi possível carregar o ranking!');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRanking();
  }, []);

  const stats = useMemo(() => {
    if (!ranking) {
      return null;
    }

    const currentUserId =
      typeof window !== 'undefined'
        ? localStorage.getItem('userId') ?? undefined
        : undefined;

    return getRankingStats(ranking, currentUserId);
  }, [ranking]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black p-6 text-gray-300">
        <p className="text-sm text-gray-300">Carregando ranking...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-black p-6 text-gray-300">
        <h1 className="text-2xl font-bold text-gray-100">Ranking</h1>

        <div className="mt-4 rounded-lg border border-red-900 bg-red-950/40 p-4">
          <p className="text-sm text-red-300">{errorMessage}</p>

          <button
            type="button"
            onClick={loadRanking}
            className="mt-3 rounded-md bg-red-700 px-4 py-2 text-sm font-medium text-red-50 transition hover:bg-red-600"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-6 bg-black p-6 text-gray-300">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Ranking</h1>
      </div>
      {stats && (
        <div className="grid gap-4 md:grid-cols-3">
          <RankingStatsCard
            title="Participantes"
            value={stats.totalParticipants}
          />

          <RankingStatsCard
            title="Pontuação do líder"
            value={stats.leaderPoints}
          />

          <RankingStatsCard
            title="Sua posição"
            value={
              stats.userPosition
                ? `${stats.userPosition}º`
                : '-'
            }
            description={
              stats.userPoints !== undefined
                ? `${stats.userPoints} pontos`
                : 'Usuário não encontrado no ranking'
            }
          />
        </div>
      )}

      <RankingTable items={ranking?.items ?? []} />
    </main>
  );
}
