import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { RequireGuest } from '@/features/auth/components/RequireGuest';

export default function AccountSignUpPage() {
  return (
    <RequireGuest>
      <main className="flex min-h-screen items-center justify-center bg-black px-4">
        <SignUpForm />
      </main>
    </RequireGuest>
  );
}
