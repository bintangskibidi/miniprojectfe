import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";

export default function LaporanDenda() {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* CARD */}
      <div className="bg-white border rounded shadow overflow-hidden">
        {/* HEADER */}
        <div className="bg-red-600 text-white px-4 py-3">
          <div className="flex items-center gap-2 text-xl">
            <FaMoneyBillWave />
            <h1 className="font-semibold">
              Laporan Denda Peminaman Buku
            </h1>
          </div>

          <p className="text-xs mt-1">
            Tarif denda per hari: <span className="font-bold">Rp 1.000</span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-4">
          <div className="bg-cyan-100 border border-cyan-300 text-cyan-900 rounded px-4 py-4 text-sm">
            Tidak ada denda yang tercatat.
          </div>
        </div>
      </div>
    </div>
  );
}