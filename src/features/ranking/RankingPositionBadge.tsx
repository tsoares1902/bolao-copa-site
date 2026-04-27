interface RankingPositionBadgeProps {
  position: number;
}

export function RankingPositionBadge({
  position,
}: RankingPositionBadgeProps) {
  const label =
    position === 1
      ? '🥇'
      : position === 2
        ? '🥈'
        : position === 3
          ? '🥉'
          : `${position}º`;

  return (
    <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-gray-700 bg-gray-900 px-2 text-sm font-bold text-gray-100">
      {label}
    </span>
  );
}
