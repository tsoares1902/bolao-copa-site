'use client';

import { FormEvent, useEffect, useState } from 'react';
import { updateMe } from '@/services/auth/auth.api';
import { User } from '@/services/auth/auth.types';

type MeFormProps = {
  user: User;
  onUpdated?: (user: User) => void;
};

export function MeForm({ user, onUpdated }: MeFormProps) {
  const [name, setName] = useState(user.name);
  const [alias, setAlias] = useState(user.alias ?? '');
  const [phone, setPhone] = useState(user.phone.number);

  useEffect(() => {
    setName(user.name);
    setAlias(user.alias ?? '');
    setPhone(user.phone.number);
  }, [user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedUser = await updateMe({
      name,
      alias: alias || undefined,
      phone: {
        number: phone,
        isWhatsapp: true,
      },
    });

    onUpdated?.(updatedUser);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-4">
      <input
        placeholder="Nome"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        placeholder="Apelido"
        value={alias}
        onChange={(event) => setAlias(event.target.value)}
      />

      <input
        placeholder="Telefone"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
      />

      <button type="submit">Atualizar perfil</button>
    </form>
  );
}
