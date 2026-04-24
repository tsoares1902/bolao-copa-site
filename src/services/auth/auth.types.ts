export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type ActivateAccountInput = {
  email: string;
  token: string;
};
