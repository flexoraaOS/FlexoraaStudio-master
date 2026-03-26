'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoImage } from '@/components/ui/logo-image';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndRedirect = async () => {
      // For this UI simulation based on the structure, we'll route directly
      // to the LeadOS dashboard when landing on the root dashboard page.
      router.replace('/dashboard/leados');
    };

    checkUserAndRedirect();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-loader-pulse"></div>
          <div className="absolute inset-2.5 bg-background rounded-full"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <LogoImage className="h-10 w-10 animate-loader-spin text-primary" />
          </div>
        </div>
        <p className="text-muted-foreground animate-in fade-in animation-delay-300">Preparing your dashboard...</p>
      </div>
    </div>
  );
}
