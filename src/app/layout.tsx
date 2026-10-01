import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusPass - Track Anggaran & Izin Organisasi Mahasiswa Polindra",
  description: "Sistem Informasi Perizinan Kegiatan dan Pelaporan Anggaran Organisasi Mahasiswa Politeknik Negeri Indramayu",
  icons: {
    icon: "/img/logopolindra.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full">
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
