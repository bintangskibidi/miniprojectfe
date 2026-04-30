import React, { useState } from "react";

export default function TunggakanSiswa() {
  const [kelas, setKelas] = useState("");
  const [tahun, setTahun] = useState("");

  return (
    <div className="bg-white border rounded mt-20">
      {/* Header */}
      <h5 className="ml-5">Tunggakan Siswa Semua Kelas TA.</h5>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-end gap-4">
          
          {/* Kelas */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Semua Kelas</option>
              <option value="Semua">Semua Kelas</option>
              <option value="VI">VI</option>
              <option value="XI">XI</option>
            </select>
          </div>

          {/* Tahun Ajaran */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Tahun Ajaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih Tahun</option>
              <option value="2025/2026">2025/2026</option>
              <option value="2024/2025">2024/2025</option>
            </select>
          </div>

          {/* Button */}
          <div className="w-1/3">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
              disabled={!tahun}
            >
              🔍 Tampilkan
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}