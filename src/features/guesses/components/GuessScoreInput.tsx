import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type GuessScoreInputProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  variant?: 'default' | 'closed';
};

export function GuessScoreInput({
  value,
  onChange,
  disabled = false,
  variant = 'default',
}: GuessScoreInputProps) {
  const isClosed = variant === 'closed';

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
        className={`transition disabled:cursor-not-allowed ${
          isClosed
            ? 'text-red-100 hover:text-red-200 disabled:text-red-100'
            : 'text-gray-100 hover:text-gray-300 disabled:text-gray-500'
        }`}
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
        className={`h-10 w-10 appearance-none rounded border text-center text-sm leading-none font-bold text-gray-100 [moz-appearance:textfield] disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
          isClosed
            ? 'border-red-100 disabled:border-red-100 disabled:text-red-100'
            : 'border-gray-300 disabled:border-gray-500 disabled:text-gray-500'
        }`}
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled}
        className={`transition disabled:cursor-not-allowed ${
          isClosed
            ? 'text-red-100 hover:text-red-200 disabled:text-red-100'
            : 'text-gray-100 hover:text-gray-300 disabled:text-gray-500'
        }`}
        aria-label="Aumentar placar"
      >
        <CiCirclePlus className="text-2xl leading-none" />
      </button>
    </div>
  );
}
