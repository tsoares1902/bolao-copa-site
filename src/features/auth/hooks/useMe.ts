'use client';

import { useEffect, useState } from 'react';
import { getMe } from '@/services/auth/auth.api';
import { User } from '@/services/auth/auth.types';

export function useMe() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadMe() {
    try {
      const data = await getMe();
      setUser(data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMe();
  }, []);

  return {
    user,
    isLoading,
    reload: loadMe,
  };
}
