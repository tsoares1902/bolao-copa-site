import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

type GuessScoreInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function GuessScoreInput({ value, onChange }: GuessScoreInputProps) {
  function handleDecrement() {
    onChange(Math.max(0, value - 1));
  }

  function handleIncrement() {
    onChange(value + 1);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrement}
        className="text-gray-100 transition hover:text-gray-300"
        aria-label="Diminuir placar"
      >
        <CiCircleMinus className="text-2xl leading-none" />
      </button>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
        className="h-10 w-10 appearance-none rounded border border-gray-300 text-center text-sm leading-none text-gray-100 [moz-appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={handleIncrement}
        className="text-gray-100 transition hover:text-gray-300"
        aria-label="Aumentar placar"
      >
        <CiCirclePlus className="text-2xl leading-none" />
      </button>
    </div>
  );
}
