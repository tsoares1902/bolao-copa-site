'use client';

import { MeForm } from '@/features/auth/components/MeForm';
import { RequireAuth } from '@/features/auth/components/RequireAuth';
import { useMe } from '@/features/auth/hooks/useMe';

function AccountProfileContent() {
  const { user, isLoading, reload } = useMe();

  if (isLoading) {
    return <p>Carregando perfil...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return <MeForm user={user} onUpdated={reload} />;
}

export default function AccountProfilePage() {
  return (
    <RequireAuth>
      <AccountProfileContent />
    </RequireAuth>
  );
}
