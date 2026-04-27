import { RankingItem } from '@/services/ranking/ranking.types';
import { RankingPositionBadge } from './RankingPositionBadge';

interface RankingTableProps {
  items: RankingItem[];
}

export function RankingTable({ items }: RankingTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-950 p-6 text-center">
        <p className="text-sm text-gray-300">
          Nenhum participante encontrado no ranking.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead className="bg-gray-900">
            <tr className="text-left text-sm text-gray-300">
              <th className="px-4 py-3">Posição</th>
              <th className="px-4 py-3">Participante</th>
              <th className="px-4 py-3 text-right">Pontos</th>
              <th className="px-4 py-3 text-right">Placar exato</th>
              <th className="px-4 py-3 text-right">Resultado</th>
              <th className="px-4 py-3 text-right">Parcial</th>
              <th className="px-4 py-3 text-right">Erros</th>
              <th className="px-4 py-3 text-right">Palpites</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.user.id}
                className="border-t border-gray-800 text-sm text-gray-300 transition hover:bg-gray-900/70"
              >
                <td className="px-4 py-3">
                  <RankingPositionBadge position={item.position} />
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {item.user.media?.avatarUrl ? (
                      <img
                        src={item.user.media.avatarUrl}
                        alt={item.user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-gray-100">
                        {item.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-gray-100">
                        {item.user.name}
                      </p>

                      {item.user.alias && (
                        <p className="text-xs text-gray-300">
                          @{item.user.alias}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3 text-right font-bold text-gray-100">
                  {item.totalPoints}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.exactScoreCount}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.correctResultCount}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.partialScoreCount}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.wrongCount}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.guessesCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
