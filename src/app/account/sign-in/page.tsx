import { SignInForm } from '@/features/auth/components/SignInForm';
import { RequireGuest } from '@/features/auth/components/RequireGuest';

export default function AccountSignInPage() {
  return (
    <RequireGuest>
      <main className="flex min-h-screen items-center justify-center bg-black px-4">
        <SignInForm />
      </main>
    </RequireGuest>
  );
}
