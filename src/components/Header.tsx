'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/dataStore';
import { User } from '@/types';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const roleTitle = user?.role === 'admin' ? 'Admin Humas' : 'Admin Ormawa';

  return (
    <header className="judul flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 select-none">
      {/* Logo & Title */}
      <div className="logo flex items-center gap-3">
        <div className="relative w-14 h-14 flex-shrink-0">
          <Image
            src="/img/logopolindra.png"
            alt="Logo Polindra"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
            Politeknik Negeri Indramayu
          </h3>
          <span className="text-xs text-indigo-600 font-semibold tracking-wider uppercase">
            CampusPass &bull; Activity &amp; Budget Tracker
          </span>
        </div>
      </div>

      {/* Role Badge & Hamburger */}
      <div className="ham-menu flex items-center gap-4">
        <div className="text-right">
          <h2 className="text-lg font-bold text-gray-800">{roleTitle}</h2>
          <p className="text-xs text-gray-500 font-medium">{user?.nama || 'Civitas Akademika'}</p>
        </div>

        {/* Animated 3-line hamburger */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Menu"
          className="ham group flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition p-2 cursor-pointer"
        >
          <span className="block w-6 h-[4px] bg-black rounded-full mb-[3px] transition-all group-hover:bg-[#6666FF]"></span>
          <span className="block w-6 h-[4px] bg-black rounded-full mb-[3px] transition-all group-hover:bg-emerald-500"></span>
          <span className="block w-6 h-[4px] bg-black rounded-full transition-all group-hover:bg-rose-500"></span>
        </button>
      </div>
    </header>
  );
}
