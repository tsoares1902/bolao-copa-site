import Link from 'next/link';

export function AppSidebar() {
  return (
    <aside>
      <nav>
        <Link href="/matches">Tabela de Jogos</Link>
        <Link href="/ranking">Ranking</Link>
        <Link href="/profile">Meu Perfil</Link>
      </nav>
    </aside>
  );
}
