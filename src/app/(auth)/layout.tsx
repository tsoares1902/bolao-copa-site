import { Metadata } from "next";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Bolão",
  description: "Aplicativo de bolão para a Copa do Mundo 2026",
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4">
      {children}
    </main>
  );
}
