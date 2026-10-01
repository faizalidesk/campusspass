'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PermitApplication, User } from '@/types';
import {
  FileText,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  Search,
  Download,
  Eye,
  Calendar,
  Building2,
  AlertCircle,
  FileSpreadsheet,
  Check,
  ChevronRight,
  Sparkles,
  MapPin
} from 'lucide-react';

interface MahasiswaDashboardProps {
  user: User | null;
  permits: PermitApplication[];
  onRefresh: () => void;
}

export default function MahasiswaDashboard({ user, permits, onRefresh }: MahasiswaDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPermit, setSelectedPermit] = useState<PermitApplication | null>(null);

  // Filter permits for current ormawa or all if demo
  const userPermits = permits.filter((p) => {
    if (!user?.ormawa_name) return true;
    const normalizedUserOrmawa = user.ormawa_name.toLowerCase();
    const normalizedPermitOrmawa = p.namaormawa.toLowerCase();
    return (
      normalizedPermitOrmawa.includes(normalizedUserOrmawa) ||
      normalizedUserOrmawa.includes(normalizedPermitOrmawa) ||
      true // show all permits for demo richness
    );
  });

  const totalIzin = userPermits.length;
  const totalDisetujui = userPermits.filter((p) => p.status === 'disetujui').length;
  const totalPending = userPermits.filter((p) => p.status === 'pending').length;
  const totalDitolak = userPermits.filter((p) => p.status === 'ditolak').length;

  const filteredPermits = userPermits.filter(
    (p) =>
      p.namakegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.namaormawa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.kategori && p.kategori.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const latestPending = userPermits.find((p) => p.status === 'pending') || userPermits[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6666FF] via-indigo-600 to-blue-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-100">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-indigo-100 text-xs font-semibold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Portal Organisasi Mahasiswa &bull; Semester Genap 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Halo, {user?.nama || 'Pengurus Ormawa'}! 👋
            </h1>
            <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
              Kelola pengajuan perizinan acara, peminjaman aula kampus, dan pantau verifikasi dokumen RAB secara langsung dan transparan.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/izin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#6666FF] font-extrabold text-sm shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#6666FF]" />
              <span>Ajukan Izin Baru</span>
            </Link>
            <Link
              href="/laporan"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 backdrop-blur-md text-white font-semibold text-sm border border-white/25 hover:bg-white/25 transition cursor-pointer"
            >
              <span>Lihat Rekapitulasi</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. 4 Modern SaaS KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Permohonan
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6666FF] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalIzin}</span>
            <span className="text-xs font-semibold text-slate-400">Kegiatan</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Semua riwayat pengajuan kegiatan</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Menunggu Review
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalPending}</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
              Proses Humas
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Sedang ditinjau bagian kemahasiswaan</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Izin Disetujui
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalDisetujui}</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Surat Terbit
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Kegiatan telah mendapatkan izin resmi</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Perlu Revisi / Ditolak
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalDitolak}</span>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              Lihat Catatan
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Perlu penyesuaian jadwal atau berkas</p>
        </div>
      </div>

      {/* 3. Live Tracker Step Pipeline (Visual Stepper) */}
      {latestPending && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6666FF]">
                Live Tracker Status Pengajuan
              </span>
              <h3 className="text-lg font-bold text-slate-900">{latestPending.namakegiatan}</h3>
              <p className="text-xs text-slate-500">
                {latestPending.namaormawa} &bull; Jadwal: {latestPending.mulai} s/d {latestPending.akhir}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  latestPending.status === 'disetujui'
                    ? 'bg-emerald-100 text-emerald-700'
                    : latestPending.status === 'ditolak'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {latestPending.status === 'disetujui' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {latestPending.status === 'ditolak' && <XCircle className="w-3.5 h-3.5" />}
                {latestPending.status === 'pending' && <Clock className="w-3.5 h-3.5 animate-spin-slow" />}
                {latestPending.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stepper Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">1. Proposal Terkirim</p>
                <p className="text-[11px] text-slate-500">Formulir &amp; data tersimpan</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">2. Verifikasi Dokumen</p>
                <p className="text-[11px] text-slate-500">RAB: {latestPending.rab}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  latestPending.status === 'pending'
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                3
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">3. Review Humas</p>
                <p className="text-[11px] text-slate-500">
                  {latestPending.status === 'pending' ? 'Sedang ditinjau' : 'Selesai ditinjau'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  latestPending.status === 'disetujui'
                    ? 'bg-emerald-600 text-white'
                    : latestPending.status === 'ditolak'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                4
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">4. Keputusan Izin</p>
                <p className="text-[11px] text-slate-500">
                  {latestPending.status === 'disetujui'
                    ? 'Izin Resmi Diberikan'
                    : latestPending.status === 'ditolak'
                    ? 'Revisi Diperlukan'
                    : 'Menunggu Hasil'}
                </p>
              </div>
            </div>
          </div>

          {latestPending.keputusan && (
            <div className="mt-5 p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-3 text-xs text-slate-700">
              <AlertCircle className="w-4 h-4 text-[#6666FF] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Catatan dari Humas Polindra: </span>
                {latestPending.keputusan}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Active Submissions Table */}
      <div className="rounded-3xl bg-white border border-slate-200/80 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Daftar Permohonan Kegiatan Mahasiswa</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik pada baris kegiatan untuk melihat detail lengkap dan surat izin
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari acara / kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6666FF] w-56 transition"
              />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Nama Kegiatan &amp; Ormawa</th>
                <th className="py-3 px-3">Kategori</th>
                <th className="py-3 px-3">Jadwal Pelaksanaan</th>
                <th className="py-3 px-3">Anggaran RAB</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPermits.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    Tidak ditemukan data kegiatan.
                  </td>
                </tr>
              ) : (
                filteredPermits.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedPermit(item)}
                    className="hover:bg-indigo-50/40 transition cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 group-hover:text-[#6666FF] transition">
                        {item.namakegiatan}
                      </div>
                      <div className="text-[11px] text-slate-500">{item.namaormawa}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                        {item.kategori || 'Organisasi'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600 font-medium">
                      {item.mulai} s/d {item.akhir}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-semibold text-slate-700">
                      {item.anggaran || 'Rp 10.000.000'}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {item.status === 'disetujui' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Disetujui
                        </span>
                      )}
                      {item.status === 'ditolak' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3 h-3" /> Ditolak
                        </span>
                      )}
                      {item.status === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPermit(item);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#6666FF] hover:bg-indigo-50 transition"
                        title="Lihat Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Detail Modal */}
      {selectedPermit && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPermit(null)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6666FF]">
                  Detail Pengajuan &bull; {selectedPermit.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedPermit.namakegiatan}</h3>
                <p className="text-xs text-slate-500">{selectedPermit.namaormawa}</p>
              </div>
              <button
                onClick={() => setSelectedPermit(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl">
                <div>
                  <span className="text-slate-400 font-bold block">Tanggal Mulai</span>
                  <span className="font-semibold text-slate-800">{selectedPermit.mulai}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Tanggal Akhir</span>
                  <span className="font-semibold text-slate-800">{selectedPermit.akhir}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Kategori Acara</span>
                  <span className="font-semibold text-slate-800">{selectedPermit.kategori || 'Teknologi'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Estimasi Anggaran</span>
                  <span className="font-semibold text-indigo-600 font-mono">{selectedPermit.anggaran || 'Rp 10.000.000'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Undangan &amp; Sasaran:</span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl">{selectedPermit.undangan}</p>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Dokumen Lampiran / RAB:</span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[#6666FF]">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span className="font-mono font-semibold">{selectedPermit.rab}</span>
                  </div>
                  <span className="text-[11px] font-bold hover:underline cursor-pointer">
                    Unduh File
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Deskripsi Lengkap:</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
                  {selectedPermit.deskripsi}
                </p>
              </div>

              {selectedPermit.keputusan && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                  <span className="font-bold text-indigo-900 block mb-1">Keputusan &amp; Catatan Humas:</span>
                  <p className="text-indigo-800 leading-relaxed">{selectedPermit.keputusan}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedPermit(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Tutup
              </button>
              {selectedPermit.status === 'disetujui' && (
                <button
                  onClick={() => alert('Mengunduh Surat Keputusan Izin Resmi (PDF)...')}
                  className="px-5 py-2.5 rounded-xl bg-[#6666FF] hover:bg-indigo-600 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Surat Izin (PDF)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
