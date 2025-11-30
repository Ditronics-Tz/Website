'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  footer: ReactNode;
}

export function LayoutWrapper({ children, footer }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  
  return (
    <>
      {!isAdmin && <Navbar />}
      <main id="main-content">{children}</main>
      {!isAdmin && footer}
    </>
  );
}
