'use client';

import { MATCH_ROUNDS, MatchRound } from '@/shared/constants/rounds';

type MatchRoundTabsProps = {
  selectedRound: MatchRound;
  onChangeRound: (round: MatchRound) => void;
};

export function MatchRoundTabs({
  selectedRound,
  onChangeRound,
}: MatchRoundTabsProps) {
  return (
    <div className="matchRound flex w-full justify-center gap-2">
      {MATCH_ROUNDS.map((round) => (
        <button
          key={round}
          type="button"
          onClick={() => onChangeRound(round)}
          className={
            selectedRound === round
              ? 'cursor-pointer rounded-md border border-gray-500 bg-gray-300 px-3 py-2 text-gray-500 hover:bg-gray-200'
              : 'cursor-pointer rounded-md border border-gray-500 bg-white px-3 py-2 text-gray-500 hover:bg-gray-200'
          }
        >
          {round}
        </button>
      ))}
    </div>
  );
}
