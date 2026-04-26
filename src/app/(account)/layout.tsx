import { RequireAuth } from '@/features/auth/components/RequireAuth';

type AccountLayoutProps = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
  return <RequireAuth>{children}</RequireAuth>;
}
