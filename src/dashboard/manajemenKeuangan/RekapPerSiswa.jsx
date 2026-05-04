import React, { useState } from "react";

export default function RekapPerSiswa() {
  const [kelas, setKelas] = useState("");
  const [tahun, setTahun] = useState("");

  return (
    <div className="bg-white border rounded">
      
      {/* Header */}
      <div className="bg-cyan-500 text-white px-4 py-2 font-semibold rounded-t">
        Rekap Per Siswa
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-end gap-4">
          
          {/* Kelas */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Pilih Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-gray-100 focus:bg-white text-sm"
            >
              <option value="">Pilih Kelas</option>
              <option>Semua</option>
              <option>X</option>
              <option>XI</option>
            </select>
          </div>

          {/* Tahun */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Tahun Ajaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border border-gray-300 p-2 rounded bg-gray-100 focus:bg-white text-sm"
            >
              <option value="">Pilih Tahun Ajaran</option>
              <option>2025/2026</option>
              <option>2024/2025</option>
            </select>
          </div>

          {/* Button */}
          <div className="w-1/3">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
              disabled={!kelas || !tahun}
            >
              PILIH
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}