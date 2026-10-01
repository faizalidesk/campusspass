'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser, setCurrentUser, logout, DEFAULT_ADMIN, DEFAULT_ORMAWA, getPermits } from '@/lib/dataStore';
import { User, PermitApplication } from '@/types';
import {
  Bell,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  LogOut,
  RefreshCw,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [permits, setPermits] = useState<PermitApplication[]>([]);

  const loadData = () => {
    const current = getCurrentUser();
    setUser(current);
    getPermits().then((data) => {
      setPermits(data);
      setPendingCount(data.filter((p) => p.status === 'pending').length);
    });
  };

  useEffect(() => {
    loadData();
    const handleAuthChange = () => loadData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, []);

  const toggleRole = () => {
    if (user?.role === 'admin') {
      setCurrentUser(DEFAULT_ORMAWA);
    } else {
      setCurrentUser(DEFAULT_ADMIN);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Left: Brand Logo & Title */}
      <div className="flex items-center gap-3.5">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/img/logopolindra.png"
              alt="Logo Polindra"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
                Campus<span className="text-[#6666FF]">Pass</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-[#6666FF] border border-indigo-100">
                Polindra SaaS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Sistem Perizinan &amp; Pelaporan Kegiatan Ormawa
            </p>
          </div>
        </Link>
      </div>

      {/* Right: Role Switcher Pill, Notifications, User Menu */}
      <div className="flex items-center gap-3">
        {/* Role Demo Switcher Badge */}
        <button
          onClick={toggleRole}
          title="Klik untuk beralih antara Mode Mahasiswa dan Mode Admin"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 shadow-sm cursor-pointer ${
            isAdmin
              ? 'bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border-indigo-200 hover:border-indigo-400'
              : 'bg-gradient-to-r from-rose-50 to-orange-50 text-rose-700 border-rose-200 hover:border-rose-400'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-current" />
          <span className="hidden sm:inline">Role Aktif:</span>
          <span className="font-bold flex items-center gap-1">
            {isAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" /> Admin Humas
              </>
            ) : (
              <>
                <UserCheck className="w-3.5 h-3.5 text-rose-600" /> Mahasiswa (Ormawa)
              </>
            )}
          </span>
        </button>

        {/* Notification Popover Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserDropdown(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {pendingCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FA8072] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-sm text-slate-900">Notifikasi Sistem</h4>
                <span className="text-[11px] bg-indigo-50 text-[#6666FF] font-bold px-2 py-0.5 rounded-full">
                  {pendingCount} Pengajuan Pending
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-2">
                {permits.slice(0, 4).map((p) => (
                  <Link
                    key={p.id}
                    href={isAdmin ? '/izin' : '/laporan'}
                    onClick={() => setShowNotifications(false)}
                    className="py-2.5 px-2 flex items-start gap-3 hover:bg-slate-50 rounded-xl transition block"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#6666FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {p.status === 'disetujui' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{p.namakegiatan}</p>
                      <p className="text-[11px] text-slate-500 truncate">{p.namaormawa}</p>
                      <span className="text-[10px] font-medium text-slate-400">{p.mulai}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/laporan"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs font-bold text-[#6666FF] hover:underline inline-block"
                >
                  Lihat Semua Laporan &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm ${
                isAdmin
                  ? 'bg-gradient-to-tr from-[#6666FF] to-blue-500'
                  : 'bg-gradient-to-tr from-[#FA8072] to-rose-500'
              }`}
            >
              {isAdmin ? 'HM' : 'OM'}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold text-slate-900 leading-tight truncate max-w-[130px]">
                {user?.nama}
              </p>
              <p className="text-[11px] text-slate-500 leading-none">
                {isAdmin ? 'Humas Kampus' : user?.ormawa_name?.split(' ')[0] || 'Ormawa'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 bg-slate-50 rounded-xl mb-2">
                <p className="text-xs font-bold text-slate-900">{user?.nama}</p>
                <p className="text-[11px] text-slate-500">{user?.email || 'user@polindra.ac.id'}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-[#6666FF]">
                  {isAdmin ? 'Role: Humas Polindra' : 'Role: Pengurus Ormawa'}
                </span>
              </div>

              <div className="space-y-1">
                <Link
                  href="/profil"
                  onClick={() => setShowUserDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#6666FF] rounded-lg transition"
                >
                  <UserCheck className="w-4 h-4" /> Profil Akun
                </Link>
                <button
                  onClick={() => {
                    toggleRole();
                    setShowUserDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-[#6666FF] rounded-lg transition text-left cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" /> Beralih ke {isAdmin ? 'Mahasiswa' : 'Admin'}
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setShowUserDropdown(false);
                    window.location.href = '/login';
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Ganti Akun / Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
