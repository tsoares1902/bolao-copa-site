import { GuessTable } from '@/features/guesses/components/GuessTable';

export default function GuessesPage() {
  return (
    <div className="bg-black">
      <div className="px-4 pt-6 md:px-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-300">
          MEUS PALPITES
        </h1>
        <GuessTable />
      </div>
    </div>
  );
}
