'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/services/auth/auth.api';

export function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [alias, setAlias] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await signUp({
      name,
      alias: alias || undefined,
      password,
      phone: {
        number: phone,
        isWhatsapp: true,
      },
    });

    router.push(`/activate-account?phone=${encodeURIComponent(phone)}`);
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

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      <button type="submit">Cadastrar</button>
    </form>
  );
}
