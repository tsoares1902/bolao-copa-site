interface RankingStatsCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function RankingStatsCard({
  title,
  value,
  description,
}: RankingStatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4 shadow-sm">
      <p className="text-sm text-gray-300">{title}</p>

      <strong className="mt-2 block text-2xl font-bold text-gray-100">
        {value}
      </strong>

      {description && (
        <p className="mt-1 text-sm text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
}
