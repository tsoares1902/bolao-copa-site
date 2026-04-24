import { api } from '@/services/http/api';
import {
  ActivateAccountInput,
  AuthResponse,
  LoginInput,
  RegisterInput,
} from '@/services/auth/auth.types';

export async function register(input: RegisterInput) {
  await api.post('/auth/register', input);
}

export async function login(input: LoginInput): Promise<AuthResponse> {
  return api.post('/auth/login', input);
}

export async function activateAccount(input: ActivateAccountInput) {
  await api.post('/auth/activate', input);
}
