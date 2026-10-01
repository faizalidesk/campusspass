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
  HelpCircle,
  Building,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { getPermits, getCurrentUser } from '@/lib/dataStore';

interface SidebarProps {
  userRole?: 'admin' | 'ormawa';
  onCloseMobile?: () => void;
}

export default function Sidebar({ userRole = 'ormawa', onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [pendingCount, setPendingCount] = useState(0);
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
    getPermits().then((data) => {
      setPendingCount(data.filter((p) => p.status === 'pending').length);
    });
  }, [userRole]);

  const isAdmin = userRole === 'admin';

  const menuItems = isAdmin
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
          badgeColor: 'bg-[#FA8072] text-white',
        },
        {
          title: 'Master Rekapitulasi',
          href: '/laporan',
          icon: FolderKanban,
          badge: null,
        },
        {
          title: 'Profil Humas & Kampus',
          href: '/profil',
          icon: Building,
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
          badgeColor: 'bg-emerald-100 text-emerald-700',
        },
        {
          title: 'Riwayat & Surat Izin',
          href: '/laporan',
          icon: FileText,
          badge: null,
        },
        {
          title: 'Profil Organisasi',
          href: '/profil',
          icon: GraduationCap,
          badge: null,
        },
      ];

  return (
    <aside className="w-full md:w-64 lg:w-72 bg-white flex flex-col justify-between border-r border-slate-200/80 p-4 min-h-[calc(100vh-65px)] select-none">
      <div>
        {/* Portal Type Indicator */}
        <div className="mb-4 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isAdmin ? 'bg-[#6666FF] animate-pulse' : 'bg-[#FA8072] animate-pulse'
              }`}
            ></span>
            <span className="text-xs font-bold text-slate-700">
              {isAdmin ? 'Portal Admin Humas' : 'Portal Mahasiswa Ormawa'}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-slate-400">v2.4</span>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Menu Utama
          </p>
          <ul className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6666FF] to-indigo-600 text-white shadow-md shadow-indigo-200 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#6666FF]'
                        }`}
                      />
                      <span>{item.title}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Tips / Info Box */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-blue-50/60 border border-indigo-100/80">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-[#6666FF]" />
            <span className="text-xs font-bold text-slate-900">
              {isAdmin ? 'Tips Verifikasi RAB' : 'Ketentuan Proposal'}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {isAdmin
              ? 'Pastikan tanggal kegiatan tidak bertabrakan dengan jadwal kalender akademik (UTS/UAS/Libur).'
              : 'Unggah proposal kegiatan minimal 7 hari sebelum tanggal pelaksanaan acara dimulai.'}
          </p>
        </div>
      </div>

      {/* Bottom User info & logout */}
      <div className="pt-4 border-t border-slate-100 mt-6">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar dari Akun</span>
        </Link>
      </div>
    </aside>
  );
}
