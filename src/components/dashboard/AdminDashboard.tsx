'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PermitApplication, User, ActivityLog } from '@/types';
import { updatePermitStatus, getActivityLogs } from '@/lib/dataStore';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Building2,
  DollarSign,
  AlertCircle,
  ShieldCheck,
  Send,
  Eye,
  FileSpreadsheet,
  Download,
  Calendar
} from 'lucide-react';

interface AdminDashboardProps {
  user: User | null;
  permits: PermitApplication[];
  onRefresh: () => void;
}

export default function AdminDashboard({ user, permits, onRefresh }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewingPermit, setReviewingPermit] = useState<PermitApplication | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const pendingPermits = permits.filter((p) => p.status === 'pending');
  const approvedPermits = permits.filter((p) => p.status === 'disetujui');
  const rejectedPermits = permits.filter((p) => p.status === 'ditolak');

  const totalPermits = permits.length;
  const approvalRate = totalPermits > 0 ? Math.round((approvedPermits.length / totalPermits) * 100) : 0;

  const logs = getActivityLogs();

  const handleDecision = async (status: 'disetujui' | 'ditolak') => {
    if (!reviewingPermit) return;
    setIsProcessing(true);

    const notes = decisionNotes || (status === 'disetujui' ? 'Disetujui penuh oleh Humas Kampus.' : 'Ditolak untuk revisi jadwal/dokumen.');
    await updatePermitStatus(reviewingPermit.id, status, notes);

    setIsProcessing(false);
    setReviewingPermit(null);
    setDecisionNotes('');
    setToastMessage(`Permohonan ${reviewingPermit.namakegiatan} berhasil di-${status}!`);
    setTimeout(() => setToastMessage(''), 4000);
    onRefresh();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-between shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-white/80 hover:text-white">&times;</button>
        </div>
      )}

      {/* 1. Admin Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-[#6666FF]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 backdrop-blur-sm text-indigo-300 text-xs font-semibold mb-3 border border-indigo-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Pusat Kendali Humas &amp; Kemahasiswaan Polindra</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dashboard Eksekutif Admin 🏢
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Monitoring seluruh proposal kegiatan, alokasi jadwal fasilitas aula, dan validasi anggaran organisasi mahasiswa secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/izin"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#6666FF] hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-950/50 transition-all duration-200 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Antrean Review ({pendingPermits.length})</span>
            </Link>
            <Link
              href="/laporan"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md text-white font-semibold text-sm border border-white/15 hover:bg-white/20 transition cursor-pointer"
            >
              <span>Master Rekapitulasi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Executive 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Pengajuan
            </span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#6666FF] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{totalPermits}</span>
            <span className="text-xs font-semibold text-slate-400">Proposal</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Semua ormawa terdaftar</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Perlu Ditinjau Segera
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">{pendingPermits.length}</span>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md animate-pulse">
              Urgent
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Menunggu keputusan Humas</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Tingkat Persetujuan
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{approvalRate}%</span>
            <span className="text-xs font-semibold text-emerald-600 font-bold">
              {approvedPermits.length} Disetujui
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Rasio kelayakan proposal</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
              Permohonan Ditolak
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{rejectedPermits.length}</span>
            <span className="text-xs font-semibold text-rose-600 font-bold">Jadwal Bentrok</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">Memerlukan revisi dari ormawa</p>
        </div>
      </div>

      {/* 3. Main Grid: Pending Decision Queue (Left) & Live Feed / Analytics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Action Center / Pending Review Queue */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <h3 className="text-lg font-bold text-slate-900">
                    Antrean Permohonan Masuk (Action Hub)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tinjau berkas RAB dan berikan persetujuan perizinan dalam 1-klik
                </p>
              </div>

              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                {pendingPermits.length} Perlu Respon
              </span>
            </div>

            {pendingPermits.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 opacity-80" />
                <p className="font-bold text-slate-800 text-sm">Semua Pengajuan Telah Ditinjau!</p>
                <p className="text-xs text-slate-500 mt-1">Tidak ada proposal tertunda saat ini.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 mt-2">
                {pendingPermits.map((item) => (
                  <div
                    key={item.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 p-3 rounded-2xl transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-[#6666FF] font-bold text-[10px]">
                          {item.kategori || 'Teknologi'}
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">{item.namakegiatan}</h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        {item.namaormawa} &bull; PJ: <span className="font-semibold text-slate-800">{item.penanggung_jawab || 'Ketua Ormawa'}</span>
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span>📅 {item.mulai} s/d {item.akhir}</span>
                        <span>💰 {item.anggaran || 'Rp 10.000.000'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => {
                          setReviewingPermit(item);
                          setDecisionNotes('');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6666FF] to-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-100 hover:opacity-95 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Tinjau &amp; Balas</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Master Overview Table */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Rekap Kegiatan Terbaru</h3>
              <Link href="/laporan" className="text-xs font-bold text-[#6666FF] hover:underline flex items-center gap-1">
                Lihat Semua Laporan <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3">Organisasi</th>
                    <th className="py-2.5 px-3">Kegiatan</th>
                    <th className="py-2.5 px-3">Tanggal</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {permits.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">{p.namaormawa}</td>
                      <td className="py-2.5 px-3 text-slate-700">{p.namakegiatan}</td>
                      <td className="py-2.5 px-3 text-slate-500">{p.mulai}</td>
                      <td className="py-2.5 px-3 text-center">
                        {p.status === 'disetujui' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                            Disetujui
                          </span>
                        )}
                        {p.status === 'ditolak' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
                            Ditolak
                          </span>
                        )}
                        {p.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: System Activity Logs & Ormawa Distribution */}
        <div className="lg:col-span-4 space-y-4">
          {/* Ormawa Stats Widget */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-3">Distribusi Kegiatan Ormawa</h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Teknologi &amp; Sains</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#6666FF] h-2 rounded-full w-[40%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Organisasi &amp; Kaderisasi</span>
                  <span>30%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[30%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Seni &amp; Kebudayaan</span>
                  <span>20%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-[#FA8072] h-2 rounded-full w-[20%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Olahraga &amp; Minat Bakat</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h4 className="font-bold text-sm text-slate-900">Log Aktivitas Humas</h4>
              <span className="text-[10px] font-bold text-slate-400">Live</span>
            </div>

            <div className="space-y-3">
              {logs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-xs">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white text-[10px] font-bold ${
                      log.type === 'approve'
                        ? 'bg-emerald-500'
                        : log.type === 'reject'
                        ? 'bg-rose-500'
                        : 'bg-[#6666FF]'
                    }`}
                  >
                    {log.type === 'approve' ? '✓' : log.type === 'reject' ? '✕' : 'ℹ'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-snug">{log.title}</p>
                    <p className="text-[11px] text-slate-500 leading-snug">{log.description}</p>
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Decision & Review Modal */}
      {reviewingPermit && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setReviewingPermit(null)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6666FF]">
                  Panel Keputusan Humas &bull; {reviewingPermit.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{reviewingPermit.namakegiatan}</h3>
                <p className="text-xs text-slate-500">{reviewingPermit.namaormawa}</p>
              </div>
              <button
                onClick={() => setReviewingPermit(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl">
                <div>
                  <span className="text-slate-400 font-bold block">Tanggal Pelaksanaan</span>
                  <span className="font-semibold text-slate-800">{reviewingPermit.mulai} s/d {reviewingPermit.akhir}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Anggaran RAB</span>
                  <span className="font-semibold text-indigo-600 font-mono">{reviewingPermit.anggaran || 'Rp 10.000.000'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Sasaran Undangan</span>
                  <span className="font-semibold text-slate-800">{reviewingPermit.undangan}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Dokumen Anggaran (RAB)</span>
                  <span className="font-semibold text-indigo-600 underline font-mono flex items-center gap-1 cursor-pointer">
                    <FileSpreadsheet className="w-3.5 h-3.5" /> {reviewingPermit.rab}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-bold block mb-1">Deskripsi Kegiatan:</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl leading-relaxed">
                  {reviewingPermit.deskripsi}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  Catatan Evaluasi / Catatan Surat Balasan:
                </label>
                <textarea
                  rows={3}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="Contoh: Disetujui penuh. Harap menjaga kebersihan aula dan berkoordinasi dengan keamanan..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition resize-none"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => setReviewingPermit(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleDecision('ditolak')}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Tolak / Minta Revisi
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => handleDecision('disetujui')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-emerald-200 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Setujui &amp; Terbitkan Izin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
