'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { getCurrentUser } from '@/lib/dataStore';
import { UserRole } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [role, setRole] = useState<UserRole>('ormawa');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role) {
      setRole(user.role);
    }
  }, []);

  return (
    <div className="page min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Top Header Navbar */}
      <Header onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />

      {/* Main Content Body */}
      <div className="isi flex-1 flex flex-col md:flex-row w-full overflow-hidden">
        {/* Sidebar Desktop */}
        <div className={`hidden md:block`}>
          <Sidebar userRole={role} />
        </div>

        {/* Sidebar Mobile Drawer */}
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/40 flex" onClick={() => setIsMobileOpen(false)}>
            <div className="w-72 bg-white h-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <Sidebar userRole={role} />
            </div>
          </div>
        )}

        {/* Right Content Area */}
        <main className="right flex-1 p-4 lg:p-6 bg-white overflow-y-auto max-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
