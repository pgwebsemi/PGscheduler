'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

// 認証が不要なパスhはここに書くこと。
const PUBLIC_PATHS = ['/login'];

export default function AuthChecker({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // 現在のURL

  useEffect(() => {
    if (!loading) { 
      const isPublicPath = PUBLIC_PATHS.includes(pathname); 
  
      if (!user && !isPublicPath) {
  
        router.push('/login');  
      } else if (user && isPublicPath) {
       
        router.push('/');  
      }
    }
  }, [user, loading, pathname, router]); 

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  if (isPublicPath || user) {
    return <>{children}</>;
  }

  return null;
} 