'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FilePlus2,
  FileCheck2,
  FolderKanban,
  FileText,
  User,
  LogOut,
  Building,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { getPermits, getCurrentUser, logout } from '@/lib/dataStore';

interface SidebarProps {
  userRole?: 'admin' | 'ormawa';
  onCloseMobile?: () => void;
}

export default function Sidebar({ userRole = 'ormawa', onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [user, setUser] = useState(getCurrentUser());

  const loadSidebarData = () => {
    setUser(getCurrentUser());
    getPermits().then((data) => {
      setPendingCount(data.filter((p) => p.status === 'pending').length);
    });
  };

  useEffect(() => {
    loadSidebarData();
    const handleAuthChange = () => loadSidebarData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, [userRole]);

  const isAdmin = userRole === 'admin';

  const mainMenuItems = isAdmin
    ? [
        {
          title: 'Dashboard Humas',
          href: '/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          title: 'Review & Persetujuan',
          href: '/izin',
          icon: FileCheck2,
          badge: pendingCount > 0 ? `${pendingCount} Baru` : null,
          badgeColor: 'bg-[#FA8072] text-white font-extrabold',
        },
        {
          title: 'Master Rekapitulasi',
          href: '/laporan',
          icon: FolderKanban,
          badge: null,
        },
      ]
    : [
        {
          title: 'Dashboard Ormawa',
          href: '/dashboard',
          icon: LayoutDashboard,
          badge: null,
        },
        {
          title: 'Ajukan Izin Baru',
          href: '/izin',
          icon: FilePlus2,
          badge: 'Proses Cepat',
          badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        },
        {
          title: 'Riwayat & Surat Izin',
          href: '/laporan',
          icon: FileText,
          badge: null,
        },
      ];

  const secondaryMenuItems = [
    {
      title: isAdmin ? 'Profil Humas & Kampus' : 'Profil Organisasi',
      href: '/profil',
      icon: isAdmin ? Building : GraduationCap,
    },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-white flex flex-col justify-between border-r border-slate-200/90 h-[calc(100vh-65px)] sticky top-[65px] select-none shadow-[1px_0_4px_rgba(0,0,0,0.02)] z-20">
      {/* Top Scrollable Navigation Area */}
      <div className="p-4 overflow-y-auto space-y-6 flex-1">
        {/* Portal Role Indicator Pill */}
        <div className="px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2 h-2 rounded-full ring-4 ${
                isAdmin
                  ? 'bg-[#6666FF] ring-indigo-100'
                  : 'bg-[#FA8072] ring-rose-100'
              }`}
            ></div>
            <span className="text-xs font-bold text-slate-800">
              {isAdmin ? 'Portal Admin Humas' : 'Portal Mahasiswa'}
            </span>
          </div>
          <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200/60 shadow-2xs">
            v2.4
          </span>
        </div>

        {/* Section 1: Main Menu */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </p>
          <nav className="flex flex-col gap-1">
            {mainMenuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-[#6666FF] text-white shadow-md shadow-indigo-200/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#6666FF]'
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                        isActive ? 'bg-white/25 text-white' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section 2: Account & Settings */}
        <div className="space-y-1.5">
          <p className="px-3 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Akun &amp; Lembaga
          </p>
          <nav className="flex flex-col gap-1">
            {secondaryMenuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#6666FF] text-white shadow-md shadow-indigo-200/80'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 flex-shrink-0 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#6666FF]'
                      }`}
                    />
                    <span>{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Compact Info Card */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-slate-50 border border-indigo-100/70 shadow-2xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#6666FF] flex-shrink-0" />
            <span className="text-[11px] font-extrabold text-slate-800">
              {isAdmin ? 'Panduan Humas' : 'Ketentuan Proposal'}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            {isAdmin
              ? 'Verifikasi ketersediaan gedung dan kesesuaian anggaran RAB sebelum persetujuan.'
              : 'Unggah proposal lengkap minimal 7 hari kerja sebelum jadwal pelaksanaan acara.'}
          </p>
        </div>
      </div>

      {/* Bottom Fixed User Profile & Logout Bar */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/80 backdrop-blur-xs">
        <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
          {/* User Avatar + Name */}
          <Link href="/profil" className="flex items-center gap-2.5 min-w-0 flex-1 hover:opacity-85 transition">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs text-white shadow-xs flex-shrink-0 ${
                isAdmin
                  ? 'bg-gradient-to-tr from-[#6666FF] to-blue-500'
                  : 'bg-gradient-to-tr from-[#FA8072] to-rose-500'
              }`}
            >
              {isAdmin ? 'HM' : 'OM'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-slate-900 truncate leading-tight">
                {user?.nama || 'User Ormawa'}
              </p>
              <p className="text-[10px] font-semibold text-slate-500 truncate leading-none mt-0.5">
                {isAdmin ? 'Humas Polindra' : user?.ormawa_name?.split(' ')[0] || 'Mahasiswa'}
              </p>
            </div>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            title="Keluar / Ganti Akun"
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition flex-shrink-0 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
