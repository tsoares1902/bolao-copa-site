'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { signUp } from '@/services/auth/auth.api';
import {
  maskBrazilianCellphone,
  onlyNumbers,
} from '@/shared/utils/phone-mask';
import { AuthFeedback } from './AuthFeedback';

type SignUpFormData = {
  name: string;
  alias?: string;
  phone: string;
  password: string;
};

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

export function SignUpForm() {
  const router = useRouter();

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      alias: '',
      phone: '',
      password: '',
    },
  });

  async function onSubmit(data: SignUpFormData) {
    try {
      const phone = onlyNumbers(data.phone);

      await signUp({
        name: data.name,
        alias: data.alias || undefined,
        password: data.password,
        phone: {
          number: phone,
          isWhatsapp: true,
        },
      });

      setFeedback({
        type: 'success',
        message: 'Conta criada com sucesso! Ative sua conta para continuar.',
      });

      setTimeout(() => {
        router.push(`/activate-account?phone=${encodeURIComponent(phone)}`);
      }, 800);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Não foi possível criar sua conta.',
      });
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold">Cadastrar</h1>

      <hr className="my-6" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {feedback && (
          <AuthFeedback
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium">Nome</label>

          <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
            placeholder="Seu nome"
            {...register('name', {
              required: 'Nome é obrigatório',
            })}
          />

          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Apelido</label>

          <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
            placeholder="Seu apelido"
            {...register('alias')}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Telefone</label>

          <input
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
            placeholder="(13) 98989-8989"
            {...register('phone', {
              required: 'Telefone é obrigatório',
              validate: (value) => {
                const phone = onlyNumbers(value);

                if (phone.length !== 11) {
                  return 'Informe um celular válido';
                }

                return true;
              },
              onChange: (event) => {
                setValue('phone', maskBrazilianCellphone(event.target.value));
              },
            })}
          />

          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Senha</label>

          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
            placeholder="Sua senha"
            {...register('password', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'Senha deve ter pelo menos 6 caracteres',
              },
            })}
          />

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-black px-4 py-2 font-medium text-white disabled:opacity-60"
        >
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </section>
  );
}
