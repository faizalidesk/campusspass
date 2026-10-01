'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, CheckSquare, User, KeyRound } from 'lucide-react';

interface SidebarProps {
  userRole?: 'admin' | 'ormawa';
}

export default function Sidebar({ userRole = 'ormawa' }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: userRole === 'admin' ? 'Beri Balasan Izin' : 'Izin Kegiatan',
      href: '/izin',
      icon: userRole === 'admin' ? CheckSquare : FileText,
    },
    {
      title: userRole === 'admin' ? 'Laporan Kegiatan' : 'Laporan Balasan',
      href: '/laporan',
      icon: FileText,
    },
    {
      title: 'Profil Saya',
      href: '/profil',
      icon: User,
    },
    {
      title: 'Ganti Akun / Logout',
      href: '/login',
      icon: KeyRound,
    },
  ];

  return (
    <aside className="left w-full md:w-64 lg:w-72 bg-white flex-shrink-0 border-r border-gray-100 p-4 min-h-[calc(100vh-80px)]">
      <ul className="flex flex-col gap-4 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center justify-center gap-3 w-full h-[65px] px-6 rounded-[12px] font-semibold text-[17px] transition-all duration-200 shadow-sm ${
                  isActive
                    ? 'bg-[#6666FF] text-white shadow-md scale-[1.02]'
                    : 'bg-[#F0F8FF] text-gray-700 hover:bg-[#6666FF] hover:text-white hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5 opacity-80" />
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
