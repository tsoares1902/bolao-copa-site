import { Metadata } from "next";
import { RequireGuest } from '@/features/auth/components/RequireGuest';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Bolão",
  description: "Aplicativo de bolão para a Copa do Mundo 2026",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <RequireGuest>
      <main className="flex min-h-screen items-center justify-center bg-black px-4">
        {children}
      </main>
    </RequireGuest>
  );
}
