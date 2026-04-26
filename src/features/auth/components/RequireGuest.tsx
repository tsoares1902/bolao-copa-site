'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { getAccessToken } from '@/services/http/token-storage';

type RequireGuestProps = {
  children: React.ReactNode;
};

export function RequireGuest({ children }: RequireGuestProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isLoggedIn = Boolean(getAccessToken());

    if (isLoggedIn) {
      router.replace('/account/me');
      return;
    }

    setIsReady(true);
  }, [pathname, router]);

  if (!isReady) {
    return null;
  }

  return <>{children}</>;
}
