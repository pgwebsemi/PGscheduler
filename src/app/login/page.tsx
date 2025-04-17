"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold">
          PGscheduler
        </h1>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleLogin}
            className="flex cursor-pointer items-center justify-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow transition hover:shadow-md dark:bg-gray-700 dark:text-gray-200"
          >
            <Image
              src="/google-logo.png"
              alt="Google"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span>Googleでログイン</span>
          </button>

          <button
            disabled
            className="flex cursor-not-allowed items-center justify-center gap-3 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-400 shadow opacity-60 dark:bg-gray-700 dark:text-gray-500"
          >
            <Image
              src="/github.png"
              alt="GitHub"
              width={20}
              height={20}
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
            />
            <span>GitHubでログイン（準備中）</span>
          </button>
        </div>
      </div>
    </div>
  );
}
