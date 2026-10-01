'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/dataStore';
import { UserRole } from '@/types';
import {
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Building2,
  AlertCircle
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('ormawa');
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [ormawaName, setOrmawaName] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok!');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal harus 6 karakter!');
      return;
    }

    setIsLoading(true);

    const result = await registerUser({
      nama,
      username,
      email,
      password,
      role,
      ormawa_name: role === 'ormawa' ? (ormawaName || 'Organisasi Mahasiswa') : undefined,
      department: department || (role === 'admin' ? 'Bagian Kemahasiswaan & Humas' : 'Politeknik Negeri Indramayu'),
    });

    setIsLoading(false);

    if (result.success) {
      setSuccessMessage('Pendaftaran berhasil! Mengarahkan ke dashboard...');
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } else {
      setErrorMessage(result.error || 'Terjadi kesalahan saat pendaftaran.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col md:flex-row font-sans selection:bg-[#6666FF] selection:text-white">
      {/* Left 45%: Presentation & Institutional Info */}
      <div className="w-full md:w-5/12 min-h-[420px] md:min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#6666FF]/25 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          {/* Logo & Institution */}
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
                Registrasi Akun Baru
              </span>
            </div>
          </div>

          <div className="mt-12 lg:mt-20 max-w-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold border border-white/15 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>CampusPass Akun Resmi</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Daftarkan Akun <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6666FF] via-indigo-300 to-[#FA8072]">
                Ormawa &amp; Humas
              </span>
            </h1>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed text-justify">
              Buat akun terverifikasi untuk mengajukan perizinan acara kampus, mengunggah proposal anggaran (RAB), dan memantau status persetujuan secara real-time.
            </p>

            <div className="mt-8 space-y-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Terintegrasi Database Cloud Supabase Real-time</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Akses Langsung ke Sistem Pelaporan Anggaran</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Verifikasi Identitas Organisasi Mahasiswa Polindra</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-400 mt-8 pt-6 border-t border-white/10">
          &copy; {new Date().getFullYear()} Politeknik Negeri Indramayu &bull; CampusPass
        </div>
      </div>

      {/* Right 55%: Register Form Container */}
      <div className="w-full md:w-7/12 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 overflow-y-auto">
        <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Buat Akun Baru</h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan lengkapi formulir pendaftaran di bawah ini
            </p>

            {/* Role Switcher Pill */}
            <div className="mt-4 grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => setRole('ormawa')}
                className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'ormawa'
                    ? 'bg-white text-[#6666FF] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Akun Mahasiswa (Ormawa)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-white text-[#6666FF] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Akun Admin (Humas)</span>
              </button>
            </div>
          </div>

          {/* Error / Success Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Nama Lengkap / Penanggung Jawab <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: Faiz Ali"
                  className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Username <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Contoh: himatif_2026"
                  className="w-full px-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Kampus / Ormawa <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@polindra.ac.id"
                    className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>
              </div>
            </div>

            {role === 'ormawa' ? (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Organisasi Mahasiswa (Ormawa) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={ormawaName}
                    onChange={(e) => setOrmawaName(e.target.value)}
                    placeholder="Contoh: Himpunan Mahasiswa Teknik Informatika (HIMATIF)"
                    className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Unit / Bagian Institusi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="Contoh: Bagian Kemahasiswaan & Hubungan Masyarakat"
                  className="w-full px-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Konfirmasi Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#6666FF] via-indigo-600 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isLoading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang & Buat Akun'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Link back to login */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-600">
            Sudah memiliki akun?{' '}
            <Link href="/login" className="font-bold text-[#6666FF] hover:underline">
              Masuk di Sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
