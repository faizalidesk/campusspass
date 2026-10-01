'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { getPermits, getBalasan, getCurrentUser } from '@/lib/dataStore';
import { PermitApplication, Balasan, User } from '@/types';
import { Search, FileSpreadsheet, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function LaporanPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permits, setPermits] = useState<PermitApplication[]>([]);
  const [balasanList, setBalasanList] = useState<Balasan[]>([]);
  const [activeTab, setActiveTab] = useState<'permits' | 'balasan'>('permits');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    Promise.all([getPermits(), getBalasan()]).then(([p, b]) => {
      setPermits(p);
      setBalasanList(b);
      setLoading(false);
    });
  }, []);

  const filteredPermits = permits.filter((p) =>
    p.namaormawa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.namakegiatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBalasan = balasanList.filter((b) =>
    b.namaormawa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.namakegiatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="con2 w-full">
        <div className="bar1 w-full bg-[#6666FF] rounded-2xl p-6 lg:p-8 text-white shadow-2xl">
          
          {/* Header Bar & Tab Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-400/40 pb-5 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {activeTab === 'permits'
                  ? 'Laporan Kegiatan & Permohonan Izin'
                  : 'Laporan Balasan & Keputusan Kampus'}
              </h2>
              <p className="text-xs text-indigo-100 mt-0.5">
                Rekapitulasi data resmi pengajuan kegiatan Politeknik Negeri Indramayu
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari ormawa/kegiatan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 h-10 rounded-xl bg-white text-gray-800 text-xs font-medium focus:outline-none w-52 shadow"
                />
              </div>

              {/* Tab Switcher */}
              <div className="flex bg-indigo-800/60 p-1 rounded-xl border border-indigo-400/30">
                <button
                  onClick={() => setActiveTab('permits')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'permits'
                      ? 'bg-white text-[#6666FF] shadow'
                      : 'text-indigo-100 hover:text-white'
                  }`}
                >
                  Daftar Pengajuan ({permits.length})
                </button>
                <button
                  onClick={() => setActiveTab('balasan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    activeTab === 'balasan'
                      ? 'bg-white text-[#6666FF] shadow'
                      : 'text-indigo-100 hover:text-white'
                  }`}
                >
                  Laporan Balasan ({balasanList.length})
                </button>
              </div>
            </div>
          </div>

          {/* Table Container with Salmon Header */}
          <div className="w-full overflow-x-auto rounded-xl shadow-lg border border-indigo-400/40">
            {loading ? (
              <div className="p-12 text-center text-indigo-100 font-semibold bg-white/10">
                Memuat data laporan...
              </div>
            ) : activeTab === 'permits' ? (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FA8072] text-white font-bold">
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Nama Ormawa</th>
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Nama Kegiatan</th>
                    <th className="py-3.5 px-3 text-center border-r border-rose-300 w-32">Mulai</th>
                    <th className="py-3.5 px-3 text-center border-r border-rose-300 w-32">Akhir</th>
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Undangan</th>
                    <th className="py-3.5 px-3 text-center border-r border-rose-300 w-28">RAB</th>
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Deskripsi</th>
                    <th className="py-3.5 px-3 text-center w-28">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPermits.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-10 text-center bg-white text-gray-500 font-medium">
                        Tidak ada data pengajuan yang cocok.
                      </td>
                    </tr>
                  ) : (
                    filteredPermits.map((item) => (
                      <tr key={item.id} className="hover:bg-indigo-50/80 transition text-gray-800">
                        <td className="py-3.5 px-4 bg-white font-bold text-gray-900 border-r border-gray-100">
                          {item.namaormawa}
                        </td>
                        <td className="py-3.5 px-4 bg-white font-semibold text-gray-800 border-r border-gray-100">
                          {item.namakegiatan}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center text-xs text-gray-600 border-r border-gray-100">
                          {item.mulai}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center text-xs text-gray-600 border-r border-gray-100">
                          {item.akhir}
                        </td>
                        <td className="py-3.5 px-4 bg-white text-xs text-gray-700 border-r border-gray-100">
                          {item.undangan}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center border-r border-gray-100">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                            <FileSpreadsheet className="w-3 h-3" />
                            {item.rab}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 bg-white text-xs text-gray-600 max-w-xs truncate border-r border-gray-100" title={item.deskripsi}>
                          {item.deskripsi}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center">
                          {item.status === 'disetujui' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3" /> Disetujui
                            </span>
                          )}
                          {item.status === 'ditolak' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                              <XCircle className="w-3 h-3" /> Ditolak
                            </span>
                          )}
                          {item.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#FA8072] text-white font-bold">
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Nama Ormawa</th>
                    <th className="py-3.5 px-4 text-center border-r border-rose-300">Nama Kegiatan</th>
                    <th className="py-3.5 px-3 text-center border-r border-rose-300 w-36">Mulai</th>
                    <th className="py-3.5 px-3 text-center border-r border-rose-300 w-36">Akhir</th>
                    <th className="py-3.5 px-6 text-center">Keputusan / Evaluasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBalasan.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center bg-white text-gray-500 font-medium">
                        Belum ada data balasan keputusan.
                      </td>
                    </tr>
                  ) : (
                    filteredBalasan.map((item) => (
                      <tr key={item.id} className="hover:bg-indigo-50/80 transition text-gray-800">
                        <td className="py-3.5 px-4 bg-white font-bold text-gray-900 border-r border-gray-100">
                          {item.namaormawa}
                        </td>
                        <td className="py-3.5 px-4 bg-white font-semibold text-gray-800 border-r border-gray-100">
                          {item.namakegiatan}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center text-xs text-gray-600 border-r border-gray-100">
                          {item.mulai}
                        </td>
                        <td className="py-3.5 px-3 bg-white text-center text-xs text-gray-600 border-r border-gray-100">
                          {item.akhir}
                        </td>
                        <td className="py-3.5 px-6 bg-white text-xs font-medium text-gray-800">
                          <div className="bg-indigo-50/70 p-2.5 rounded-lg border border-indigo-100">
                            {item.keputusan}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-indigo-100 gap-2">
            <span>Menampilkan data terdaftar di Sistem Perizinan Polindra</span>
            <span>Total Record: {activeTab === 'permits' ? filteredPermits.length : filteredBalasan.length} baris</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
