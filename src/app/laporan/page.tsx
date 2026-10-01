'use client';

import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { getPermits, getBalasan, getCurrentUser } from '@/lib/dataStore';
import { PermitApplication, Balasan, User } from '@/types';
import {
  Search,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  Eye,
  FileText,
  Printer,
  Calendar,
  Building2,
  FolderKanban,
  Sparkles
} from 'lucide-react';

export default function LaporanPage() {
  const [user, setUser] = useState<User | null>(null);
  const [permits, setPermits] = useState<PermitApplication[]>([]);
  const [balasanList, setBalasanList] = useState<Balasan[]>([]);
  const [activeTab, setActiveTab] = useState<'permits' | 'balasan'>('permits');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'disetujui' | 'ditolak'>('all');
  const [selectedPermit, setSelectedPermit] = useState<PermitApplication | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setUser(getCurrentUser());
    Promise.all([getPermits(), getBalasan()]).then(([p, b]) => {
      setPermits(p);
      setBalasanList(b);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
    const handleAuthChange = () => loadData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, []);

  const isAdmin = user?.role === 'admin';

  const filteredPermits = permits.filter((p) => {
    const matchesSearch =
      p.namaormawa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.namakegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.kategori && p.kategori.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredBalasan = balasanList.filter((b) =>
    b.namaormawa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.namakegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.keputusan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ['ID', 'Nama Ormawa', 'Nama Kegiatan', 'Kategori', 'Tanggal Mulai', 'Tanggal Akhir', 'Anggaran', 'Status', 'Keputusan'];
    const rows = permits.map((p) => [
      p.id,
      `"${p.namaormawa}"`,
      `"${p.namakegiatan}"`,
      `"${p.kategori || 'Organisasi'}"`,
      `"${p.mulai}"`,
      `"${p.akhir}"`,
      `"${p.anggaran || 'Rp 0'}"`,
      `"${p.status}"`,
      `"${p.keputusan || '-'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Izin_Kegiatan_Polindra_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
        {/* Top Header & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-[#6666FF]" />
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                {isAdmin ? 'Master Data & Rekapitulasi Izin Kegiatan' : 'Riwayat Pengajuan & Surat Balasan Ormawa'}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Rekapitulasi berkas resmi, arsip perizinan, dan keputusan dari Kemahasiswaan &amp; Humas Polindra
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Ekspor CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-[#6666FF] hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-100 transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Laporan</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
            <button
              onClick={() => setActiveTab('permits')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'permits'
                  ? 'bg-white text-[#6666FF] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Daftar Pengajuan ({permits.length})
            </button>
            <button
              onClick={() => setActiveTab('balasan')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'balasan'
                  ? 'bg-white text-[#6666FF] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Keputusan Balasan ({balasanList.length})
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {activeTab === 'permits' && (
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
                <span className="text-[11px] font-bold text-slate-400 px-2">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-none pr-2 cursor-pointer text-xs"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu (Pending)</option>
                  <option value="disetujui">Disetujui</option>
                  <option value="ditolak">Ditolak</option>
                </select>
              </div>
            )}

            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari ormawa/kegiatan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 h-10 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
              />
            </div>
          </div>
        </div>

        {/* Master Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-slate-400 font-semibold">
              <div className="w-8 h-8 border-4 border-[#6666FF] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              Memuat data laporan...
            </div>
          ) : activeTab === 'permits' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-bold">
                    <th className="py-3.5 px-4">Nama Ormawa &amp; Kontak</th>
                    <th className="py-3.5 px-4">Nama Kegiatan</th>
                    <th className="py-3.5 px-3">Kategori</th>
                    <th className="py-3.5 px-3 text-center">Jadwal Acara</th>
                    <th className="py-3.5 px-3">Anggaran RAB</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                    <th className="py-3.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPermits.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                        Tidak ada pengajuan yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredPermits.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedPermit(item)}
                        className="hover:bg-indigo-50/40 transition cursor-pointer group"
                      >
                        <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#6666FF]">
                          <div>{item.namaormawa}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            PJ: {item.penanggung_jawab || 'Ketua Panitia'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">
                          {item.namakegiatan}
                          <div className="text-[10px] text-slate-500 font-normal max-w-xs truncate">
                            {item.lokasi || 'Kampus Polindra'}
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[10px]">
                            {item.kategori || 'Teknologi'}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center text-slate-600 font-medium">
                          {item.mulai} s/d {item.akhir}
                        </td>
                        <td className="py-3.5 px-3 font-mono font-semibold text-indigo-600">
                          {item.anggaran || 'Rp 10.000.000'}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {item.status === 'disetujui' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Disetujui
                            </span>
                          )}
                          {item.status === 'ditolak' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle className="w-3 h-3" /> Ditolak
                            </span>
                          )}
                          {item.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                              <Clock className="w-3 h-3" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPermit(item);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#6666FF] hover:bg-indigo-50 transition"
                            title="Buka Detail"
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
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-bold">
                    <th className="py-3.5 px-4">Nama Ormawa</th>
                    <th className="py-3.5 px-4">Nama Kegiatan</th>
                    <th className="py-3.5 px-3 text-center">Jadwal Disetujui</th>
                    <th className="py-3.5 px-4">Catatan &amp; Keputusan Humas</th>
                    <th className="py-3.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBalasan.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                        Belum ada arsip balasan keputusan.
                      </td>
                    </tr>
                  ) : (
                    filteredBalasan.map((item) => (
                      <tr key={item.id} className="hover:bg-indigo-50/40 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{item.namaormawa}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{item.namakegiatan}</td>
                        <td className="py-3.5 px-3 text-center text-slate-600">
                          {item.mulai} s/d {item.akhir}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          <div className="bg-indigo-50/60 p-2.5 rounded-xl border border-indigo-100/80 text-[11px] leading-relaxed">
                            {item.keputusan}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.status === 'disetujui' || item.keputusan.toLowerCase().includes('setuju')
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}
                          >
                            {item.status === 'disetujui' || item.keputusan.toLowerCase().includes('setuju') ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" /> Disetujui
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" /> Ditolak
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>Menampilkan data resmi Sistem Informasi Kampus Politeknik Negeri Indramayu</span>
            <span>
              Total Rekap:{' '}
              <strong className="text-slate-800">
                {activeTab === 'permits' ? filteredPermits.length : filteredBalasan.length}
              </strong>{' '}
              data
            </span>
          </div>
        </div>

        {/* Modal Detail */}
        {selectedPermit && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedPermit(null)}
          >
            <div
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6666FF]">
                    Arsip Resmi &bull; {selectedPermit.id}
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
                    <span className="text-slate-400 font-bold block">Jadwal:</span>
                    <span className="font-semibold text-slate-800">{selectedPermit.mulai} s/d {selectedPermit.akhir}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Kategori:</span>
                    <span className="font-semibold text-slate-800">{selectedPermit.kategori || 'Organisasi'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Anggaran RAB:</span>
                    <span className="font-semibold text-indigo-600 font-mono">{selectedPermit.anggaran || 'Rp 10.000.000'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block">Lokasi:</span>
                    <span className="font-semibold text-slate-800">{selectedPermit.lokasi || 'Kampus Polindra'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1">Undangan / Sasaran:</span>
                  <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl">{selectedPermit.undangan}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1">Dokumen Lampiran:</span>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[#6666FF]">
                    <span className="font-mono font-semibold">{selectedPermit.rab}</span>
                    <span className="text-[11px] font-bold hover:underline cursor-pointer">Unduh File</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1">Deskripsi Kegiatan:</span>
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
    </AppLayout>
  );
}
