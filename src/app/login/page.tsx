'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCurrentUser, DEFAULT_ADMIN, DEFAULT_ORMAWA } from '@/lib/dataStore';
import { UserRole } from '@/types';
import {
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  User,
  Building2,
  FileCheck2
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('himatif');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('ormawa');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (role === 'admin') {
        setCurrentUser({
          ...DEFAULT_ADMIN,
          username: username || 'admin',
        });
      } else {
        setCurrentUser({
          ...DEFAULT_ORMAWA,
          username: username || 'himatif',
        });
      }
      setIsLoading(false);
      router.push('/dashboard');
    }, 450);
  };

  const selectRole = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('himatif');
      setPassword('himatif123');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-[#6666FF] selection:text-white">
      {/* Left 50%: SaaS Brand Hero Presentation */}
      <div className="w-full md:w-1/2 min-h-[460px] md:min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 lg:p-14 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
        {/* Glow Spheres */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#6666FF]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
              <Image
                src="/img/logopolindra.png"
                alt="Logo Polindra"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-white leading-none">
                Politeknik Negeri Indramayu
              </h2>
              <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase">
                Student Affairs &amp; Activity Tracker
              </span>
            </div>
          </div>

          <div className="mt-14 lg:mt-24 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold border border-white/15 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CampusPass v2.4 SaaS Edition</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Sistem Terpadu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6666FF] via-indigo-300 to-[#FA8072]">
                Perizinan &amp; Anggaran
              </span>
            </h1>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed text-justify">
              Platform modern pengelolaan pengajuan izin kegiatan, peninjauan dokumen anggaran (RAB), peminjaman fasilitas ruangan, dan penerbitan surat keputusan resmi secara transparan &amp; akuntabel.
            </p>

            {/* Feature Highlights */}
            <div className="mt-8 space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Pengajuan Izin Kegiatan Online dengan Pratinjau Langsung (Live Preview)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Validasi Cepat &amp; Penerbitan Surat Keputusan oleh Humas &amp; Kemahasiswaan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Terintegrasi Database Cloud Real-time dengan Fitur Ekspor Rekapitulasi CSV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-slate-400 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Politeknik Negeri Indramayu</span>
          <span>Dikelola oleh Bagian Kemahasiswaan &amp; Humas</span>
        </div>
      </div>

      {/* Right 50%: Modern Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Selamat Datang</h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan pilih portal masuk Anda untuk melanjutkan
            </p>

            {/* Role Switcher Pill */}
            <div className="mt-5 grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => selectRole('ormawa')}
                className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'ormawa'
                    ? 'bg-white text-[#6666FF] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Login Mahasiswa</span>
              </button>

              <button
                type="button"
                onClick={() => selectRole('admin')}
                className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-white text-[#6666FF] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Login Admin Humas</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Username / Identitas Ormawa
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={role === 'admin' ? 'admin' : 'himatif / bem / ormawa'}
                  className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Password / Kata Sandi</label>
                <a href="#" className="text-[11px] font-semibold text-[#6666FF] hover:underline">
                  Lupa kata sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#6666FF] via-indigo-600 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Mengautentikasi...' : `Masuk ke Portal ${role === 'admin' ? 'Admin Humas' : 'Mahasiswa'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Preset 1-Click Demo Accounts */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Akun Demo Cepat (1-Klik)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => selectRole('ormawa')}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-left transition cursor-pointer"
              >
                <div className="text-[11px] font-bold text-slate-800">👤 Mahasiswa HIMATIF</div>
                <div className="text-[10px] text-slate-500">himatif / himatif123</div>
              </button>
              <button
                type="button"
                onClick={() => selectRole('admin')}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 text-left transition cursor-pointer"
              >
                <div className="text-[11px] font-bold text-slate-800">🏢 Humas Polindra</div>
                <div className="text-[10px] text-slate-500">admin / admin123</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
