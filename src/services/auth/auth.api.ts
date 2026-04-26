import { api } from '@/services/http/api';
import {
  ActivateAccountRequest,
  ActivationCodeRequest,
  AuthTokenResponse,
  RefreshRequest,
  SignInRequest,
  SignOutRequest,
  SignUpRequest,
  UpdateMeRequest,
  User,
} from './auth.types';

export async function signUp(input: SignUpRequest): Promise<void> {
  await api.post<void, SignUpRequest>('/auth/sign-up', input, {
    auth: false,
  });
}

export async function signIn(
  input: SignInRequest,
): Promise<AuthTokenResponse> {
  return api.post<AuthTokenResponse, SignInRequest>('/auth/sign-in', input, {
    auth: false,
  });
}

export async function getMe(): Promise<User> {
  return api.get<User>('/auth/me');
}

export async function updateMe(input: UpdateMeRequest): Promise<User> {
  return api.patch<User, UpdateMeRequest>('/auth/me', input);
}

export async function sendActivationCode(
  input: ActivationCodeRequest,
): Promise<void> {
  await api.post<void, ActivationCodeRequest>('/auth/activation-code', input, {
    auth: false,
  });
}

export async function activateAccount(
  input: ActivateAccountRequest,
): Promise<void> {
  await api.post<void, ActivateAccountRequest>('/auth/activate-account', input, {
    auth: false,
  });
}

export async function refreshToken(
  input: RefreshRequest,
): Promise<AuthTokenResponse> {
  return api.post<AuthTokenResponse, RefreshRequest>('/auth/refresh', input, {
    auth: false,
  });
}

export async function signOut(input: SignOutRequest): Promise<void> {
  await api.post<void, SignOutRequest>('/auth/sign-out', input);
}
