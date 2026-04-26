'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { getAccessToken } from '@/services/http/token-storage';

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = Boolean(getAccessToken());

    if (!isLoggedIn) {
      router.replace('/account/sign-in');
      return;
    }

    setIsReady(true);
  }, [pathname, router]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
