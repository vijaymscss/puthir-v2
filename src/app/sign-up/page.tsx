import { Metadata } from 'next';
import { CustomSignUp } from '@/features/auth/components/CustomSignUp';

export const metadata: Metadata = {
  title: 'Sign Up | Cloud Practice Test',
  description: 'Create a new Cloud Practice Test account to start practicing cloud certifications.',
};

export default function SignUpPage() {
  return (
    <main className="w-full">
      <CustomSignUp />
    </main>
  );
}
