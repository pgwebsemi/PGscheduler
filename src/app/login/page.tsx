'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold">
          PGscheduler
        </h1>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow transition hover:shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <img src="/google-logo.png" alt="Google" className="h-5 w-5" />
            <span>Googleでログイン</span>
        </button>
          
        <button
          disabled
          className="flex cursor-not-allowed items-center justify-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-400 shadow opacity-60 dark:bg-gray-700 dark:text-gray-500"
        >
          <img src="/github.png" alt="GitHub" className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          <span>GitHubでログイン（順備中）</span>
        </button>

        </div>
      </div>
    </div>
  );
} 