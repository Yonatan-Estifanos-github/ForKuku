'use client';

import { usePathname } from 'next/navigation';
import FloatingNav from '@/components/FloatingNav';
import SoundController from '@/components/SoundController';

export default function ConditionalUI() {
  const pathname = usePathname();

  // Hide nav and sound controller on admin and login routes
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

  if (isAdminRoute) {
    return null;
  }

  return (
    <>
      <SoundController />
      <FloatingNav />
    </>
  );
}
