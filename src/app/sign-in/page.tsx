import { Metadata } from 'next';
import { CustomSignIn } from '@/components/auth/CustomSignIn';

export const metadata: Metadata = {
  title: 'Sign In | Cloud Practice Test',
  description: 'Sign in to your Cloud Practice Test account to access your quiz history and continue learning.',
};

export default function SignInPage() {
  return (
    <main className="w-full">
      <CustomSignIn />
    </main>
  );
}
