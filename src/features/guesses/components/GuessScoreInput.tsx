import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type GuessScoreInputProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  variant?: 'default' | 'saved' | 'closed';
};

export function GuessScoreInput({
  value,
  onChange,
  disabled = false,
  variant = 'default',
}: GuessScoreInputProps) {
  function handleDecrement() {
    if (disabled) {
      return;
    }

    onChange(Math.max(0, value - 1));
  }

  function handleIncrement() {
    if (disabled) {
      return;
    }

    onChange(value + 1);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled}
        className="text-white transition hover:text-gray-200 disabled:cursor-not-allowed disabled:text-white"
        aria-label="Diminuir placar"
      >
        <CiCircleMinus className="text-2xl leading-none" />
      </button>
      <input
        type="number"
        min={0}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
        className="h-10 w-10 appearance-none rounded border border-white text-center text-sm leading-none font-bold text-white [moz-appearance:textfield] disabled:cursor-not-allowed disabled:border-white disabled:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled}
        className="text-white transition hover:text-gray-200 disabled:cursor-not-allowed disabled:text-white"
        aria-label="Aumentar placar"
      >
        <CiCirclePlus className="text-2xl leading-none" />
      </button>
    </div>
  );
}
