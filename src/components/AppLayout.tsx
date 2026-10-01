'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import { getCurrentUser } from '@/lib/dataStore';
import { UserRole } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('ormawa');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const checkAuth = () => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    if (user?.role) {
      setRole(user.role);
    }
    setIsMounted(true);
  };

  useEffect(() => {
    checkAuth();
    const handleAuthChange = () => checkAuth();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, [router]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#6666FF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-500">Memeriksa sesi akun...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#6666FF] selection:text-white">
      {/* Sticky Modern Top Header */}
      <Header onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />

      {/* Main Container */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar userRole={role} />
        </div>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm flex animate-in fade-in duration-200"
            onClick={() => setIsMobileOpen(false)}
          >
            <div
              className="w-72 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar userRole={role} onCloseMobile={() => setIsMobileOpen(false)} />
            </div>
          </div>
        )}

        {/* Scrollable Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
