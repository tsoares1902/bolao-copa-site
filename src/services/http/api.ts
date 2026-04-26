import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from './token-storage';

type ApiRequestOptions = RequestInit & {
  auth?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    return null;
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearTokens();
    return null;
  }

  const tokens = (await response.json()) as RefreshTokenResponse;

  setTokens(tokens.accessToken, tokens.refreshToken);

  return tokens.accessToken;
}

async function request<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
  retryOnAuthError = true,
): Promise<TResponse> {
  const headers = new Headers(options.headers);

  headers.set('Content-Type', 'application/json');

  if (options.auth !== false) {
    const accessToken = getAccessToken();

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && options.auth !== false && retryOnAuthError) {
    const nextAccessToken = await refreshAccessToken();

    if (nextAccessToken) {
      const retryHeaders = new Headers(options.headers);

      retryHeaders.set('Content-Type', 'application/json');
      retryHeaders.set('Authorization', `Bearer ${nextAccessToken}`);

      return request<TResponse>(
        path,
        {
          ...options,
          headers: retryHeaders,
        },
        false,
      );
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      Array.isArray(error?.message)
        ? error.message.join(', ')
        : error?.message ?? `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  const responseText = await response.text();

  if (!responseText) {
    return undefined as TResponse;
  }

  return JSON.parse(responseText) as TResponse;
}

export const api = {
  get: <TResponse>(path: string, options?: ApiRequestOptions) =>
    request<TResponse>(path, {
      ...options,
      method: 'GET',
    }),

  post: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions,
  ) =>
    request<TResponse>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <TResponse, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: ApiRequestOptions,
  ) =>
    request<TResponse>(path, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <TResponse>(path: string, options?: ApiRequestOptions) =>
    request<TResponse>(path, {
      ...options,
      method: 'DELETE',
    }),
};
