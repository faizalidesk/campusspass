'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AppLayout from '@/components/AppLayout';
import { getCurrentUser, getPermits } from '@/lib/dataStore';
import { User, PermitApplication } from '@/types';
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  ShieldCheck,
  UserCheck,
  Calendar,
  Sparkles,
  ExternalLink,
  Award,
  FileCheck2,
  Clock,
  Layers
} from 'lucide-react';

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permits, setPermits] = useState<PermitApplication[]>([]);

  const loadData = () => {
    setUser(getCurrentUser());
    getPermits().then(setPermits);
  };

  useEffect(() => {
    loadData();
    const handleAuthChange = () => loadData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, []);

  const isAdmin = user?.role === 'admin';
  const myPermits = permits.filter((p) =>
    isAdmin ? true : user?.ormawa_name ? p.namaormawa.includes(user.ormawa_name) : true
  );

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Profile Card Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#6666FF] to-blue-700 text-white p-6 sm:p-10 shadow-xl">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Big Avatar */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center font-black text-3xl sm:text-4xl shadow-2xl border-4 border-white/20 flex-shrink-0 ${
                isAdmin ? 'bg-indigo-600 text-white' : 'bg-[#FA8072] text-white'
              }`}
            >
              {isAdmin ? 'HM' : 'OM'}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isAdmin
                      ? 'bg-indigo-400/30 text-indigo-100 border border-indigo-300/40'
                      : 'bg-rose-400/30 text-rose-100 border border-rose-300/40'
                  }`}
                >
                  {isAdmin ? 'Admin Humas & Kemahasiswaan' : 'Organisasi Mahasiswa (Ormawa)'}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> Akun Terverifikasi
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isAdmin ? 'Bagian Hubungan Masyarakat & Kemahasiswaan' : user?.ormawa_name || 'Himpunan Mahasiswa'}
              </h1>
              <p className="text-xs sm:text-sm text-indigo-100 mt-1 font-medium">
                {user?.nama} &bull; Politeknik Negeri Indramayu (Polindra)
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#6666FF] flex items-center justify-center flex-shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Total Kegiatan</p>
              <p className="text-2xl font-black text-slate-900">{myPermits.length}</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Izin Disetujui</p>
              <p className="text-2xl font-black text-slate-900">
                {myPermits.filter((p) => p.status === 'disetujui').length}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Proses Berjalan</p>
              <p className="text-2xl font-black text-slate-900">
                {myPermits.filter((p) => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 8 cols: About & Institutional Bio */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isAdmin ? 'Tentang Unit Humas & Kemahasiswaan' : 'Profil & Visi Organisasi'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Informasi resmi institusi Politeknik Negeri Indramayu</p>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 text-justify space-y-2">
              <p>
                {isAdmin
                  ? 'Unit Hubungan Masyarakat dan Kemahasiswaan Politeknik Negeri Indramayu bertugas memfasilitasi, meninjau, serta memberikan izin resmi terhadap setiap rencana kegiatan akademik maupun non-akademik yang diajukan oleh seluruh organisasi mahasiswa (BEM, MPM, Himpunan Mahasiswa Jurusan, dan Unit Kegiatan Mahasiswa).'
                  : 'Organisasi Mahasiswa Politeknik Negeri Indramayu berdedikasi dalam mengembangkan potensi minat, bakat, kepemimpinan, dan penalaran ilmiah mahasiswa guna mencetak generasi unggul yang siap bersaing di tingkat nasional maupun internasional.'}
              </p>
              <p>
                Melalui platform digital CampusPass, seluruh alur surat menyurat, pengajuan anggaran, dan penjadwalan fasilitas gedung dilaksanakan secara transparan dan akuntabel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#6666FF] flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Institusi Induk</span>
                  <p className="font-bold text-slate-800">Politeknik Negeri Indramayu</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#6666FF] flex-shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Lokasi Kampus</span>
                  <p className="font-bold text-slate-800">Indramayu, Jawa Barat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 4 cols: Contacts & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-xs">
              <h4 className="font-bold text-sm text-slate-900">Kontak Resmi</h4>

              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-4 h-4 text-[#6666FF] flex-shrink-0" />
                  <span className="truncate">{user?.email || 'kontak@polindra.ac.id'}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-[#6666FF] flex-shrink-0" />
                  <span>(0234) 5746464</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-4 h-4 text-[#6666FF] flex-shrink-0" />
                  <span>Senin - Jumat, 08:00 - 16:00 WIB</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 block mb-2">Kanal Media Sosial</span>
                <div className="flex items-center gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                    <Image src="/icon/instagram.ico" alt="Instagram" width={28} height={28} />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                    <Image src="/icon/facebook.ico" alt="Facebook" width={28} height={28} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                    <Image src="/icon/twitter-x.ico" alt="Twitter X" width={28} height={28} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                    <Image src="/icon/github-logo.ico" alt="GitHub" width={28} height={28} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
