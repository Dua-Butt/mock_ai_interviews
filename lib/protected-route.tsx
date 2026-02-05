'use client';

import { ReactNode, useEffect } from 'react';
import { useApp } from './context-supabase';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login'); // redirect if not authenticated
    }
  }, [isAuthenticated, isLoading, router]);

//   // Show loader while session is restoring
//   if (isLoading || !isAuthenticated) {
//     return <div>Loading...</div>;
//   }

  return <>{children}</>;
}
