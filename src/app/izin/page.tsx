'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { addPermit, updatePermitStatus, getCurrentUser, getPermits } from '@/lib/dataStore';
import { User, PermitApplication } from '@/types';
import {
  Send,
  CheckCircle2,
  FileUp,
  Sparkles,
  Calendar,
  Building2,
  DollarSign,
  Users,
  FileSpreadsheet,
  Check,
  XCircle,
  Clock,
  HelpCircle,
  Layers,
  MapPin,
  AlertCircle
} from 'lucide-react';

export default function IzinPage() {
  const [user, setUser] = useState<User | null>(null);
  const [existingPermits, setExistingPermits] = useState<PermitApplication[]>([]);

  // Form Fields for Mahasiswa
  const [namaormawa, setNamaormawa] = useState('');
  const [namaacara, setNamaacara] = useState('');
  const [kategori, setKategori] = useState<'Teknologi' | 'Akademik' | 'Seni & Budaya' | 'Olahraga' | 'Organisasi'>('Teknologi');
  const [tanggalmulai, setTanggalmulai] = useState('');
  const [tanggalakhir, setTanggalakhir] = useState('');
  const [lokasi, setLokasi] = useState('Auditorium Gedung Utama Polindra');
  const [anggaran, setAnggaran] = useState('');
  const [penanggungJawab, setPenanggungJawab] = useState('');
  const [undangan, setUndangan] = useState('');
  const [rab, setRab] = useState('');
  const [desc, setDesc] = useState('');

  // Fields for Admin Review Hub
  const [selectedPermitId, setSelectedPermitId] = useState('');
  const [keputusanStatus, setKeputusanStatus] = useState<'disetujui' | 'ditolak'>('disetujui');
  const [catatanKeputusan, setCatatanKeputusan] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadData = () => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser?.ormawa_name) {
      setNamaormawa(currentUser.ormawa_name);
    }
    if (currentUser?.nama) {
      setPenanggungJawab(currentUser.nama);
    }
    getPermits().then((data) => {
      setExistingPermits(data);
      const firstPending = data.find((p) => p.status === 'pending');
      if (firstPending) {
        setSelectedPermitId(firstPending.id);
      }
    });
  };

  useEffect(() => {
    loadData();
    const handleAuthChange = () => loadData();
    window.addEventListener('campuspass_auth_change', handleAuthChange);
    return () => window.removeEventListener('campuspass_auth_change', handleAuthChange);
  }, []);

  const isAdmin = user?.role === 'admin';
  const selectedPermit = existingPermits.find((p) => p.id === selectedPermitId);

  const handleSubmitOrmawa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await addPermit({
      namaormawa: namaormawa || 'Organisasi Mahasiswa Polindra',
      namakegiatan: namaacara,
      mulai: tanggalmulai || '1 Juni 2026',
      akhir: tanggalakhir || '2 Juni 2026',
      undangan: undangan || 'Seluruh Civitas Akademika Polindra',
      rab: rab || 'Dokumen_RAB_Proposal.pdf',
      deskripsi: desc || 'Kegiatan penguatan minat dan bakat mahasiswa.',
      kategori: kategori,
      anggaran: anggaran || 'Rp 5.000.000',
      lokasi: lokasi,
      penanggung_jawab: penanggungJawab || user?.nama || 'Ketua Pelaksana',
    });

    setLoading(false);
    setSuccessMessage('Pengajuan izin kegiatan berhasil dikirim ke Bagian Kemahasiswaan & Humas!');
    setIsSubmitted(true);
    setNamaacara('');
    setDesc('');
    setAnggaran('');
    setTimeout(() => {
      setIsSubmitted(false);
      setSuccessMessage('');
    }, 5000);
  };

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPermitId) return;
    setLoading(true);

    const notes =
      catatanKeputusan ||
      (keputusanStatus === 'disetujui'
        ? 'Disetujui resmi oleh Humas & Kemahasiswaan Polindra.'
        : 'Ditolak untuk revisi kelengkapan dokumen atau jadwal.');

    await updatePermitStatus(selectedPermitId, keputusanStatus, notes);

    setLoading(false);
    setSuccessMessage(`Keputusan "${keputusanStatus}" telah diterbitkan dan terkirim ke Ormawa!`);
    setIsSubmitted(true);
    setCatatanKeputusan('');
    loadData();
    setTimeout(() => {
      setIsSubmitted(false);
      setSuccessMessage('');
    }, 5000);
  };

  const setQuickNote = (note: string) => {
    setCatatanKeputusan(note);
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              {isAdmin ? 'Pusat Review & Keputusan Izin' : 'Formulir Pengajuan Izin Kegiatan'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {isAdmin
                ? 'Validasi permohonan, dokumen RAB, dan terbitkan persetujuan resmi'
                : 'Lengkapi rincian kegiatan ormawa Anda untuk diteruskan ke Humas & Kemahasiswaan'}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-50 text-[#6666FF] border border-indigo-100 self-start sm:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            {isAdmin ? 'Mode Verifikator Humas' : 'Format Standar Polindra 2026'}
          </span>
        </div>

        {/* Success Alert */}
        {isSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2.5 shadow-lg animate-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAHASISWA PORTAL: Form Input + Live Card Preview */}
        {/* ========================================================================= */}
        {!isAdmin ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <form onSubmit={handleSubmitOrmawa} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Organisasi Mahasiswa
                  </label>
                  <input
                    type="text"
                    value={namaormawa}
                    onChange={(e) => setNamaormawa(e.target.value)}
                    placeholder="Contoh: Himpunan Mahasiswa Teknik Informatika (HIMATIF)"
                    required
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Nama Acara / Kegiatan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={namaacara}
                    onChange={(e) => setNamaacara(e.target.value)}
                    placeholder="Contoh: Technovest 5.0 - Seminar Nasional & Hackathon"
                    required
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Kategori Kegiatan
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value as any)}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF]"
                    >
                      <option value="Teknologi">Teknologi &amp; Sains</option>
                      <option value="Akademik">Akademik &amp; Seminar</option>
                      <option value="Seni & Budaya">Seni &amp; Kebudayaan</option>
                      <option value="Olahraga">Olahraga &amp; Minat Bakat</option>
                      <option value="Organisasi">Organisasi &amp; Kaderisasi</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Estimasi Anggaran (RAB)
                    </label>
                    <input
                      type="text"
                      value={anggaran}
                      onChange={(e) => setAnggaran(e.target.value)}
                      placeholder="Contoh: Rp 12.500.000"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tanggal Mulai <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tanggalmulai}
                      onChange={(e) => setTanggalmulai(e.target.value)}
                      placeholder="Contoh: 20 Juni 2026"
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Tanggal Berakhir <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={tanggalakhir}
                      onChange={(e) => setTanggalakhir(e.target.value)}
                      placeholder="Contoh: 22 Juni 2026"
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Lokasi / Ruangan Digunakan
                    </label>
                    <input
                      type="text"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      placeholder="Contoh: Gedung Serbaguna Polindra"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Penanggung Jawab (Ketupel)
                    </label>
                    <input
                      type="text"
                      value={penanggungJawab}
                      onChange={(e) => setPenanggungJawab(e.target.value)}
                      placeholder="Contoh: Ahmad Subagja"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Sasaran Undangan / Peserta
                  </label>
                  <input
                    type="text"
                    value={undangan}
                    onChange={(e) => setUndangan(e.target.value)}
                    placeholder="Contoh: Mahasiswa Polindra & Peserta Lomba Umum"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Dokumen RAB / File Lampiran Proposal
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={rab}
                      onChange={(e) => setRab(e.target.value)}
                      placeholder="Contoh: RAB_Technovest_2026_Final.pdf"
                      className="flex-1 h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition"
                    />
                    <label className="h-11 px-4 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center cursor-pointer text-slate-700 text-xs font-bold transition flex-shrink-0">
                      <FileUp className="w-4 h-4 mr-1 text-[#6666FF]" /> Unggah
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setRab(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Deskripsi Ringkas Kegiatan
                  </label>
                  <textarea
                    rows={3}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Jelaskan tujuan, ruang lingkup, dan susunan agenda kegiatan..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition resize-none"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#6666FF] via-indigo-600 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Menyimpan Pengajuan...' : 'Kirim Pengajuan Izin ke Humas'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Real-time Live Preview Card (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-[#6666FF] to-blue-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-200">
                    Live Preview Card
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                    Draft Aktif
                  </span>
                </div>

                <div>
                  <span className="text-xs text-indigo-200 font-semibold block">
                    {namaormawa || 'Nama Organisasi'}
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5 leading-snug">
                    {namaacara || 'Nama Kegiatan Belum Diisi'}
                  </h3>
                  <div className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-white/15 text-white text-[11px] font-bold">
                    {kategori}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-indigo-200">Jadwal:</span>
                    <span className="font-bold">
                      {tanggalmulai || '-'} s/d {tanggalakhir || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-indigo-200">Lokasi:</span>
                    <span className="font-bold text-right truncate max-w-[180px]">{lokasi}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-indigo-200">Estimasi Biaya:</span>
                    <span className="font-mono font-bold text-amber-300">
                      {anggaran || 'Rp 0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-indigo-200">File Lampiran:</span>
                    <span className="font-mono text-[11px] truncate max-w-[160px]">
                      {rab || 'Belum ada file'}
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/15 text-xs">
                  <span className="text-indigo-200 font-bold block mb-1">Deskripsi Ringkas:</span>
                  <p className="text-indigo-100 text-[11px] leading-relaxed line-clamp-4">
                    {desc || 'Deskripsi kegiatan akan ditampilkan di sini secara langsung saat Anda mengetik.'}
                  </p>
                </div>

                <div className="pt-2 text-[11px] text-indigo-200 text-center">
                  CampusPass &bull; Politeknik Negeri Indramayu
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* ADMIN PORTAL: Review Hub with Queue Selector & Decision Form */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Pending Permits Selector List */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900">Pilih Pengajuan Masuk</h3>
                <span className="text-xs font-bold text-[#6666FF] bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  {existingPermits.length} Total
                </span>
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {existingPermits.map((item) => {
                  const isSelected = item.id === selectedPermitId;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPermitId(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 border-[#6666FF] shadow-sm'
                          : 'bg-white border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {item.id} &bull; {item.kategori || 'Kegiatan'}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.status === 'disetujui'
                              ? 'bg-emerald-100 text-emerald-700'
                              : item.status === 'ditolak'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 mt-1">{item.namakegiatan}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.namaormawa}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 7 Cols: Decision & Review Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              {selectedPermit ? (
                <form onSubmit={handleSubmitAdmin} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-bold text-[#6666FF] uppercase tracking-wider">
                      Detail Pengajuan Terpilih
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{selectedPermit.namakegiatan}</h3>
                    <p className="text-xs text-slate-500">{selectedPermit.namaormawa}</p>
                  </div>

                  {/* Summary Card */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block">Jadwal:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedPermit.mulai} s/d {selectedPermit.akhir}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Anggaran RAB:</span>
                      <span className="font-semibold text-indigo-600 font-mono">
                        {selectedPermit.anggaran || 'Rp 10.000.000'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Dokumen Lampiran:</span>
                      <span className="font-semibold text-indigo-600 font-mono underline flex items-center gap-1 cursor-pointer">
                        <FileSpreadsheet className="w-3.5 h-3.5" /> {selectedPermit.rab}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">Penanggung Jawab:</span>
                      <span className="font-semibold text-slate-800">
                        {selectedPermit.penanggung_jawab || 'Ketua Ormawa'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-1">Deskripsi Kegiatan:</span>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl leading-relaxed">
                      {selectedPermit.deskripsi}
                    </p>
                  </div>

                  {/* Decision Selector Pill */}
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-2">
                      Tentukan Keputusan Status Izin:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setKeputusanStatus('disetujui')}
                        className={`p-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition cursor-pointer ${
                          keputusanStatus === 'disetujui'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-500 shadow-sm ring-2 ring-emerald-200'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Setujui Permohonan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setKeputusanStatus('ditolak')}
                        className={`p-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition cursor-pointer ${
                          keputusanStatus === 'ditolak'
                            ? 'bg-rose-50 text-rose-700 border-rose-500 shadow-sm ring-2 ring-rose-200'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Tolak / Butuh Revisi</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Preset Badges */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      Pilihan Template Cepat Catatan:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setQuickNote(
                            'Disetujui penuh. Harap berkoordinasi dengan bagian keamanan dan UPT Sarana Prasarana.'
                          )
                        }
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        + Disetujui Penuh
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setQuickNote(
                            'Disetujui dengan catatan menjaga kebersihan dan ketertiban ruangan aula utama.'
                          )
                        }
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        + Disetujui Bersyarat
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setQuickNote(
                            'Ditolak sementara karena jadwal bentrok dengan agenda akademik kampus (UTS/UAS).'
                          )
                        }
                        className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                      >
                        + Jadwal Bentrok
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Catatan Evaluasi / Surat Balasan:
                    </label>
                    <textarea
                      rows={3}
                      value={catatanKeputusan}
                      onChange={(e) => setCatatanKeputusan(e.target.value)}
                      placeholder="Tuliskan catatan detail untuk pengurus ormawa..."
                      required
                      className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#6666FF] to-indigo-700 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? 'Menerbitkan Keputusan...' : 'Kirim Balasan Keputusan Resmi'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-16 text-center text-slate-400">
                  <p className="font-bold text-sm text-slate-700">Pilih salah satu pengajuan di sisi kiri</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Untuk meninjau berkas dan memberikan keputusan resmi.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
