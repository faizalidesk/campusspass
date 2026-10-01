'use client';

import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { addPermit, addBalasan, getCurrentUser, getPermits } from '@/lib/dataStore';
import { User, PermitApplication } from '@/types';
import { Send, CheckCircle2, FileUp } from 'lucide-react';

export default function IzinPage() {
  const [user, setUser] = useState<User | null>(null);
  const [existingPermits, setExistingPermits] = useState<PermitApplication[]>([]);

  // Form Fields
  const [namaormawa, setNamaormawa] = useState('');
  const [namaacara, setNamaacara] = useState('');
  const [tanggalmulai, setTanggalmulai] = useState('');
  const [tanggalakhir, setTanggalakhir] = useState('');
  const [undangan, setUndangan] = useState('');
  const [rab, setRab] = useState('');
  const [desc, setDesc] = useState('');
  const [keputusan, setKeputusan] = useState('Disetujui');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    if (currentUser?.ormawa_name) {
      setNamaormawa(currentUser.ormawa_name);
    }
    getPermits().then(setExistingPermits);
  }, []);

  const handleSelectPermitForAdmin = (permitId: string) => {
    const selected = existingPermits.find(p => p.id === permitId);
    if (selected) {
      setNamaormawa(selected.namaormawa);
      setNamaacara(selected.namakegiatan);
      setTanggalmulai(selected.mulai);
      setTanggalakhir(selected.akhir);
      setUndangan(selected.undangan);
      setRab(selected.rab);
      setDesc(selected.deskripsi);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (user?.role === 'admin') {
      await addBalasan({
        namaormawa,
        namakegiatan: namaacara,
        mulai: tanggalmulai,
        akhir: tanggalakhir,
        keputusan,
      });
    } else {
      await addPermit({
        namaormawa,
        namakegiatan: namaacara,
        mulai: tanggalmulai,
        akhir: tanggalakhir,
        undangan: undangan || 'Terbuka untuk Mahasiswa',
        rab: rab || 'Dokumen_RAB.pdf',
        deskripsi: desc,
      });
    }

    setLoading(false);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AppLayout>
      <div className="con2 w-full">
        <div className="bar1 w-full bg-[#6666FF] rounded-2xl p-6 lg:p-8 text-white shadow-2xl flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Form (.lop) */}
          <div className="lop w-full lg:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
                {isAdmin
                  ? 'Form Balasan kepada Ormawa'
                  : 'Form pendaftaran kegiatan organisasi mahasiswa'}
              </h3>
            </div>

            {isAdmin && existingPermits.length > 0 && (
              <div className="mb-4 bg-indigo-700/60 p-3.5 rounded-xl border border-indigo-400/30">
                <label className="text-xs font-bold text-indigo-100 block mb-1">
                  Pilih Pengajuan untuk Direspon:
                </label>
                <select
                  onChange={(e) => handleSelectPermitForAdmin(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-white text-gray-800 text-xs font-medium focus:outline-none"
                >
                  <option value="">-- Pilih Kegiatan Masuk --</option>
                  {existingPermits.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.namaormawa} - {p.namakegiatan}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isSubmitted && (
              <div className="mb-4 p-4 rounded-xl bg-emerald-500/90 text-white font-bold text-sm flex items-center gap-2 animate-fadeIn shadow-lg">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>
                  {isAdmin
                    ? 'Keputusan balasan telah tersimpan dan terkirim ke Ormawa!'
                    : 'Pengajuan izin kegiatan berhasil dikirim dan tersimpan!'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label htmlFor="namaormawa" className="text-sm font-semibold block text-indigo-100 mb-1">
                  Nama Organisasi
                </label>
                <input
                  type="text"
                  id="namaormawa"
                  value={namaormawa}
                  onChange={(e) => setNamaormawa(e.target.value)}
                  placeholder="Contoh: Himpunan Mahasiswa Teknik Informatika"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="namaacara" className="text-sm font-semibold block text-indigo-100 mb-1">
                  Nama Acara
                </label>
                <input
                  type="text"
                  id="namaacara"
                  value={namaacara}
                  onChange={(e) => setNamaacara(e.target.value)}
                  placeholder="Contoh: Technovest 2026"
                  required
                  className="w-full h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="tanggalmulai" className="text-sm font-semibold block text-indigo-100 mb-1">
                    Tanggal dimulai
                  </label>
                  <input
                    type="text"
                    id="tanggalmulai"
                    value={tanggalmulai}
                    onChange={(e) => setTanggalmulai(e.target.value)}
                    placeholder="Contoh: 20 Mei 2026"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none text-center"
                  />
                </div>
                <div>
                  <label htmlFor="tanggalakhir" className="text-sm font-semibold block text-indigo-100 mb-1">
                    Tanggal berakhir
                  </label>
                  <input
                    type="text"
                    id="tanggalakhir"
                    value={tanggalakhir}
                    onChange={(e) => setTanggalakhir(e.target.value)}
                    placeholder="Contoh: 22 Mei 2026"
                    required
                    className="w-full h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none text-center"
                  />
                </div>
              </div>

              {!isAdmin ? (
                <>
                  <div>
                    <label htmlFor="undangan" className="text-sm font-semibold block text-indigo-100 mb-1">
                      Undangan Terbuka
                    </label>
                    <input
                      type="text"
                      id="undangan"
                      value={undangan}
                      onChange={(e) => setUndangan(e.target.value)}
                      placeholder="Contoh: Seluruh Mahasiswa Polindra"
                      className="w-full h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="rab" className="text-sm font-semibold block text-indigo-100 mb-1">
                      Dokumen RAB / File Anggaran
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="rab"
                        value={rab}
                        onChange={(e) => setRab(e.target.value)}
                        placeholder="Contoh: RAB_Technovest_Final.pdf"
                        className="flex-1 h-11 px-4 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none"
                      />
                      <label className="h-11 px-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl flex items-center justify-center cursor-pointer text-white text-xs font-bold transition">
                        <FileUp className="w-4 h-4 mr-1" /> Unggah
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
                    <label htmlFor="desc" className="text-sm font-semibold block text-indigo-100 mb-1">
                      Deskripsi Kegiatan
                    </label>
                    <textarea
                      id="desc"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      rows={3}
                      placeholder="Jelaskan tujuan, sasaran, dan ringkasan kegiatan..."
                      className="w-full p-3 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none resize-none"
                    ></textarea>
                  </div>
                </>
              ) : (
                <div>
                  <label htmlFor="keputusan" className="text-sm font-semibold block text-indigo-100 mb-1">
                    Keputusan / Catatan Balasan
                  </label>
                  <textarea
                    id="keputusan"
                    value={keputusan}
                    onChange={(e) => setKeputusan(e.target.value)}
                    rows={4}
                    placeholder="Contoh: Disetujui dengan catatan penggunaan fasilitas aula utama."
                    required
                    className="w-full p-3 rounded-xl bg-white text-gray-900 text-sm font-medium border-none shadow-sm focus:ring-2 focus:ring-amber-300 focus:outline-none resize-none"
                  ></textarea>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-64 mx-auto mt-3 h-11 rounded-xl bg-white text-[#6666FF] font-bold text-sm shadow-md hover:bg-indigo-50 hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Menyimpan...' : isAdmin ? 'Kirim Balasan' : 'Kirim Pengajuan'}</span>
              </button>
            </form>
          </div>

          {/* Right Live Preview Card (.rar) */}
          <div className="rar w-full lg:w-1/2 bg-white text-gray-900 rounded-2xl p-6 lg:p-8 shadow-2xl min-h-[480px] flex flex-col justify-between">
            <div>
              <div className="border-b border-gray-100 pb-4 mb-4">
                <span className="text-xs font-bold text-[#6666FF] uppercase tracking-wider block">
                  Live Preview Form
                </span>
                <h3 className="text-xl font-bold text-gray-900">
                  Detail Kegiatan Organisasi Mahasiswa
                </h3>
              </div>

              <div className="kk space-y-3 text-sm text-gray-700">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Nama Ormawa:</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {namaormawa || '-'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Nama Kegiatan:</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {namaacara || '-'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Tanggal Mulai:</span>
                  <span className="font-semibold text-gray-900">{tanggalmulai || '-'}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase">Tanggal Akhir:</span>
                  <span className="font-semibold text-gray-900">{tanggalakhir || '-'}</span>
                </div>

                {!isAdmin ? (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">Undangan:</span>
                      <span className="font-semibold text-gray-900 text-right">{undangan || '-'}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-gray-100 pb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">RAB / Anggaran:</span>
                      <span className="font-semibold text-indigo-600 font-mono text-xs">{rab || '-'}</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                        Deskripsi:
                      </span>
                      <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl leading-relaxed text-justify">
                        {desc || 'Belum ada deskripsi yang diisi.'}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="pt-2">
                    <span className="text-xs font-bold text-gray-400 uppercase block mb-1">
                      Keputusan / Catatan:
                    </span>
                    <p className="text-sm font-semibold text-gray-800 bg-blue-50 p-3.5 rounded-xl border border-blue-100">
                      {keputusan || 'Belum ada keputusan yang diisi.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>CampusPass &bull; Polindra</span>
              <span>Status: Siap Dikirim</span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
