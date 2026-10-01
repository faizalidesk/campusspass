'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '@/lib/dataStore';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (role === 'admin') {
        setCurrentUser({
          id: '1',
          nama: 'Heri - Humas Polindra',
          username: username || 'admin',
          role: 'admin',
        });
      } else {
        setCurrentUser({
          id: '2',
          nama: 'Faiz Ali (HIMATIF)',
          username: username || 'user',
          role: 'ormawa',
          ormawa_name: 'Himpunan Mahasiswa Teknik Informatika',
        });
      }
      setIsLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  const setPreset = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('user123');
    }
  };

  return (
    <div className="page w-full min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
      {/* Left 50% Banner Section */}
      <div className="page1 w-full md:w-1/2 min-h-[400px] md:min-h-screen bg-[rgb(32,103,255)] md:rounded-r-[120px] lg:rounded-r-[220px] p-6 lg:p-12 text-white flex flex-col justify-between shadow-2xl relative">
        <div>
          {/* Header Polindra */}
          <div className="judul flex items-center gap-3">
            <Image
              src="/img/logopolindra.png"
              alt="Logo Polindra"
              width={65}
              height={65}
              className="object-contain drop-shadow-md"
              priority
            />
            <h3 className="text-xl lg:text-2xl font-bold tracking-tight">
              Politeknik Negeri Indramayu
            </h3>
          </div>

          <div className="mt-12 lg:mt-20">
            <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">
              Student affairs <br />
              <span className="text-[#FA8072]">CampusPass</span>
            </h2>
            <div className="mt-8 max-w-xl text-blue-100 text-sm lg:text-base leading-relaxed text-justify bg-blue-700/30 p-5 rounded-2xl backdrop-blur-sm border border-blue-400/20">
              <span className="text-[#FA8072] font-bold block text-lg mb-2">
                Information Detail
              </span>
              Selamat datang di portal perizinan dan tracking kegiatan organisasi mahasiswa Politeknik Negeri Indramayu. Melalui sistem ini, seluruh proses pengajuan proposal, dokumen RAB, izin fasilitas, serta pelaporan kegiatan dapat dikelola secara transparan, terpusat, dan efisien.
            </div>
          </div>
        </div>

        <div className="text-xs text-blue-200 mt-6">
          &copy; {new Date().getFullYear()} Politeknik Negeri Indramayu &bull; CampusPass
        </div>
      </div>

      {/* Right 50% Form Section */}
      <div className="page2 w-full md:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-md text-center">
          {/* Top Logo & Headings */}
          <div className="form flex flex-col items-center mb-6">
            <Image
              src="/img/logopolindra.png"
              alt="Polindra"
              width={110}
              height={110}
              className="object-contain mb-3 drop-shadow"
            />
            <p className="text-sm font-extrabold text-gray-800">
              Pengajuan izin dan pelaporan kegiatan Organisasi Mahasiswa
            </p>
            <p className="text-xs font-semibold text-gray-500 mt-1">
              Politeknik Negeri Indramayu ({role === 'admin' ? 'Admin Humas' : 'User Ormawa'})
            </p>

            {/* Role Switcher Pill */}
            <div className="mt-4 flex bg-gray-100 p-1 rounded-xl border border-gray-200 w-full max-w-xs">
              <button
                type="button"
                onClick={() => setPreset('admin')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  role === 'admin'
                    ? 'bg-[#6666FF] text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login Admin
              </button>
              <button
                type="button"
                onClick={() => setPreset('ormawa')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                  role === 'ormawa'
                    ? 'bg-[#6666FF] text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Login Ormawa
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border-2 border-black bg-white text-center text-sm font-medium focus:outline-none focus:border-[#6666FF] transition"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-11 px-4 rounded-xl border-2 border-black bg-white text-center text-sm font-medium focus:outline-none focus:border-[#6666FF] transition"
              />
            </div>

            <div className="lupa flex justify-between items-center text-xs text-gray-600 my-1 px-1">
              <a href="#" className="hover:text-[#6666FF] hover:underline">
                Lupa password?
              </a>
              <p>
                Belum punya akun?{' '}
                <button
                  type="button"
                  onClick={() => setPreset(role === 'admin' ? 'ormawa' : 'admin')}
                  className="text-[#6666FF] font-bold hover:underline"
                >
                  Bikin Yuk
                </button>
              </p>
            </div>

            {/* Gradient Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-[rgb(36,221,253)] to-[rgb(0,60,255)] hover:from-[rgb(0,60,255)] hover:to-[rgb(36,221,253)] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center"
            >
              {isLoading ? 'Memproses...' : 'Submit / Masuk'}
            </button>
          </form>

          {/* Social Icons Placeholders (Original Aesthetic) */}
          <div className="other flex justify-between items-center gap-3 mt-6">
            <div className="google flex-1 h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <span className="text-xs font-bold text-gray-700">Google SSO</span>
            </div>
            <div className="apple flex-1 h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <span className="text-xs font-bold text-gray-700">Apple ID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
