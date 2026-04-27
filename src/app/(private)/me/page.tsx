'use client';

import { MeForm } from '@/features/auth/components/MeForm';
import { useMe } from '@/features/auth/hooks/useMe';

export default function MePage() {
  const { user, isLoading, reload } = useMe();

  if (isLoading) {
    return <p>Carregando perfil...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return <MeForm user={user} onUpdated={reload} />;
}
