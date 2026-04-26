'use client';

import { ProfileForm } from '@/features/auth/components/ProfileForm';
import { useMe } from '@/features/auth/hooks/useMe';

export default function ProfilePage() {
  const { user, isLoading, reload } = useMe();

  if (isLoading) {
    return <p>Carregando perfil...</p>;
  }

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  return <ProfileForm user={user} onUpdated={reload} />;
}
