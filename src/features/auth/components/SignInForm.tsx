'use client';

import { useState } from 'react';
import { CgEnter } from 'react-icons/cg';
import { FaLock } from 'react-icons/fa';
import { MdOutlinePhone } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { signIn } from '@/services/auth/auth.api';
import { setTokens } from '@/services/http/token-storage';
import {
  maskBrazilianCellphone,
  onlyNumbers,
} from '@/shared/utils/phone-mask';

import { AuthFeedback } from './AuthFeedback';

type SignInFormData = {
  phone: string;
  password: string;
};

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

export function SignInForm() {
  const router = useRouter();

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  async function onSubmit(data: SignInFormData) {
    try {
      const tokens = await signIn({
        phone: onlyNumbers(data.phone),
        password: data.password,
      });

      setTokens(tokens.accessToken, tokens.refreshToken);

      setFeedback({
        type: 'success',
        message: 'Login realizado com sucesso!',
      });

      setTimeout(() => {
        router.push('/matches');
      }, 600);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao realizar login';

      if (message.includes('Account not activated')) {
        setFeedback({
          type: 'error',
          message: 'É necessário ativar sua conta',
        });

        return;
      }

      if (message.includes('Invalid credentials')) {
        setFeedback({
          type: 'error',
          message: 'Credenciais inválidas!',
        });

        return;
      }

      setFeedback({
        type: 'error',
        message: 'Erro ao realizar login',
      });
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl bg-black p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-gray-400 transition-colors hover:text-gray-300">
        LOGIN
      </h1>

      <hr className="my-6 border-gray-400 transition-colors hover:border-gray-300" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {feedback && (
          <AuthFeedback
            type={feedback.type}
            message={feedback.message}
            onClose={() => setFeedback(null)}
          />
        )}
        <div className="space-y-1">
          <div className="relative">
            <MdOutlinePhone className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-lg text-gray-300" />

            <input
              className={`login-input w-full rounded-md border bg-transparent py-2 pr-3 pl-10 text-gray-300 outline-none placeholder:text-gray-300 ${
                errors.phone
                  ? 'border-red-300 focus:border-red-300'
                  : 'border-gray-300 focus:border-gray-300'
              }`}
              placeholder="(XX) XXXXX-XXXX"
              {...register('phone', {
                required: '- É necessário informar o telefone!',
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
          </div>
          {errors.phone && (
            <p className="text-md text-red-300">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative">
            <FaLock className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-base text-gray-300" />
            <input
              type="password"
              className={`login-input w-full rounded-md border bg-transparent py-2 pr-3 pl-10 text-gray-300 outline-none placeholder:text-gray-300 ${
                errors.password
                  ? 'border-red-300 focus:border-red-300'
                  : 'border-gray-300 focus:border-gray-300'
              }`}
              placeholder="DIGITE SUA SENHA"
              {...register('password', {
                required: '* É necessário informar a senha!',
                minLength: {
                  value: 6,
                  message: 'Senha deve ter pelo menos 6 caracteres',
                },
              })}
            />
          </div>

          {errors.password && (
            <p className="text-md text-red-300">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-green-500 bg-black px-4 py-2 font-medium text-green-700 transition-colors hover:border-green-900 hover:bg-green-800 hover:text-green-100 disabled:opacity-60"
        >
          <CgEnter className="text-lg" />
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </section>
  );
}
