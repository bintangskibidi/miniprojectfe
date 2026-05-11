import React from "react";
import { FaBookOpen } from "react-icons/fa";

export default function LaporanPeminjamanBuku() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* CARD */}
      <div className="bg-white border rounded shadow overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-2 text-xl">
          <FaBookOpen />
          <h1 className="font-semibold">Laporan Peminjaman Buku</h1>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <div className="bg-cyan-100 border border-cyan-300 text-cyan-900 rounded px-4 py-4 text-sm">
            Belum ada data peminjaman.
          </div>
        </div>
      </div>
    </div>
  );
}