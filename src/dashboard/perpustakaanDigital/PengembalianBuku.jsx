import React, { useState } from "react";
import {
  FaUndo,
  FaFilter,
  FaSearch,
  FaSyncAlt,
  FaBoxOpen,
  FaEye,
} from "react-icons/fa";

export default function PengembalianBuku() {
  const [filter, setFilter] = useState("Hari Ini");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-md p-4 text-white shadow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FaUndo />
              Pengembalian Buku
            </h1>

            <p className="text-sm mt-1 text-gray-200">
              Kelola pengembalian buku perpustakaan
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold">0</h2>
            <p className="text-xs">Total Peminjaman Aktif</p>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-md shadow mt-5 border">
        {/* TITLE */}
        <div className="border-b px-4 py-2 flex items-center gap-2 font-semibold text-gray-700">
          <FaFilter />
          Filter Data
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <label className="block text-sm font-semibold mb-2">
            Filter Berdasarkan
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* SELECT */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option>Hari Ini</option>
              <option>Semua Data</option>
              <option>Minggu Ini</option>
              <option>Bulan Ini</option>
              <option>Rentang Tanggal</option>
            </select>

            {/* BUTTON FILTER */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center justify-center gap-2">
              <FaSearch />
              Terapkan Filter
            </button>

            {/* RESET */}
            <button className="border border-gray-400 hover:bg-gray-100 text-gray-700 rounded px-4 py-2 flex items-center justify-center gap-2">
              <FaSyncAlt />
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="bg-white rounded-md shadow mt-5 border min-h-[350px] flex flex-col items-center justify-center">
        <FaBoxOpen className="text-6xl text-gray-500 mb-4" />

        <h2 className="text-2xl text-gray-700 font-semibold">
          Tidak ada data peminjaman
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Tidak ada peminjaman buku yang sedang aktif saat ini.
        </p>

        <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded flex items-center gap-2">
          <FaEye />
          Lihat Semua Data
        </button>
      </div>
    </div>
  );
}