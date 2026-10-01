'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AppLayout from '@/components/AppLayout';
import { getCurrentUser } from '@/lib/dataStore';
import { User } from '@/types';
import { Mail, Phone, MapPin, Building2, ShieldCheck } from 'lucide-react';

export default function ProfilPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const isAdmin = user?.role === 'admin';

  return (
    <AppLayout>
      <div className="con2 w-full">
        <div className="bar1 w-full bg-[#6666FF] rounded-2xl p-6 lg:p-8 text-white shadow-2xl flex flex-col items-center">
          
          {/* Bio Container (.bio) */}
          <div className="bio w-full max-w-3xl bg-white text-gray-900 rounded-2xl p-8 shadow-2xl text-center font-sans">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
              {isAdmin ? 'Profil Hubungan Masyarakat' : 'Profil Organisasi Mahasiswa'}
            </h1>

            {/* Avatar with Salmon Background (.foto) */}
            <div className="foto w-24 h-24 rounded-full bg-[#FA8072] text-white flex items-center justify-center font-black text-3xl mx-auto shadow-md border-4 border-white mb-3">
              {isAdmin ? 'HM' : 'OM'}
            </div>

            {/* Badge Button */}
            <button
              type="button"
              className="px-5 py-1.5 rounded-full bg-[#FA8072] text-white font-bold text-xs uppercase tracking-wider shadow-sm mb-3"
            >
              {isAdmin ? 'Hubungan Masyarakat' : user?.ormawa_name || 'Himpunan Ormawa'}
            </button>

            {/* Titles */}
            <h2 className="text-lg font-bold text-gray-800">
              {isAdmin
                ? 'Bagian Humas & Kemahasiswaan Politeknik Negeri Indramayu'
                : user?.nama || 'Pengurus Ormawa'}
            </h2>
            <h3 className="text-sm font-semibold text-[#FA8072] mt-0.5 mb-4">
              Politeknik Negeri Indramayu
            </h3>

            {/* Paragraph / Bio */}
            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto text-justify bg-gray-50 p-4 rounded-xl border border-gray-100">
              {isAdmin
                ? 'Unit Hubungan Masyarakat dan Kemahasiswaan Politeknik Negeri Indramayu bertugas memfasilitasi, meninjau, serta memberikan izin resmi terhadap setiap rencana kegiatan akademik maupun non-akademik yang diajukan oleh seluruh organisasi mahasiswa (BEM, MPM, Himpunan Mahasiswa Jurusan, dan Unit Kegiatan Mahasiswa).'
                : 'Organisasi Mahasiswa Politeknik Negeri Indramayu berdedikasi dalam mengembangkan potensi minat, bakat, kepemimpinan, dan penalaran ilmiah mahasiswa guna mencetak generasi unggul yang siap bersaing di tingkat nasional maupun internasional.'}
            </p>

            {/* Key Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-left">
              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#6666FF] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Institusi</p>
                  <p className="text-xs font-bold text-gray-800">POLINDRA</p>
                </div>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#6666FF] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Lokasi</p>
                  <p className="text-xs font-bold text-gray-800">Indramayu, Jawa Barat</p>
                </div>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#6666FF] flex-shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-gray-500 uppercase">Status Akun</p>
                  <p className="text-xs font-bold text-emerald-600">Terverifikasi Aktif</p>
                </div>
              </div>
            </div>

            {/* Social Icons (.icon) */}
            <div className="icon flex justify-center items-center gap-4 pt-4 border-t border-gray-100">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                <Image src="/icon/facebook.ico" alt="Facebook" width={32} height={32} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                <Image src="/icon/instagram.ico" alt="Instagram" width={32} height={32} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                <Image src="/icon/twitter-x.ico" alt="Twitter X" width={32} height={32} />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition">
                <Image src="/icon/github-logo.ico" alt="GitHub" width={32} height={32} />
              </a>
            </div>

          </div>

          <div className="mt-4 text-xs text-indigo-100">
            CampusPass Profil Resmi &bull; Politeknik Negeri Indramayu
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
