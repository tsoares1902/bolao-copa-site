import Link from 'next/link';

export function AppSidebar() {
  return (
    <aside className="w-64 border-r p-6">
      <nav className="flex flex-col gap-4">
        <Link href="/matches">Tabela de Jogos</Link>
        <Link href="/guesses">Meus Palpites</Link>
        <Link href="/ranking">Ranking</Link>
        <Link href="/profile">Meu Perfil</Link>
      </nav>
    </aside>
  );
}