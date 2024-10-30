"use client";

import { useSearchParams } from 'next/navigation';
import Navbar from '@/participants/Navbar';
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  // auth 관련 페이지인지 확인
  const isAuthPage = type === 'sign-in' || type === 'sign-up' || type === 'forgot-password';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}