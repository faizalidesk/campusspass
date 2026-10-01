'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import MahasiswaDashboard from '@/components/dashboard/MahasiswaDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { getCurrentUser, getPermits } from '@/lib/dataStore';
import { User, PermitApplication } from '@/types';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permits, setPermits] = useState<PermitApplication[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setUser(getCurrentUser());
    getPermits().then((data) => {
      setPermits(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
    const handleAuthChange = () => loadData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#6666FF] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-bold text-slate-500">Memuat data dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {user?.role === 'admin' ? (
        <AdminDashboard user={user} permits={permits} onRefresh={loadData} />
      ) : (
        <MahasiswaDashboard user={user} permits={permits} onRefresh={loadData} />
      )}
    </AppLayout>
  );
}
