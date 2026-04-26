export type Phone = {
  number: string;
  isWhatsapp: boolean;
};

export type Media = {
  avatarUrl?: string;
};

export type User = {
  _id: string;
  name: string;
  alias?: string;
  phone: Phone;
  media?: Media;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpRequest = {
  name: string;
  alias?: string;
  password: string;
  phone: Phone;
  media?: Media;
};

export type SignInRequest = {
  phone: string;
  password: string;
};

export type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type ActivationCodeRequest = {
  phone: string;
};

export type ActivateAccountRequest = {
  phone: string;
  code: string;
};

export type RefreshRequest = {
  refreshToken: string;
};

export type SignOutRequest = {
  refreshToken: string;
};

export type UpdateMeRequest = {
  name?: string;
  alias?: string;
  phone?: Phone;
  media?: Media;
};
