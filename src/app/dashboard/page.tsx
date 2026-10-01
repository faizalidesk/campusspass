'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AppLayout from '@/components/AppLayout';
import { getPermits, getCurrentUser } from '@/lib/dataStore';
import { PermitApplication, User } from '@/types';
import { ArrowRight, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

export default function DashboardPage() {
  const [permits, setPermits] = useState<PermitApplication[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    getPermits().then((data) => {
      setPermits(data);
      setLoading(false);
    });
  }, []);

  const totalIzin = permits.length;
  const totalDiterima = permits.filter((p) => p.status === 'disetujui').length;
  const totalDitolak = permits.filter((p) => p.status === 'ditolak').length;
  const totalPending = permits.filter((p) => p.status === 'pending').length;

  const statCards = [
    {
      title: 'Izin Kegiatan',
      count: String(totalIzin).padStart(2, '0'),
      bgImg: '/img/dizin.png',
      bgColor: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Izin ditolak',
      count: String(totalDitolak).padStart(2, '0'),
      bgImg: '/img/ditolak.png',
      bgColor: 'from-rose-500 to-red-700',
    },
    {
      title: 'Izin diterima',
      count: String(totalDiterima).padStart(2, '0'),
      bgImg: '/img/disetujui.png',
      bgColor: 'from-emerald-500 to-teal-700',
    },
    {
      title: 'list izin',
      count: String(totalPending).padStart(2, '0'),
      bgImg: '/img/dstat.png',
      bgColor: 'from-slate-600 to-gray-800',
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Top 4 Stat Cards (.con1) */}
        <div className="con1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, idx) => (
            <div
              key={idx}
              className={`relative h-44 rounded-2xl p-5 text-white flex items-end justify-between shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-1 bg-cover bg-center`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.65)), url(${stat.bgImg})`,
                backgroundColor: '#428dbe',
              }}
            >
              <div className="z-10">
                <p className="text-lg font-bold tracking-wide capitalize drop-shadow">
                  {stat.title}
                </p>
                <span className="text-xs text-blue-200 font-medium drop-shadow">
                  Total Data Kampus
                </span>
              </div>
              <div className="z-10">
                <span className="text-5xl font-black tracking-tight drop-shadow-md">
                  {stat.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section (.con2 with .bar1 and .bar2) */}
        <div className="con2 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main Card (.bar1) */}
          <div className="bar1 lg:col-span-8 bg-[#6666FF] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between border-b border-indigo-400/40 pb-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">
                    {user?.role === 'admin'
                      ? 'Daftar Pengajuan Izin Masuk'
                      : 'Status Izin Kegiatan Ormawa'}
                  </h3>
                  <p className="text-xs text-indigo-100 mt-0.5">
                    Monitoring terkini permohonan aktivitas dan perizinan ruang/kegiatan
                  </p>
                </div>
                <Link
                  href="/laporan"
                  className="text-xs bg-white text-[#6666FF] px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-50 transition shadow"
                >
                  Lihat Semua &rarr;
                </Link>
              </div>

              {/* Items List */}
              {loading ? (
                <div className="py-12 text-center text-indigo-100">Memuat data...</div>
              ) : permits.length === 0 ? (
                <div className="py-12 text-center text-indigo-100">Belum ada data kegiatan.</div>
              ) : (
                <div className="space-y-3">
                  {permits.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="bg-white/95 text-gray-800 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-md hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 text-[#6666FF] flex items-center justify-center font-bold flex-shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 leading-tight">
                            {p.namakegiatan}
                          </h4>
                          <p className="text-xs text-gray-500 font-medium">
                            {p.namaormawa} &bull; {p.mulai} s/d {p.akhir}
                          </p>
                        </div>
                      </div>

                      <div>
                        {p.status === 'disetujui' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" /> Disetujui
                          </span>
                        )}
                        {p.status === 'ditolak' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
                            <XCircle className="w-3.5 h-3.5" /> Ditolak
                          </span>
                        )}
                        {p.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" /> Pending
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-2 border-t border-indigo-400/30 flex justify-between items-center text-xs text-indigo-100">
              <span>Sistem Informasi Terintegrasi &bull; Polindra</span>
              <span>Terakhir diperbarui: Hari ini</span>
            </div>
          </div>

          {/* Side Action Card (.bar2) */}
          <div className="bar2 lg:col-span-4 bg-[#6666FF] rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between min-h-[420px]">
            <div>
              <h3 className="text-xl font-bold mb-2">Aksi Cepat</h3>
              <p className="text-xs text-indigo-100 leading-relaxed">
                {user?.role === 'admin'
                  ? 'Kirimkan balasan keputusan perizinan dan evaluasi dokumen RAB kepada organisasi mahasiswa.'
                  : 'Ajukan proposal kegiatan baru lengkap dengan rincian jadwal, undangan, dan dokumen rancangan anggaran biaya (RAB).'}
              </p>

              <div className="mt-6 bg-white/10 p-4 rounded-xl border border-white/20">
                <p className="text-xs text-indigo-100 mb-1 font-semibold">Status Pengguna Aktif</p>
                <p className="text-sm font-bold text-white">{user?.nama || 'User Ormawa'}</p>
                <p className="text-xs text-[#FA8072] font-semibold uppercase tracking-wider mt-0.5">
                  {user?.role === 'admin' ? 'Hak Akses: Humas Kampus' : 'Hak Akses: Pengurus Ormawa'}
                </p>
              </div>
            </div>

            {/* "Look at me!" button from original design */}
            <div className="pt-6">
              <Link
                href="/izin"
                className="w-full h-12 rounded-xl bg-white text-[#6666FF] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-50 hover:scale-[0.98] active:scale-[0.95] transition-all duration-200"
              >
                <span>{user?.role === 'admin' ? 'Beri Keputusan Izin' : 'Ajukan Izin Baru'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
