'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { CgEnter } from 'react-icons/cg';
import { FaKey } from 'react-icons/fa';
import { MdOutlinePhone } from 'react-icons/md';
import { useForm } from 'react-hook-form';

import { activateAccount } from '@/services/auth/auth.api';
import {
  maskBrazilianCellphone,
  onlyNumbers,
} from '@/shared/utils/phone-mask';
import { AuthFeedback } from './AuthFeedback';

type ActivateAccountFormData = {
  phone: string;
  code: string;
};

type Feedback = {
  type: 'success' | 'error';
  message: string;
};

export function ActivateAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPhone = searchParams.get('phone') ?? '';

  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ActivateAccountFormData>({
    defaultValues: {
      phone: initialPhone ? maskBrazilianCellphone(initialPhone) : '',
      code: '',
    },
  });

  async function onSubmit(data: ActivateAccountFormData) {
    try {
      await activateAccount({
        phone: onlyNumbers(data.phone),
        code: data.code,
      });

      setFeedback({
        type: 'success',
        message: 'Conta ativada com sucesso!',
      });

      setTimeout(() => {
        router.push('/account/sign-in');
      }, 800);
    } catch {
      setFeedback({
        type: 'error',
        message: 'Código inválido ou expirado.',
      });
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl bg-black p-8 shadow-sm">
      <h1 className="text-center text-2xl font-bold text-gray-400 transition-colors hover:text-gray-300">
        ATIVAR CONTA
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
          </div>

          {errors.phone && (
            <p className="text-md text-red-300">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative">
            <FaKey className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-base text-gray-300" />
            <input
              className={`login-input w-full rounded-md border bg-transparent py-2 pr-3 pl-10 text-gray-300 outline-none placeholder:text-gray-300 ${
                errors.code
                  ? 'border-red-300 focus:border-red-300'
                  : 'border-gray-300 focus:border-gray-300'
              }`}
              placeholder="DIGITE O CÓDIGO"
              maxLength={6}
              {...register('code', {
                required: 'Código é obrigatório',
                minLength: {
                  value: 6,
                  message: 'Código deve ter 6 dígitos',
                },
                maxLength: {
                  value: 6,
                  message: 'Código deve ter 6 dígitos',
                },
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Código deve conter apenas números',
                },
              })}
            />
          </div>

          {errors.code && (
            <p className="text-md text-red-300">{errors.code.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-green-500 bg-black px-4 py-2 font-medium text-green-700 transition-colors hover:border-green-900 hover:bg-green-800 hover:text-green-100 disabled:opacity-60"
        >
          <CgEnter className="text-lg" />
          {isSubmitting ? 'Ativando...' : 'Ativar conta'}
        </button>
      </form>
    </section>
  );
}
